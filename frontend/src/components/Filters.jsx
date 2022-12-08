import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../features/game/gameSlice";

const Filters = () => {
  const [selectionData, setSelectionData] = useState({
    owner: "all",
    status: "all",
    search: "",
  });

  const dispatch = useDispatch();

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ ...selectionData }));
  };

  const handleSelection = (e) => {
    e.preventDefault();
    setSelectionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   dispatch(setFilters(selectionData));
  // }, [selectionData, dispatch]);

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={onSearch}>
        <input
          className="search-bar"
          name="search"
          type="string"
          placeholder="search by name"
          value={selectionData.search}
          onChange={handleSelection}
        ></input>
        <select className="filter" name="owner" onChange={handleSelection}>
          <option value="all">All Games</option>
          <option value="mine">My Games</option>
        </select>
        <select className="filter" name="status" onChange={handleSelection}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="complete">Completed</option>
        </select>
        <button>Filter Games</button>
      </form>
    </div>
  );
};

export default Filters;
