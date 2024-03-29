import { useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "../../config/index";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    const token = window.localStorage.getItem("jwt_token");
    e.preventDefault();
    window.localStorage.setItem("isAuthenticated", false);
    window.localStorage.removeItem("jwt_token");
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUserId(null));
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="text-white hover:underline">
      Logout
    </button>
  );
};
