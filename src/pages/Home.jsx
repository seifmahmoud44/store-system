import {
  AddIcon,
  ChevronDownIcon,
  NotAllowedIcon,
  RepeatIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  Flex,
  MenuButton,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  InputGroup,
  Input,
  InputRightElement,
  MenuList,
  MenuItem,
  Center,
  Tag,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSellProduct,
  editProduct,
  getProducts,
  getSellProducts,
  editSellProductSlice,
} from "../store/storageSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector((state) => state.authSlice.activeUser)[0];
  const products = useSelector((state) => state.storageSlice.products);
  const sellProducts = useSelector((state) => state.storageSlice.sellProducts);
  const [searchMenu, setSearchMenu] = useState(false);
  const [filter, setFilter] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPricer] = useState("");
  const [count, setCount] = useState(1);
  const [selectedSellProduct, setSelectedSellProduct] = useState({});
  const [editMood, setEditMood] = useState(false);
  const isLogin = useSelector((state) => state.authSlice.isLogin);

  const day = new Date().getDate();

  const month = (new Date().getMonth() + 1).toString();
  const year = new Date().getFullYear();
  const today = `${day}-${month}-${year}`;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSellProducts());
    !isLogin && navigate("/signin");
  }, [dispatch, isLogin, navigate]);
  useEffect(() => {
    filter ? setSearchMenu(true) : setSearchMenu(false);
  }, [filter]);

  const selectedProduct = (product) => {
    setFilter(product.title);
    setBuyPrice(product.buyPrice);
    setSellPricer(product.sellPrice);
    setSearchMenu(false);
    setSelectedSellProduct(product);
  };

  const sendProduct = (e) => {
    e.preventDefault();
    const sendData = {
      title: selectedSellProduct.title,
      category: selectedSellProduct.category,
      buyPrice: selectedSellProduct.buyPrice,
      date: today,
      sellPrice,
      count,
      activeUser,
    };
    dispatch(addSellProduct(sendData));

    let changeCount = {
      id: selectedSellProduct.id,
      count: selectedSellProduct.count - count,
      sellPrice: selectedSellProduct.sellPrice,
      category: selectedSellProduct.category,
      title: selectedSellProduct.title,
      buyPrice: selectedSellProduct.buyPrice,
    };
    dispatch(editProduct(changeCount));
    setFilter("");
    setBuyPrice("");
    setSellPricer("");
    setCount(1);
  };

  //sell product functions
  const editSellProduct = (product) => {
    setFilter(product.title);
    setBuyPrice(product.buyPrice);
    setSellPricer(product.sellPrice);
    setCount(product.count);
    setSelectedSellProduct(product);
    setEditMood(true);
  };

  const editSellProductHandler = (e) => {
    e.preventDefault();
    let date = {
      id: selectedSellProduct.id,
      title: filter,
      category: selectedSellProduct.category,
      buyPrice: selectedSellProduct.buyPrice,
      date: selectedSellProduct.date,
      sellPrice: sellPrice,
      count: count,
      activeUser: activeUser,
    };
    dispatch(editSellProductSlice(date));

    dispatch(getSellProducts());
    setFilter("");
    setBuyPrice("");
    setSellPricer("");
    setCount("");
    setEditMood(false);
  };

  return (
    <Flex
      direction="column"
      justify={"space-around"}
      align="center"
      height={"100vh"}
      padding="40px"
      gap={"40px"}
    >
      <Box bgColor={"#fafafa"} w="100%" borderRadius={"20px"} padding="20px">
        <form onSubmit={editMood ? editSellProductHandler : sendProduct}>
          <InputGroup
            bgColor={"#fafafa"}
            borderRadius="5px"
            mb={"20px"}
            position={"relative"}
          >
            <InputRightElement color={"#A7D7C5"} children={<SearchIcon />} />
            <Input
              type={"text"}
              placeholder="Search by name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              isRequired
            />
          </InputGroup>
          <Box
            position={"absolute"}
            top="102px"
            zIndex={"9"}
            w="300px"
            p={"10px 0"}
            bgColor="#E3F9EA"
            borderRadius={"10px"}
            display={searchMenu ? "block" : "none"}
          >
            {searchMenu &&
              products
                .filter((item) => {
                  return !filter ? item : item.title.includes(filter);
                })
                .map((product) => {
                  return (
                    <HStack
                      key={product.id}
                      justify={"space-between"}
                      p="5px 10px"
                      _hover={{ bgColor: "#C6F6D5" }}
                      borderRadius={"10px"}
                      cursor="pointer"
                      onClick={() => selectedProduct(product)}
                    >
                      <Text display={"block"}>{product.title}</Text>
                      <Text display={"block"}>{product.category}</Text>
                    </HStack>
                  );
                })}
          </Box>

          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            gap="20px"
          >
            <InputGroup bgColor={"#fafafa"} borderRadius="5px">
              <Input
                type={"text"}
                placeholder="Buy Price"
                disabled
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                isRequired
              />
            </InputGroup>

            <InputGroup bgColor={"#fafafa"} borderRadius="5px">
              <Input
                type={"number"}
                placeholder="Sell Price"
                value={sellPrice}
                onChange={(e) => setSellPricer(e.target.value)}
                isRequired
              />
            </InputGroup>

            <InputGroup bgColor={"#fafafa"} borderRadius="5px">
              <Input
                type={"number"}
                placeholder="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                isRequired
              />
            </InputGroup>
          </Box>
          <Center>
            <Button
              type="submit"
              rightIcon={<AddIcon />}
              mt="20px"
              bgColor="#A7D7C5"
              _hover={{ bgColor: "#8FD7C2" }}
              color="#fafafa"
            >
              {editMood ? "Update" : "ADD"}
            </Button>
          </Center>
        </form>
      </Box>
      <Box
        bgColor={"#fafafa"}
        w="100%"
        borderRadius={"20px"}
        padding="20px"
        flexGrow={"1"}
        position="relative"
        pb={"45px"}
        overflowY="auto"
      >
        <Table variant={"simple"} colorScheme="teal" size={"md"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Count</Th>
              <Th>Buy Price</Th>
              <Th>Sell Price</Th>
              {/* <Th>Actions</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {sellProducts &&
              sellProducts
                .filter((product) => product.date === today)
                .map((item) => {
                  return (
                    <Tr key={item.id} h={"20px"}>
                      <Td>{item.title}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.count}</Td>

                      <Td>{item.buyPrice}</Td>
                      <Td>{item.sellPrice}</Td>
                      {/* <Td>
                        <Menu>
                          <MenuButton
                            bgColor={"#A7D7C5"}
                            _hover={{ bgColor: "#8FD7C2" }}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                          >
                            Actions
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              icon={<RepeatIcon />}
                              onClick={() => editSellProduct(item)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              bgColor={"red.100"}
                              icon={<NotAllowedIcon />}
                              onClick={() => console.log("working")}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td> */}
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
        <Tag
          className="profit"
          size={"md"}
          variant="solid"
          colorScheme="teal"
          padding={"10px 15px"}
          position="fixed"
          display={"block"}
          bottom="47px"
          right="136px"
        >
          0.00
        </Tag>
      </Box>
    </Flex>
  );
};

export default Home;
