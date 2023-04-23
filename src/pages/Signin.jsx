import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../store/authSlice";
import { signin } from "../store/authSlice";
import { addAction } from "../store/storageSlice";

const Signin = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.authSlice.users);

  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const dispatch = useDispatch();
  const today = format(new Date(), "yyyy-MM-dd");
  const time = format(new Date(), "HH:mm:ss");

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
    const activeUser = users.find((user) => user.userEmail === userEmail);

    dispatch(
      addAction({
        date: today,
        time,
        title: "signin",
        activeUser,
      })
    );
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
              borderColor={erorrMessage === "undefind userEmail" && "red"}
            />

            {erorrMessage === "undefind userEmail" && (
              <Text
                position={"absolute"}
                fontSize="13px"
                color={"red"}
                left="5px"
              >
                Undefind Email
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
      <div className="note">
        <h1>USE IT FOR TRY</h1>
        <p>Email : mom@example.com</p>
        <p>Password : 123456</p>
      </div>
    </Flex>
  );
};

export default Signin;
