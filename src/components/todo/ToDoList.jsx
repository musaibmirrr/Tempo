import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import Counter from "./Counter";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// initial render fetch from Local Storage
const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  return data || [];
};

export default function ToDoList() {
  const [todos, setTodo] = useState(getInitialData);

  // Show todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // removing todos
  const removeTodo = (id) => {
    setTodo((prev) => prev.filter((t) => t.id !== id));
  };

  // toggling complete/uncomplete
  const completeTodo = (id) => {
    setTodo((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleDragEnd = (result) => {
    // Ignore if dropped outside
    if (!result.destination) return;
    const newTodos = Array.from(todos);
    const [movedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, movedItem);
    setTodo(newTodos);
  };

  return (
    <>
      <Counter todos={todos} reset={setTodo} />
      <ToDoForm todos={todos} setTodo={setTodo} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((t, index) => (
                <Draggable
                  key={t.id}
                  draggableId={t.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ToDoItem
                        list={t}
                        removeTodo={() => removeTodo(t.id)}
                        completeTodo={() => completeTodo(t.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
