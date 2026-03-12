import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/notfound";
import ToDoList from "./components/todo/ToDoList";
import CompletedTasks from "./components/CompletedTasks";
import Layout from "./components/Layout";
import "./App.css"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Tempo" element={<Home />} />
          <Route path="/Tempo/DailyTasks" element={<ToDoList/>}/>
          <Route path="/Tempo/Completed" element={<CompletedTasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
