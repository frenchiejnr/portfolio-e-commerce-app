import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const userId = useSelector((state) => state.user.userId);
  return (
    <header className="flex flex-col bg-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <p className="font-bold text-white">ECOMMERCEAPP</p>
        <div className="flex items-center gap-4">
          {userId ? (
            <></>
          ) : (
            <Link to={`/login`} className="text-white hover:underline">
              Login
            </Link>
          )}
          {userId ? (
            <></>
          ) : (
            <Link to={`/register`} className="text-white hover:underline">
              Register
            </Link>
          )}
          <Link to={`/products`} className="text-white hover:underline">
            Products
          </Link>
          {userId ? (
            <Link to={`/orders`} className="text-white hover:underline">
              Orders
            </Link>
          ) : (
            <></>
          )}
          {userId ? (
            <Link to={`/cart`} className="text-white hover:underline">
              Cart
            </Link>
          ) : (
            <></>
          )}
          {userId ? <Logout /> : <></>}
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
