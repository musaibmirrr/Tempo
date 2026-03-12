import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";

export default function Counter({ todos, reset }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Directly compute the number of completed todos
  const completedCount = todos.filter((t) => t.isCompleted).length;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const lastSavedDate = localStorage.getItem("lastDate");
    const today = new Date().toDateString();

    if (!lastSavedDate) {
      localStorage.setItem("lastDate", today);
    } else {
      if (lastSavedDate !== today) {
        let userInput = confirm(
          "Day is over, do you wanna reset all tasks or continue?"
        );

        if (userInput) {
          reset(
            todos.map((t) => {
              return { ...t, isCompleted: false };
            })
          );
        }
        localStorage.setItem("lastDate", today);
      }
    }
  }, [reset, todos]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
        <Clock size={18} className="text-primary" />
        <span>{time}</span>
      </div>

      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        My Daily Progress
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
          <CheckCircle2 size={14} className={completedCount === todos.length && todos.length > 0 ? "text-green-500" : "text-slate-400"} />
          <span className="text-sm font-bold">
            <span className={completedCount < todos.length ? "text-red-500" : "text-green-500"}>
              {completedCount}
            </span>
            <span className="text-slate-400 mx-0.5">/</span>
            <span className="text-green-600">{todos.length}</span>
          </span>
          <span className="text-[10px] text-slate-400 ml-1 font-medium">DONE</span>
        </div>
      </div>
    </div>
  );
}
