const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
let path = require("path");
// const { json } = require("express");
const Utils = require("./Utils")
// const BoardConstant = require("./Constant")
const port = process.env.PORT || 3002;

// app.listen (port, () => {
//   console.log ('Máy chủ hoạt động!');
// });
// app.use(function(req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });
app.use("/", express.static("build"));
const server = app.listen(port,{
  pingTimeout: 12000
}, () => {
  console.log("Server Running on Port 3002...");
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
io = socket(server);

const defaultUser = { name: "", turn: "", id: "", isPlay: false}
let dataListRoom = {};
let informationRoom = []

io.on("connection", async (socket) => {
  console.log("USER CONNECTION");
  informationRoom = getActiveRooms(io, dataListRoom)
  io.emit("INFORMATION_GAME", informationRoom)
  socket.on("CREATE_ROOM", async (nameRoom) => {
    await socket.join(nameRoom);
    let infoBoardGame = {
      countTick: 0,
      nameRoom: "",
      objTick: {},
      user1: defaultUser,
      user2: defaultUser,
      isWinGame: false,
      newTick: {
        tick: "",
        x: null,
        y: null
      }
    };
    infoBoardGame.nameRoom = nameRoom
    dataListRoom[nameRoom] = infoBoardGame
    io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataListRoom[nameRoom]);
    informationRoom = getActiveRooms(io, dataListRoom)
    io.emit("INFORMATION_GAME", informationRoom)
  })

  socket.on("INTO_ROOM", async (nameRoom) => {
    await socket.join(nameRoom);
    let dataRoom = dataListRoom[nameRoom]
    if (dataRoom.isWinGame){
      let reset = {
        countTick: 0,
        objTick: {},
        newTick: {
          tick: "",
          x: null,
          y: null
        }
      }
      dataListRoom[nameRoom] = {...dataListRoom[nameRoom],...reset}
      socket.emit("RECEIVE_LIST_COORDINATES", dataRoom);
    } else {
      io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataRoom);
    }
  })

  socket.on("PLAYER", (data) => {
    const {turn, nameRoom} = data
    if (!dataListRoom[nameRoom]) return
    let player = {
      name: turn === "X" ? "Player1" : "Player2", 
      turn,
      id: socket?.id,
      isPlay: true
    }
    if (turn === "X") {
      dataListRoom[nameRoom].user1 = player
    } else {
      dataListRoom[nameRoom].user2 = player
    }

    informationRoom = getActiveRooms(io, dataListRoom)

    io.emit("INFORMATION_GAME", informationRoom)
    io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataListRoom[nameRoom]);
  })

  socket.on("SEND_CURRENT_COORDINATES", (data) => {
    const {x, y, nameRoom, player} = data;
    let dataRoom = dataListRoom[nameRoom]
    const { user1, user2 } = dataRoom
    let isPlayUser1 = user1.isPlay
    let isPlayUser2 = user2.isPlay
    if (!dataRoom) return
    if (dataRoom?.objTick[`${x+"_"+y}`]) return
    if (!(isPlayUser1 && isPlayUser2)) return
    dataRoom.countTick ++;
    const isNamePlayer = dataRoom.user1.name === player
    const objNewTick = {
      x,
      y,
      tick: ""
    }
    if (dataRoom.countTick % 2 === 0 && !isNamePlayer) {
      dataRoom.objTick[`${x+"_"+y}`] = "O";
      objNewTick.tick = "O"
    } else {
      dataRoom.objTick[`${x+"_"+y}`] = "X";
      objNewTick.tick = "X"
    }

    dataRoom.newTick = objNewTick
    dataRoom.isWinGame = Utils.checkWinGame(dataRoom)

    if (dataRoom.isWinGame) {
      dataRoom.user1.isPlay = false
      dataRoom.user2.isPlay = false
    }
    io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataRoom);
  })

  socket.on("CONTINUE_GAME", (data) => {
    const { nameRoom, player } = data
    let dataRoom = dataListRoom[nameRoom]
    if(player === "Player1"){
      dataRoom.user1.isPlay = true
    } 
    if (player === "Player2") {
      dataRoom.user2.isPlay = true
    }

    if (dataRoom.user1.isPlay && dataRoom.user2.isPlay) {
      dataRoom.objTick = {}
      dataRoom.countTick = 0
      io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataRoom);
    } else {
      let reset = {
        countTick: 0,
        objTick: {},
        newTick: {
          tick: "",
          x: null,
          y: null
        }
      }
      dataRoom = {...dataRoom,...reset}
      socket.emit("RECEIVE_CONTINUE_GAME", dataRoom)
    }
  })

  socket.on("MOVE_ROOM", (data) => {
    const { nameRoom } = data
    socket.leave(nameRoom)
    const sizeUser = io.sockets.adapter.rooms.get(nameRoom)?.size
    const isUser1 = dataListRoom[nameRoom].user1.id === socket?.id
    const isUser2 = dataListRoom[nameRoom].user2.id === socket?.id
    if (isUser1) {
      dataListRoom[nameRoom].user1 = defaultUser
    }

    if (isUser2) {
      dataListRoom[nameRoom].user2 = defaultUser
    }

    if(!sizeUser) {
      delete dataListRoom[nameRoom]
    }
    informationRoom = getActiveRooms(io, dataListRoom)
    if (dataListRoom[nameRoom]?.isWinGame) {
      socket.emit("MOVE_ROOM")
    } else {
      socket.emit("MOVE_ROOM")
      io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataListRoom[nameRoom]);
    }
    io.emit("INFORMATION_GAME", informationRoom)
  })
  

  socket.on("disconnect", async()=> { 
    console.log("USER DISCONNECTED");
  });

  socket.on("disconnecting",async function () {
    const self = this;
    const rooms = Array.from(self.rooms);
    const nameRoom = rooms[1]
    if (!nameRoom) return

    let dataRoom = dataListRoom[rooms[1]]
    const isIdRoom1 = dataRoom.user1.id === socket?.id 
    const isIdRoom2 = dataRoom.user2.id === socket?.id
    if (isIdRoom1) {
      dataRoom.user1 = defaultUser
    }
    if (isIdRoom2) {
      dataRoom.user2 = defaultUser
    }

    io.to(nameRoom).emit("RECEIVE_LIST_COORDINATES", dataRoom);
  });
});

function getActiveRooms(io, listRoom) {
  const arr = Array.from(io.sockets.adapter.rooms);
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  const res = filtered.map((i) => i[0]);
  const result = res.map((data, i) => {
    return {
      nameRoom: data,
      numberUser: io.sockets.adapter.rooms.get(data).size,
      user : {
        user1: listRoom[data]?.user1?.name,
        user2: listRoom[data]?.user2?.name
      }
    }; // lấy room
  });
  return result;
}

