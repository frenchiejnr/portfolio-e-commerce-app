import { Link } from "react-router-dom";
import { Logout } from "../../components/Logout/Logout";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <div className="links">
        <Link to={`/login`}>Login</Link>
        <Link to={`/register`}>Register</Link>
        <Link to={`/orders`}>Orders</Link>
        <Link to={`/products`}>Products</Link>
      </div>
      <Logout />
    </>
  );
};
