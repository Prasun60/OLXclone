import React, { useEffect, useState } from "react";
import olxbanner from "../../assets/banner.png";
import bulb from "../../assets/bulb.jpg";
import { Container, Card, Col, Button } from "react-bootstrap";
import "./Homepage.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Homepage() {
  // const cookies = new Cookies();
  // const ourval = cookies.get("token");
  // const token = jwt_decode(ourval);

  const navigate = useNavigate();
  //fetch all items
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

  const handleBuy = async (item) => {
    try {
      //purchase item
      const res = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/item/purchaseitem/${item._id}`,
        data: {
          buyerId: user._id,
          isSold: true,
        },
      });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Item Purchased",
          text: "Item Purchased Successfully",
        });
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="home">
      <div>
        <img className="banner-img" src={olxbanner} />
      </div>
      <div className="d-flex align-items-start justify-content-start m-5 flex-wrap sale-header">
        Items for&nbsp;<span>SALE</span>!
      </div>
      <div className="d-flex align-items-start justify-content-start m-5 flex-wrap">
        {items.map((item, index) => {
          return (
            <>
              {!item.isSold && (
                <div className="m-2 w-auto card" key={index}>
                  <Col md="4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={item.imageurl}
                        className="card-img"
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Button variant="secondary">{item.price}/-</Button>
                        <Button
                          variant="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            handleBuy(item);
                          }}
                        >
                          BUY
                        </Button>
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

export default Homepage;
