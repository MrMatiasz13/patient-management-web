import { useLocation, useNavigate } from "react-router";
import { SideBarData } from "./SideBarData";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-700">
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
    "flex items-center gap-1 justify-center bg-amber-100 m-2 px-5 py-3 rounded-lg border cursor-pointer",
  default:
    "flex items-center gap-1 justify-center bg-amber-50 m-2 px-5 py-3 rounded-lg border cursor-pointer",
};

export default SideBar;
