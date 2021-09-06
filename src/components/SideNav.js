import React, { useEffect, useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import atmController from "../api/atmController";
import logos from "./Logos";

//Icons
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaDirections } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHdd } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function SideNav() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    data: atmController.getByCoords({
      lat: appState.chosenMarkerCoords.lat,
      lng: appState.chosenMarkerCoords.lng
    })
  });

  useEffect(() => {
    if (
      state.data[0].lat !== appState.chosenMarkerCoords.lat &&
      state.data[0].lng !== appState.chosenMarkerCoords.lng
    ) {
      setState(draft => {
        draft.data = atmController.getByCoords({
          lat: appState.chosenMarkerCoords.lat,
          lng: appState.chosenMarkerCoords.lng
        });
      });
    }
  }, [appState.chosenMarkerCoords.lat, appState.chosenMarkerCoords.lng]);

  function handleCloseClick() {
    appDispatch({ type: "closeSideNav" });
  }

  function handleRouteClick() {
    appDispatch({ type: "openRoute" });
  }

  return (
    <div className="sidenav">
      <div className="bank-logo-wrapper">
        <img
          src={logos[state.data[0].engName]}
          alt="bank-logo"
          className="bank-logo"
        />
      </div>

      <div className="sidenav-content">
        <h1>{state.data[0].name}</h1>
        <h4>כספומט</h4>
        <hr />
        <div className="d-flex flex-row justify-content-around">
          <button className="sidenav-button" onClick={handleRouteClick}>
            <FaDirections className="sidenav-button-icon" />
          </button>
          <a
            href={state.data[0].site}
            target="_blank"
            rel="noreferrer"
            className="sidenav-button"
          >
            <FaGlobeAmericas className="sidenav-button-icon site-link" />
          </a>
        </div>
        <hr />

        <div className="d-flex flex-row justify-content-around">
          <h6>
            נגיש{" "}
            {state.data[0].accessible === "כן" ? (
              <FaCheck color="green" />
            ) : (
              <FaTimes color="red" />
            )}
          </h6>
          <h6>
            עמלה{" "}
            {state.data[0].commission === "כן" ? (
              <FaCheck color="green" />
            ) : (
              <FaTimes color="red" />
            )}
          </h6>
        </div>

        <hr />
        <ul>
          <li>
            {state.data[0].address} <FaMapMarkerAlt color="#1e3163" />
          </li>
          <li>
            {state.data[0].city} <FaMapMarkerAlt color="#1e3163" />
          </li>
          <li>
            {state.data[0].atmKind} <FaHdd color="#1e3163" />
          </li>
          <li>
            {"קוד בנק: " + state.data[0].bankCode}
            {"  "}
            <FaCreditCard color="#1e3163" />
          </li>
          <li>
            {"קוד סניף: " + state.data[0].branchCode}
            {"  "}
            <FaCreditCard color="#1e3163" />
          </li>
          <li>
            {"עמלה: " + state.data[0].commission} <FaCoins color="#1e3163" />
          </li>
          <li>
            <a href={state.data[0].site} target="_blank" rel="noreferrer">
              אתר אינטרנט
            </a>{" "}
            <FaGlobeAmericas color="#1e3163" />
          </li>
        </ul>

        <button onClick={handleCloseClick} className="sidenav-close-button">
          <FaArrowLeft /> סגירה
        </button>
      </div>
    </div>
  );
}

export default SideNav;
