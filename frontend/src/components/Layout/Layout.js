import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="flex h-dvh flex-col">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <div className="min-h-0 flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
