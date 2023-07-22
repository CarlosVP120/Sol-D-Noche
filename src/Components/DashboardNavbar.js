import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import UseAuth from "../custom-hooks/UseAuth";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out");
  } catch (error) {
    console.log("error: ", error);
  }
};

export default function WithAction({ showingComponent, setShowingComponent }) {
  const currentUser = UseAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={10}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"} gap={4}>
            <a href="/">
              <img
                src="/images/sol-d-noche-blue.png"
                alt="logo"
                className="w-24 sm:w-40"
              />
            </a>

            <HStack as={"nav"} spacing={4}>
              <Button onClick={() => setShowingComponent("Dashboard")}>
                Products
              </Button>
            </HStack>
          </HStack>
          {/* Gap of 20px between */}
          <Flex alignItems={"center"} gap={4}>
            <div className="hidden md:block">
              <Text>{currentUser ? currentUser?.email.split("@")[0] : ""}</Text>
            </div>
            <Button
              onClick={toggleColorMode}
              display={{ base: "none", sm: "flex" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Button
              variant={"solid"}
              colorScheme={"teal"}
              onClick={() => {
                setShowingComponent("NewProduct");
              }}
            >
              <div className="sm:mr-2 flex justify-center items-center">
                <AddIcon />
              </div>
              <span className="hidden sm:block self-center">New Product</span>
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <div className="">
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Toaster />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to="/">Inicio</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
