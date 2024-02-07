import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";

const Header = () => {
  return (
    <header>
      My Header
      <div className="links">
        <Link to={`/login`}>Login</Link>
        <Link to={`/register`}>Register</Link>
        <Link to={`/orders`}>Orders</Link>
        <Link to={`/products`}>Products</Link>
        <Link to={`/cart`}>Cart</Link>
      </div>
      <Logout />
      <hr />
    </header>
  );
};

export default Header;
