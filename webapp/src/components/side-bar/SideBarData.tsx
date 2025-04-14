import { FaListUl } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdPayment } from "react-icons/md";

export const SideBarData = [
  {
    title: "Strona główna",
    icon: <HiHome />,
    link: "/",
  },
  {
    title: "Pacjęci",
    icon: <FaListUl />,
    link: "/patients",
  },
  {
    title: "Płatności",
    icon: <MdPayment />,
    link: "/payments",
  },
];
