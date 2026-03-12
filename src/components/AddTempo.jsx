import { useContext, useState, useRef, useEffect } from "react";
import { TempoContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";
import { Plus, X } from "lucide-react";

export default function AddTempo() {
  const { handleSubmit } = useContext(TempoContext);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    task: "",
    est: "",
    act: "",
    status: "In Progress 🔄",
  });

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      task: "",
      est: "",
      act: "",
      status: "In Progress 🔄",
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    if (formData.task && formData.date && formData.est && formData.act) {
      handleSubmit({ ...formData, id: uuidv4() });
      handleClose();
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
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
      >
        <Plus size={18} />
        <span>Add Task</span>
      </button>

      <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        {time}
      </div>

      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button onClick={handleClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={onSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option>In Progress 🔄</option>
                    <option>Completed ✅</option>
                    <option>Top Priority 🟩</option>
                    <option>Medium Priority 🟨</option>
                    <option>Low Priority 🟥</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-sm font-medium">Task Details</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., UI Refactor"
                  name="task"
                  value={formData.task}
                  onChange={onChange}
                  maxLength={40}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="text-[10px] text-right text-slate-500 uppercase font-semibold">
                  {40 - formData.task.length} characters left
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium">Estimated Hours</label>
                  <input
                    type="number"
                    placeholder="0"
                    name="est"
                    value={formData.est}
                    min="0"
                    max="24"
                    step="0.1"
                    required
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium">Actual Hours</label>
                  <input
                    type="number"
                    name="act"
                    value={formData.act}
                    placeholder="0"
                    min="0"
                    max="24"
                    step="0.1"
                    required
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
