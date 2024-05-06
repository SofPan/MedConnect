import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';
import ClinicList from './ClinicsList/ClinicsList';

const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};

const defaultCenter = {
  lat: 43.642567, // default latitude
  lng: -79.387054, // default longitude
};

const customMarkerIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" fill="red"/>
  </svg>
`;

const MapComponent = () => {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [searchTermMarker, setSearchTermMarker] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchClinics = () => {
      axios.get('http://localhost:8080/clinics')
        .then(response => {
          setClinics(response.data);
        })
        .catch(error => {
          console.error('Error fetching clinics:', error);
        });
    };
    if (isLoaded) {
      fetchClinics();
    }
  }, [isLoaded]);

  const handleSearch = (e) => {
  e.preventDefault();

  axios.get(`clinics/api/geocode?address=${searchTerm}`)
    .then(response => {
      const { latitude, longitude } = response.data;
      setCoordinates({ lat: latitude, lng: longitude });
      setSearchTermMarker(true);
    })
    .catch(error => {
      console.error('Error geocoding address:', error);
    });
};

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter your zip code" 
          />
          <button>Search</button>
        </form>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={coordinates}
        >
          { searchTermMarker && 
            <Marker 
              position={coordinates} 
            />
          }

          {clinics.map((clinic, index) => {
            const clinicCoordinates = {
              lat: parseFloat(clinic.latitude), 
              lng: parseFloat(clinic.longitude), 
            };

            return (
              <Marker
                key={index}
                position={clinicCoordinates}
                icon={{
                  url: `data:image/svg+xml;utf8,${encodeURIComponent(customMarkerIcon)}`,
                  scaledSize: new window.google.maps.Size(50, 50)
                }}
                label={{
                  text: `${clinic.number_of_spots ? clinic.number_of_spots : 0}`,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'white',
                }}
              />
            );
          })}
        </GoogleMap>
      </div>
      <ClinicList searchCoordinates={coordinates} />
    </div>
  );
};

export default MapComponent;
