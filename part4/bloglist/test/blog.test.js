const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");
const blog = require("../models/blog");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const noBlogs = [];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];
  test("when list has no blogs", () => {
    const result = listHelper.totalLikes(noBlogs);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favourite blogs", () => {
  const noBlogs = [];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];
  test("when list has no blogs", () => {
    const result = listHelper.favouriteBlog(noBlogs);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has multiple blogs", () => {
    const result = listHelper.favouriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

test("API return correct amount of blog posts in the JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blog posts has property named id instead of _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert(blog.id);
    assert(!blog._id);
  });
});

test("POST request to the successfully creates a new blog post in db", async () => {
  const testUser = await User.findOne({ username: "root" });

  // Generate the JWT token using the same secret as your middleware
  const token = jwt.sign(
    { username: testUser.username, id: testUser._id },
    process.env.JWT_SECRET, // Ensure this is the same secret as used in your app
    { expiresIn: "1h" }
  );

  const newBlog = {
    title: "newTitle",
    author: "newAuthor",
    url: "newURL",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
});

test("if likes are not provided, its defaulted to 0", async () => {
  const testUser = await User.findOne({ username: "root" });

  const token = jwt.sign(
    { username: testUser.username, id: testUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const newBlog = {
    title: "newTitle",
    author: "newAuthor",
    url: "newURL",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201);

  assert.strictEqual(response.body.likes, 0);
  assert.strictEqual(response.body.title, newBlog.title);
  assert.strictEqual(response.body.author, newBlog.author);
  assert.strictEqual(response.body.url, newBlog.url);
});

test("backend responds with bad request when title or url properties are missing", async () => {
  const testUser = await User.findOne({ username: "root" });

  const token = jwt.sign(
    { username: testUser.username, id: testUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const newBlog = {
    author: "newAuthor",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400);
});

test("deleting a blog", async () => {
  const testUser = await helper.getTestUser();

  const token = jwt.sign(
    { username: testUser.username, id: testUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const newBlog = new Blog({
    title: "Test blog to delete",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 0,
    user: testUser.id,
  });
  await newBlog.save();

  console.log("Test user ID:", testUser.id);
  console.log("Blog to delete user ID:", newBlog.user.toString());

  await api
    .delete(`/api/blogs/${newBlog.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204);

  const deletedBlog = await Blog.findById(newBlog.id);
  assert.strictEqual(deletedBlog, null);
});

test("PUT request returns 400 if fields are missing", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: "Updated Title",
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(400);
});

test("PUT request updates a blog post successfully", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: "Updated Title",
    author: "Updated Author",
    url: "http://updated.url",
    likes: 20,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.title, updatedBlog.title);
  assert.strictEqual(response.body.author, updatedBlog.author);
  assert.strictEqual(response.body.url, updatedBlog.url);
  assert.strictEqual(response.body.likes, updatedBlog.likes);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

  const updatedBlogInDb = await Blog.findById(blogToUpdate.id);
  assert.strictEqual(updatedBlogInDb.title, updatedBlog.title);
  assert.strictEqual(updatedBlogInDb.author, updatedBlog.author);
  assert.strictEqual(updatedBlogInDb.url, updatedBlog.url);
  assert.strictEqual(updatedBlogInDb.likes, updatedBlog.likes);
});

test("mostBlogs", async (t) => {
  await t.test("when list has only one blog, equals the author of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const result = helper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  await t.test("of empty list is null", () => {
    assert.strictEqual(helper.mostBlogs([]), null);
  });

  await t.test(
    "when list has multiple blogs, equals the author with most blogs",
    () => {
      const blogs = [
        { author: "Robert C. Martin", title: "Blog 1" },
        { author: "Robert C. Martin", title: "Blog 2" },
        { author: "Robert C. Martin", title: "Blog 3" },
        { author: "Edsger W. Dijkstra", title: "Blog 4" },
        { author: "Edsger W. Dijkstra", title: "Blog 5" },
      ];

      const result = helper.mostBlogs(blogs);
      assert.deepStrictEqual(result, {
        author: "Robert C. Martin",
        blogs: 3,
      });
    }
  );
});

test("mostLikes", async (t) => {
  await t.test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const result = helper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  await t.test("of empty list is null", () => {
    assert.strictEqual(helper.mostLikes([]), null);
  });

  await t.test(
    "when list has multiple blogs, equals the author with most likes",
    () => {
      const blogs = [
        { author: "Robert C. Martin", likes: 10 },
        { author: "Robert C. Martin", likes: 5 },
        { author: "Edsger W. Dijkstra", likes: 12 },
        { author: "Edsger W. Dijkstra", likes: 15 },
      ];

      const result = helper.mostLikes(blogs);
      assert.deepStrictEqual(result, {
        author: "Edsger W. Dijkstra",
        likes: 27,
      });
    }
  );
});
after(async () => {
  await mongoose.connection.close();
});
