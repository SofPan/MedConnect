export const calcRoute = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = coord1.lat;
  const lon1 = coord1.lng;
  const lat2 = coord2.lat;
  const lon2 = coord2.lng;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  // Round the distance to two decimal places
  return Number(distance.toFixed(2));
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
