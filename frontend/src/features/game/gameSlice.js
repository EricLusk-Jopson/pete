import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";

const initialState = {
  gamesPerPage: 50,
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
      });
  },
});

export const { reset, setFilters } = gameSlice.actions;
export default gameSlice.reducer;
