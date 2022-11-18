import React from "react";
import { Avatar } from "antd";
import * as Constant from "../Constant"
import PropTypes from 'prop-types';

const Player = (props) => {
  const { text = "", name = "", turnText = "", isPlay = false, className = "", onClick = () => {}} = props; 
  return (
    <div className={className} onClick = { onClick }>
      <div className="text-left flex">
        <div className="fz20">{text}</div>
        <div className="fz15 pl-10">{isPlay && Constant.PLAYER.message_ready}</div>
      </div>
      <div className="text-center">{name}</div>
      <div className="text-center m-5">
        <Avatar size={64} icon={<div className="fz13">{name}</div>} />
      </div>
      <div className="text-center">{turnText}</div>
    </div>
  );
};

Player.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  turnText: PropTypes.string,
  onClick: PropTypes.func,
  isPlay: PropTypes.bool,
  className: PropTypes.string
}

export default Player;
