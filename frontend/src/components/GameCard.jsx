import React from "react";
import { Link, useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div className="gamecard">
      <Link className="gamelink" to={`/${game._id}`}>
        <h4 className="gameCard-title">{game.name}</h4>
        <p className="gameCard-description">{game.description}</p>
      </Link>
    </div>
  );
};

export default GameCard;
