import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storageSlice from "./storageSlice";

const reducer = { authSlice, storageSlice };

const store = configureStore({ reducer });

export default store;
