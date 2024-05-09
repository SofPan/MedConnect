
import {
        Box
      } from '@mui/material'
import UserInformation from './UserInformation';
import BoxWrapper from '../GeneralComponents/BoxWrapper';
import ProfileDoctors from '../DoctorsList/ProfileDoctors';

const ClinicProfile = (props) => {
  const {userProfile} = props;


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
        </article>
      </Box>
    </div>
  )
}

export default ClinicProfile;