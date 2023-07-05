import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Stack,
  Divider,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import { Box, Button, useToast } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase-config";
import ProductDashboardCard from "./ProductDashboardCard";
import UseAuth from "../custom-hooks/UseAuth";

const Home = () => {
  const currentUser = UseAuth();
  const [products, setProducts] = useState([]);
  const toast = useToast();

  // * TO get the data from database
  const getData = async () => {
    try {
      const productsRef = collection(db, "products");
      const res = await getDocs(productsRef);

      // * making an readable array for the data
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setProducts(data); //* storing the data into state
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      {currentUser && (
        <Flex alignItems={"center"} p={10} animation={appearAnimation}>
          {/* First letter uppercase */}

          <Heading color="teal.400">
            Welcome, {currentUser?.email.split("@")[0]}
          </Heading>
        </Flex>
      )}
      <Flex
        spacing={20}
        gap={10}
        // templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        px={10}
      >
        {/* CARDS */}
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductDashboardCard product={product} key={index} />
          ))
        ) : (
          // Center the text
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color="gray.500"
            animation={appearAnimation}
          >
            No products found
          </Text>
        )}
      </Flex>
    </>
  );
};

export default Home;