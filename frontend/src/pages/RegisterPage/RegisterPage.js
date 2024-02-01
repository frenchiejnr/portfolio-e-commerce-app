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
    <div className="box">
      <Form method="post" onSubmit={handleSubmit} className="registerForm">
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
              setPassword(e.target.value);
              const newMatch = e.target.value === confirmPassword;
              setPasswordsMatch(newMatch);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="r-password">Repeat Password: </label>
          <input
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
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="houseNumber">House Number:</label>
          <input
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

          <label htmlFor="street">Street:</label>
          <input
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

          <label htmlFor="town">Town:</label>
          <input
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

          <label htmlFor="postcode">Postcode:</label>
          <input
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
          <button type="submit" disabled={passwordsMatch ? false : true}>
            Register
          </button>
        </div>
        <div>
          <label htmlFor="login">Meant to login? </label>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
