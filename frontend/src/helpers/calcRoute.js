export const calcRoute = async (coords, clinicLocation) => {
  try {
    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: coords,
      destination: clinicLocation,
      travelMode: window.google.maps.TravelMode.DRIVING
    });
    return results.routes[0].legs[0].distance.value;
  } catch (error) {
    console.error('Error calculating route:', error);
    return Infinity; // Return a large value to put this clinic at the end of the sorted list
  }
};