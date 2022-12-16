import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOne, setActiveGame } from "../features/game/gameSlice";

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    dispatch(getOne(game._id)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
    navigate(`/${game._id}`);
  };

  return (
    <div className="gamecard" onClick={onClick}>
      <h4 className="gamecard-title">{game.name}</h4>
      <p className="gamecard-description">{game.description}</p>
    </div>
  );
};

export default GameCard;
