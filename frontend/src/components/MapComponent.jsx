import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import MapModal from './GeneralComponents/MapModal';
import { theme } from '../theme/theme';


const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
  border: '3px solid',
  borderColor: theme.palette.primary.main
};

const customMarkerIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" fill="#800020"/>
  </svg>
`;

const MapComponent = ({coordinates, searchTermMarker, mapClinics, isLoaded}) => {
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showModal, setShowModal] = React.useState(false)

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMarkerClick = (id) => {
      setSelectedClinicId(id);
      const clinic = mapClinics.find(clinic => clinic.id === id);
      setSelectedClinic(clinic);
      setShowModal(true);
  };


  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={coordinates}
        className="border-2 border-red-900"
      >
        { searchTermMarker && 
          <Marker 
            position={coordinates} 
          />
        }

        {mapClinics.map((clinic, index) => {
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
            {selectedClinicId === clinic.id && (
              <MapModal clinic={selectedClinic} showModal={showModal} setShowModal={setShowModal}/>
            )}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
