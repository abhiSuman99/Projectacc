import React from "react";

const AppHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-300 shadow-md p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="text-xl">
        ☰
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </header>
  );
};

export default AppHeader;
