import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  keyframes,
  Flex,
  useToast,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import UploadImages from "./UploadImages";
import ChakraTagInput from "./ChakraTagInput.tsx";

const PropertyCard = ({ product }) => {
  const toast = useToast();
  const [access, setAccess] = useState("");

  const [hovering, setHovering] = useState(false);

  // // todo: update the product
  const UpdateProduct = async (productToUpdate) => {
    try {
      const productRef = doc(db, "products", productToUpdate.id);
      await updateDoc(productRef, productToUpdate);

      // * optional
      toast({
        title: "Product Updated",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      setAccess("");

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // // todo: Delete the Product
  const DeleteProduct = async () => {
    try {
      const productRef = doc(db, "products", product.id);
      await deleteDoc(productRef);

      toast({
        title: "Product Deleted",
        status: "success",
        isClosable: true,
        position: "top-center",
      });

      setAccess("");
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const appear = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

  const appearAnimation = `${appear} 0.3s ease-in-out`;

  // When the user hovers the card, set the hovering state to true
  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <>
      {/* CARD */}
      <div
        className="product-card flex justify-center mb-8 "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card
          animation={appearAnimation}
          boxShadow="2xl"
          h={"100%"}
          className="w-full sm:w-[26rem]"
        >
          <CardBody>
            <img
              src={product.modelImage}
              className={`object-cover animate-appear h-96 w-full rounded-lg transition-all duration-500 ease-in-out 
                ${hovering ? "opacity-100 flex" : "opacity-0 hidden"}`}
              alt="product"
            />

            <img
              src={product.images[0]}
              className={`object-cover animate-appear h-96 w-full rounded-lg transition-all duration-500 ease-in-out
                ${hovering ? "opacity-0 hidden" : "opacity-100 flex"}`}
              alt="product"
            />

            <Stack mt="6" spacing="3">
              <Flex justify={"space-between"} alignItems={"center"}>
                <Heading size="md">
                  {product.name.length > 20
                    ? product.name.slice(0, 20) + "..."
                    : product.name}
                </Heading>
                <Heading size="xs" color={"gray.200"}>
                  {product.type}:{/* comma between each stone type element */}
                  <span className="text-blue-300">
                    {product.stoneType.map((stone, index) => {
                      return index === product.stoneType.length - 1
                        ? ` ${stone}`
                        : ` ${stone},`;
                    })}
                  </span>
                </Heading>
              </Flex>
              <Text h={"16"}>
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
              </Text>
              <Flex justify={"space-between"}>
                <Text color="blue.600" fontSize="2xl">
                  {product.price} MXN
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  {product.availability}
                </Text>
              </Flex>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              {/* When user clicks on Edit button, set the access state to "editar" */}
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  setAccess("edit");
                }}
              >
                Edit
              </Button>
              {/* When user clicks on Delete button, set the access state to "delete" */}
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  setAccess("delete");
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
      {/* MODAL */}
      {/* When access state is "editar", show the ModalEdit component, when access state is "ver", show the ModalView component */}
      {access === "edit" ? (
        <ModalEdit
          product={product}
          setAccess={setAccess}
          UpdateProduct={UpdateProduct}
        />
      ) : access === "delete" ? (
        <ModalDelete
          property={product}
          setAccess={setAccess}
          DeleteProduct={DeleteProduct}
        />
      ) : null}
    </>
  );
};

const ModalDelete = ({ property, setAccess, DeleteProduct }) => {
  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight={"bold"} fontSize="2xl">
          Delete: {property.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Are you sure */}
          <Text color="red.500" fontSize="lg">
            Are you sure you want to delete the property: {property.name}? This
            action cannot be undone.
          </Text>
        </ModalBody>
        <Flex gap={1} justify={"flex-end"}>
          <Button
            variant="solid"
            colorScheme="red"
            m={2}
            mr={0}
            onClick={DeleteProduct}
          >
            Delete
          </Button>
          <Button m={2} ml={1} onClick={() => setAccess("")}>
            Cancel
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

const ModalEdit = ({ product, setAccess, UpdateProduct }) => {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const [currentProduct, setCurrentProduct] = useState(product);

  const [modalOpen, setModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  const handleImageDrop = (images) => {
    setCurrentProduct((prev) => ({ ...prev, images: images }));
    console.log(images);
  };

  const handleModelImageDrop = (images) => {
    setCurrentProduct((prev) => ({ ...prev, modelImage: images[0] }));
    console.log(images);
  };

  const handleTagsChange = useCallback((event, tags) => {
    setCurrentProduct((prev) => ({ ...prev, stoneType: tags }));
  }, []);

  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit: <span className="text-blue-300">{currentProduct.name}</span>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Inputs to Edit */}
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            placeholder="Product Name"
            defaultValue={currentProduct.name}
            mb={2}
            onChange={(e) => {
              currentProduct.name = e.target.value;
            }}
          />

          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            placeholder="Product Description"
            defaultValue={currentProduct.description}
            mb={2}
            onChange={(e) => {
              currentProduct.description = e.target.value;
            }}
          />

          <label htmlFor="price">Price</label>
          <NumberInput
            id="price"
            onChange={(price) => {
              currentProduct.price = parse(price);
            }}
            defaultValue={format(currentProduct.price)}
            min={0}
            mt={1}
          >
            <NumberInputField />
          </NumberInput>

          <label htmlFor="availability">Availability:</label>

          <Select
            id="availability"
            placeholder="Seleccionar"
            defaultValue={currentProduct.availability}
            name="availability"
            onChange={(e) => {
              currentProduct.availability = e.target.value;
            }}
            mb={2}
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </Select>

          <label htmlFor="type">Type</label>
          <Select
            id="type"
            placeholder="Seleccionar"
            defaultValue={currentProduct.type}
            name="type"
            onChange={(e) => {
              currentProduct.type = e.target.value;
            }}
            mb={2}
          >
            <option value="Beaded Bags">Beaded Bags</option>
            <option value="Necklaces">Jewelry</option>
          </Select>

          <Flex gap={1} alignItems="center">
            <label htmlFor="stoneType">Stone Type:</label>
            <Text color="teal.400">
              (Press "enter" to add or "delete" to delete)
            </Text>
          </Flex>

          <ChakraTagInput
            name="stoneType"
            mt={1}
            tags={currentProduct.stoneType}
            onTagsChange={handleTagsChange}
          />

          <label htmlFor="stripeID">Stripe ID</label>
          <Input
            id="stripeID"
            placeholder="Product Stripe ID"
            defaultValue={currentProduct.stripeID}
            mb={2}
            onChange={(e) => {
              currentProduct.stripeID = e.target.value;
            }}
          />
          <Flex direction="column">
            <label htmlFor="images">Images</label>
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              mt={1}
            >
              {currentProduct.images.length > 0
                ? "Change Images"
                : "Add Images"}
            </Button>
          </Flex>
          {/* Modal */}
          {modalOpen && (
            <UploadImages
              handleImageDrop={handleImageDrop}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              product={currentProduct}
              setProduct={setCurrentProduct}
              type={"images"}
            />
          )}
          <Flex direction="column">
            <label htmlFor="images">Model Image</label>
            <Button
              onClick={() => {
                setModelModalOpen(true);
              }}
              mt={1}
            >
              {currentProduct.modelImage.length > 0
                ? "Change Image"
                : "Add Image"}
            </Button>
          </Flex>
          {/* Modal */}
          {modelModalOpen && (
            <UploadImages
              handleImageDrop={handleModelImageDrop}
              modalOpen={modelModalOpen}
              setModalOpen={setModelModalOpen}
              product={currentProduct}
              setProduct={setCurrentProduct}
              type={"modelImage"}
            />
          )}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={() => setAccess("")}>Close</Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => UpdateProduct(currentProduct)}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PropertyCard;
