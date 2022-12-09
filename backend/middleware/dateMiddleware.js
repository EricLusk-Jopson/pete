const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");

const parseDate = (string) => {
  try {
    const parts = string.slice(0, 10).split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  } catch (e) {
    alert("dateString not properly formatted. ", e);
  }
};

const validateGameDates = (req, res, next) => {
  const { startDate, endDate } = req.body;
  console.log("startdate, enddate: ", startDate, endDate);

  // Check that start and end dates exist
  if (!startDate || !endDate) {
    res.status(400);
    throw new Error("Make sure both a start date and end date are provided");
  }

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const startDateMidnight = parseDate(startDate);
  const endDateMidnight = parseDate(endDate);

  console.log(today, startDateMidnight, endDateMidnight);
  console.log(today.getTime());
  console.log(startDateMidnight.getTime());

  // Check that start date is not before today
  if (today.getTime() > startDateMidnight.getTime()) {
    res.status(400);
    throw new Error("start date cannot occur before today");
  }

  // Check that start date comes before end date
  if (startDateMidnight > endDateMidnight) {
    res.status(400);
    throw new Error("start date must come before end date");
  }

  req.dates = { start: startDateMidnight, end: endDateMidnight };
  next();
};

module.exports = { validateGameDates };
