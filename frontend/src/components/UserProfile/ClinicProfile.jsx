import { useEffect, useState } from 'react';
import { fetchDoctors } from '../../hooks/tempUseAPI';
import DoctorsList from '../DoctorsList/DoctorsList'
import Button from '@mui/material/Button'
import NewDoctorForm from '../Forms/NewDoctorForm';

const ClinicProfile = (props) => {
  const {userProfile} = props;

  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addDoctor, setAddDoctor] = useState(0);

  useEffect(() => {
    const fetchClinicsDoctors = async () => {
      const doctorData = await fetchDoctors();
      setDoctors(doctorData);
    }

    fetchClinicsDoctors();
  }, [addDoctor]);

  const handleClick = () => {
    setShowForm(!showForm);
  }

  const triggerDoctorStateUpdate = () => {
    setAddDoctor(addDoctor + 1);
  }

  return(
    <div>
      <aside>
        <Button>Clinic Profile</Button>
        <Button>Scheduling</Button>
      </aside>
      <article className="profile-main">
        <div className="profile-left">
          <div className='profile-information'>
            <h2>Information</h2>
            <div>
              <p>{userProfile.name}</p>
              <p>{userProfile.address && userProfile.address}</p>
            </div>
            {/* <Button>Edit</Button> */}
          </div>

          <div className='profile-notifications'>
            <h2>Notifications</h2>
            <ul>
              <li>Patient XYZ has requested an appointment</li>
              <li>Patient ABC wants to change doctors</li>
            </ul>
          </div>
        </div>
        <div className="profile-right">
          <div>
            <h2>Doctors</h2>
            <Button onClick={handleClick}>New</Button>
              <NewDoctorForm 
                clinic_id={userProfile.id}
                addDoctor={triggerDoctorStateUpdate}
              />
          </div>
            {!doctors.length && <span>You do not have any doctors listed</span>}
            <DoctorsList clinic_id={userProfile.id} doctors={doctors} changeDoctorState={triggerDoctorStateUpdate} />
        </div>
      </article>
    </div>
  )
}

export default ClinicProfile;