import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/notfound";
import ToDoList from "./components/todo/ToDoList";
import "./app.css"
function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/Tempo" element={<Home />} />
          <Route path="/Tempo/DailyTasks" element={<ToDoList/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
