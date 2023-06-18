/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/users")
      .then((res) => setData(res.data));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = data.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      console.log("Authentication successful");
      login(username);
      navigate("/");
    } else {
      alert("Username or password is false");
    }
  };

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    </>
  );
}

export default Login;
