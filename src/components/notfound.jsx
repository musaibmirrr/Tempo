import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Fix: useNavigate instead of useNavigation

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="container"
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button variant="danger" onClick={handleShow}>
          Error - click me
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Could not process your request, 404!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/Tempo");
            }}
          >
            Go Home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotFound;
