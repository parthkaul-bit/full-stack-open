import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogs from "../services/blogs";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogsData = await blogs.getAll();
  return blogsData;
});

export const likeBlog = createAsyncThunk("blogs/likeBlog", async (blog) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  const user = JSON.parse(loggedUserJSON);
  try {
    const updatedBlog = await blogs.updateOne(blog, user.token);
    return updatedBlog;
  } catch (error) {
    throw error;
  }
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  const user = JSON.parse(loggedUserJSON);
  try {
    await blogs.deleteOne(id, user.token);
    return id;
  } catch (error) {
    throw error;
  }
});

export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ id, comment }) => {
    const updatedBlog = await blogs.addComment(id, comment);
    return updatedBlog;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        const index = state.findIndex((blog) => blog.id === updatedBlog.id);
        if (index !== -1) {
          state[index] = updatedBlog;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload;
        return state.filter((blog) => blog.id !== id); // Return the state without the deleted blog
      })

      // Handle adding a comment to a blog
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        const index = state.findIndex((blog) => blog.id === updatedBlog.id);
        if (index !== -1) {
          state[index] = updatedBlog;
        }
      });
  },
});

export default blogSlice.reducer;
