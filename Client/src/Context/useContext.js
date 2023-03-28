import React, { createContext, memo } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
export const DataContext = createContext(null);
let CONNECTION_PORT;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  CONNECTION_PORT = "localhost:3002/";
} else {
  CONNECTION_PORT = "https://caro-winn.herokuapp.com/";
}

let socket = io(CONNECTION_PORT, { transports: ["websocket"] });
const LoadingContextProvider = ({ children }) => {
  const value = { socketIO: socket };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default memo(LoadingContextProvider);

LoadingContextProvider.propTypes = {
  children: PropTypes.any,
};
