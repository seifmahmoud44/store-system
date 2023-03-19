import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  activeUser: {},
  erorrMessage: "",
  isLogin: false,
};

export const getUsers = createAsyncThunk(
  "authSlice/getUsers",
  async (args, thunkAPI) => {
    try {
      const user = (await axios.get("http://localhost:9000/users")).data;

      return user;
    } catch {}
  }
);

export const addUser = createAsyncThunk(
  "authSlice/addUser",
  async (args, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:9000/users", args);

      return res;
    } catch {}
  }
);
export const deleteUser = createAsyncThunk(
  "authSlice/deleteUser",
  async (args, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:9000/users/${args}`);

      return res;
    } catch {}
  }
);

export const editUser = createAsyncThunk(
  "authSlice/editUser",
  async (args, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/users/${args.id}`,
        args
      );

      return res;
    } catch {}
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.users.map((user) => {
        if (
          user.userEmail === action.payload.userEmail &&
          user.userPassword === action.payload.userPassword
        ) {
          var ac = state.users.filter(
            (user) => user.userEmail === action.payload.userEmail
          );
          state.activeUser = ac;

          state.isLogin = true;
        } else {
          if (user.userEmail !== action.payload.userEmail) {
            state.erorrMessage = "undefind userEmail";
          } else {
            state.erorrMessage = "wrong password";
          }
        }

        return user;
      });
    },
    signout: (state) => {
      state.isLogin = false;
      state.activeUser = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export default authSlice.reducer;
export const { signin, signout } = authSlice.actions;
