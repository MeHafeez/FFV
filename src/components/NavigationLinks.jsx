import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../data/mockData";

const NavigationLinks = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="w-11 h-96 bg-transparent rounded-lg flex flex-col items-center justify-around p-2 hidden md:flex">
      {navItems.map((item) => (
        <Tooltip title={item.tooltip} placement="right-start" key={item.id}>
          <Link to={item.path}>
            <div
              onClick={() => setActive(item.id)}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full
                ${
                  active === item.id
                    ? "text-white scale-125 shadow-[0_0_10px_2px_rgba(255,255,255,0.9)]"
                    : "text-white hover:scale-110 hover:shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                }`}
            >
              {item.icon}
            </div>
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default NavigationLinks;
