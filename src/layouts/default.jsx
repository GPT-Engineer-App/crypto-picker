import { Outlet } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen p-6 bg-gray-900 text-white items-center justify-center">
      <header className="flex items-center space-x-2 mb-4">
        <FaBitcoin size={32} />
        <h1 className="text-2xl font-bold">Random Crypto Selector</h1>
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;