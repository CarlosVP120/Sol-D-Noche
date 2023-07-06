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

const app = express();
app.use(cors());
app.use(express.json());

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "soldnocheweb@gmail.com",
    pass: "npchmkhcksegdgyw",
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

    const mailData = {
      from: "soldnocheweb@gmail.com", // sender address
      to: "diegopartidaromero@gmail.com", // list of receivers
      subject: "Nueva compra recibida!",
      text: "Info",
      // html: `<b>Hey there! </b>
      //          <br> This is our first message sent with Nodemailer<br/>`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

// Stripe
const stripeClient = new stripe(
  "sk_test_51NQgjDHWW2ECOmaz4rreGgTyALsZOvYhPoT53gfJYPYwETlX9cHX0YPAYqjaSTRH9M93P6hArSYuXQLJedOydiP800v9Ju786G"
);

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/s3Url", async (req, res) => {
  console.log("generating upload URL");
  const url = await generateUploadURL();
  res.send({ url });
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

  // Ask the user for its shipping details in Mexico
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    shipping_address_collection: {
      allowed_countries: ["MX"],
    },
  });

  res.send(JSON.stringify({ url: session.url }));
});

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
        // Do it for all the products in the cart
        // await UpdateProduct(session.line_items.data[0].price.id);
        session.line_items.data.forEach((item) => {
          UpdateProduct(item.price.id);
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
