import { useContext, useEffect, useState } from 'react';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import { UserSignedIn } from '../../App';

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

  // const handleChange = () => {
  //   setChangeDoctors(changeDoctors + 1);
  // }

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
    <DoctorsList clinic_id={userProfile.id} />
    </>

  )
}

export default ProfileDoctors;