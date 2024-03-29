import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOne, setActiveGame } from "../features/game/gameSlice";
import { useIsMobile } from "../contextProviders/useIsMobile";

const GameCard = ({ game, isOpen }) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    if (isOpen && isMobile) {
      dispatch(setActiveGame(null));
      navigate(`/`);
    } else {
      dispatch(setActiveGame(game));
      dispatch(getOne(game._id)).then((res) =>
        dispatch(setActiveGame(res.payload))
      );
      navigate(`/${game._id}`);
    }
  };

  return (
    <div className={`gamecard gamecard-active-${isOpen}`} onClick={onClick}>
      <h4 className="gamecard-title">{game.name}</h4>
      <p className="gamecard-description">{game.description}</p>
    </div>
  );
};

export default GameCard;
