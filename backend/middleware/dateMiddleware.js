const validateGameDates = (req, res, next) => {
  const { startDate, endDate } = req.body;

  // Check that start and end dates exist
  if (!startDate || !endDate) {
    res.status(400);
    throw new Error("Make sure both a start date and end date are provided");
  }

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  console.log(today, startDate, endDate);
  const startDateMidnight = new Date(startDate);
  console.log(startDateMidnight);
  const endDateMidnight = new Date(endDate);
  console.log(endDateMidnight);

  // Check that start date is not before today
  if (today.getTime() > startDateMidnight.getTime()) {
    res.status(410);
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
