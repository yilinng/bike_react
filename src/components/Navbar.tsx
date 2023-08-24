import { useState } from "react";
import { NavLink } from "react-router-dom";
import log from "../assets/log.svg";
//https://heroicons.com/
const DesktopBar = () => {
  return (
    <div className="navbar">
      <div className="leftBar">
        <div className="log">
          <img src={log} alt="log" />
        </div>

        <div className="linkList">
          <NavLink to="/userGuide">使用說明</NavLink>
          <NavLink to="/charge">收費方式</NavLink>
          <NavLink to="/siteInfo">站點資訊</NavLink>
          <NavLink to="/newMessage">最新資訊</NavLink>
          <NavLink to="/eventpage">活動專案</NavLink>
        </div>
      </div>

      <div className="loginBtn">
        <NavLink to="/login">登入</NavLink>
      </div>
    </div>
  );
};

const MobileBar = () => {
  const [show, setShow] = useState(false);
  const openNav = () => {
    setShow(true);
    document.querySelector(".sideBar").style.width = "100%";
  };

  const closeNav = () => {
    setShow(false);
    document.querySelector(".sideBar").style.width = "0";
  };
  return (
    <div className="mobile_navbar">
      <div className="mobile_header">
        <div className="log">
          <img src={log} alt="log" />
        </div>

        <div className="menu">
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="24"
              height="24"
              onClick={closeNav}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              width="24"
              height="24"
              onClick={openNav}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="sideBar">
        <div className="linkList">
          <NavLink to="/userGuide">使用說明</NavLink>
          <NavLink to="/charge">收費方式</NavLink>
          <NavLink to="/siteInfo">站點資訊</NavLink>
          <NavLink to="/newMessage">最新資訊</NavLink>
          <NavLink to="/eventpage">活動專案</NavLink>
        </div>

        <div className="loginBtn">
          <NavLink to="/login">登入</NavLink>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ width }) => {
  if (width > 600) {
    return <DesktopBar />;
  }
  return <MobileBar />;
};

export default Navbar;
