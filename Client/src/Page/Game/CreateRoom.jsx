import React, { useContext, useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { List } from "antd";
import { DataContext } from "../../Context/useContext";
import ListRoomItem from "../../Component/ListRoomItem";

import PropTypes from "prop-types";

const CreateRoom = (props) => {
  const { setIsPlayGame } = props;
  const { socketIO } = useContext(DataContext);

  const [activeRoom, setActiveRoom] = useState([]);

  useEffect(() => {
    socketIO.on("INFORMATION_GAME", (data) => {
      setActiveRoom(data);
    });
    return () => {
      socketIO.off("INFORMATION_GAME");
    };
  }, []);

  const handleCreateRoom = async () => {
    try {
      await socketIO.emit("CREATE_ROOM", "A" + activeRoom.length + 1);
      setIsPlayGame(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIntoRoom = async (nameRoom) => {
    try {
      await socketIO.emit("INTO_ROOM", nameRoom);
      setIsPlayGame(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="center-screen">
        <div className="list-room">
          <div className="title-game">Đại chiến caro</div>
          <List
            style={{
              width: "800px",
              border: "1px solid #1990ff",
              overflow: "scroll",
            }}
            header={
              <div className="new-room" onClick={handleCreateRoom}>
                Mở bàn mới
              </div>
            }
            bordered
            dataSource={activeRoom}
            renderItem={(item) => (
              <ListRoomItem
                item={item}
                handleClick={() => {
                  handleIntoRoom(item?.nameRoom);
                }}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
export default CreateRoom;

CreateRoom.propTypes = {
  setIsPlayGame: PropTypes.func,
};
