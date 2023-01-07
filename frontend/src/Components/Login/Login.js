import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "./Login.css";
import olxlogo from "../../assets/olx-logo.png";
import landingLogo from "../../assets/landing-logo.png";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(username, password);
    const credentials = {
      username,
      password,
    };
    if (!username || !password) {
      setLoading(false);
      swal.fire({
        icon: "error",
        title: "Empty Field(s).",
        text: "Please fill all fields!",
      });
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        credentials
      );
      if (res.status === 200) {
        window.localStorage.setItem("olx-token", res.data.token);
        navigate("/home");
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
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
        {/* <div className="olx-main">OLX</div>
        <span>India ki apni dukaan</span> */}
        <img src={landingLogo} />
      </div>
      <div>
        <h2 className="login-header">
          <span className="header-underline">Login</span>
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
            controlId="formBasicPassword"
            onChange={(e) => setPassword(e.target.value)}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Link to="/register">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text className="text-muted">
                Don't have an account?
              </Form.Text>
            </Form.Group>
          </Link>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
