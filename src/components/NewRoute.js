import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useContext } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import StateContext from "../StateContext";
import GeoLocation from "./GeoLocation";

export default function NewRoute() {
  const map = useMap();
  const appState = useContext(StateContext);
  const userLocation = GeoLocation();

  useEffect(() => {
    if (!map) return;
    if (appState.isRouteClicked) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.coordinates.lat, userLocation.coordinates.lng),
          L.latLng(
            appState.chosenMarkerCoords.lat,
            appState.chosenMarkerCoords.lng
          )
        ],
        routeWhileDragging: true,
        addWaypoints: false,
        draggableWaypoints: false
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }
  }, [appState.isRouteClicked]);

  return null;
}
