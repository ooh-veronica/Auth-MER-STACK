import { useState } from "react";
import "./Login.scss";
import logImg from '../Images/Group (1).png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/users";
    } else {
      console.log("Please check your username and password");
    }
    console.log(data);
  };
  return (
    <div className="login">
      <form className="register_form" onSubmit={loginUser}>
        <h2>You need to login!</h2>
        <input
          className="register_input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        <input className="register_button" type="submit" value="Login" />
      </form>
      <div>
        <img className="login_image" src={logImg} />
      </div>
    </div>
  );
}

export default Login;
