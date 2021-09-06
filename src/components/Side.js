import React, { useEffect, useContext, useState } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
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

function Side() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (
      data.length > 0 &&
      data[0].lat !== appState.chosenMarkerCoords.lat &&
      data[0].lng !== appState.chosenMarkerCoords.lng
    ) {
      setData(
        atmController.getByCoords({
          lat: appState.chosenMarkerCoords.lat,
          lng: appState.chosenMarkerCoords.lng
        })
      );
    } else if (data.length === 0) {
      setData(
        atmController.getByCoords({
          lat: appState.chosenMarkerCoords.lat,
          lng: appState.chosenMarkerCoords.lng
        })
      );
    }
  }, [appState.chosenMarkerCoords]);

  useEffect(() => {
    if (data.length > 0) {
      setIsData(true);
    }
  }, [data]);

  function handleCloseClick() {
    appDispatch({ type: "closeSideNav" });
  }

  function handleRouteClick() {
    appDispatch({ type: "openRoute" });
  }

  return (
    <>
      {isData && (
        <div className="sidenav">
          <div className="bank-logo-wrapper">
            <img
              src={logos[data[0].engName]}
              alt="bank-logo"
              className="bank-logo"
            />
          </div>

          <div className="sidenav-content">
            <h1>{data[0].name}</h1>
            <h4>כספומט</h4>
            <hr />
            <div className="d-flex flex-row justify-content-around">
              <button className="sidenav-button" onClick={handleRouteClick}>
                <FaDirections className="sidenav-button-icon" />
              </button>
              <a
                href={data[0].site}
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
                {data[0].accessible === "כן" ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </h6>
              <h6>
                עמלה{" "}
                {data[0].commission === "כן" ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </h6>
            </div>

            <hr />
            <ul>
              <li>
                {data[0].address} <FaMapMarkerAlt color="#1e3163" />
              </li>
              <li>
                {data[0].city} <FaMapMarkerAlt color="#1e3163" />
              </li>
              <li>
                {data[0].atmKind} <FaHdd color="#1e3163" />
              </li>
              <li>
                {"קוד בנק: " + data[0].bankCode}
                {"  "}
                <FaCreditCard color="#1e3163" />
              </li>
              <li>
                {"קוד סניף: " + data[0].branchCode}
                {"  "}
                <FaCreditCard color="#1e3163" />
              </li>
              <li>
                {"עמלה: " + data[0].commission} <FaCoins color="#1e3163" />
              </li>
              <li>
                <a href={data[0].site} target="_blank" rel="noreferrer">
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
      )}
    </>
  );
}

export default Side;
