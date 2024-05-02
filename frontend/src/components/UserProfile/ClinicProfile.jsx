import { useEffect, useState } from 'react'
import axios from 'axios'
import DoctorsList from '../DoctorsList/DoctorsList'
import Button from '@mui/material/Button'

const DUMMY_CLINIC = {
    id : 1,
    name: "WeFixU Clinic",
    address: "123 Cool Street, City, Country"
  }

const ClinicProfile = () => {
  const [hasDoctors, setHasDoctors] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/profile/4`)
      .then(res => setUserProfile(res.data))
      .catch(error => console.error("user profile error", error));
    
  }, [])


  const checkIfClinicHasDoctors = hasDoctors => setHasDoctors(hasDoctors);

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
            <Button>Edit</Button>
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
            {/* { !hasDoctors && <span>Please click New to add a doctor</span> }
            <DoctorsList clinic_id={DUMMY_CLINIC.id} renderClinic={checkIfClinicHasDoctors}/> */}
              
          
        </div>
      </article>
    </div>
  )
}

export default ClinicProfile;