import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-50 w-full">
        <Header />
      </div>
      <div className="flex-grow-1 pt-[41px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
