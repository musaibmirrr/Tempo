import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, AlertCircle } from "lucide-react";

export default function ToDoForm({ todos, setTodo }) {
  const [value, setValue] = useState("");
  const [isValid, validate] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length > 0) validate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length) {
      setTodo([...todos, { body: value.trim(), id: uuidv4(), isCompleted: false }]);
      validate(false);
      setValue("");
    } else {
      validate(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative group">
        <input
          type="text"
          className={`w-full pl-4 pr-24 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
            isValid
              ? "border-red-300 bg-red-50 focus:ring-red-200"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-primary/20 focus:border-primary"
          }`}
          placeholder="What needs to be done today?"
          onChange={handleChange}
          maxLength={40}
          value={value}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className={`text-[10px] font-bold ${value.length >= 35 ? "text-red-500" : "text-slate-400"}`}>
            {value.length}/40
          </span>
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 hover:scale-105 transition-transform shadow-sm"
          >
            <PlusCircle size={20} />
          </button>
        </div>
      </div>

      {isValid && (
        <div className="flex items-center gap-1.5 px-2 text-red-500 text-xs font-medium animate-in slide-in-from-top-1">
          <AlertCircle size={14} />
          <span>Task cannot be empty</span>
        </div>
      )}
    </form>
  );
}
