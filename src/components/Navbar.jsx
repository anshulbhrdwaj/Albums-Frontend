import React from "react";
import Pages from "./Pages";
import { Link } from "react-router-dom";
import { styles } from "../assets/style";
import { useAuth } from "../constants/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <>
      <nav
        className={`relative hidden h-full flex-col items-center justify-between py-[5vh] lg:flex xl:w-[12vw] lg:w-[20vw] ${styles["bg-primary"]} shadow-xl font-inter overflow-hidden sticky`}
      >
        <Link
          to="/"
          id="logo"
          className={`font-sofia ${styles["text-gradient-tbr"]} text-4xl text-center w-full`}
        >
          Admin
        </Link>

        <div id="sections" className={`w-full overflow-hidden`}>
          <Pages />
        </div>

        <div
          className={`bg-white h-[210px] w-[240px] rounded-5xl -top-[170px] -left-36 blur-2xl absolute z-10 opacity-5`}
        />
        <div
          className={`bg-white h-[290px] w-[40px] rounded-3xl top-[360px] -left-12 blur-2xl absolute z-10 opacity-10`}
        />
        <div
          className={`bg-white h-[210px] w-[240px] rounded-5xl -bottom-[170px] -left-36 blur-2xl absolute z-10 opacity-5`}
        />
        <h1
          className={`${styles["text-gradient-tbr"]} flex cursor-pointer`}
          onClick={() => logout()}
        >
          Logout <span className="material-symbols-rounded ml-2">logout</span>
        </h1>
      </nav>
    </>
  );
};

export default Navbar;
