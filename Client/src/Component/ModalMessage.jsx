import React, { useContext, useEffect, memo } from "react";
import { DataContext } from "../Context/useContext"
import { Modal } from "antd";

import PropTypes from "prop-types";

import useTimer  from "../Hooks/useTimer"

import * as Constant from "../Constant"

const ModalMessage = (props) => {
  const { isMessage, dataRoom, player, isShowModalMessage } = props;
  const { time, startTimer, stopTimer, resetStartTime } = useTimer(5)
  const { socketIO } = useContext(DataContext)
  useEffect(() => {
    isShowModalMessage && startTimer()
    return () => {
      stopTimer()
      resetStartTime(5)
    }
  }, [time, isShowModalMessage]);

  useEffect(() => {
    if (!time && dataRoom.isWinGame){
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
      open={isShowModalMessage}
      style={{ top: 50 }}
      closable={false}
      footer={null}
      width={500}
    >
      <div className={classMessage}>{messageModal}</div>
      <div className="text-center fz15 clr-blue">{Constant.MESSAGE_MODAL.new_game} {time}</div>
    </Modal>
  );
};

ModalMessage.propTypes = {
  isMessage: PropTypes.bool,
  dataRoom: PropTypes.object,
  player: PropTypes.string,
  isShowModalMessage: PropTypes.bool
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.isShowModalMessage === nextProps.isShowModalMessage
}

export default memo(ModalMessage, areEqual);
