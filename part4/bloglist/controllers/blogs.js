const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  try {
    const { title, author, url, likes } = request.body;
    const user = request.user.id;

    if (!title || !url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user,
    });

    const savedBlog = await blog.save();
    return response.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const matchingId = request.params.id;
    const user = request.user;

    try {
      if (!user.id) {
        return response
          .status(401)
          .json({ error: "Token is invalid or missing" });
      }

      const matchingBlog = await Blog.findById(matchingId);

      console.log("Token user ID:", user.id);
      console.log("Blog user ID:", matchingBlog.user.toString());

      if (!matchingBlog) {
        return response.status(404).json({ error: "Blog doesn't exist" });
      }

      if (matchingBlog.user.toString() !== user.id.toString()) {
        return response
          .status(403)
          .json({ error: "User is not authorized to delete this blog" });
      }

      await Blog.findByIdAndDelete(matchingId);
      return response.status(204).end();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "Invalid token" });
      }
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const matchingId = request.params.id;
  const { title, author, url, likes } = request.body;
  const user = request.user.id;

  if (!title || !author || !url || !likes) {
    return response.status(400).json({ error: "Missing Fields" });
  }
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user,
  });

  const matchingBlog = await Blog.findById(matchingId);

  if (!matchingBlog) {
    return response.status(400).json({ error: "Blog doesn't exist" });
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      matchingId,
      { title, author, url, likes, user },
      {
        new: true,
        runValidators: true,
      }
    );
    response.status(200).json(updatedBlog);
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const { comment } = request.body;

  if (!comment) {
    return response.status(400).json({ error: "Comment content is required" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();

    response.status(201).json(updatedBlog);
  } catch (error) {
    console.error("Error adding comment:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = blogsRouter;
