import { useEffect, useState } from 'react';
import { fetchDoctors } from '../../hooks/tempUseAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';

const ProfileDoctors = (props) => {
  const {userProfile} = props;
  const [doctors, setDoctors] = useState([]);
  const [alterDoctors, setAlterDoctors] = useState(0);

  useEffect(() => {
    const fetchClinicsDoctors = async () => {
      const doctorData = await fetchDoctors();
      setDoctors(doctorData);
    }

    fetchClinicsDoctors();
  }, [alterDoctors]);

  const triggerDoctorStateUpdate = () => {
    setAlterDoctors(alterDoctors + 1);
  }
  
  return(
    <>
    <div>
      <h2>Doctors</h2>
      <AccordionWrapper title="New">
        <NewDoctorForm 
        clinic_id={userProfile.id}
        addDoctor={triggerDoctorStateUpdate}
        />
      </AccordionWrapper>
    </div>
    {!doctors.length && <span>You do not have any doctors listed</span>}
    <DoctorsList clinic_id={userProfile.id} doctors={doctors} changeDoctorState={triggerDoctorStateUpdate} />
    </>

  )
}

export default ProfileDoctors;