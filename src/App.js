import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./component/Header";
import TableUsers from "./component/TableUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUsers />
      </Container>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
