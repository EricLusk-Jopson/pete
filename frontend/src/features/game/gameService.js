import axios from "axios";

const API_URL = "api/games";

const getConfiguredToken = () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
};

const getDatedInfo = (dateString) => {
  const parts = dateString.slice(0, 10).split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

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
  const response = await axios.get(API_URL + "/" + id, {
    params: {
      _id: id,
    },
  });
  return response.data;
};

const create = async (info) => {
  if (!localStorage.getItem("user")) {
    return;
  }
  const newInfo = { ...info };
  newInfo.startDate = getDatedInfo(info.startDate);
  newInfo.endDate = getDatedInfo(info.endDate);
  console.log(newInfo);
  const config = getConfiguredToken();
  const response = await axios.post(API_URL, newInfo, config);
  return response.data;
};

const joinGame = async (info) => {
  const config = getConfiguredToken();
  const response = await axios.post(
    API_URL + "/join/" + info.gameID,
    {},
    config
  );
  return response.data;
};

const incrementGame = async (info) => {
  const newDate = new Date();
  const offset = newDate.getTimezoneOffset();
  console.log("offset: ", offset);
  const config = getConfiguredToken();
  const response = await axios.post(
    API_URL + "/inc/" + info.gameID,
    { offset: offset },
    config
  );
  return response.data;
};

const toggleJoinable = async (info) => {
  const config = getConfiguredToken();
  const response = await axios.post(
    API_URL + "/togglejoinable/" + info.gameID,
    {},
    config
  );
  return response.data;
};

const gameService = {
  getMany,
  getOne,
  create,
  joinGame,
  incrementGame,
  toggleJoinable,
};

export default gameService;
