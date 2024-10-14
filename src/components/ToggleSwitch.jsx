// ToggleSwitch.js
import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`block w-14 h-8 rounded-full transition ${
            checked ? "bg-[#f37360]" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
            checked ? "translate-x-full bg-blue-500" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
