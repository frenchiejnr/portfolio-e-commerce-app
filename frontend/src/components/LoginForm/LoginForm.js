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
    <div className="mx-auto mt-10 h-80 max-w-xl rounded bg-white px-8 py-6 shadow-xl">
      <Form method="post" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block font-bold text-gray-800">
            Username:
          </label>
          <input
            id="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
            className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-bold text-gray-800">
            Password:
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
            required
          />
          <div>
            <button
              type="submit"
              class="mt-6 block w-full cursor-pointer rounded bg-indigo-500 px-4 py-2 text-center font-bold text-white"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};
