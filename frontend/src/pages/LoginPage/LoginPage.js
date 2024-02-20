import React, { useEffect } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage() {
  const id = useSelector((state) => state.user.userId);
  return (
    <div className="flex h-full justify-center">
      {id ? <Navigate to={"/"} /> : <LoginForm />}
    </div>
  );
}
