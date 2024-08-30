import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import { BgGradient } from "./BgGradient";
import { Input } from "@nextui-org/react";
import { styles } from "../assets/style";
import Particle from "./Particles";
import { useAuth } from "../constants/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {login} = useAuth()

  const onSubmit = (data) => {
    login({"username": "Anshul", "password": "Anshul@123"})
  };

  return (
    <div className="h-[100vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <Particle
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <BgGradient>
        <div className="rounded-3xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <h1
              className={`font-sofia ${styles["text-gradient-tbr"]} text-8xl text-center my-10`}
            >
              Admin
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 text-lg sm:w-[40vw] w-[70vw] ">
                <Input
                  type="text"
                  variant={"bordered"}
                  label="Username"
                  {...register("username", { required: "Username is required" })}
                  isInvalid={errors.username}
                  errorMessage={errors.username && errors.username.message}
                />
              </div>

              <div className="mb-4 text-lg sm:w-[40vw] w-[70vw] ">
                <Input
                  type="password"
                  variant={"bordered"}
                  label="Password"
                  {...register("password", { required: "Password is required" })}
                  isInvalid={errors.password}
                  errorMessage={errors.password && errors.password.message}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className={`rounded-3xl ${styles["bg-gradient-tbr"]} bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </BgGradient>
    </div>
  );
};
export default Login;
