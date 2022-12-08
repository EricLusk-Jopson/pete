import axios from "axios";

const API_URL = "api/games";

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

const gameService = {
  getMany,
};

export default gameService;
