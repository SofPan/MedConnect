import { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';

const ProfileDoctors = (props) => {
  const {userProfile} = props;

  const {data} = useGet(
    "doctors",
    userProfile.id
  )

  const [doctors, setDoctors] = useState([]);
  const [changeDoctors, setChangeDoctors] = useState(0);

  useEffect(() => {
    console.log("doctors changed?", changeDoctors);
    data && setDoctors(data);
  }, [data, changeDoctors]);

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
    {!doctors.length && <span>You do not have any doctors listed</span>}
    <DoctorsList clinic_id={userProfile.id} doctors={doctors} />
    </>

  )
}

export default ProfileDoctors;