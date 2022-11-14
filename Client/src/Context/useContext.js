import React, { createContext, memo, useState, useMemo } from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types';
export const DataContext = createContext(null)
// const CONNECTION_PORT = 'localhost:3002/'
let CONNECTION_PORT 
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development")
{
  CONNECTION_PORT = 'localhost:3002/'
} else
{
  CONNECTION_PORT = 'https://caro-super.herokuapp.com/'
}

console.log(CONNECTION_PORT)
let socket = io(CONNECTION_PORT, { transports: ['websocket'] })
const LoadingContextProvider = ({ children }) =>
{
  const [userName, setUserName] = useState("");
  const value = useMemo(
    () => ({ userName, setUserName, socketIO: socket }), 
    [userName]
  );

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

LoadingContextProvider.propTypes = {
  children: PropTypes.any
}

export default memo(LoadingContextProvider)