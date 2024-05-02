import DoctorsList from '../DoctorsList/DoctorsList'
import Button from '@mui/material/Button'

const DUMMY_CLINIC = {
    id : 1,
    name: "WeFixU Clinic",
    address: "123 Cool Street, City, Country"
  }

const ClinicProfile = () => {
  // Temporary function
  const renderClinic = () => true;

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
              <p>Name Name</p>
              <p>Address</p>
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
          <DoctorsList clinic_id={DUMMY_CLINIC.id} renderClinic={renderClinic}/>
        </div>
      </article>
    </div>
  )
}

export default ClinicProfile;