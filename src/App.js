import "./App.css";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import UsersList from "./Components/UsersList";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Header />} />
          <Route path="login" exact element={<Login />} />
          <Route path="register" exact element={<Register />} />
          <Route path="users" exact element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
