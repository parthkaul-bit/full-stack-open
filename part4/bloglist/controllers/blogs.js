const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }
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

module.exports = blogsRouter;
