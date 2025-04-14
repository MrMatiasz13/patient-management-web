import { useLocation, useNavigate } from "react-router";
import { SideBarData } from "./SideBarData";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen shadow-2xl">
      <ul>
        {SideBarData.map((val) => {
          return (
            <li
              key={val.link}
              className={
                location.pathname === val.link
                  ? style.currentPage
                  : style.default
              }
              onClick={() => {
                navigate(val.link);
              }}
            >
              {val.icon}
              <span className="font-bold">{val.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const style = {
  currentPage:
    "flex items-center gap-1 justify-center bg-blue-500 m-2 px-4 py-3 rounded-lg shadow-2xl cursor-pointer",
  default:
    "flex items-center gap-1 justify-center bg-gray-200 m-2 px-4 py-3 rounded-lg shadow-2xl cursor-pointer",
};

export default SideBar;
