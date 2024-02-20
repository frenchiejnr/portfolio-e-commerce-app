import { useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "../../config/index";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.setItem("isAuthenticated", false);
    windown.localStorage.removeItem("jwt_token");
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
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
