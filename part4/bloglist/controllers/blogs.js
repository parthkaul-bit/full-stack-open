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
