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

const PropertyCard = ({ product }) => {
  const [access, setAccess] = useState("");

  // // todo: update the product
  // const UpdateProduct = async (id) => {
  //   try {
  //     const productRef = doc(db, "properties", id);
  //     const temp = window.prompt("Please Re-enter the Property_name");
  //     await updateDoc(productRef, { productName: temp });
  //     getData();

  //     // * optional
  //     toast({
  //       title: "Product Updated",
  //       status: "success",
  //       isClosable: true,
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };
  // // todo: Delete the Product
  // const DeleteProduct = async (id) => {
  //   try {
  //     const productRef = doc(db, "properties", id);
  //     await deleteDoc(productRef);
  //     getData();
  //     // * optional
  //     toast({
  //       title: "Product Deleted",
  //       status: "success",
  //       isClosable: true,
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

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
      <Card maxW="sm" animation={appearAnimation} boxShadow="2xl">
        <CardBody>
          <Image
            src={product.images[0]}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            h={96}
            w={"100%"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">
              {product.name.length > 20
                ? product.name.slice(0, 20) + "..."
                : product.name}
            </Heading>
            <Text h={"16"}>
              {product.description.length > 50
                ? product.description.slice(0, 50) + "..."
                : product.description}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {product.price} MXN
            </Text>
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
                setAccess("editar");
              }}
            >
              Edit
            </Button>
            {/* When user clicks on View button, set the access state to "ver" */}
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => {
                setAccess("ver");
              }}
            >
              View
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* MODAL */}
      {/* When access state is "editar", show the ModalEdit component, when access state is "ver", show the ModalView component */}
      {access === "editar" ? (
        <ModalEdit property={product} setAccess={setAccess} />
      ) : access === "ver" ? (
        <ModalView property={product} setAccess={setAccess} />
      ) : null}
    </>
  );
};

const ModalView = ({ property, setAccess }) => {
  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal body text goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setAccess("")}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalEdit = ({ property, setAccess }) => {
  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal body text goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setAccess("")}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PropertyCard;
