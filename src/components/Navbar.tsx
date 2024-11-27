import { Outlet, NavLink } from "react-router-dom";
import "../styles/navbar.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useEffect } from "react";
import torch from "../assets/torch.png";

type api_response = {
  time: string;
};

export const Navbar = () => {
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const get_time = async () => {
    const response = await fetch("http://localhost/get_time");

    const data: api_response = await response.json();

    const israel_time: string = data.time;

    if (response.ok) {
      setLoading(false);
      setTime(israel_time);
    }
  };

  useEffect(() => {
    // setInterval(get_time, 1000);

    get_time();
  }, []);

  return (
    <div className="root_layout">
      <header>
        <h2> Torch</h2>
        <img src={torch} alt="logo" className="logo" />
        {/* <img src={torch} alt="logo" className="logo" /> */}
        <h2 className="israel_time">
          {loading ? <CircularProgress size={22} /> : time}
        </h2>
        <NavLink to="/"> root</NavLink>
        <NavLink to="/about">about </NavLink>
        <NavLink to="/latest/reports">reports</NavLink>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
