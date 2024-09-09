const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes, user } = request.body;

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

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete("/:id", async (request, response) => {
  const matchingId = request.params.id;
  const matchingBlog = await Blog.findById(matchingId);

  if (!matchingBlog) {
    return response.json({ error: "Blog doesn't exist" });
  } else {
    const deletedBlog = await Blog.findByIdAndDelete(matchingId);
    response.status(204).json(deletedBlog);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const matchingId = request.params.id;
  const { title, author, url, likes } = request.body;
  if (!title || !author || !url || !likes) {
    return response.status(400).json({ error: "Missing Fields" });
  }
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  const matchingBlog = await Blog.findById(matchingId);

  if (!matchingBlog) {
    return response.status(400).json({ error: "Blog doesn't exist" });
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      matchingId,
      { title, author, url, likes },
      {
        new: true,
        runValidators: true,
      }
    );
    response.status(200).json(updatedBlog);
  }
});

module.exports = blogsRouter;
