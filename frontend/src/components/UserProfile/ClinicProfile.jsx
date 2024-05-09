import { useEffect, useState } from 'react';
import { fetchDoctors } from '../../hooks/tempUseAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import NewDoctorForm from '../DoctorsList/NewDoctor';
import {
        Box
      } from '@mui/material'
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import UserInformation from './UserInformation';
import BoxWrapper from '../GeneralComponents/BoxWrapper';

const ClinicProfile = (props) => {
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
    <div className="clinic-profile">
      
      <Box width="60vw" display={'inline-block'}>
        <article className="profile-main">
          <BoxWrapper type="profileLeft">
            <UserInformation userProfile={userProfile} />
            <div className='profile-notifications'>
              <h2>Notifications</h2>
              <ul>
                <li>Patient XYZ has requested an appointment</li>
                <li>Patient ABC wants to change doctors</li>
              </ul>
            </div>
          </BoxWrapper>
          <BoxWrapper type="profileRight">
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
          </BoxWrapper>
        </article>
      </Box>
    </div>
  )
}

export default ClinicProfile;