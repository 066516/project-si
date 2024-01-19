import { useState, useEffect } from "react";
import img from "../assets/stock.png";
import { FaSignOutAlt, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Outlet, Link, useLocation } from "react-router-dom";
// import NotificationPopOut from "../components/popOuts/NotificationPopOut";
import Cookies from "js-cookie";
function Layout() {
  const [bol, setBol] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const role = "admin";
  var route = useLocation();
  console.log(route.pathname);
  const logOutHandler = async () => {
    Cookies.remove("authToken");
    console.log("yes");
    window.location.href = "/login";
  };

  const showNotif = () => {
    setNotifVisible(!notifVisible);
  };

  useEffect(() => {
    setNotifVisible(false); // Hide the notification
    setBol(false);
  }, [route.pathname]);
  return (
    <>
      {/* {notifVisible && <NotificationPopOut />} */}
      <div
        className={` h-screen absolute sm:relative z-[100] w-screen sm:w-1/3 md:w-1/4 xl:w-[250px] ${
          !bol && "hidden "
        } sm:flex flex-col text-black duration-1000 ease-in-out bg-white	 `}
      >
        <div className=" side-bar h-full absolute z-[100] w-full flex flex-col shadow-lg  items-center">
          {!bol ? <img src={img} className=" image1 w-1/3 py-6" /> : ""}
          <div className=" text-black font-medium flex flex-col h-1/2 sm:h-1/3  justify-between mt-20 sm:mt-7">
            <Link
              to="/dashboard"
              className={`${
                route.pathname === "/dashboard" ? "text-purple" : "text-black"
              }`}
            >
              Dashboard
            </Link>
            {role === "admin" ? (
              <Link
                to="/shops"
                className={`${
                  route.pathname === "/shops" || route.pathname === "/shop"
                    ? "text-purple"
                    : "text-black"
                }`}
              >
                Shops
              </Link>
            ) : (
              ""
            )}
            <Link
              to="/ventes"
              className={`${
                route.pathname === "/ventes" ? "text-purple" : "text-black"
              }`}
            >
              Ventes
            </Link>
            <Link
              to="/achats"
              className={`${
                route.pathname === "/achats" ? "text-purple" : "text-black"
              }`}
            >
              Achats
            </Link>
            <Link
              to="/dealers"
              className={`${
                route.pathname === "/dealers" ? "text-purple" : "text-black"
              }`}
            >
              Dealers
            </Link>
            <Link
              to="/stock"
              className={`${
                route.pathname === "/stock" ? "text-purple" : "text-black"
              }`}
            >
              Stock
            </Link>
          </div>
          <div className="  fixed bottom-0 p-4 w-full xl:w-1/6 sm:w-1/6 border-t justify-center flex items-center border-t-black ">
            <FaSignOutAlt
              size="25px"
              color="red"
              className="scale-x-[-1] pl-2"
            />
            <p
              onClick={() => {
                logOutHandler();
              }}
              className="cursor-pointer"
            >
              Log out
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-white sm:bg-transparent 	z-[100] w-full  fixed h-fit flex sm:justify-end justify-between px-4 pt-5 items-center ">
        {!bol ? (
          <FaBars
            className=" top-6 left-5 sm:hidden flex"
            size="24px"
            color="#2B82FB"
            onClick={() => setBol(true)}
          />
        ) : (
          <FaTimes
            size="24px"
            color="#2B82FB"
            className="sm:hidden flex top-6 left-5"
            onClick={() => setBol(false)}
          />
        )}
        {!bol ? (
          <div className="navbar-5 relati z-50 flex items-center ">
            <IoIosNotificationsOutline
              size="24"
              className="cursor-pointer "
              onClick={showNotif}
            />

            <Link to="/my_account" className="p-0">
              <img
                className="w-7 h-[27px] rounded-[50%] mx-3 cursor-pointer"
                src={img}
                width="20px"
                height="20px"
              />
            </Link>
          </div>
        ) : (
          <img className=" w-15 h-7" src={img} />
        )}
      </div>
    </>
  );
}

export default Layout;
