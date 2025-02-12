
import { useContext, useState, useMemo } from "react";
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

  // Status options with sorting priority
  const statusPriority = {
    "Top Priority 🟩": 1,
    "Medium Priority 🟨": 2,
    "Low Priority 🟥": 3,
    "In Progress 🔄": 4,
    "Completed ✅": 5,
  };

  // Sorting & filtering tasks
  const filteredTempo = useMemo(() => {
    return tempo
      .filter(
        (t) =>
          (selectedStatus === "All" || t.status === selectedStatus) &&
          t.task.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (statusPriority[a.status] || 6) - (statusPriority[b.status] || 6));
  }, [tempo, selectedStatus, searchTerm]);

  return (
    <div className="table-container p-3">
  {/* Search, Filter, Reset Layout */}
  <div className="row mb-3">
    {/* Search Bar (Full Width) */}
    <div className="col-12 mb-2">
      <Form.Control
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    </div>

    {/* Filter Dropdown (6-column width) */}
    <div className="col-6 text-center mb-2">
      <Dropdown className="w-100">
        <Dropdown.Toggle variant="secondary" className="w-100">
          {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          {["All", ...Object.keys(statusPriority)].map((status, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedStatus(status)}>
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>

    {/* Reset Button (6-column width) */}
    <div className="col-6 text-center mb-2">
      <Button variant="secondary" className="w-100" onClick={() => setSelectedStatus("All")}>
        Reset
      </Button>
    </div>
  </div>

  {/* Table */}
  <Table striped bordered hover className="custom-table">
  <thead>
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
        <td colSpan="6" className="text-center no-tasks p-4">No tasks found</td>
      </tr>
    )}
  </tbody>
</Table>

</div>

  );
}
