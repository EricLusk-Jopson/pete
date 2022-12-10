import axios from "axios";

const API_URL = "api/games";

const token = JSON.parse(localStorage.getItem("user")).token;
const config = { headers: { Authorization: `Bearer ${token}` } };

const getMany = async (info) => {
  const response = await axios.get(API_URL, {
    params: {
      limit: info.limit,
      owner: info.owner,
      status: info.status,
      search: info.search,
    },
  });
  return response.data;
};

const getOne = async (id) => {
  console.log(id);
  const response = await axios.get(API_URL + "/" + id, {
    params: {
      _id: id,
    },
  });
  return response.data;
};

const create = async (info) => {
  const response = await axios.post(API_URL, info, config);
  console.log(response.data);
  return response.data;
};

const gameService = {
  getMany,
  getOne,
  create,
};

export default gameService;
