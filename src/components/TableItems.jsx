import React, { useContext, useState } from "react";
import { TempoContext } from "../context/Context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

const TableItems = ({ data, isRow = false }) => {
  const { deleteTempo, handleEdit, archiveTask } = useContext(TempoContext);
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

  const statusVariant = {
    "Completed ✅": "success",
    "In Progress 🔄": "primary",
    "Top Priority 🟩": "success",
    "Medium Priority 🟨": "warning",
    "Low Priority 🟥": "danger",
  };

  const content = (
    <>
      <td data-label="Date" className="align-middle text-muted small">{data.date}</td>
      <td data-label="Task Details" className="align-middle fw-medium text-start ps-4">{data.task}</td>
      <td data-label="Estimated Hours" className="align-middle">{data.est}h</td>
      <td data-label="Actual hours" className="align-middle">{data.act}h</td>
      <td data-label="Status" className="align-middle">
        <Badge pill bg={statusVariant[data.status] || "secondary"} className="px-3 py-2">
            {data.status}
        </Badge>
      </td>
      <td className="action-buttons align-middle">
        <div className="d-flex justify-content-center gap-2">
            <Button
                variant="outline-warning"
                size="sm"
                onClick={handleShow}
                title="Edit"
            >
                ✏️
            </Button>
            <Button
                variant="outline-success"
                size="sm"
                onClick={() => archiveTask(data.id)}
                title="Archive"
            >
                📥
            </Button>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteTempo(data.id)}
                title="Delete"
            >
                🗑️
            </Button>
        </div>
      </td>
    </>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Edit Tempo Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                placeholder="E.g. Task details..."
                name="task"
                value={formData.task}
                onChange={onChange}
                maxLength={40}
                className="shadow-sm"
              />
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
                </InputGroup>
              </Form.Group>
            </Row>

            <Modal.Footer className="px-0 pb-0 mt-4 border-0">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="dark" className="px-4 shadow-sm">
                Update Task
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {isRow ? content : (
          <tr className="table-row text-center">
              {content}
          </tr>
      )}
    </>
  );
};

export default TableItems;
