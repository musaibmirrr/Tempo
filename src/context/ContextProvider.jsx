import { useState, useEffect } from "react";
import { TempoContext } from "./Context";
import { v4 as uuidv4 } from "uuid";

const TempoProvider = ({ children }) => {
  const [tempo, setTempo] = useState(() => {
    const savedTempo = localStorage.getItem("tempos");
    return savedTempo ? JSON.parse(savedTempo) : [];
  });

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("tempos", JSON.stringify(tempo));
  }, [tempo]);

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
      console.log(data);
      return prev.map((t) => {
        if (t.id === data.id) {
          return {
            id: data.id,
            date: data.date,
            task: data.task,
            est: data.est,
            act: data.act,
            status: data.status,
          };
        } else {
          return t;
        }
      });
    });
  };

  return (
    <TempoContext.Provider
      value={{
        tempo,
        handleSubmit,
        deleteTempo,
        handleEdit,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </TempoContext.Provider>
  );
};

export { TempoProvider };
