import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./components/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteInfo from "./components/SiteInfo";
import Charge from "./components/Charge";
import UserGuide from "./components/UserGuide";
import NewMessage from "./components/NewMessage";
import EventPage from "./components/EventPage";
import Login from "./components/Login";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    console.log("width", width);
  }, [width]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <Router>
      <Navbar width={width} />
      <Routes>
        <Route path="/siteInfo" exact element={<SiteInfo width={width} />} />
        <Route path="/charge" element={<Charge width={width} />} />
        <Route path="/userGuide" element={<UserGuide width={width} />} />
        <Route path="/newMessage" element={<NewMessage width={width} />} />
        <Route path="/eventpage" element={<EventPage width={width} />} />
        <Route path="/login" element={<Login width={width} />} />

        <Route path="/" element={<Home width={width} />} />
      </Routes>
    </Router>
  );
}

export default App;
