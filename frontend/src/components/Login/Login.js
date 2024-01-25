import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`logging in`);
    try {
      const res = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.url === "http://localhost:4001/") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="box">
      <Form method="post" onSubmit={handleSubmit} className="loginForm">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
          ></input>
          <div>
            <button type="submit">Login</button>
          </div>
          {}
        </div>
      </Form>
    </div>
  );
}
