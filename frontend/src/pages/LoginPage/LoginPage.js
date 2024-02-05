import React, { useEffect } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage() {
  const id = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  return (
    <div>
      {id ? (
        <Navigate to={"/"} />
      ) : (
        <div className="box">
          <LoginForm />
        </div>
      )}
    </div>
  );
}
