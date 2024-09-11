import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postOne = (blogData, token) => {
  const request = axios.post(baseUrl, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

export default { getAll, postOne };
