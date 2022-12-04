const getDatesBetween = (startDate, endDate, includeEndDate) => {
  const dates = [];
  const currentDate = new Date(startDate.getTime());
  while (currentDate < endDate) {
    dates.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
};

module.exports = { getDatesBetween };
