import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import UseAuth from "../custom-hooks/UseAuth";

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db, provider } from "../Firebase/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const Links = ["Dashboard", "Projects", "Team"];

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Sesión cerrada");
  } catch (error) {
    console.log("error: ", error);
  }
};

export default function WithAction({ showingComponent, setShowingComponent }) {
  const currentUser = UseAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={10}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <Button onClick={() => setShowingComponent("Dashboard")}>
                Home
              </Button>
            </HStack>
          </HStack>
          {/* Gap of 20px between */}
          <Flex alignItems={"center"} gap={4}>
            <Text>{currentUser ? currentUser?.email.split("@")[0] : ""}</Text>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Button
              variant={"solid"}
              colorScheme={"teal"}
              leftIcon={<AddIcon />}
              onClick={() => {
                setShowingComponent("NewProduct");
              }}
            >
              New Product
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
                {/* <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem> */}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <Link to="/">Inicio</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
