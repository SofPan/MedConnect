import { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';

const ProfileDoctors = (props) => {
  const {userProfile, setLoading} = props;

  const {loading, data} = useGet(
    "doctors",
    userProfile.id
  )

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    data && setDoctors(data);
  }, [data]);

  return(
    <>
    <div>
      <h2>Doctors</h2>
      <AccordionWrapper title="New">
        <NewDoctorForm 
        clinic_id={userProfile.id}
        setLoading={setLoading}
        />
      </AccordionWrapper>
    </div>
    {!doctors.length && <span>You do not have any doctors listed</span>}
    <DoctorsList clinic_id={userProfile.id} doctors={doctors} setLoading={setLoading} />
    </>

  )
}

export default ProfileDoctors;