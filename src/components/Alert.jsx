import { ExclamationMessage } from "@vectopus/atlas-icons-react";
import React from "react";

const Alert = ({ message, isSuccess = false }) => {
  return (
    <div
      className={`relative flex flex-col sm:flex-row sm:items-center  shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 z-50 -bottom-[80vh] -left-[32vw] h-[50vh] w-[50vw] `}
    >
      <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
        <div className={`${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {isSuccess ? (
            <svg
              className="w-6 sm:w-5 h-6 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          ) : (
            <ExclamationMessage size={22} weight="bold" />
          )}
        </div>
        <div className="text-sm font-medium ml-3">
          {isSuccess ? "Successful" : "Failed"}.
        </div>
      </div>
      <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
        {message}
      </div>
    </div>
  );
};

export default Alert;
