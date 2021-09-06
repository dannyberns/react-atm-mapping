import { useEffect, useContext, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-canvas-marker";
import L from "leaflet";
import atmController from "../api/atmController";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import icons from "./Icons";

export default function LeafletCanvasMarker() {
  const map = useMap();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(atmController.getAll());
  }, []);

  useEffect(() => {
    setMarkers(atmController.getByParams(appState.filterParams));
  }, [appState.filterParams]);

  useEffect(() => {
    appDispatch({ type: "updateResult", value: markers.length });
    if (markers.length < 1) return;

    var ciLayer = L.canvasIconLayer({}).addTo(map);
    ciLayer.addOnClickListener((e, data) => {
      const markerLat = data[0].data._latlng.lat;
      const markerLng = data[0].data._latlng.lng;

      appDispatch({
        type: "updateAndOpen",
        data: { lat: markerLat, lng: markerLng }
      });
    });

    var atms = [];

    markers.map(atm => {
      var marker = L.marker([atm.latitude, atm.longitude], {
        icon: L.icon({
          iconUrl: icons[atm.engName],
          iconSize: [70, 70],
          iconAnchor: [10, 9]
        })
      });
      atms.push(marker);
    });

    ciLayer.addMarkers(atms);
    map.flyToBounds(map.getBounds());

    return () => {
      if (markers.length > 0) {
        atms.map(atm => {
          ciLayer.removeMarker(atm, true);
        });
      }
    };
  }, [markers]);
  return null;
}
