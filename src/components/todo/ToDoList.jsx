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
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Daily Tasks</h1>
        <p className="text-slate-500 dark:text-slate-400">Keep track of your quick daily todos.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <Counter todos={todos} reset={setTodo} />
        <ToDoForm todos={todos} setTodo={setTodo} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todoList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {todos.map((t, index) => (
                  <Draggable
                    key={t.id}
                    draggableId={t.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`transition-all ${snapshot.isDragging ? "scale-105 z-50" : ""}`}
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

                {todos.length === 0 && (
                  <div className="text-center py-12 text-slate-400 italic">
                    No daily tasks yet. Add one above!
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
