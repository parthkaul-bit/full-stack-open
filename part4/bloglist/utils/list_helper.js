const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.map((blog) => {
    totalLikes = totalLikes + blog.likes;
  });
  return totalLikes;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favouriteBlog = blogs.find((blog) => blog.likes === maxLikes);
  return {
    title: favouriteBlog.title,
    author: favouriteBlog.author,
    likes: favouriteBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
