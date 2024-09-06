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

blogsRouter.delete("/:id", (request, response) => {
  const matchingId = request.body.params.id;
  Blog.findByIdAndDelete(matchingId).then((blogs) => {
    response.json(blogs);
  });
});

module.exports = blogsRouter;
