import React from "react";
import { List, Button } from "antd";
import PropTypes from "prop-types";

const ListRoomItem = (props) => {
  const { item, handleClick = () => {} } = props;
  const { nameRoom, user} = item
  return (
    <List.Item style={{border: "1px solid #1990ff" }}>
      <div>
        <Button type="primary" onClick={handleClick}>
          Vào phòng
        </Button>
      </div>
      <div className="fz18 clr-blue">{nameRoom}</div>
      <div className="create-room-player">
        <div className="name-player clr-blue">{user?.user1 || "Người chơi 1"}</div>
        <div className="name-player clr-brown pl-15">{user?.user2 || "Người chơi 2"}</div>
      </div>
    </List.Item>
  );
};

ListRoomItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};

export default ListRoomItem;
