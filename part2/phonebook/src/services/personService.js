import axios from "axios";

const baseURL = "http://localhost:3001/api/persons";

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const addNewPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const updatedPerson = (updatedPerson) => {
  const request = axios.put(`${baseURL}/${updatedPerson.id}`, updatedPerson);
  return request.then((response) => response.data);
};

export default { getAllPersons, addNewPerson, deletePerson, updatedPerson };
