import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around items-center py-4 bg-gray-100 border-t border-gray-300">
      <button
        onClick={() => navigate("/")}
        className="text-blue-500 text-lg hover:underline"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/explore")}
        className="text-blue-500 text-lg hover:underline"
      >
        Explore
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="text-blue-500 text-lg hover:underline"
      >
        Profile
      </button>
    </div>
  );
};

export default Footer;