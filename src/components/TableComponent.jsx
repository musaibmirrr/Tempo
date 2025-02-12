import { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TempoContext } from "../context/Context";
import TableItems from "./TableItems";
import "./TableComponent.css"; // Import external styles

export default function TableComponent() {
  const { tempo } = useContext(TempoContext);

  // State for filtering & searching
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Status options
  const statusOptions = [
    "All",
    "Top Priority 🟩",
    "Medium Priority 🟨",
    "Low Priority 🟥",
    "In Progress 🔄",
    "Completed ✅",
  ];

  // Filter & sort tasks
  const filteredTempo = tempo.filter(
    (t) =>
      (selectedStatus === "All" || t.status === selectedStatus) &&
      t.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container p-3">
      {/* Search, Filter, Reset Layout */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        {/* Search Bar (Left) */}
        <div className="flex-grow-1">
          <Form.Control
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Filter Dropdown (Center) */}
        <div className="text-center flex-grow-1">
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {statusOptions.map((status, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Reset Button (Right) */}
        <div className="text-end flex-grow-1">
          <Button
            variant="outline-dark"
            onClick={() => setSelectedStatus("All")}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover className="custom-table">
        <thead className="bg-primary text-white">
          <tr className="text-center">
            <th>DATE</th>
            <th>TASK DETAILS</th>
            <th>EST HOURS</th>
            <th>ACT HOURS</th>
            <th>STATUS</th>
            <th className="text-center">⚙️</th>
          </tr>
        </thead>
        <tbody>
          {filteredTempo.length > 0 ? (
            filteredTempo.map((t) => <TableItems key={t.id} data={t} />)
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted p-4">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
