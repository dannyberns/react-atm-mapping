import React from "react";
import Search from "./Search";

function Header() {
  return (
    <header className="header">
      <div className="d-flex p-2 ml-2 justify-content-between align-items-center">
        <h4 className="text-white">ATM Mapping</h4>
        <Search />
      </div>
    </header>
  );
}

export default Header;
