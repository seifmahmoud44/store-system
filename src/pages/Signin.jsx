import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../store/authSlice";
import { signin } from "../store/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    isLogin && navigate("/");
  }, [dispatch, isLogin, navigate]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const erorrMessage = useSelector((state) => state.authSlice.erorrMessage);

  const formHandler = (e) => {
    e.preventDefault();
    const data = { userEmail, userPassword };
    dispatch(signin(data));
  };
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      justify={"center"}
      gap="20px"
      align="center"
    >
      <Box textAlign={"center"} p={10} borderRadius={"10px"} bgColor="#F6FBF9">
        <Box as="h1" fontSize={"25px"} mb="10px">
          Sign in
        </Box>

        <form onSubmit={formHandler}>
          <FormControl
            mb={"30px"}
            bgColor="#fafafa"
            isRequired
            position={"relative"}
          >
            {/* <FormLabel>Email</FormLabel> */}
            <Input
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
              borderColor={erorrMessage === "undefind email" && "red"}
            />

            {erorrMessage === "undefind email" && (
              <Text
                position={"absolute"}
                fontSize="13px"
                color={"red"}
                left="5px"
              >
                {erorrMessage}
              </Text>
            )}
          </FormControl>
          <InputGroup size="md" mb={"30px"}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              isRequired
              borderColor={erorrMessage === "wrong password" && "red"}
            />
            {erorrMessage === "wrong password" && (
              <Text
                position={"absolute"}
                fontSize="13px"
                color={"red"}
                left="5px"
                bottom="-21px"
              >
                {erorrMessage}
              </Text>
            )}
            <InputRightElement width="4.5rem">
              <Button
                _hover={[{ bgColor: "#A7D7C5" }, { color: "white" }]}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            mb={"10px"}
            w={"100%"}
            type="submit"
            variant={"ghost"}
            bgColor="#A7D7C5"
            _hover={{ bgColor: "#8FD7C2" }}
            color="white"
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Signin;