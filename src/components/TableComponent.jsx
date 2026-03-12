import { useContext, useState, useMemo, useEffect } from "react";
import { TempoContext } from "../context/Context";
import TableItems from "./TableItems";
import { Search, Filter, RotateCcw, ArrowUp, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

  // Filtering tasks
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

    return result;
  }, [tempo, selectedStatus, searchTerm]);


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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tempo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderTempo(items);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden text-left">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="Today">Today</option>
              {Object.keys(statusPriority).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedStatus("All");
              setSearchTerm("");
            }}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            title="Reset Filters"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                {!isFiltered && <th className="w-10 px-6 py-4"></th>}
                <th className="px-6 py-4 font-semibold text-left">Date</th>
                <th className="px-6 py-4 font-semibold text-left">Task Details</th>
                <th className="px-6 py-4 font-semibold text-left">Est. Hours</th>
                <th className="px-6 py-4 font-semibold text-left">Act. Hours</th>
                <th className="px-6 py-4 font-semibold text-left">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <Droppable droppableId="tempo-table">
              {(provided) => (
                <tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-slate-200 dark:divide-slate-800"
                >
                  {filteredTempo && filteredTempo.length > 0 ? (
                    filteredTempo.map((t, index) => (
                      <Draggable
                        key={t.id}
                        draggableId={t.id}
                        index={index}
                        isDragDisabled={isFiltered}
                      >
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group transition-colors ${
                              snapshot.isDragging
                                ? "bg-slate-100 dark:bg-slate-800 shadow-md"
                                : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                            }`}
                          >
                            {!isFiltered && (
                              <td className="px-6 py-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
                                >
                                  <GripVertical size={18} />
                                </div>
                              </td>
                            )}
                            <TableItems data={t} />
                          </tr>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isFiltered ? "6" : "7"} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic">
                        No tasks found matching your criteria.
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all animate-in fade-in slide-in-from-bottom-4"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
