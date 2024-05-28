import { useContext, useEffect, useState } from 'react';
import { UserSignedIn } from '../../App';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import List from '../List/List';
import DoctorsListItem from './DoctorsListItem';

const ProfileDoctors = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();

  const {userState, dispatch} = useContext(UserSignedIn);
  const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   doctors.length !== userState.doctors.length &&
  //   get(
  //     "doctors"
  //     );
  // }, [userState.doctors]);

  // useEffect(() => {
  //   if (getData){
  //     dispatch({type: "SET_DOCTORS", payload: getData});
  //     setDoctors(getData);
  //   } 
  // }, [getData]);

  const filterDoctorsByClinicId = userState.doctors.filter(doctor => {
    return doctor.clinic_id === userProfile.id;
  });

  return(
    <>
    <div>
      <Typography variant="h3">Doctors</Typography>
      <Box className="my-8">
        <AccordionWrapper title="New">
          <NewDoctorForm 
          clinic_id={userProfile.id}
          />
        </AccordionWrapper>
      </Box>
    </div>
    <BoxWithScroll height="80vh">
      <List listItems={filterDoctorsByClinicId} ItemComponent={DoctorsListItem} />
    </BoxWithScroll>
    </>

  )
}

export default ProfileDoctors;