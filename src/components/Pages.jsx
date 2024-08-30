import { useState } from "react";
import { styles } from "../assets/style";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { to: "/dashboard", name: "Dashboard" },
  { to: "/albums", name: "Albums" },
  { to: "/users", name: "Users" },
  //   { to: "/manage-subadmins", name: "Sub-Admins" },
];

const Pages = () => {
  const { pathname } = useLocation();
  const [isSelected, setSelected] = useState(
    pathname === "/" ? "/dashboard" : pathname
  );

  const handleItemClick = (to) => {
    setSelected(to);
  };

  return (
    <ul className={`flex justify-end flex-col gap-[2vh]`}>
      {menuItems.map((item) => (
        <Link
          to={item.to}
          className= {isSelected === item.to && `bg-gradient-to-r from-transparent to-[#141418]`}
        >
          <li
            key={item.to}
            className={`${
              isSelected === item.to
                ? `${styles["text-gradient-tbr"]}`
                : "text-start"
            }  flex h-12 items-center text-center pl-[30%] justify-between `}
            onClick={() => handleItemClick(item.to)}
          >
            {item.name}
            {isSelected === item.to && (
              <div
                className={`${styles["bg-gradient-tbr"]} w-[2px] h-full relative right-0`}
              ></div>
            )}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Pages;
