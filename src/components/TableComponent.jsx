import { useContext, useState, useMemo, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TempoContext } from "../context/Context";
import TableItems from "./TableItems";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TableComponent.css"; // Import external styles

export default function TableComponent() {
  const { tempo, reorderTempo } = useContext(TempoContext);

  // State for filtering & searching
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // State for back-to-top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Status options with sorting priority
  const statusPriority = {
    "Top Priority 🟩": 1,
    "Medium Priority 🟨": 2,
    "Low Priority 🟥": 3,
    "In Progress 🔄": 4,
    "Completed ✅": 5,
  };

  const isFiltered = selectedStatus !== "All" || searchTerm !== "";

  // Sorting & filtering tasks
  const filteredTempo = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    let result = [...tempo];

    if (selectedStatus === "Today") {
      result = result.filter((t) => t.date === today);
    } else if (selectedStatus !== "All") {
      result = result.filter((t) => t.status === selectedStatus);
    }

    if (searchTerm) {
      result = result.filter((t) =>
        t.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Only auto-sort if NOT filtered (otherwise DND would be confusing)
    if (!isFiltered) {
        // We keep the order from the context if not filtered
        return result;
    } else {
        return result.sort((a, b) => (statusPriority[a.status] || 7) - (statusPriority[b.status] || 7));
    }
  }, [tempo, selectedStatus, searchTerm, isFiltered]);


  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTempo = Array.from(tempo);
    const [movedItem] = newTempo.splice(result.source.index, 1);
    newTempo.splice(result.destination.index, 0, movedItem);
    reorderTempo(newTempo);
  };

  return (
    <div className="table-container p-3">
      {/* Search, Filter, Reset Layout */}
      <div className="row mb-3">
        <div className="col-12 mb-2">
          <Form.Control
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="col-6 text-center mb-2">
          <Dropdown className="w-100">
            <Dropdown.Toggle variant="secondary" className="w-100">
              {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {["All", "Today",...Object.keys(statusPriority)].map((status, index) => (
                <Dropdown.Item key={index} onClick={() => setSelectedStatus(status)}>
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-6 text-center mb-2">
          <Button variant="secondary" className="w-100" onClick={() => {
              setSelectedStatus("All");
              setSearchTerm("");
          }}>
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table striped bordered hover className="custom-table">
            <thead>
            <tr className="text-center">
                {!isFiltered && <th></th>}
                <th>DATE</th>
                <th>TASK DETAILS</th>
                <th>EST HOURS</th>
                <th>ACT HOURS</th>
                <th>STATUS</th>
                <th className="text-center">⚙️</th>
            </tr>
            </thead>
            <Droppable droppableId="tempoTable">
            {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTempo.length > 0 ? (
                    filteredTempo.map((t, index) => (
                        <Draggable key={t.id} draggableId={t.id} index={index} isDragDisabled={isFiltered}>
                            {(provided) => (
                                <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="text-center"
                                >
                                    {!isFiltered && (
                                        <td {...provided.dragHandleProps} style={{ cursor: 'grab' }}>
                                            ☰
                                        </td>
                                    )}
                                    <TableItems data={t} isRow={true} />
                                </tr>
                            )}
                        </Draggable>
                    ))
                ) : (
                    <tr>
                    <td colSpan={isFiltered ? "6" : "7"} className="text-center no-tasks p-4">No tasks found</td>
                    </tr>
                )}
                {provided.placeholder}
                </tbody>
            )}
            </Droppable>
        </Table>
      </DragDropContext>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button className="back-to-top" onClick={scrollToTop}>
          ⬆ Back to Top
        </Button>
      )}
    </div>
  );
}
