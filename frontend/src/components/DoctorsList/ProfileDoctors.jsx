import { useContext, useEffect, useState } from 'react';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import { UserSignedIn } from '../../App';

const ProfileDoctors = (props) => {
  const {userProfile} = props;

  const {getData, get} = useGet();

  const {dispatch} = useContext(UserSignedIn);
  const [changeDoctors, setChangeDoctors] = useState(0);

  useEffect(() => {
    get(
      "doctors"
      );
  }, [changeDoctors]);

  useEffect(() => {
    getData && dispatch({type: "SET_DOCTORS", payload: getData});
  }, [getData]);

  const handleChange = () => {
    setChangeDoctors(changeDoctors + 1);
  }

  return(
    <>
    <div>
      <h2>Doctors</h2>
      <AccordionWrapper title="New">
        <NewDoctorForm 
        clinic_id={userProfile.id}
        handleChange={handleChange}
        />
      </AccordionWrapper>
    </div>
    <DoctorsList clinic_id={userProfile.id} />
    </>

  )
}

export default ProfileDoctors;