const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add a player id"],
  },
  username: {
    type: String,
    required: [true, "Please add a player name"],
  },
});

const scoreSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const dailyScoresSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  scores: [scoreSchema],
});

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: {
    type: String,
    required: false,
  },
  btnTxt: {
    type: String,
    required: false,
  },
  incVal: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: [true, "Please add a start date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please add an end date"],
  },
  players: [playerSchema],
  host: playerSchema,
  scoreBoard: [dailyScoresSchema],
  dateAdded: {
    type: Date,
    required: [true, "Please add a dateAdded"],
  },
});

module.exports = mongoose.model("Game", gameSchema);
