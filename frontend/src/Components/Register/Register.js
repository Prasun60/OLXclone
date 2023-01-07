import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";
import swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import olxlogo from "../../assets/olx-logo.png";
import landingLogo from "../../assets/landing-logo.png";
import ReactLoading from "react-loading";
import Spinner from "react-bootstrap/Spinner";

function Register() {
  const validatePassword = (str) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    return re.test(str);
  };

  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [repassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(username, name, password);
    const credentials = {
      username,
      name,
      password,
    };
    if (!username || !name || !password) {
      setLoading(false);
      swal.fire({
        icon: "error",
        title: "Empty Field(s).",
        text: "Please fill all fields!",
      });
    } else if (!validatePassword(password)) {
      setLoading(false);
      swal.fire({
        icon: "error",
        title: "Invalid Password...",
        text: "Password should be longer than 4 characters and must contain atleast 1 Uppercase,1 Lowercase, 1 Number and 1 special character",
      });
    } else if (password !== repassword) {
      setLoading(false);
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password do not match!",
      });
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
          credentials
        );
        if (res.status == 200) {
          window.localStorage.setItem("olx-token", res.data.token);
          navigate("/home");
          swal.fire({
            position: "top-end",
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      }
    }
  };
  return (
    <div className="login-parent">
      <div className="spinner">
        {loading ? <Spinner animation="border" role="status" /> : <></>}
      </div>
      <div className="olx-logo">
        <img src={olxlogo} />
      </div>
      <div className="landing-logo">
        <img src={landingLogo} />
      </div>
      <div>
        <h2 className="login-header">
          <span className="header-underline">Register</span>
        </h2>
        <Form className="login-form">
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={(e) => setUsername(e.target.value)}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={(e) => setName(e.target.value)}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={(e) => setPassword(e.target.value)}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={(e) => setRePassword(e.target.value)}
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Renter Password" />
          </Form.Group>
          <Link to="/login">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text className="text-muted">
                Already have an account?
              </Form.Text>
            </Form.Group>
          </Link>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Register;
