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

const updateOne = (updatedBlogData, token) => {
  const request = axios.put(
    `${baseUrl}/${updatedBlogData.id}`,
    updatedBlogData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return request.then((response) => response.data);
};

const deleteOne = (blogId, token) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

export default { getAll, postOne, updateOne, deleteOne, addComment };
