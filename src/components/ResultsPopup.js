import React, { useEffect, useState } from "react";
import StateContext from "../StateContext";
import { useContext } from "react";

function ResultsPopup() {
  const appState = useContext(StateContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [appState.result]);

  useEffect(() => {
    if (show) {
      const delay = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="d-flex justify-content-center align-items-center results">
          {appState.result === 1
            ? "נמצאה התאמה 1"
            : "נמצאו " + appState.result + " התאמות"}
        </div>
      )}
    </>
  );
}

export default ResultsPopup;
