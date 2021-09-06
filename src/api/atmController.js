import Atms from "../data/Atm";

const getAll = () => {
  return Atms;
};

const getByParams = params => {
  const { accessible, commission, name, searchTerm } = params;
  console.log(params);

  return Atms.filter(atm => {
    return (
      atm.accessible.includes(accessible) &&
      atm.commission.includes(commission) &&
      atm.name.includes(name) &&
      (atm.address.includes(searchTerm) || atm.city.includes(searchTerm))
    );
  });
};

const getByCoords = coords => {
  const { lat, lng } = coords;
  return Atms.filter(atm => {
    return atm.latitude === lat && atm.longitude === lng;
  });
};

const atmController = {
  getAll,
  getByParams,
  getByCoords
};

export default atmController;
