const prepareFilters = (filters, user) => {
  const preparedFilters = {
    owner: null,
    status: null,
    search: null,
  };
  if (filters.owner === "mine") {
    preparedFilters.owner = user._id.toString();
  }
  if (filters.status !== "all") {
    preparedFilters.status = filters.status;
  }
  if (filters.search !== "") {
    preparedFilters.search = filters.search;
  }
  return preparedFilters;
};

export default prepareFilters;
