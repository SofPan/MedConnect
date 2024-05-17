import { useState, useEffect } from "react";
import PatientAppointments from "../Scheduling/PatientAppointments";
import ProfileBody from "./ProfileBody";
import Documents from "../PatientDocuments/Documents";
import ProfileDoctors from "../DoctorsList/ProfileDoctors";
import Notifications from "../Notifications/Notifications";
import { Box } from '@mui/material';
import ClinicTabs from "./ClinicTabs";

const RenderProfile = (props) => {
  const {userProfile, isClinic} = props;
  const [leftComponent, setLeftComponent] = useState(null);
  const [rightComponent, setRightComponent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if(isClinic){
      setLeftComponent(<Notifications userProfile={userProfile}/>)
      setRightComponent(<ProfileDoctors userProfile={userProfile}/>
    )
    } else {
      setLeftComponent(<Documents userProfile={userProfile} />)
      setRightComponent(<PatientAppointments  userProfile={userProfile}/>)
    }
  }, []);

  return(
    <Box className="mt-5">
      {isClinic &&
        <ClinicTabs activeTab={activeTab} handleTabChange={handleTabChange}/>
      }
      <Box height="80vh" width={isClinic ? "60vw" : "100vw"} margin="-50px auto 0 auto" display={'inline-flex'} justifyContent={"center"} >
        <ProfileBody
          isClinic={isClinic}
          userProfile={userProfile}
          profileComponentLeft={leftComponent}
          profileComponentRight={rightComponent}
          activeTab={activeTab}
        />
      </Box>
    </Box>
  )
}

export default RenderProfile;