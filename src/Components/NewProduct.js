import {
  Box,
  Button,
  Input,
  useToast,
  NumberInput,
  NumberInputField,
  Textarea,
  Grid,
  Flex,
  keyframes,
  Heading,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import ResizeTextarea from "react-textarea-autosize";
import UploadImages from "./UploadImages";

// * Initial State;
const initialState = {
  name: "",
  type: "",
  price: 0,
  availability: "",
  images: [],
  description: "",
  stoneType: "",
  stripeID: "",
};

const AddProduct = () => {
  const toast = useToast();
  const [product, setProduct] = useState(initialState);

  const [modalOpen, setModalOpen] = useState(false);

  // * Add new Product into firebase Database;
  const AddProduct = async () => {
    try {
      const productRef = collection(db, "products");
      await addDoc(productRef, product);

      // * Optional;
      toast({
        title: "Product Added Successfully",
        status: "success",
        isClosable: true,
        position: "top-center",
      });
      setProduct(initialState);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // * to update state with product-details
  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageDrop = (images) => {
    setProduct((prev) => ({ ...prev, images: images }));
    console.log(images);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(product.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProduct((prev) => ({ ...prev, images: items }));
  };

  const appear = keyframes`
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
  `;

  const appearAnimation = `${appear} 0.5s ease-in-out`;

  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  // Get the information of the #imageInput
  // useEffect(() => {
  //   const imageInput = document.querySelector("#imageInput");
  //   const file = imageInput.files[0];
  //   console.log(file);
  // }, []);

  return (
    <Box pb={10} animation={appearAnimation}>
      <Flex alignItems={"center"} p={10}>
        {/* First letter uppercase */}
        <Heading color="teal.400">Add Product</Heading>
      </Flex>
      <Box w="80%" m="auto" mt="10" border={"0px"} borderRadius="10px" p="5">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Box my="4">
            <label htmlFor="name">Name of the product:</label>
            <Input
              id="name"
              placeholder="Name of the product"
              value={product.name}
              name="name"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="type">Type:</label>

            <Select
              id="type"
              placeholder="Seleccionar"
              value={product.type}
              name="type"
              onChange={handleChange}
              mt={1}
            >
              <option value="Beaded Bags">Beaded Bags</option>
              <option value="Necklaces">Necklaces</option>
            </Select>
          </Box>
          <Box my="4">
            <label htmlFor="price">Price:</label>

            <NumberInput
              id="price"
              onChange={(price) => {
                setProduct((prev) => ({ ...prev, price: parse(price) }));
              }}
              value={format(product.price)}
              min={0}
              mt={1}
            >
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="availability">Availability:</label>

            <Select
              id="availability"
              placeholder="Seleccionar"
              value={product.availability}
              name="availability"
              onChange={handleChange}
              mt={1}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </Select>
          </Box>

          <Box my="4">
            <label htmlFor="stoneType">Stone Type:</label>
            <Input
              id="stoneType"
              placeholder="Stone Type"
              value={product.stoneType}
              name="stoneType"
              onChange={handleChange}
              mt={1}
            />
          </Box>

          <Box my="4">
            <Flex direction="column">
              <label htmlFor="images">Images:</label>
              {/* Button to open Modal */}
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                mt={1}
              >
                {product.images.length > 0 ? "Change Images" : "Add Images"}
              </Button>
              {/* Modal */}
              {modalOpen && (
                <UploadImages
                  handleImageDrop={handleImageDrop}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  product={product}
                  setProduct={setProduct}
                />
              )}
            </Flex>
          </Box>
        </Grid>
        <Box my="4">
          <label htmlFor="description">Description:</label>
          <Textarea
            id="description"
            placeholder="Description"
            value={product.description}
            name="description"
            onChange={handleChange}
            mt={1}
            mb={3}
            as={ResizeTextarea}
          />
        </Box>
        <Box my="4">
          <label htmlFor="stripeID">
            Stripe ID:{" "}
            <a
              href="https://dashboard.stripe.com/test/products/create"
              className="text-blue-500"
            >
              (Get from: https://dashboard.stripe.com/test/products/create)
            </a>
          </label>
          <Input
            id="stripeID"
            placeholder="Stripe ID"
            value={product.stripeID}
            name="stripeID"
            onChange={handleChange}
            mt={1}
          />
        </Box>

        <Button onClick={AddProduct} colorScheme="teal">
          Add Product
        </Button>

        {/* For that shows the images */}
        {/* {product.imagenes.length > 0 && (
            <Box mt={5}>
              <Heading size="md" mb={2}>
                Imágenes:
              </Heading>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {product.imagenes.map((image, index) => (
                  <Box key={index}>
                    <img
                      src={image}
                      alt="preview"
                      style={{ width: "100%", height: "100%" }}
                    />
  
                    <Text>{image}</Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          )} */}

        {/* TEMP
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple
            id="imageInput"
          /> */}
      </Box>
    </Box>
  );
};

export default AddProduct;
