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
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import ResizeTextarea from "react-textarea-autosize";
import UploadImages from "./UploadImages";
import ChakraTagInput from "./ChakraTagInput.tsx";
import { useCallback } from "react";

// * Initial State;
const initialState = {
  name: "",
  type: "",
  price: 0,
  availability: "",
  images: [],
  modelImage: "",
  description: "",
  stoneType: [],
  stripeID: "",
};

const AddProduct = () => {
  const toast = useToast();
  const [product, setProduct] = useState(initialState);

  const [modalOpen, setModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

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
      // Reload the page to update the products list
      window.location.reload();
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

  const handleModelImageDrop = (image) => {
    setProduct((prev) => ({ ...prev, modelImage: image }));
    console.log(image);
  };

  const handleTagsChange = useCallback((event, tags) => {
    setProduct((prev) => ({ ...prev, [event.target.name]: tags }));
  }, []);

  // const onDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const items = Array.from(product.images);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setProduct((prev) => ({ ...prev, images: items }));
  // };

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

  return (
    <div>
      <div className="hidden sm:block">
        <Box pb={10} animation={appearAnimation}>
          <Flex alignItems={"center"} p={10}>
            {/* First letter uppercase */}
            <Heading color="teal.400">Add Product</Heading>
          </Flex>
          <Box
            w="80%"
            m="auto"
            mt="10"
            border={"0px"}
            borderRadius="10px"
            p="5"
          >
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
                <Flex gap={1} alignItems="center">
                  <label htmlFor="stoneType">Stone Type:</label>
                  <Text color="teal.400">
                    (Press "enter" to add or "delete" to delete)
                  </Text>
                </Flex>

                <ChakraTagInput
                  name="stoneType"
                  mt={1}
                  tags={product.stoneType}
                  onTagsChange={handleTagsChange}
                />
              </Box>

              <Box my="4">
                <Flex w={"100%"} gap={2}>
                  <Flex direction="column" w={"100%"}>
                    <label htmlFor="images">Images:</label>
                    {/* Button to open Modal */}
                    <Button
                      onClick={() => {
                        setModalOpen(true);
                      }}
                      mt={1}
                    >
                      {product.images.length > 0
                        ? "Change Images"
                        : "Add Images"}
                    </Button>
                    {/* Modal */}
                    {modalOpen && (
                      <UploadImages
                        handleImageDrop={handleImageDrop}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        product={product}
                        setProduct={setProduct}
                        type={"images"}
                      />
                    )}
                  </Flex>
                  <Flex direction="column" w={"100%"}>
                    <label htmlFor="images">Model Image:</label>
                    {/* Button to open Modal */}
                    <Button
                      onClick={() => {
                        setModelModalOpen(true);
                      }}
                      mt={1}
                    >
                      {product.modelImage.length > 0
                        ? "Change Image"
                        : "Add Image"}
                    </Button>
                    {/* Modal */}
                    {modelModalOpen && (
                      <UploadImages
                        handleImageDrop={handleModelImageDrop}
                        modalOpen={modelModalOpen}
                        setModalOpen={setModelModalOpen}
                        product={product}
                        setProduct={setProduct}
                        type={"modelImage"}
                      />
                    )}
                  </Flex>
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
          </Box>
        </Box>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden">
        <Box pb={10} animation={appearAnimation}>
          <Flex alignItems={"center"} p={2} ml={8}>
            {/* First letter uppercase */}
            <Heading color="teal.400">Add Product</Heading>
          </Flex>
          <Box w="80%" m="auto" mt="0" border={"0px"} borderRadius="10px" p="0">
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <Box my="1">
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
              <Box my="1">
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
              <Box my="1">
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
              <Box my="1">
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

              <Box my="1">
                <Flex gap={1} alignItems="center">
                  <label htmlFor="stoneType">Stone Type:</label>
                  <Text color="teal.400">
                    (Press "enter" to add or "delete" to delete)
                  </Text>
                </Flex>

                <ChakraTagInput
                  name="stoneType"
                  mt={1}
                  tags={product.stoneType}
                  onTagsChange={handleTagsChange}
                />
              </Box>

              <Box my="1">
                <Flex direction="column">
                  <label htmlFor="images">Images:</label>
                  {/* Button to open Modal */}
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    my={1}
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
              <Box my="1">
                <Flex direction="column" w={"100%"}>
                  <label htmlFor="images">Model Image:</label>
                  {/* Button to open Modal */}
                  <Button
                    onClick={() => {
                      setModelModalOpen(true);
                    }}
                    mt={1}
                  >
                    {product.modelImage.length > 0
                      ? "Change Image"
                      : "Add Image"}
                  </Button>
                  {/* Modal */}
                  {modelModalOpen && (
                    <UploadImages
                      handleImageDrop={handleModelImageDrop}
                      modalOpen={modelModalOpen}
                      setModalOpen={setModelModalOpen}
                      product={product}
                      setProduct={setProduct}
                      type={"modelImage"}
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

            <Button onClick={AddProduct} colorScheme="teal" mt={2}>
              Add Product
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AddProduct;
