import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-dark shadow-sm">
      <Container>
        <Navbar.Brand className="text-light fw-bold">Tempo 📊</Navbar.Brand>
        <div className="d-flex gap-4">
          <NavLink
            className="text-light px-2"
            style={({ isActive }) => ({
                textDecoration: "none",
                borderBottom: isActive ? "2px solid white" : "none"
            })}
            to={"/Tempo"}
          >
            &gt; Home
          </NavLink>
          <NavLink
            className="text-light px-2"
            style={({ isActive }) => ({
                textDecoration: "none",
                borderBottom: isActive ? "2px solid white" : "none"
            })}
            to={"/Tempo/DailyTasks"}
          >
            &gt; Daily
          </NavLink>
          <NavLink
            className="text-light px-2"
            style={({ isActive }) => ({
                textDecoration: "none",
                borderBottom: isActive ? "2px solid white" : "none"
            })}
            to={"/Tempo/Completed"}
          >
            &gt; Completed
          </NavLink>
        </div>
        <Nav className="ms-auto ">
          <span className="text-light badge bg-secondary">{new Date().toDateString()}</span>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
