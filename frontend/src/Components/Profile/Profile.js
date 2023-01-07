import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import avatar from "../../assets/avatar.png";

function Profile() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("olx-token");
    const values = jwt_decode(token);
    async function getUser() {
      const userData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/getuser/${values.id}`
      );
      setUser(userData.data);
    }
    getUser();
  }, []);
  console.log(user);
  return (
    <div>
      <div className="profile  mt-2">
        <div className="profile__info d-flex flex-column align-items-center justify-content-center">
          <div>
            <img src={avatar} className="avatar" alt="profile" />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>{user.name}</h3>
            <h5>{user.username}</h5>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Profile;
