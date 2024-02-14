import "./RegisterPage.css";
import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [formData, setFormData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [formResponse, setFormResponse] = useState({ msg: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:4001/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setFormResponse(response);
        });
    } catch (error) {}
  };

  useEffect(() => {
    const addressString = Object.values(addressData).join(", ");
    setFormData({ ...formData, address: addressString });
  }, [addressData]);

  useEffect(() => {
    if (formResponse.msg === "User added") {
      navigate("/login");
    }
  }, [formResponse]);

  return (
    <div className="flex h-screen justify-center">
      <div className="mx-auto mt-10 w-full max-w-xl rounded bg-white px-8 py-6 shadow-xl">
        <div className="mt-6 flex justify-end">
          <label htmlFor="login" className="mr-1 self-center">
            Meant to login?
          </label>
          <Link to={"/login"}>
            <button class="w-30 mt-1 block cursor-pointer rounded bg-gray-400 px-4 py-2 text-center font-bold text-white">
              Login
            </button>
          </Link>
        </div>
        <Form method="post" onSubmit={handleSubmit} className="registerForm">
          <div className="mb-3">
            <label htmlFor="username" className="block font-bold text-gray-800">
              Username:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              id="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block font-bold text-gray-800">
              Password:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              id="password"
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setPassword(e.target.value);
                const newMatch = e.target.value === confirmPassword;
                setPasswordsMatch(newMatch);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="r-password"
              className="block font-bold text-gray-800"
            >
              Repeat Password:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              id="r-password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                const newMatch = e.target.value === password;
                setPasswordsMatch(newMatch);
              }}
              required
            />
            {confirmPassword === "" ? (
              <p />
            ) : passwordsMatch ? (
              <p>Passwords match!</p>
            ) : (
              <p>Passwords do not match.</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block font-bold text-gray-800">
              Email:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              type="email"
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <hr />
          <div className="my-3">
            <label
              htmlFor="houseNumber"
              className="block font-bold text-gray-800"
            >
              House Number:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              type="text"
              id="houseNumber"
              name="houseNumber"
              pattern="\d+"
              title="1 or more numbers only"
              onChange={(e) =>
                setAddressData({ ...addressData, houseNumber: e.target.value })
              }
              required
            />

            <label htmlFor="street" className="block font-bold text-gray-800">
              Street:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              type="text"
              id="street"
              name="street"
              pattern="[A-Za-z0-9\s]+"
              title="Letters and Numbers only"
              onChange={(e) =>
                setAddressData({ ...addressData, street: e.target.value })
              }
              required
            />

            <label htmlFor="town" className="block font-bold text-gray-800">
              Town:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              type="text"
              id="town"
              name="town"
              pattern="[A-Za-z\s]+"
              title="Letters only"
              onChange={(e) =>
                setAddressData({ ...addressData, town: e.target.value })
              }
              required
            />

            <label htmlFor="postcode" className="block font-bold text-gray-800">
              Postcode:
            </label>
            <input
              className=" mt-2 w-full rounded border border-gray-300 py-2 pl-3 outline-none"
              type="text"
              id="postcode"
              name="postcode"
              pattern="[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}"
              title="Needs to be a valid postcode"
              onChange={(e) =>
                setAddressData({ ...addressData, postcode: e.target.value })
              }
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={passwordsMatch ? false : true}
              class="mt-6 block w-full cursor-pointer rounded bg-indigo-500 px-4 py-2 text-center font-bold text-white"
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
