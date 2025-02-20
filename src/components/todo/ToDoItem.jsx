import { useState, useEffect } from "react";

export default function ToDoItem({ list, removeTodo, completeTodo }) {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Handle scroll position and toggle button visibility
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTopButton(true); // Show button after scrolling 300px
    } else {
      setShowScrollTopButton(false); // Hide button when at the top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CopyText = () => {
    navigator.clipboard.writeText(list.body);
  };

  return (
    <>
      <section className="d-flex mx-4">
        <div style={{ marginTop: "6px" }}>
          <input
            type="checkbox"
            id="checkbox"
            style={{ cursor: "pointer" }}
            checked={list.isCompleted}
            onChange={completeTodo}
          />
        </div>

        <ul
          style={{
            listStyle: "none",
            fontSize: 20,
            cursor: "pointer",
            paddingLeft: "14px",
            display : "flex",
            justifyContent : 'space-between',
            width : '100%'
          }}
        >
          <li
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            onClick={completeTodo}
            style={{
              textDecoration: list.isCompleted ? "line-through" : "none",
            }}
          >
            {list.body}
          </li>
        </ul>

        <button
          className="btn btn-dark btn-sm"
          style={{ width: "40px", height: "30px", marginLeft: "10px" }}
          onClick={removeTodo}
        >
          ⛌
        </button>

        <button
          className="btn btn-dark btn-sm"
          style={{ width: "40px", height: "30px", marginLeft: "10px" }}
          onClick={CopyText}
        >
          💾
        </button>
      </section>

      {/* Back to Top button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary position-fixed"
          style={{
            bottom: "60px",
            right: "20px",
          }}
        >
          Back to Top
        </button>
      )}
    </>
  );
}
