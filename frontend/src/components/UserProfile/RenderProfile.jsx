import { useState, useEffect, act } from "react";
import PatientAppointments from "../Scheduling/PatientAppointments";
import ProfileBody from "./ProfileBody";
import Documents from "../PatientDocuments/Documents";
import ProfileDoctors from "../DoctorsList/ProfileDoctors";
import Notifications from "../Notifications/Notifications";
import { Box } from '@mui/material';
import ClinicTabs from "./ClinicTabs";
import { useLoading } from "../../hooks/useProfileData";

const RenderProfile = (props) => {
  const {userProfile, isClinic} = props;
  const [leftComponent, setLeftComponent] = useState(null);
  const [rightComponent, setRightComponent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const {loading, isLoading} = useLoading();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if(isClinic){
      setLeftComponent(<Notifications setLoading={isLoading} userProfile={userProfile}/>)
      setRightComponent(<ProfileDoctors setLoading={isLoading} userProfile={userProfile}/>
    )
    } else {
      setLeftComponent(<Documents setLoading={isLoading} userProfile={userProfile} />)
      setRightComponent(<PatientAppointments setLoading={isLoading}  userProfile={userProfile}/>)
    }
  }, [loading]);

  return(
    <>
      {isClinic &&
        <ClinicTabs activeTab={activeTab} handleTabChange={handleTabChange}/>
      }
      <Box width="60vw" display={'inline-block'} >
        <ProfileBody
          isClinic={isClinic}
          userProfile={userProfile}
          profileComponentLeft={leftComponent}
          profileComponentRight={rightComponent}
          activeTab={activeTab}
        />
      </Box>
    </>
  )
}

export default RenderProfile;