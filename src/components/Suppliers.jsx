import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
  InputGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers } from "../store/storageSlice";

function Suppliers() {
  const suppliers = useSelector((state) => state.storageSlice.suppliers);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);
  return (
    <>
      <InputGroup>
        <Input type={"text"} placeholder="filter" value={filter} />
      </InputGroup>
      <Table>
        <Thead>
          <Tr>
            <Th>one</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Accordion>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Section 1 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

export default Suppliers;
