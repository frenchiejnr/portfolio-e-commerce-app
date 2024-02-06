import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userSlice";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        withCredentials: true,
        credentials: "include",
      });
      const userJson = await res.json();
      if (userJson.id) {
        window.localStorage.setItem("isAuthenticated", true);
        dispatch(setUserId(userJson.id));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit} className="loginForm">
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
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
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </div>
    </Form>
  );
};
