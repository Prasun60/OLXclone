import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login.js";
import Register from "./Components/Register/Register";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/Profile/Profile";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import ListItem from "./Components/ListItem/ListItem";
import UserListed from "./Components/UserListed.js/UserListed";
import Bought from "./Components/Bought.js/Bought";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <>
                <Nav />
                <Homepage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Nav />
                <Profile />
                <UserListed />
                <Bought />
              </>
            }
          />
          <Route
            path="/addItem"
            element={
              <>
                <Nav />
                <ListItem />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
