import express from "express";
import { generateUploadURL } from "./s3.js";
// import cors
import cors from "cors";
import stripe from "stripe";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config.js";
import nodemailer from "nodemailer";
import https from "https";
import cron from "node-cron";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const app = express();
app.use(cors());
app.use(express.json());

cron.schedule("*/5 * * * *", () => {
  console.log("running a task every five minutes");
  https.get("https://soldnoche-server.onrender.com");
  console.log("Ping to Myself");
});

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "soldnocheweb@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

const UpdateProduct = async (StripeID) => {
  try {
    // Get the product from the database where its stripeID == StripeID
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);

    const data = productsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const product = data.find((product) => product.stripeID === StripeID);

    // Update the product availability to "Sold"
    product.availability = "Sold";

    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, product);

    // * optional
    console.log(`Product ${product.id} updated successfully`);
  } catch (error) {
    console.log("error: ", error);
  }
};

// Stripe
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/s3Url", async (req, res) => {
  console.log("generating upload URL");
  const url = await generateUploadURL();
  res.send({ url });
});

app.get("/sitemap", async (req, res) => {
  const links = [
    { url: "/", changefreq: "daily", priority: 0.3 },
    { url: "/products", changefreq: "daily", priority: 0.3 },
    { url: "/products/all", changefreq: "daily", priority: 0.3 },
    { url: "/beaded-bags", changefreq: "daily", priority: 0.3 },
    { url: "/jewerly", changefreq: "daily", priority: 0.3 },
  ];

  const stream = new SitemapStream({ hostname: `https://soldnoche.com` });

  // Set the content type
  res.header("Content-Type", "application/xml");

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.send(xmlString);
});

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.stripeID,
      quantity: 1,
    });
  });

  // Ask the user for its shipping details in Mexico and add shipping rates
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://www.soldnoche.com/success",
    cancel_url: "https://www.soldnoche.com/products/all",
    shipping_address_collection: {
      allowed_countries: ["MX"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 9900,
            currency: "MXN",
          },
          display_name: "Dentro de la República Mexicana",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
    ],
  });

  res.send(JSON.stringify({ url: session.url }));
});

const getDay = () => {
  const date = new Date();
  const now = date.toLocaleString();
  return now;
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  //return `${day}/${month}/${year}`;
};

const getHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour}:${minutes}:${seconds}`;
};

app.post("/webhook", async (req, res) => {
  const event = req.body;
  switch (event.type) {
    case "checkout.session.completed":
      const id = event.data.object.id; // "cs_xxx"

      // Retrieve the Checkout Session with expand
      const session = await stripeClient.checkout.sessions.retrieve(id, {
        expand: ["line_items"],
      });

      if (session.payment_status === "paid") {
        console.log("Payment completed successfully");

        session.line_items.data.forEach((item) => {
          UpdateProduct(item.price.id);

          // Send an email to the owner of the store
          const mailData = {
            from: '"Sol D Noche" <soldnocheweb@gmail.com>', // sender address
            to: "soldnocheweb@gmail.com", // list of receivers
            subject: "Nueva compra recibida!",
            html: `
            <h1>¡Hola! Se ha realizado una nueva compra en tu tienda en línea.</h1>
            <p><b>Se ha realizado una nueva compra en la tienda en línea.</p>
            <p><b>El producto comprado es:</b> ${item.description}</p>
            <p><b>El precio del producto es:</b> $${
              item.price.unit_amount / 100
            }</p>
            <p><b>Fecha:</b> ${getDay()}</p>
            <p><b>El correo del comprador es:</b> ${
              session.customer_details.email
            }</p>
            <p><b>El nombre del comprador es:</b> ${
              session.customer_details.name
            }</p>
            <p><b>La dirección de envío es:</b> ${
              session.customer_details.address.line1
            }, ${session.customer_details.address.city}, ${
              session.customer_details.address.state
            }, ${session.customer_details.address.country}</p>
            <p><b>El código postal es:</b> ${
              session.customer_details.address.postal_code
            }</p>
            <p><b>El teléfono del comprador es:</b> ${
              session.customer_details.phone
            }</p>
            
            <hr style="border: 1px solid #000000; width: 100%; margin: 20px 0px;"/>

            <h3>Favor de revisar la información de la compra en Stripe</h3>
            <a href="https://dashboard.stripe.com/test/payments/${
              session.payment_intent
            }">Stripe</a>
            `,
          };

          const customerMailData = {
            from: '"Sol D Noche" <soldnocheweb@gmail.com>', // sender address
            to: session.customer_details.email, // list of receivers
            subject: "Thanks for your purchase!",
            html: `
            <h1>¡Thanks for your purchase in Sol D Noche!</h1>
            <p><b>The product you bought is:</b> ${item.description}</p>
            <p><b>The charged amount is:</b> $${
              item.price.unit_amount / 100
            }</p>
            <p><b>Date:</b> ${getDay()}</p>
            <p><b>The payment status is:</b> ${session.payment_status}</p>
            <p><b>The payment method is:</b> ${
              session.payment_method_types[0]
            }</p>
            <hr style="border: 1px solid #000000; width: 100%; margin: 20px 0px;"/>
            <h3>This product will be shipped to:</h3>
            <p><b>Name:</b> ${session.customer_details.name}</p>
            <p><b>Address:</b> ${session.customer_details.address.line1}, ${
              session.customer_details.address.city
            }, ${session.customer_details.address.state}, ${
              session.customer_details.address.country
            }</p>
            <p><b>Postal Code:</b> ${
              session.customer_details.address.postal_code
            }</p>
            <p><b>Phone:</b> ${session.customer_details.phone}</p>

            <hr style="border: 1px solid #000000; width: 100%; margin: 20px 0px;"/>

            <h4> For more information, please contact us at <a href="mailto:soldnocheweb@gmail.com" target="_blank">soldnocheweb@gmail.com</a></h4>
            `,
          };

          // Send both emails
          transporter.sendMail(mailData, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
          });

          transporter.sendMail(customerMailData, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
          });
        });
      }

      break;
    default:
      return res.status(400).end();
  }
  res.json({ received: true });
});

app.listen(8080, () => console.log("listening on port 8080"));

// Necklace: price_1NQhL9HWW2ECOmazVkp8qpMc
// Yellow Bag: price_1NQhQTHWW2ECOmazMyRadzk9

// // Get the quantity
// console.log(session.line_items.data[0].quantity);

// // Get the product ID
// console.log(session.line_items.data[0].price.product);

// // Get the product API ID
// console.log(session.line_items.data[0].price.id);

// // Get the Payment Status
// console.log(session.payment_status);

// // Get the email of the user
// console.log(session.customer_details.email);

// <p>El ID de la compra es: ${session.id}</p>
// <p>El ID de la orden es: ${session.payment_intent}</p>
// <p>El ID de la transacción es: ${session.payment_intent}</p>
// <p>El ID de la tarjeta es: ${session.payment_intent}</p>
// <p>El ID del pago es: ${session.payment_intent}</p>
// <p>El ID del cliente es: ${session.payment_intent}</p>
// <p>El ID del método de pago es: ${session.payment_intent}</p>
