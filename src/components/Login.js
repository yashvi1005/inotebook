import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      // props.showAlert("sucessfully Logedin", "success")
    } else {
      // props.showAlert("Credentials wrong", "danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3 mt-3">
      <div className="container text-center">
        <h2>Login to continue with iNotebook... (✿◠‿◠) </h2>
      </div>
    <form className="my-4" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={onChange}
          value={credentials.email}
          id="email"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={onChange}
          value={credentials.password}
          id="password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
    </div>
  );
};

export default Login;

