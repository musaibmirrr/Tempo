import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useState, useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { TempoContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

export default function AddTempo({}) {
  const { handleSubmit } = useContext(TempoContext);
  const formRef = useRef();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [formData, setFormData] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    task: "",
    est: "",
    act: "",
    status: "In Progress 🔄",
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      date: new Date().toISOString().split("T")[0],
      task: "",
      est: "",
      act: "",
      status: "In Progress 🔄",
    });
  };

  const saveTempo = () => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      handleSubmit({ ...formData, id: uuidv4() });
      resetForm();
      setValidated(false);
      setShow(false);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between px-4 mt-4 mb-2">
        {/* Add Tempo Button */}
        <Button variant="dark" className="shadow-sm" onClick={() => setShow(true)}>
          Add a Tempo ➕
        </Button>
        <Button variant="outline-dark" disabled className="fw-bold border-2">{time} 🕒</Button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Add New Tempo Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form ref={formRef} noValidate validated={validated}>
            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-semibold">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  required
                  onChange={onChange}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  Date is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  required
                  className="shadow-sm"
                >
                  <option>In Progress 🔄</option>
                  <option>Completed ✅</option>
                  <option>Top Priority 🟩</option>
                  <option>Medium Priority 🟨</option>
                  <option>Low Priority 🟥</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Status is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Task Details</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="E.g. Database optimization, Frontend refactor..."
                name="task"
                value={formData.task}
                onChange={onChange}
                maxLength={40}
                className="shadow-sm"
              />
              <Form.Text className="text-muted d-block text-end mt-1">
                {40 - formData.task.length} characters left
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Task cannot be empty (Max 40 chars)
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label className="fw-semibold">Estimated Hours</Form.Label>
                <InputGroup className="shadow-sm">
                  <Form.Control
                    type="number"
                    placeholder="E.g. 3"
                    name="est"
                    value={formData.est}
                    min="0"
                    max="24"
                    step="0.1"
                    required
                    onChange={onChange}
                  />
                  <InputGroup.Text>h</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Enter a valid number (0-24)
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label className="fw-semibold">Actual Hours</Form.Label>
                <InputGroup className="shadow-sm">
                  <Form.Control
                    type="number"
                    name="act"
                    value={formData.act}
                    placeholder="E.g. 4"
                    min="0"
                    max="24"
                    step="0.1"
                    required
                    onChange={onChange}
                  />
                  <InputGroup.Text>h</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Enter a valid number (0-24)
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={saveTempo} className="px-4 shadow-sm">
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
