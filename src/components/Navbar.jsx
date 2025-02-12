import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand className="text-light">Tempo 📊</Navbar.Brand>
        <Nav className="ms-auto">
          <span className="text-light">
            {new Date().toDateString()}
          </span>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
