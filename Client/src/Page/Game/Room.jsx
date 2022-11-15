import React, { useContext, useEffect, useState } from "react"
import PlayerCpn from "../../Component/Player"
import BoardCpn from "../../Component/Board"
import ModalMessage from "../../Component/ModalMessage"
import Notification from "../../Component/Notification"
import { DataContext } from "../../Context/useContext"

import * as utils from "../../Utils"
import * as Constant from "../../Constant"

const Room = () => {
  const { socketIO } = useContext(DataContext);
  const [player, setPlayer] = useState("")
  const [dataRoom, setDataRoom] = useState({})

  useEffect(() => {
    socketIO.on("RECEIVE_LIST_COORDINATES", (data) => {
      checkWinGame(data)
      setDataRoom(data)
    })
  }, [])

  useEffect(() => {
    socketIO.on("RECEIVE_CONTINUE_GAME", (data) => {
      setDataRoom(data)
    })
  }, [])

  const handleChooseTurn = (typeTurn, isUserName) => {
    if (player) return
    if (isUserName) {
    return Notification({
      type: "warning",
      message: Constant.PLAYER.message_war_position_user,
      config: {
        duration: 4,
      },
    });
      
    }
    let config = {
      isChoose: false,
      turn : "",
      namePlayer: ""
    }
    const { nameRoom, user1, user2 } = dataRoom
    if (typeTurn === "X") {
      config = {
        isChoose: (player && user1?.isPlay && user1.name),
        turn: "X",
        namePlayer: Constant.PLAYER.player1
      }
    }

    if (typeTurn === "O") {
      config = {
        isChoose: player && user2?.isPlay && user2.name,
        turn: "O",
        namePlayer: Constant.PLAYER.player2
      }
    }

    if (config.isChoose)  return
    const infoTurn = {
      turn: config.turn,
      nameRoom
    }
    setPlayer(config.namePlayer)
    socketIO.emit("PLAYER", infoTurn)

  }

  const checkWinGame = (data) => {
    if (Object.entries(data).length === 0) return false
    const { objTick, newTick} = data
    const isWin = utils.checkHorizontal(objTick, newTick) || utils.checkVertical(objTick, newTick) || utils.checkLeftCross(objTick, newTick) || utils.checkRightCross(objTick, newTick)
    return isWin
  }

  const handleMoveRoom = () => {
    const { nameRoom } = dataRoom
    socketIO.emit("MOVE_ROOM", {nameRoom})
  }

  const isTurn = dataRoom?.countTick % 2 === 0;
  const textPlayer = isTurn ? Constant.PLAYER.player1 : Constant.PLAYER.player2;
  const isTurnTick = player === textPlayer;
  const isShowModalMessage = !!(checkWinGame(dataRoom) && dataRoom.isWinGame && player);


  return (
    <div className="room-box">
      <div className="room-layout">
        <div className="room-chessboard">
          <BoardCpn dataRoom = {dataRoom} player = {player} />
        </div>
        <div style={{width: "200px"}}>
          <div className="p-10">
            <div className="name-room">
              <div>Phòng: {dataRoom?.nameRoom}</div> 
              <div className="fz13 pointer" onClick={handleMoveRoom}>Rời phòng</div>
            </div>
              <PlayerCpn 
                className="room-player player1 p-5" 
                turnText={isTurn ? Constant.BOARD_GAME.message_turn_X : "" } 
                text={"X"} 
                name={dataRoom?.user1?.name} 
                isPlay={dataRoom?.user1?.isPlay}
                onClick = {() => {
                  handleChooseTurn("X", !!dataRoom?.user1?.name)
                }}
              />
              <PlayerCpn 
                className="room-player player2 mt-10 p-5" 
                turnText={!isTurn ? Constant.BOARD_GAME.message_turn_O : ""} 
                text={"O"} 
                name={dataRoom?.user2?.name} 
                isPlay={dataRoom?.user2?.isPlay} 
                onClick = {() => {
                  handleChooseTurn("O", !!dataRoom?.user2?.name)
                }}
              />
            <div className="text-your-turn text-center m-10">
              {isTurnTick ? Constant.BOARD_GAME.message_your_turn : Constant.BOARD_GAME.message_your_competitor}
            </div>
            <div className="fz12 m-10">{Constant.BOARD_GAME.title_note}</div>
            {<ModalMessage isMessage={isTurnTick} dataRoom={dataRoom} player={player} isShowModalMessage = {isShowModalMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
