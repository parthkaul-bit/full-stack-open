const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "66e0504c1ae716c7f95370ca",
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
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getTestUser = async () => {
  let user = await User.findOne({ username: "testuser" });
  if (!user) {
    const passwordHash = await bcrypt.hash("testpassword", 10);
    user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash,
    });
    await user.save();
  }
  return user;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogCounts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(
    Object.keys(blogCounts),
    (author) => blogCounts[author]
  );

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = _.reduce(
    blogs,
    (result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes;
      return result;
    },
    {}
  );

  const topAuthor = _.maxBy(
    Object.keys(likesByAuthor),
    (author) => likesByAuthor[author]
  );

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor],
  };
};

module.exports = {
  initialBlogs,
  blogsInDb,
  getTestUser,
  mostBlogs,
  mostLikes,
};
