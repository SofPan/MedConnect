import React, { useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};

const customMarkerIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" fill="red"/>
  </svg>
`;

const MapComponent = ({displayedClinics, coordinates, searchTermMarker}) => {
console.log("displayed clinics", displayedClinics)
  return (
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

        {displayedClinics.map((clinic, index) => {
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
  );
};

export default MapComponent;
