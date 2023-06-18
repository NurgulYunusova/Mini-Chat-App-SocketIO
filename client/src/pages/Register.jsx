import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:3300/api/users", data)
      .then((response) => {
        console.log(response.data);
        setUsername("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <h1>Registration form</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
