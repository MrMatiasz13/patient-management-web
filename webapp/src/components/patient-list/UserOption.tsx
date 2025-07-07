import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";

export function UserOption() {
  const { user } = useUser();
  const { logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => logout();

  return (
    <div className="flex w-full px-4 py-1 items-center justify-between border-b-1 border-gray-400">
      <h1 className="text-xl font-bold">Welcome back {user?.name}!</h1>
      <div
        className="text-gray-500 hover:text-black cursor-pointer"
        onClick={toggleMenu}
      >
        <IoMdSettings size={25} />

        {isMenuOpen && (
          <div className="relative">
            <div className="absolute right-0 bg-white shadow-lg ring-1 ring-gray-200 rounded-md z-10">
              <div className="py-1">
                <button
                  className="flex items-center w-full gap-2 px-3 py-1 font-medium text-sm text-left text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline size={20} className="text-red-500" />
                  <span className="whitespace-nowrap">Wyloguj</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
