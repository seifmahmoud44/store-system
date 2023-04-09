import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories, getProducts } from "../store/storageSlice";

const Storage = () => {
  const state = useSelector((state) => state.storageSlice.categories);
  const products = useSelector((state) => state.storageSlice.products);
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("speakers");
  const navigate = useNavigate();

  useEffect(() => {
    !isLogin && navigate("/signin");
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, navigate, isLogin]);
  return (
    <Box
      m={"40px"}
      bgColor={"#fafafa"}
      borderRadius="20px"
      h={"-webkit-fill-available"}
      overflow="auto"
      padding={"10px 40px"}
    >
      <Flex justify={"center"} align="center" gap={"20px"}>
        {state.map((state, indx) => {
          return (
            <Button
              key={indx}
              bgColor={"#C6F6D5"}
              _hover={{ bgColor: "#b9eac8" }}
              my="10px"
              borderRadius={"full"}
              textTransform="capitalize"
              value={state}
              onClick={(e) => setSelected(e.target.value)}
            >
              {state}
            </Button>
          );
        })}
      </Flex>

      <Flex
        justify={"center"}
        align="center"
        flexDirection={"row"}
        width="100%"
        padding="10px"
        textAlign="center"
        gap="20px"
      >
        {products
          .filter((product) => product.category === selected)
          .map((product) => (
            <Flex
              key={product.id}
              w={"250px"}
              _hover={{ bgColor: "#b9eac8" }}
              bgColor={"#C6F6D5"}
              flexDirection="column"
              justify={"center"}
              align="center"
              borderRadius={"10px"}
            >
              <Box fontSize={"2xl"} fontWeight="bold" as="h1" mt={"20px"}>
                {product.title}
              </Box>
              <Box padding={"10px 20px"} w="250px">
                <Box
                  bgColor="#fafafa"
                  margin={"auto"}
                  borderRadius="10px"
                  mt={"10px"}
                  as="h1"
                >
                  {`Count : ${product.count}`}
                </Box>
                <Box
                  bgColor="#fafafa"
                  margin={"auto"}
                  borderRadius="10px"
                  mt={"10px"}
                  as="h1"
                >
                  {`Category : ${product.category}`}
                </Box>

                <Box
                  bgColor="#fafafa"
                  margin={"auto"}
                  borderRadius="10px"
                  mt={"10px"}
                  as="h1"
                >
                  {`Buy Price : ${product.buyPrice}`}
                </Box>

                <Box
                  bgColor="#fafafa"
                  margin={"auto"}
                  borderRadius="10px"
                  mt={"10px"}
                  as="h1"
                >
                  {`Sell Price : ${product.sellPrice}`}
                </Box>
                <Box
                  bgColor="#fafafa"
                  margin={"auto"}
                  borderRadius="10px"
                  mt={"10px"}
                  as="h1"
                >
                  {`Total Profit : ${product.sellPrice * product.count}`}
                </Box>
              </Box>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
};

export default Storage;
