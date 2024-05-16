import { useContext, useEffect, useState } from 'react';
import { UserSignedIn } from '../../App';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';

import {Box} from '@mui/material'

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
    getData && dispatch({type: "SET_DOCTORS", payload: getData});
    setDoctors(getData);
  }, [getData]);

  return(
    <>
    <div>
      <h2>Doctors</h2>
      <AccordionWrapper title="New">
        <NewDoctorForm 
        clinic_id={userProfile.id}
        />
      </AccordionWrapper>
    </div>
    <Box component="div" sx={{overflow: 'auto', height: "50vh"}} padding="36px 12px">
      <DoctorsList clinic_id={userProfile.id} />
    </Box>
    </>

  )
}

export default ProfileDoctors;