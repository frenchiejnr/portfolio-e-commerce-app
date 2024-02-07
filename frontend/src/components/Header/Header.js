import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";
import { useSelector } from "react-redux";

import "./Header.css";

const Header = () => {
  const userId = useSelector((state) => state.user.userId);
  return (
    <header>
      ECOMMERCEAPP
      <div className="headerLinks">
        {userId ? <></> : <Link to={`/login`}>Login</Link>}
        {userId ? <></> : <Link to={`/register`}>Register</Link>}
        <Link to={`/products`}>Products</Link>
        {userId ? <Link to={`/orders`}>Orders</Link> : <></>}
        {userId ? <Link to={`/cart`}>Cart</Link> : <></>}
        {userId ? <Logout /> : <></>}
      </div>
      <hr />
    </header>
  );
};

export default Header;
