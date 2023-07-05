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
  useDisclosure,
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
import { useState, useRef } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import UploadImages from "./UploadImages";

const PropertyCard = ({ product }) => {
  const toast = useToast();
  const [access, setAccess] = useState("");

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

  return (
    <>
      {/* CARD */}
      <Card animation={appearAnimation} boxShadow="2xl" h={"100%"} minW={"sm"}>
        <CardBody>
          <Image
            src={product.images[0]}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            h={96}
            w={"100%"}
          />
          <Stack mt="6" spacing="3">
            <Flex justify={"space-between"}>
              <Heading size="md">
                {product.name.length > 20
                  ? product.name.slice(0, 20) + "..."
                  : product.name}
              </Heading>
              <Heading size="md" color={"gray.500"}>
                {product.type}: {product.stoneType}
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

  const handleImageDrop = (images) => {
    setCurrentProduct((prev) => ({ ...prev, images: images }));
    console.log(images);
  };

  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {currentProduct.name}</ModalHeader>
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
            <option value="Necklaces">Necklaces</option>
          </Select>

          <label htmlFor="type">StoneType</label>
          <Input
            id="stoneType"
            placeholder="Product StoneType"
            defaultValue={currentProduct.stoneType}
            mb={2}
            onChange={(e) => {
              currentProduct.stoneType = e.target.value;
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
