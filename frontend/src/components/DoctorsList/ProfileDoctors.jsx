import { useContext, useEffect, useState } from 'react';
import UserSignedIn from '../GeneralComponents/UserSignedIn';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const ProfileDoctors = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();

  const {userState, dispatch} = useContext(UserSignedIn);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    doctors.length !== userState.doctors.length &&
    get(
      "doctors"
      );
  }, [userState.doctors]);

  useEffect(() => {
    if (getData){
      dispatch({type: "SET_DOCTORS", payload: getData});
      setDoctors(getData);
    } 
  }, [getData]);

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
      <DoctorsList clinic_id={userProfile.id} />
    </BoxWithScroll>
    </>

  )
}

export default ProfileDoctors;