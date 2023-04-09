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
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  Input,
  InputGroup,
  Menu,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  MenuButton,
  MenuList,
  MenuItem,
  InputRightElement,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Thead,
  Text,
  RadioGroup,
  Radio,
  Stack,
  HStack,
  ButtonGroup,
  IconButton,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";
import swal from "sweetalert";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getCategories,
  getSuppliers,
} from "../store/storageSlice";

import { RxUpdate } from "react-icons/rx";
import { addUser, deleteUser, editUser, getUsers } from "../store/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Suppliers from "../components/Suppliers";

const Settings = () => {
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [title, setTitle] = useState("");
  const [buyPrice, setBuyPrice] = useState();
  const [sellPrice, setSellPrice] = useState();
  const [count, setCount] = useState();
  const product = { buyPrice, title, category, count, sellPrice };
  const dispatch = useDispatch();
  const products = useSelector((state) => state.storageSlice.products);
  const categories = useSelector((state) => state.storageSlice.categories);
  const [erorr, setErorr] = useState("");
  const activeUser = useSelector((state) => state.authSlice.activeUser)[0];
  // for selected product for update
  const [selected, setSelected] = useState({});
  const [filter, setFilter] = useState("");
  const [update, setUpdate] = useState(false);

  // user state
  const users = useSelector((state) => state.authSlice.users);
  const [userType, setUserType] = useState("user");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState();
  const [userEmail, setUserEmail] = useState("");
  const userDateForm = { userType, userName, userPassword, userEmail };
  const [selectedUser, setSelectedUser] = useState({});
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [consists, setConsists] = useState();
  const suppliers = useSelector((state) => state.storageSlice.suppliers);
  //user functions

  const addUserHandler = (e) => {
    e.preventDefault();
    if (users.find((user) => user.userEmail === userDateForm.userEmail)) {
      setWrongEmail(true);
    } else {
      dispatch(addUser(userDateForm));
      dispatch(getUsers());
      setWrongEmail(false);
      setUserType("user");
      setUserName("");
      setUserPassword("");
      setUserEmail("");
    }
  };

  const userEdit = (user) => {
    setUserType(user.userType);
    setUserName(user.userName);
    setUserPassword(user.userPassword);
    setUserEmail(user.userEmail);
    setUpdateUser(true);
    setSelectedUser(user);
  };

  const userUpdateHandler = (e) => {
    e.preventDefault();
    let editData = {
      userType,
      userPassword,
      userName,
      userEmail,
      id: selectedUser.id,
    };
    dispatch(editUser(editData)).then((res) => {
      res.payload.status === 200 &&
        swal({
          title: "User Updated!",

          icon: "success",
          button: "OK!",
        });
    });
    dispatch(getUsers());
    setUserType("user");
    setUserName("");
    setUserPassword("");
    setUserEmail("");
    setUpdateUser(false);
  };

  const userDeleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id)).then(
          (res) =>
            res.payload.status === 200 &&
            swal("Success", {
              icon: "success",
            })
        );
        dispatch(getUsers());
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getSuppliers());
    !isLogin && navigate("/signin");
    if (activeUser) {
      // activeUser.userType = "user" ? Navigate("/") : null;
    }
  }, [dispatch, isLogin, navigate, activeUser]);

  const addProductHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts());
    const searchProduct = products.find((el) => el.title === product.title);

    //CHECK IF PRODUCT ALREADY Exists

    if (searchProduct && searchProduct.title === product.title) {
      const id = searchProduct.id;
      const editData = { buyPrice, title, category, count, id, sellPrice };
      console.log("i found product");

      dispatch(editProduct(editData));
      dispatch(getProducts());
      setCategory("");
      setTitle("");
      setBuyPrice("");
      setCount("");
      setSellPrice("");
    } else {
      console.log("i didn't find product");
      if (category === "") {
        setCategory("category");
      } else {
        dispatch(addProduct(product));
        setCategory("");
        setTitle("");
        setBuyPrice("");
        setCount("");
        setSellPrice("");
      }
    }
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id)).then(
          (res) =>
            res.payload.status === 200 &&
            swal("Success", {
              icon: "success",
            })
        );
        dispatch(getProducts());
      }
    });
  };

  const editHandler = (el) => {
    setTitle(el.title);
    setCategory(el.category);
    setBuyPrice(el.buyPrice);
    setSellPrice(el.sellPrice);
    setCount(el.count);
    setUpdate(true);
    setSelected(el);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const date = {
      title: product.title,
      category: product.category,
      buyPrice: product.buyPrice,
      sellPrice: product.sellPrice,
      count: product.count,
      id: selected.id,
    };
    dispatch(editProduct(date)).then(
      (res) =>
        res.payload.status === 200 &&
        swal("Good job!", "You clicked the button!", "success")
    );
    dispatch(getProducts());
    setCategory("");
    setTitle("");
    setBuyPrice("");
    setCount("");
    setSellPrice("");
    setUpdate(false);
  };

  return (
    <Box
      m={"40px"}
      bgColor={"#fafafa"}
      borderRadius="20px"
      h={"-webkit-fill-available"}
    >
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        align="center"
        p={"20px"}
      >
        <TabList gap={"40px"}>
          <Tab>Users</Tab>
          <Tab>Products</Tab>
          <Tab>Supplaiers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <form onSubmit={updateUser ? userUpdateHandler : addUserHandler}>
              <Grid templateColumns={"repeat(2,1fr)"} w="100%" gap={"10px"}>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"text"}
                    placeholder={"Name"}
                    isRequired
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                  />
                </InputGroup>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    position={"relative"}
                    type={"email"}
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    borderColor={wrongEmail && "red"}
                  />
                  {wrongEmail && (
                    <Text
                      position={"absolute"}
                      fontSize="13px"
                      color={"red"}
                      left="5px"
                      top="-22px"
                    >
                      Email Is Already Exists
                    </Text>
                  )}
                </InputGroup>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"number"}
                    placeholder="Password"
                    isRequired
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </InputGroup>
                <RadioGroup
                  onChange={setUserType}
                  value={userType}
                  colorScheme="green"
                >
                  <Stack
                    direction="row"
                    align={"center"}
                    justify="center"
                    height={"100%"}
                    gap="60px"
                  >
                    <Radio value="user">User</Radio>
                    <Radio value="admin">Admin</Radio>
                  </Stack>
                </RadioGroup>
                <Button
                  rightIcon={updateUser ? <RxUpdate /> : <AddIcon />}
                  bgColor="#A7D7C5"
                  _hover={{ bgColor: "#8FD7C2" }}
                  color="#fafafa"
                  type="submit"
                >
                  {updateUser ? "Update" : "ADD"}
                </Button>
              </Grid>
            </form>

            {users &&
              users.map((user) => {
                return (
                  <HStack
                    key={user.id}
                    p={"10px"}
                    bgColor="#c6f6d575"
                    borderRadius={"20px"}
                    _hover={{ bgColor: "#C6F6D5" }}
                    transition="all 0.3s"
                    columns={"2"}
                    my="10px"
                    justify={"space-around"}
                  >
                    <Text fontWeight={"bold"}>Name : {user.userName}</Text>
                    <Text
                      fontWeight={"bold"}
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      cursor="pointer"
                    >
                      Password :
                      {!showUserPassword ? "#####" : user.userPassword}
                    </Text>
                    <Text fontWeight={"bold"}>Type : {user.userType}</Text>
                    <Text fontWeight={"bold"}>Email : {user.userEmail}</Text>
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
                          onClick={() => userEdit(user)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          bgColor={"red.100"}
                          icon={<NotAllowedIcon />}
                          onClick={() => userDeleteHandler(user.id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                );
              })}
          </TabPanel>

          <TabPanel overflow={"auto"}>
            <form onSubmit={update ? updateHandler : addProductHandler}>
              <Grid templateColumns={"repeat(2,1fr)"} w="100%" gap={"10px"}>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"text"}
                    placeholder={erorr ? "product is already exist" : "Name"}
                    isRequired
                    borderColor={erorr && "red"}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  {erorr && (
                    <Text
                      position={"absolute"}
                      fontSize="13px"
                      color={"red"}
                      left="5px"
                      top="-22px"
                    >
                      {erorr}
                    </Text>
                  )}
                </InputGroup>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bgColor="#A7D7C5"
                    _hover={{ bgColor: "#8FD7C2" }}
                    border={category === "category" && "1px solid red"}
                  >
                    {category ? category : "Category"}
                  </MenuButton>
                  <MenuList>
                    {categories.map((item) => {
                      return (
                        <MenuItem
                          value={item}
                          onClick={(e) => setCategory(e.target.value)}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"number"}
                    placeholder="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    min="1"
                  />
                </InputGroup>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"number"}
                    placeholder="Consists"
                    value={consists}
                    onChange={(e) => setConsists(e.target.value)}
                    min="1"
                  />
                </InputGroup>
                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"number"}
                    placeholder="Buy Price"
                    isRequired
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    min="1"
                  />
                </InputGroup>

                <InputGroup bgColor={"#fafafa"} borderRadius="5px">
                  <Input
                    type={"number"}
                    placeholder="sell Price"
                    isRequired
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    min="1"
                  />
                </InputGroup>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bgColor="#A7D7C5"
                    _hover={{ bgColor: "#8FD7C2" }}
                    border={supplierName === "supplierName" && "1px solid red"}
                  >
                    {supplierName ? supplierName : "Supplier Name"}
                  </MenuButton>
                  <MenuList>
                    {suppliers.map((item) => {
                      return (
                        <MenuItem
                          value={item.name}
                          onClick={(e) => setSupplierName(e.target.value)}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Button
                  rightIcon={update ? <RxUpdate /> : <AddIcon />}
                  bgColor="#A7D7C5"
                  _hover={{ bgColor: "#8FD7C2" }}
                  color="#fafafa"
                  type="submit"
                >
                  {update ? "Update" : "ADD"}
                </Button>
              </Grid>
            </form>
            <Box overflowY={"auto"}>
              <InputGroup
                bgColor={"#fafafa"}
                borderRadius="5px"
                m={"20px auto"}
                width="99%"
              >
                <InputRightElement
                  color={"#A7D7C5"}
                  children={<SearchIcon />}
                />
                <Input
                  type={"text"}
                  placeholder="Search by name"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </InputGroup>
              <Table variant={"simple"} colorScheme="teal" overflow="auto">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Count</Th>
                    <Th>Buy Price</Th>
                    <Th>Sell Price</Th>
                    <Th>Profit</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products
                    .filter((item) => {
                      return !filter ? item : item.title.includes(filter);
                    })
                    .map((el) => {
                      return (
                        <Tr h={"20px"} key={el.id}>
                          <Td>{el.title}</Td>
                          <Td>{el.category}</Td>
                          <Td isNumeric>{el.count}</Td>
                          <Td isNumeric>{el.buyPrice}</Td>
                          <Td isNumeric>{el.sellPrice}</Td>
                          <Td isNumeric>{el.sellPrice - el.buyPrice}</Td>
                          <Td>
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
                                  onClick={() => editHandler(el)}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  bgColor={"red.100"}
                                  icon={<NotAllowedIcon />}
                                  onClick={() => deleteHandler(el.id)}
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          <TabPanel>
            <Suppliers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
