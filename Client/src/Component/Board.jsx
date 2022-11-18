import React, { useContext } from "react";
import { createArr } from "../Utils";
import { DataContext } from "../Context/useContext";

import BoxItem from "../Component/BoxItem";

import PropTypes from "prop-types";

import * as Constant from "../Constant";

let createBox = {
  X: createArr(20),
  Y: createArr(20),
};
const Board = (props) => {
  const { dataRoom, player } = props;
  const { objTick = {}, user1, user2, nameRoom, countTick, newTick } = dataRoom;
  const { socketIO } = useContext(DataContext);

  const handleClickBoard = (e) => {
    if (!player) return;
    if (!(user1?.name && user2?.name)) return;
    if (countTick % 2 !== 0 && player === Constant.PLAYER.player1) return;
    if (countTick % 2 === 0 && player === Constant.PLAYER.player2) return;
    const coordinates = {
      x: +e.target.getAttribute("x"),
      y: +e.target.getAttribute("y"),
      nameRoom,
      player,
    };
    socketIO.emit("SEND_CURRENT_COORDINATES", coordinates);
  };

  return (
    <table>
      <tbody onClick={handleClickBoard}>
        {createBox.X.map((itemX) => {
          return (
            <tr key={itemX + 1}>
              {createBox.Y.map((itemY) => (
                <BoxItem
                  key={itemY + 1}
                  X={itemX}
                  Y={itemY}
                  value={objTick[`${itemX + "_" + itemY}`]}
                  newTick={newTick}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Board.propTypes = {
  dataRoom: PropTypes.object,
  player: PropTypes.string,
};

export default Board;
