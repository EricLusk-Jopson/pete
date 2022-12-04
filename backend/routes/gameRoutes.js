const express = require("express");
const {
  getGames,
  setGame,
  getOneGame,
  joinGame,
  incGame,
} = require("../controllers/gameController");

const { protect } = require("../middleware/authMiddleware");
const { validateGameDates } = require("../middleware/dateMiddleware");

const router = express.Router();

router.route("/").get(getGames).post(protect, validateGameDates, setGame);
router.route("/:id").get(getOneGame);
router.route("/join/:id").post(protect, joinGame);
router.route("/inc/:id").post(protect, incGame);

module.exports = router;
