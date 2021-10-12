import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useMap } from "react-leaflet";
import StateContext from "../StateContext";
import LeafletCanvasMarker from "./LeafletCanvasMarker";
import GeoLocation from "./GeoLocation";

function Zoom() {
  const map = useMap();
  const [displayMarkers, setDisplayMarkers] = useState(false);
  const appState = useContext(StateContext);
  const userLocation = GeoLocation();

  useEffect(() => {
    if (appState.clickedUserLocation) {
      map.flyTo(
        [userLocation.coordinates.lat, userLocation.coordinates.lng],
        16
      );
    }
  }, [appState.clickedUserLocation]);

  map.on("zoomend", e => {
    map.getZoom() >= 12 ? setDisplayMarkers(true) : setDisplayMarkers(false);
  });

  return <>{displayMarkers && <LeafletCanvasMarker />}</>;
}

export default Zoom;
