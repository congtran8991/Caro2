import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../Context/useContext"
import { Modal } from "antd";

import PropTypes from "prop-types";

import useTimer  from "../Hooks/useTimer"

import * as Constant from "../Constant"

const ModalMessage = (props) => {
  const { time, startTimer } = useTimer(8)
  const { socketIO } = useContext(DataContext)
  const { isMessage, dataRoom, player } = props;
  const [openModal] = useState(true);
  useEffect(() => {
    startTimer()
  }, []);

  useEffect(() => {
    if (time/2===0 && dataRoom.isWinGame){
      handleContinueGame()
    }
  },[Boolean(time)])



  const handleContinueGame = () => {
    const { nameRoom } = dataRoom
    const dataContinueGame = {
      nameRoom,
      player
    }
    socketIO.emit("CONTINUE_GAME", dataContinueGame)
  }


  const messageModal = isMessage ? Constant.MESSAGE_MODAL.your_lose : Constant.MESSAGE_MODAL.your_win
  const classMessage = `message-modal ${isMessage ? "clr-brown" : "clr-blue"}`
  return (
    <Modal
      open={openModal}
      style={{ top: 50 }}
      closable={false}
      footer={null}
      width={500}
    >
      <div className={classMessage}>{messageModal}</div>
      <div className="text-center fz15 clr-blue">{Constant.MESSAGE_MODAL.new_game} {time/2}</div>
    </Modal>
  );
};

ModalMessage.propTypes = {
  isMessage: PropTypes.bool,
  dataRoom: PropTypes.object,
  player: PropTypes.string,
};

export default ModalMessage;
