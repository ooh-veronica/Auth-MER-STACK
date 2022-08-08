import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import regImg from '../Images/Learning languages-bro 1.png'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      navigate("../login", { replace: true });
    }
  };

  return (
    <div className="register_container">
      <div>
          <img className="register_image" src={regImg} />
      </div>
      <form className="register_form" onSubmit={registerUser}>
        <h2>You need to register!</h2>
        <input
          className="register_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          className="register_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          className="register_input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <br />
        <input className="register_button" type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
