import { useState } from "react";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Profile from '../../../assets/images/photos/profile.png'

const AgentHeader = ({ setAside }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };  
  const location = useLocation()
  const {auth, setAuth, persist, setPersist} = useContext(AuthContext)
  console.log(auth)
  return (
    <nav className="bg-green-50 border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center gap-16">
          <ClickAwayListener
            onClickAway={() => {
              setAside(false);
            }}
          >
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
              onClick={() => setAside((aside) => !aside)}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="sr-only">Toggle sidebar</span>
            </button>
          </ClickAwayListener>
          <Link
            to="/agent"
            className="flex items-center justify-between mr-4"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
              Dashboard
            </span>
          </Link>
          <div className="text-emerald-600 flex justify-between items-center mt-4 max-md:hidden">
            {auth ? (
              <div>
                <div className="flex items-center">
                  <h2 className="text-3xl mb-0 leading-">
                    {getGreeting()}, {auth?.user?.firstname} 🎉
                  </h2>
                  {/* <span className=" text-sm">Choose your property smartly and purchase it in less time.</span> */}
                </div>
              </div>
            ) : (
              <h2>Loading user information...</h2> // In case the user data is still being fetched
            )}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
        {/* <div className=" mr-8 max-md:hidden">
          <Link>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-red-500"
              viewBox="0 -960 960 960" 
              fill="currentColor"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
              />
            </svg>
          </Link>
        </div> */}
          <div className=" h-14 w-14 rounded-full self-end relative">
            <img src={auth?.user?.profile ? auth.user.profile : Profile} alt="" className="w-full h-full rounded-full relative" />
            <span className=" w-2 h-2 rounded-full bg-green-600 block absolute top-9 right-0"></span>
          </div>
          <div>
            <span>
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                viewBox="0 -960 960 960"
                fill="currentColor">
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AgentHeader
