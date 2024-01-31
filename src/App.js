import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import "./index.css";
import Header from "./component/Header";
import TableUsers from "./component/TableUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/useContext";
function App() {
  const { user, login } = useContext(UserContext);
  console.log("check user", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  },[]);
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<TableUsers />} />
        </Routes>
        <ToastContainer />
      </Container>
    </Router>
  );
}

export default App;
