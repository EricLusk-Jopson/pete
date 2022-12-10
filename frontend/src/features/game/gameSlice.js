import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";

const initialState = {
  gamesPerPage: 50,
  activeGame: null,
  filters: {
    owner: "all",
    status: "all",
    search: "",
  },
  games: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get games
export const getMany = createAsyncThunk(
  "games/getMany",
  async (info, thunkAPI) => {
    try {
      return await gameService.getMany(info);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get games
export const getOne = createAsyncThunk("games/getOne", async (id, thunkAPI) => {
  try {
    return await gameService.getOne(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create game
export const create = createAsyncThunk(
  "games/create",
  async (info, thunkAPI) => {
    try {
      return await gameService.create(info);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = ";";
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getMany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = null;
      })
      .addCase(getOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOne.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getOne.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = null;
      })
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = null;
      });
  },
});

export const { reset, setFilters, setActiveGame } = gameSlice.actions;
export default gameSlice.reducer;
