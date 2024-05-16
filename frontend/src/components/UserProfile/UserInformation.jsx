import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';

const UserInformation = (props) => {
  const { userProfile } = props;
  const [doctorProfile, setDoctorProfile] = useState(null);

  const formatBirthDate = (date) => {
    return date.split('T')[0];
  }

  const getDoctorProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/doctors/single/${userProfile.doctor_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctor profile');
      }

      const responseData = await response.json();
      return responseData;

    } catch (error) {
      console.error('Error fetching doctor profile:', error);
    }
  }

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const doctor = await getDoctorProfile();
      setDoctorProfile(doctor);
    }
    fetchDoctorProfile();
  }, [userProfile.doctor_id]);

  return (
    <>
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Patient Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Name: {userProfile.name}
          </Typography>
          {userProfile.address && (
            <Typography variant="body1" color="text.secondary">
              Address: {userProfile.address}
            </Typography>
          )}
          {userProfile.date_of_birth && (
            <Typography variant="body1" color="text.secondary">
              Date of Birth: {formatBirthDate(userProfile.date_of_birth)}
            </Typography>
          )}
        </CardContent>
      </Card>
        {doctorProfile && (
         <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
         <CardHeader
           avatar={
             <Avatar alt={doctorProfile.name} src={doctorProfile.photo_url} />
           }
           title={doctorProfile.name}
           subheader={doctorProfile.specialty}
         />
         <CardContent>
           <Typography variant="body1" color="text.secondary" mt={2}>
             Qualifications: {doctorProfile.qualifications}
           </Typography>
           <Typography variant="body1" color="text.secondary">
             Description: {doctorProfile.description}
           </Typography>
           <Typography variant="body1" color="text.secondary">
             Number of Patients: {doctorProfile.number_of_patients}
           </Typography>
           <Typography variant="body1" color="text.secondary">
             Created At: {new Date(doctorProfile.created_at).toLocaleDateString()}
           </Typography>
         </CardContent>
       </Card>
     )}
      </>
  )

}


UserInformation.propTypes = {
  userProfile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    date_of_birth: PropTypes.string,
    doctor_id: PropTypes.number.isRequired
  }).isRequired
};

export default UserInformation;
