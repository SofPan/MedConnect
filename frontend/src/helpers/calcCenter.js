export const calculateCenter = (clinics, defaultCenter) => {
  if (clinics.length === 0) {
    return defaultCenter;
  }

  const latitudes = clinics.map(clinic => parseFloat(clinic.latitude));
  const longitudes = clinics.map(clinic => parseFloat(clinic.longitude));

  const avgLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const avgLongitude = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;

  return { lat: avgLatitude, lng: avgLongitude };
};