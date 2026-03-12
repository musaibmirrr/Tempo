import { useState, useEffect } from "react";
import { TempoContext } from "./Context";
import { v4 as uuidv4 } from "uuid";

const TempoProvider = ({ children }) => {
  const [tempo, setTempo] = useState(() => {
    const savedTempo = localStorage.getItem("tempos");
    return savedTempo ? JSON.parse(savedTempo) : [];
  });

  const [archivedTempo, setArchivedTempo] = useState(() => {
    const savedArchived = localStorage.getItem("archivedTempos");
    return savedArchived ? JSON.parse(savedArchived) : [];
  });

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("tempos", JSON.stringify(tempo));
  }, [tempo]);

  useEffect(() => {
    localStorage.setItem("archivedTempos", JSON.stringify(archivedTempo));
  }, [archivedTempo]);

  const handleSubmit = (data) => {
    setTempo((prev) => {
      const updateTempo = [...prev, { ...data, id: uuidv4() }];
      return updateTempo;
    });
  };

  const deleteTempo = (id) => {
    setTempo((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (data) => {
    setTempo((prev) => {
      return prev.map((t) => {
        if (t.id === data.id) {
          return {
            ...t,
            ...data
          };
        } else {
          return t;
        }
      });
    });
  };

  const reorderTempo = (newOrder) => {
    setTempo(newOrder);
  };

  const archiveTask = (id) => {
    const taskToArchive = tempo.find((t) => t.id === id);
    if (taskToArchive) {
      setArchivedTempo((prev) => [...prev, { ...taskToArchive, archivedAt: new Date().toISOString() }]);
      setTempo((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const restoreTask = (id) => {
    const taskToRestore = archivedTempo.find((t) => t.id === id);
    if (taskToRestore) {
      const { archivedAt, ...rest } = taskToRestore;
      setTempo((prev) => [...prev, rest]);
      setArchivedTempo((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const deleteArchivedTask = (id) => {
    setArchivedTempo((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TempoContext.Provider
      value={{
        tempo,
        archivedTempo,
        handleSubmit,
        deleteTempo,
        handleEdit,
        reorderTempo,
        archiveTask,
        restoreTask,
        deleteArchivedTask,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </TempoContext.Provider>
  );
};

export { TempoProvider };
