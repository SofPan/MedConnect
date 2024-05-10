import React, { useContext, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { UserSignedIn } from '../App';


const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};

const customMarkerIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" fill="red"/>
  </svg>
`;

const MapComponent = ({coordinates, searchTermMarker}) => {
  const { userState } = useContext(UserSignedIn);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  console.log("displayed clinics", userState.displayedClinics)
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMarkerClick = (id) => {
    setInfoWindowShown(isShown => !isShown)
    setSelectedClinicId(id);
  };

  const handleCloseInfoWindow = () => {
    setInfoWindowShown(false);
    setSelectedClinicId(null);
  }


  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={coordinates}
     >
        { searchTermMarker && 
          <Marker 
            position={coordinates} 
          />
        }

        {userState.displayedClinics.map((clinic, index) => {
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
              onClick={() => handleMarkerClick(clinic.id)}
            >
            {infoWindowShown && selectedClinicId === clinic.id && (
              <InfoWindow onCloseClick={handleCloseInfoWindow}>
                <div>
                  <h3>{clinic.name}</h3>
                  <p>Address: {clinic.address}</p>
                  <p>Available spots: {clinic.number_of_spots} </p>
                </div>
              </InfoWindow>
            )}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
