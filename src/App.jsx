import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./constants/AuthContext";
import { styles } from "./assets/style";
import Navbar from "./components/Navbar";
import NavMob from "./components/NavMobile";

const App = () => {
  // const { user } = useAuth();
  // const navigateTo = useNavigate();

  // useEffect(() => {
  //   !user && navigateTo("/login");
  // }, [user]);
  
  return (
    <div
      className={`${styles["bg-primary"]} relative flex h-screen w-screen flex-col lg:flex-row items-center font-inter`}
    >
      <Navbar />
      <NavMob />
      <Outlet />
    </div>
  );
};

export default App;
