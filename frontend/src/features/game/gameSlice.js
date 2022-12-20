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
  isGameLoading: false,
  isSearchLoading: false,
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
      console.log(info);
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

// Join game
export const joinGame = createAsyncThunk(
  "games/join",
  async (info, thunkAPI) => {
    try {
      return await gameService.joinGame(info);
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

// Increment game
export const incrementGame = createAsyncThunk(
  "games/increment",
  async (info, thunkAPI) => {
    try {
      return await gameService.incrementGame(info);
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

// Increment game
export const toggleJoinable = createAsyncThunk(
  "games/toggleJoinable",
  async (info, thunkAPI) => {
    try {
      return await gameService.toggleJoinable(info);
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
      state.isGameLoading = false;
      state.isSearchLoading = false;
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
        state.isSearchLoading = true;
      })
      .addCase(getMany.fulfilled, (state, action) => {
        state.isSearchLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getMany.rejected, (state, action) => {
        state.isSearchLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = null;
      })
      .addCase(getOne.pending, (state) => {
        state.isGameLoading = true;
      })
      .addCase(getOne.fulfilled, (state, action) => {
        state.isGameLoading = false;
        state.isSuccess = true;
      })
      .addCase(getOne.rejected, (state, action) => {
        state.isGameLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(create.pending, (state) => {
        state.isGameLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isGameLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.isGameLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = null;
      })
      .addCase(joinGame.pending, (state) => {
        // state.isGameLoading = true;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        // state.isGameLoading = false;
        state.isSuccess = true;
      })
      .addCase(joinGame.rejected, (state, action) => {
        // state.isGameLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(incrementGame.pending, (state) => {
        // state.isGameLoading = true;
      })
      .addCase(incrementGame.fulfilled, (state, action) => {
        // state.isGameLoading = false;
        state.isSuccess = true;
      })
      .addCase(incrementGame.rejected, (state, action) => {
        // state.isGameLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setFilters, setActiveGame } = gameSlice.actions;
export default gameSlice.reducer;
