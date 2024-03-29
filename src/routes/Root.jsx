import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { RiMapPinUserFill } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { signout } from "../store/authSlice";
import { addAction } from "../store/storageSlice";
import { format } from "date-fns";

const Root = () => {
  const activeUser = useSelector((state) => state.authSlice.activeUser)[0];
  const today = format(new Date(), "yyyy-MM-dd");
  const time = format(new Date(), "HH:mm");
  const dispatch = useDispatch();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent="center"
      w="100%"
    >
      <Box
        w={"40px"}
        bgColor="white"
        margin={"auto"}
        borderRadius="10px"
        padding={"10px 0"}
        display={"flex"}
        flexDirection="column"
        gap={"20px"}
      >
        <NavLink className={"link"} to={"/"}>
          <ImHome />
        </NavLink>

        <Menu>
          <MenuButton
            as={IconButton}
            bgColor="white"
            _hover={{ bgColor: "#eff7f3" }}
            icon={<RiMapPinUserFill fontSize={"25px"} color="#8FD7C2" />}
          />

          <MenuList>
            <MenuGroup
              title={
                activeUser && `welcome : ${activeUser.userName.toUpperCase()}`
              }
            >
              <MenuItem
                bgColor={"#D53F8C"}
                margin="0 auto"
                display={"block"}
                color={"white"}
                w="100%"
                borderRadius={"7px"}
                p={"5px 10px"}
                textAlign="center"
                onClick={() => {
                  dispatch(signout());
                  dispatch(
                    addAction({
                      activeUser,
                      date: today,
                      time,
                      title: "signout",
                    })
                  );
                }}
              >
                log Out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <NavLink className={"link"} to={"/storage"}>
          <BsDatabaseFillCheck />
        </NavLink>

        {activeUser &&
          (activeUser.userType === "admin" ? (
            <Box>
              <NavLink className={"link"} to={"/settings"}>
                <IoSettingsSharp />
              </NavLink>
              <NavLink className={"link"} to={"/actions"}>
                <MdOutlinePendingActions />
              </NavLink>
            </Box>
          ) : null)}
      </Box>
      <Box flexGrow={"1"} margin="auto " h={"100vh"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
