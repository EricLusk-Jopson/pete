import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
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

  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        className="search-bar"
        name="search"
        type="string"
        placeholder="search by name or description"
        value={selectionData.search}
        onChange={handleSelection}
      ></input>
      <div className="selector-container">
        <select className="selector" name="owner" onChange={handleSelection}>
          <option value="all">All Games</option>
          <option value="mine">My Games</option>
        </select>
        <p>that are</p>
        <select className="selector" name="status" onChange={handleSelection}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="complete">Completed</option>
        </select>
        <button className="btn btn-important search-btn">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default Filters;
