import React, { useEffect, useState } from "react";
import olxbanner from "../../assets/olxbanner.jpeg";
import bulb from "../../assets/bulb.jpg";
import { Container, Card, Col, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./UserListed.css";

function UserListed() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/item/getallitems`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
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
  return (
    <div>
      <div className="d-flex align-items-center justify-content-start m-5 list-items-header">
        <h3>
          Items Listed by <span>YOU</span>....
        </h3>
      </div>
      <div className="d-flex align-items-center justify-content-start m-5 flex-wrap">
        {items.map((item) => {
          return (
            <>
              {item.userId == user._id && (
                <div className="m-2 w-auto card">
                  <Col md="4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={item.imageurl}
                        className="card-img"
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.descriptiom}</Card.Text>
                        {item.isSold ? (
                          <Card.Text
                            style={{ color: "green" }}
                            variant="primary"
                          >
                            Sold
                          </Card.Text>
                        ) : (
                          <Card.Text style={{ color: "red" }} variant="primary">
                            Not Sold
                          </Card.Text>
                        )}
                        <Button variant="primary">{item.price}/-</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default UserListed;
