import { useEffect, useState, useRef } from "react";

export default function Counter({ todos, reset }) {
  let count = useRef(0);
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

    // for testing...
    // const today = "Thu Feb 7 2025";

    // prompt after day logic
    if (!lastSavedDate) {
      // setDay(1);
      localStorage.setItem("lastDate", today);
    }else{
    if (lastSavedDate !== today) {
      let userInput = confirm(
        "Day is over, do you wanna reset all task or continue?"
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
  }, []);

  return (
    <>
      <header className="d-flex justify-content-between mx-4 my-4 ">
        <span>{time} 🕒</span>
        <span>My Daily Tasks</span>
        <p>
          <span style={{ color: completedCount < todos.length ? "red" : "green" }}>
            {completedCount}
          </span>
          /<span style={{ color: "green" }}>{todos.length}</span> Completed
        </p>
      </header>
    </>
  );
}
