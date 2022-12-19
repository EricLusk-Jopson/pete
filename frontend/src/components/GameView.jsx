import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameTable from "./GameTable";
import {
  getOne,
  incrementGame,
  joinGame,
  setActiveGame,
  toggleJoinable,
} from "../features/game/gameSlice";
import Spinner from "./Spinner";
import isGameActive from "../helpers/isGameActive";
import isGameFinished from "../helpers/isGameFinished";
import { useLocation } from "react-router-dom";

const GameView = () => {
  const [isIncrementable, setIsIncrementable] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const isMounted = useRef(false);
  const { isGameLoading, activeGame } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const loadGameFromLocation = (id) => {
    if (id) {
      dispatch(getOne(id)).then((res) => {
        console.log(res.payload);
        console.log(res);
        if (res.payload.length > 0) {
          return;
        }
        dispatch(setActiveGame(res.payload));
      });
    }
  };

  useEffect(() => {
    if (!activeGame && !isMounted.current) {
      loadGameFromLocation(location.pathname.substring(1));
    }
    isMounted.current = true;
  }, []);

  useEffect(() => {
    setIsIncrementable(isGameActive(activeGame));
    setIsFinished(isGameFinished(activeGame));
  }, [activeGame]);

  const join = (e) => {
    e.preventDefault();
    const info = { gameID: activeGame._id };
    dispatch(joinGame(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  const increment = (e) => {
    e.preventDefault();
    const info = { gameID: activeGame._id };
    dispatch(incrementGame(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const info = { gameID: activeGame._id };
    dispatch(toggleJoinable(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  return (
    <div className="view">
      {isGameLoading ? (
        <Spinner />
      ) : (
        <>
          {activeGame ? (
            <>
              <div className="gameHeaderFlex">
                <div className="gameHeaderDetails">
                  <h1>{activeGame.name}</h1>

                  {user &&
                    activeGame.host.userID.toString() ===
                      user._id.toString() && (
                      <button
                        className="btn text-btn"
                        name="joinable"
                        onClick={handleClick}
                      >
                        {activeGame.joinable ? "Joinable" : "Not joinable"}
                      </button>
                    )}

                  <p>{activeGame.description}</p>
                </div>
              </div>

              {user &&
                activeGame &&
                activeGame.players &&
                activeGame.players.length > 0 && (
                  <>
                    {activeGame.players.find((player) => {
                      return player.userID.toString() === user._id.toString();
                    }) ? (
                      <>
                        {isIncrementable && (
                          <button
                            className="btn game-btn inc-btn"
                            onClick={increment}
                          >
                            {activeGame.btnTxt}
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {activeGame.joinable && !isFinished && (
                          <button
                            className="btn game-btn btn-important"
                            onClick={join}
                          >
                            Join Game
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}

              <div className="table-container">
                <GameTable activeGame={activeGame} />
              </div>
            </>
          ) : (
            <div className="game-view-placeholder">
              <p>Select a game</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameView;
