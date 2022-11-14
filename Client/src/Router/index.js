import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ThemeContextProvider from '../Context/useContext'
import { routes } from './routes'
// import io from 'socket.io-client'
// const CONNECTION_PORT = 'localhost:3002/'
// let socket: any
function AppRouter() {
    const showContentMenus = () => {
        let result = routes?.map((route, index) => {
            return (
                <Route key={index} path={route?.path} element={route.main} /> 
            )
        })
        return <>{result}</>
    }
    return (
        <ThemeContextProvider>
            <Router>
                <Routes>{showContentMenus()}</Routes>
            </Router>
        </ThemeContextProvider>
    )
}


export default AppRouter
