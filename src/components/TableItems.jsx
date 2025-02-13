import React, { useContext, useState } from "react";
import { TempoContext } from "../context/Context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const TableItems = ({ data }) => {
  const { deleteTempo, handleEdit } = useContext(TempoContext);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    id: data.id,
    date: data.date,
    task: data.task,
    est: data.est,
    act: data.act,
    status: data.status,
  });

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: data.id,
      date: data.date,
      task: data.task,
      est: data.est,
      act: data.act,
      status: data.status,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      handleEdit(formData);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tempo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/* Date Input */}
              <Form.Group as={Col} md="4">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  required
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Date is required
                </Form.Control.Feedback>
              </Form.Group>

              {/* Task Input */}
              <Form.Group as={Col} md="4">
                <Form.Label>Task Details</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="E.g. Bug fixes"
                  name="task"
                  value={formData.task}
                  onChange={onChange}
                  maxLength={40}
                />
                <Form.Text>
                  {40 - formData.task.length} characters left
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Task cannot be empty (Max 40 chars)
                </Form.Control.Feedback>
              </Form.Group>

              {/* Estimated Hours */}
              <Form.Group as={Col} md="4">
                <Form.Label>Estimated Hours</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="E.g. 3"
                    name="est"
                    value={formData.est}
                    min="1"
                    max="24"
                    step="0.1"
                    required
                    onChange={onChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid number (0-24)
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/* Actual Hours */}
              <Form.Group as={Col} md="6">
                <Form.Label>Actual Hours</Form.Label>
                <Form.Control
                  type="number"
                  name="act"
                  value={formData.act}
                  placeholder="E.g. 4"
                  min="1"
                  max="24"
                  step="0.1"
                  required
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid number (0-24)
                </Form.Control.Feedback>
              </Form.Group>

              {/* Status Dropdown */}
              <Form.Group as={Col} md="6">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  required
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

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <tr className="table-row text-center">
        <td data-label="Date">{data.date}</td>
        <td data-label="📁">{data.task}</td>
        <td data-label="Estimated Hours">{data.est}</td>
        <td data-label="Actual hours">{data.act}</td>
        <td data-label="Status">{data.status}</td>
        <td className="action-buttons">
          <Button
            variant="danger"
            size="sm"
            className="mt-1"
            onClick={() => deleteTempo(data.id)}
          >
            Delete🗑️
          </Button>
          <Button
            variant="warning"
            size="sm"
            className="ms-2 mt-1"
            onClick={handleShow}
          >
            Edit✏️
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TableItems;
