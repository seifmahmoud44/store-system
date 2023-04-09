import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Square,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { getActions } from "../store/storageSlice";
import { GrFormClose } from "react-icons/gr";
import { getUsers } from "../store/authSlice";

const Actions = () => {
  const activeUser = useSelector((state) => state.authSlice.activeUser)[0];
  console.log(activeUser);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActions());
    dispatch(getUsers());
  }, [dispatch]);
  const actions = useSelector((state) => state.storageSlice.actions);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log(format(state[0].startDate, "yyyy-MM-dd"));
  const [open, setOpen] = useState(false);

  return (
    <Center height={"100vh"} padding="40px">
      <Box
        height={"100%"}
        padding="20px"
        bgColor={"#fafafa"}
        w="100%"
        borderRadius={"20px"}
        overflow="auto"
      >
        <Flex gap={"20px"}>
          <InputGroup>
            <Input
              type={"text"}
              value={`${format(state[0].startDate, "yyyy/MM/dd")} to ${format(
                state[0].endDate,
                "yyyy/MM/dd"
              )}`}
              readOnly
              position={"relative"}
              onClick={() => setOpen(!open)}
            />

            {open && (
              <>
                <DateRange
                  className={"date-range"}
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
                <Square
                  size={"20px"}
                  position="absolute"
                  top={"100%"}
                  bgColor="#e7e7e7"
                  right="23%"
                  borderRadius={"5px"}
                  onClick={() => setOpen(false)}
                  _hover={{ bgColor: "#ffb4b4" }}
                  cursor="pointer"
                  transition={"0.3s"}
                >
                  <GrFormClose size={"20px"} />
                </Square>
              </>
            )}
          </InputGroup>

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
        </Flex>

        <Table variant={"simple"} colorScheme="teal" size={"md"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Count</Th>
              <Th>Buy Price</Th>
              <Th>Sell Price</Th>
              <Th>Profit</Th>
              <Th>User</Th>
              <Th>Date</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {actions &&
              actions
                .filter((action) => {
                  return (
                    action.date >= format(state[0].startDate, "yyyy-MM-dd") &&
                    action.date <= format(state[0].endDate, "yyyy-MM-dd")
                  );
                })
                .filter((action) => {
                  return !filter ? action : action.title.includes(filter);
                })
                .map((action) => {
                  return (
                    <Tr
                      key={action.id}
                      bgColor={
                        action.title === "signin"
                          ? "green.200"
                          : action.title === "signout" && "red.200"
                      }
                    >
                      <Td>{action.title}</Td>
                      <Td>{action.category}</Td>
                      <Td>{action.count}</Td>
                      <Td>{action.buyPrice}</Td>
                      <Td>{action.sellPrice}</Td>
                      <Td>
                        {action.sellPrice && action.sellPrice - action.buyPrice}
                      </Td>
                      <Td>{action.activeUser.userName}</Td>
                      <Td>{action.date}</Td>
                      <Td>{action.time}</Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default Actions;
