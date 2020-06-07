import socketIOClient from "socket.io-client";
import config from "./config";

const launch = (nsp, dispatch) => {
  const socket = socketIOClient(`${config.socketAddress}/${nsp}`);

  socket.on("connected", () => {
    dispatch({
      type: "SOCKET",
      message: "CONNECTED",
      body: { nsp: socket.nsp },
    });
  });
  socket.on("connect_error", (err) => {
    dispatch({
      type: "ERR",
      message: "SOCKET_ERROR",
      body: { socketError: err },
    });
  });
  socket.on("error", (err) => {
    dispatch({
      type: "ERR",
      message: "SOCKET_ERROR",
      body: { socketError: err },
    });
  });

  socket.on("room_connected", (data) => {
    dispatch({ type: "ROOMS", message: "CONNECT_ROOM", body: data });
  });

  socket.on("new_user", (data) => {
    dispatch({ type: "ROOMS", message: "NEW_USER", body: data });
  });

  socket.on("game_connected", (data) => {
    dispatch({ type: "GAMES", message: "UPDATE_BOARD", body: data });
  });

  socket.on("update_board", (data) => {
    dispatch({ type: "GAMES", message: "UPDATE_BOARD", body: data });
  });

  socket.on("game_resign", (data) => {
    dispatch({ type: "GAMES", message: "GAME_RESIGN", body: data });
  });

  return socket;
};

export { launch };
