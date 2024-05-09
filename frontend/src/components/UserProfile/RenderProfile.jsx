import { useState, useEffect } from "react";
import PatientAppointments from "../Scheduling/PatientAppointments";
import ProfileBody from "./ProfileBody";
import Documents from "../PatientDocuments/Documents";
import ProfileDoctors from "../DoctorsList/ProfileDoctors";
import Notifications from "../Notifications/Notifications";
import { Box } from '@mui/material';
import ClinicTabs from "./ClinicTabs";

const RenderProfile = (props) => {
  const {userProfile} = props;
  const [leftComponent, setLeftComponent] = useState(null);
  const [rightComponent, setRightComponent] = useState(null);
  const [isClinic, setIsClinic] = useState(userProfile.is_clinic);

  useEffect(() => {
    if(isClinic){
      setLeftComponent(<Notifications userProfile={userProfile}/>)
      setRightComponent(<ProfileDoctors userProfile={userProfile}/>
    )
    } else {
      setLeftComponent(<Documents userProfile={userProfile} />)
      setRightComponent(<PatientAppointments patient_id={userProfile.id}/>)
    }
  }, [isClinic])

  return(
    <>
      {isClinic &&
        <ClinicTabs />
      }
      <Box width="60vw" display={'inline-block'} >
        <ProfileBody
          isClinic={isClinic}
          userProfile={userProfile}
          profileComponentLeft={leftComponent}
          profileComponentRight={rightComponent}
        />
      </Box>
    </>
  )
}

export default RenderProfile;