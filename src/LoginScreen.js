import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://localhost:8082/auth/login", { email, password });
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "EMPLOYEE") {
        navigate("/employees");
        console.log(token);
      } else if (role === "ADMIN_RH") {
        navigate("/admin");
        console.log(token);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
