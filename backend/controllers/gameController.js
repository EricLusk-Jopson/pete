const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const { getDatesBetween } = require("../helpers/getDatesBetween");
const { generateGameFilters } = require("../helpers/generateGameFilters");

// @desc    Get games
// @route   GET /api/games
// @access  Public
const getGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;
  const filter = generateGameFilters(req.query);
  const games = await Game.find(filter).limit(limit);
  res.status(200).json(games);
});

// @desc    Get games
// @route   GET /api/games
// @access  Public
const getOneGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.status(200).json(game);
});

// @desc    Set a new game
// @route   POST /api/games
// @access  Private
const setGame = asyncHandler(async (req, res) => {
  // Check for necessary fields
  if (!req.body.name || !req.body.startDate || !req.body.endDate) {
    res.status(400);
    throw new Error("Make sure name and dates are provided");
  }

  // Handle default values for optional fields
  const incVal = req.body.incVal ?? 1;
  const btnTxt = req.body.btnTxt ?? `Click me to add +${incVal} points`;
  const host = {
    userID: req.user.id,
    username: req.user.username,
  };

  // Handle scoreboard generation
  const scoreDates = getDatesBetween(req.dates.start, req.dates.end, 1);
  const scoreBoard = [];
  scoreDates.forEach((date) => {
    const dailyScore = {
      date: date,
      scores: [{ userID: req.user.id, score: 0 }],
    };
    scoreBoard.push(dailyScore);
  });

  // Create game
  const game = await Game.create({
    name: req.body.name,
    description: req.body.description ?? "",
    btnTxt: req.body.btnTxt ?? btnTxt,
    incVal: incVal,
    host: host,
    players: [host],
    startDate: req.dates.start,
    endDate: req.dates.end,
    scoreBoard: scoreBoard,
  });
  res.status(200).json(game);
});

// @desc    Join game as logged-in account
// @route   POST /api/games/join/:id
// @access  Private
const joinGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  // Check if game exists and throw error if it doesn't
  if (!game) {
    res.status(400);
    throw new Error("Game not found");
  }

  // Check if player is already a member of the game
  const player = game.players.find((player) => {
    return player.userID.toString() === req.user.id;
  });

  if (player) {
    res.status(409);
    throw new Error("Player is already a member of this game");
  }

  // Create player object for new player
  const players = [...game.players];
  const newPlayer = {
    userID: req.user.id,
    username: req.user.username,
  };
  players.push(newPlayer);

  // Add player entries to the scoreboard
  const scoreBoard = [...game.scoreBoard];
  scoreBoard.forEach((dailyScore) => {
    dailyScore.scores.push({ userID: req.user.id, score: 0 });
  });

  // Add updated players and scoreBoard to db
  const updatedGame = await Game.findByIdAndUpdate(req.params.id, {
    players: players,
    scoreBoard: scoreBoard,
  });

  res.status(200).json(updatedGame);
});

// @desc    Get goals
// @route   GET /api/games/inc/:id
// @access  Private
const incGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  // Check if game exists and throw error if it doesn't
  if (!game) {
    res.status(400);
    throw new Error("Game not found");
  }

  // Check that player is already a member of the game
  const player = game.players.find((player) => {
    return player.userID.toString() === req.user.id;
  });

  if (!player) {
    res.status(409);
    throw new Error("Player is not a member of this game");
  }

  const today = new Date(new Date().setHours(0, 0, 0, 0));

  // Increment entry on scoreboard
  const scoreBoard = [...game.scoreBoard];
  const scoreBoardIndex = scoreBoard.findIndex((dailyScore) => {
    return (
      new Date(new Date(dailyScore.date).setHours(0, 0, 0, 0)).getTime() ===
      today.getTime()
    );
  });
  const playerIndex = scoreBoard[scoreBoardIndex].scores.findIndex(
    (score) => score.userID.toString() === req.user.id
  );
  scoreBoard[scoreBoardIndex].scores[playerIndex].score += game.incVal;

  // Add updated players and scoreBoard to db
  const updatedGame = await Game.findByIdAndUpdate(req.params.id, {
    scoreBoard: scoreBoard,
  });

  res.status(200).json(updatedGame);
});

module.exports = {
  getGames,
  getOneGame,
  setGame,
  joinGame,
  incGame,
};
