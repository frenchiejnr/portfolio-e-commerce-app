import { useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userSlice";
import { useDispatch } from "react-redux";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.setItem("isAuthenticated", false);
    fetch("http://localhost:4001/auth/logout", {
      method: "POST",
    });
    document.cookie = "auth_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(setUserId(null));
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="text-white hover:underline">
      Logout
    </button>
  );
};
