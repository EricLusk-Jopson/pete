const generateGameFilters = (request) => {
  const { owner, status, search } = request;
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const filter = {};
  if (owner) {
    filter["host.userID"] = owner;
  }
  if (status) {
    switch (status) {
      case "pending":
        filter["startDate"] = {
          $gt: today,
        };
        break;
      case "complete":
        filter["endDate"] = {
          $lt: today,
        };
        break;
      case "active":
        filter["startDate"] = {
          $lte: today,
        };
        filter["endDate"] = {
          $gte: today,
        };
        break;
      default:
        break;
    }
  }
  if (search) {
    filter["$or"] = [
      { name: { $regex: `${search}` } },
      { description: { $regex: `${search}` } },
      { "host.username": { $regex: `${search}` } },
    ];
  }
  return filter;
};

module.exports = { generateGameFilters };
