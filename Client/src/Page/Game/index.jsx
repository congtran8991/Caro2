import React, { useState, useContext, useEffect } from "react";
import CreateRoom from "./CreateRoom";
import Room from "./Room";

import { DataContext } from "../../Context/useContext"

const Game = () => {
  const { socketIO } = useContext(DataContext)
  const [isPlayGame, setIsPlayGame] = useState(true);

  useEffect(() => {
    socketIO.on("MOVE_ROOM", () => {
      setIsPlayGame(true)
    })
    return () => {
      socketIO.off("MOVE_ROOM")
    }
  }, [])
  return (
    <div className="page-game">
      {isPlayGame ? (
        <CreateRoom isPlayGame={isPlayGame} setIsPlayGame={setIsPlayGame} />
      ) : (
        <Room />
      )}
    </div>
  );
};

export default Game;
