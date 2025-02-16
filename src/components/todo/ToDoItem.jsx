export default function ToDoItem({ list, removeTodo, completeTodo }) {
  const CopyText = () => {
    navigator.clipboard.writeText(list.body);
  };
  return (
    <>
      <section className="d-flex mx-4 ">
        <div style={{marginTop  : '6px'}}>
          <input
            type="checkbox"
            id="checkbox"
            style={{ cursor: "pointer" }}
            checked={list.isCompleted}
            onChange={completeTodo}
          />
        </div>

        <ul style={{ listStyle: "none", fontSize: 20, cursor: "pointer" ,paddingLeft : '14px'}}>
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
          ©️
        </button>
      </section>
    </>
  );
}
