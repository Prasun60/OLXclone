import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListItem.css";
import jwt_decode from "jwt-decode";
import Spinner from "react-bootstrap/Spinner";

function Register() {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let [price, setPrice] = useState(0);
  let [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
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

  const submitItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name || !desc || !price || !img) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Empty Field(s).",
          text: "Please fill all fields!",
        });
      } else {
        const form = new FormData();
        form.append("name", name);
        form.append("description", desc);
        form.append("price", price);
        form.append("image", img);
        form.append("userId", user._id);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/item/addItem`,
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": true,
            },
            body: form,
          }
        );
        if (res.status === 200) {
          navigate("/home");
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Make sure there are no commas in price , Only numbers",
          });
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="list-parent">
      <div className="spinner">
        {loading ? <Spinner animation="border" role="status" /> : <></>}
      </div>
      <Form className="list-form">
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setName(e.target.value)}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name of the item" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setDesc(e.target.value)}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Enter item description" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={(e) => setPrice(e.target.value)}
        >
          <Form.Label>Price in Rupees</Form.Label>
          <Form.Control placeholder="Enter Item Price" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          name="image"
          onChange={(e) => setImg(e.target.files[0])}
        >
          <Form.Label>Upload Picture</Form.Label>
          <Form.Control type="file" placeholder="Upload Picture" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitItem}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
