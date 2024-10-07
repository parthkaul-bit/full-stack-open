// src/redux/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogs from "../services/blogs"; // Ensure correct import path

// Create an async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogsData = await blogs.getAll();
  console.log("Fetched blogs:", blogsData); // Log fetched data
  return blogsData;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      return action.payload; // Update state with fetched blogs
    });
  },
});

export default blogSlice.reducer;
