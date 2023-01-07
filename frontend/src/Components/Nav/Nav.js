import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./Nav.css";
import Navbar from "react-bootstrap/Navbar";
import olxlogo from "../../assets/olx-logo.png";

function ColorSchemesExample() {
  const handlelogout = () => {
    try {
      localStorage.removeItem("olx-token");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/home">
            <div className="olx-logo-nav">
              <img src={olxlogo} />
            </div>
          </Navbar.Brand>
        </Container>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/home" className="nav-link">
              HOME
            </Nav.Link>
            <Nav.Link href="/profile" className="nav-link">
              PROFILE
            </Nav.Link>
            <Nav.Link href="/additem" className="nav-link">
              ADD ITEM
            </Nav.Link>
            <Nav.Link
              href="/login"
              onClick={() => {
                handlelogout();
              }}
            >
              LOGOUT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
