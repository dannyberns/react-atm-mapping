import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import { useImmerReducer } from "use-immer";
import { CSSTransition } from "react-transition-group";
//import "./index.css";

// My Components
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import Header from "./components/Header";
import FloatingButtons from "./components/FloatingButtons";
import SideNav from "./components/SideNav";
import GeoLocation from "./components/GeoLocation";
import NewRoute from "./components/NewRoute";
import Zoom from "./components/Zoom";
import ResultsPopup from "./components/ResultsPopup";
import icons from "./components/Icons";
import Side from "./components/Side";

function App() {
  const initialState = {
    isSideNavOpen: false,
    isRouteClicked: false,
    filterParams: {
      accessible: "",
      commission: "",
      name: "",
      searchTerm: ""
    },
    chosenMarkerCoords: {
      lat: "",
      lng: ""
    },
    clickedUserLocation: 0,
    result: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "openSideNav":
        draft.isSideNavOpen = true;
        break;
      case "closeSideNav":
        draft.isSideNavOpen = false;
        break;
      case "openRoute":
        draft.isRouteClicked = true;
        break;
      case "closeRoute":
        draft.isRouteClicked = false;
        break;
      case "updateChosenMarkerCoords":
        draft.chosenMarkerCoords = action.data;
        break;
      case "AccessibleOn":
        draft.filterParams.accessible = "כן";
        break;
      case "AccessibleOff":
        draft.filterParams.accessible = "";
        break;
      case "CommissionOn":
        draft.filterParams.commission = "";
        break;
      case "CommissionOff":
        draft.filterParams.commission = "לא";
        break;
      case "updateAndOpen":
        draft.chosenMarkerCoords.lat = action.data.lat;
        draft.chosenMarkerCoords.lng = action.data.lng;
        draft.isSideNavOpen = true;
        draft.isRouteClicked = false;
        break;
      case "bankNameFilterOn":
        draft.filterParams.name = action.value;
        break;
      case "updateSearchTerm":
        draft.filterParams.searchTerm = action.value;
        break;
      case "userLocation":
        draft.clickedUserLocation++;
        break;
      case "updateResult":
        draft.result = action.value;
        break;
      default:
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const myIcon = new L.Icon({
    iconUrl: icons.userIcon,
    iconSize: 30
  });

  const location = GeoLocation();

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Header />
        <MapContainer
          preferCanvas={true}
          className="map"
          center={[31.4117257, 35.0818155]}
          zoom={9}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location.loaded && !location.error && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={myIcon}
            >
              <Tooltip sticky="true" direction="top">
                Your current location
              </Tooltip>
            </Marker>
          )}
          <Zoom />
          <NewRoute />
        </MapContainer>
        <ResultsPopup />
        <FloatingButtons />
        <CSSTransition
          timeout={330}
          in={state.isSideNavOpen}
          classNames="sidenav"
          unmountOnExit
        >
          {/* <SideNav /> */}
          <Side />
        </CSSTransition>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
