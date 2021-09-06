import React, { useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

// Icons
import { IoMdLocate } from "react-icons/io";
import { FaDirections } from "react-icons/fa";

function FloatingButtons() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleClick() {
    appDispatch({ type: "closeRoute" });
  }

  function handleUserLocationClick() {
    appDispatch({ type: "userLocation" });
  }
  return (
    <div className="">
      {appState.isRouteClicked && (
        <button
          onClick={handleClick}
          className="floating-button-up floating-position up"
        >
          <FaDirections color="white" size="1.6rem" />
        </button>
      )}
      <button
        onClick={handleUserLocationClick}
        className="floating-button-down floating-position"
      >
        <IoMdLocate color="white" size="1.6rem" />
      </button>
    </div>
  );
}

export default FloatingButtons;
