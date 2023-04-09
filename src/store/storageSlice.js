import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  sellProducts: [],
  categories: [],
  actions: [],
  suppliers: [],
};

//actions extra reducers

export const getSuppliers = createAsyncThunk(
  "storageSlice/getSuppliers",
  async (args, thunkAPI) => {
    try {
      const suppliers = (await axios.get(`http://localhost:9000/suppliers`))
        .data;

      return suppliers;
    } catch {}
  }
);

export const getActions = createAsyncThunk(
  "storageSlice/getActions",
  async (args, thunkAPI) => {
    try {
      const product = (await axios.get(`http://localhost:9000/actions`)).data;

      return product;
    } catch {}
  }
);

export const addAction = createAsyncThunk(
  "storageSlice/addAction",
  async (args, thunkAPI) => {
    try {
      const product = await axios.post(`http://localhost:9000/actions`, args);

      return product;
    } catch {}
  }
);

export const getCategories = createAsyncThunk(
  "storageSlice/getCategories",
  async (args, thunkAPI) => {
    try {
      const product = (await axios.get(`http://localhost:9000/categories`))
        .data;

      return product;
    } catch {}
  }
);

export const editSellProductSlice = createAsyncThunk(
  "storageSlice/editSellProduct",
  async (args, thunkAPI) => {
    console.log(args);
    try {
      const product = axios.put(
        `http://localhost:9000/sellProducts/${args.id}`,
        args
      );

      return product;
    } catch {}
  }
);

export const getSellProducts = createAsyncThunk(
  "storageSlice/getSellProducts",
  async (args, thunkAPI) => {
    try {
      const product = (await axios.get(`http://localhost:9000/sellProducts`))
        .data;

      return product;
    } catch {}
  }
);

export const addSellProduct = createAsyncThunk(
  "storageSlice/addSellProduct",
  async (args, thunkAPI) => {
    try {
      const product = (
        await axios.post(`http://localhost:9000/sellProducts`, args)
      ).data;

      return product;
    } catch {}
  }
);

export const deleteProduct = createAsyncThunk(
  "storageSlice/deleteProduct",
  async (args, thunkAPI) => {
    try {
      const product = axios.delete(`http://localhost:9000/products/${args}`);

      return product;
    } catch {}
  }
);

export const editProduct = createAsyncThunk(
  "storageSlice/editProduct",
  async (args, thunkAPI) => {
    try {
      const product = axios.put(
        `http://localhost:9000/products/${args.id}`,
        args
      );

      return product;
    } catch {}
  }
);

export const addProduct = createAsyncThunk(
  "storageSlice/addProduct",
  async (args, thunkAPI) => {
    try {
      const product = axios.post("http://localhost:9000/products", args);
      return product;
    } catch {}
  }
);

export const getProducts = createAsyncThunk(
  "storageSlice/getProduct",
  async (args, thunkAPI) => {
    try {
      const products = await axios.get("http://localhost:9000/products");
      return products.data;
    } catch {}
  }
);

const storageSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: [
    {
      r: () => {},
    },
  ],
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addSellProduct.fulfilled, (state, action) => {
      state.sellProducts.push(action.payload);
    });

    builder.addCase(getSellProducts.fulfilled, (state, action) => {
      state.sellProducts = action.payload;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    //actions
    builder.addCase(getActions.fulfilled, (state, action) => {
      state.actions = action.payload;
    });
    builder.addCase(addAction.fulfilled, (state, action) => {
      state.actions.push(action.payload);
    });
    //suppliers
    builder.addCase(getSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
  },
});

export default storageSlice.reducer;
export const { r } = storageSlice.actions;
