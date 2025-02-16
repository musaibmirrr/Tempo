import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand className="text-light">Tempo 📊</Navbar.Brand>
        <div className="d-flex gap-4">
          <NavLink
            className="text-light"
            style={{ textDecoration: "none" }}
            to={"/Tempo"}
          >
            &gt; Home
          </NavLink>
          <NavLink
            className="text-light"
            style={{ textDecoration: "none" }}
            to={"/Tempo/DailyTasks"}
          >
            &gt; Daily
          </NavLink>
        </div>
        <Nav className="ms-auto ">
          <span className="text-light">{new Date().toDateString()}</span>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
