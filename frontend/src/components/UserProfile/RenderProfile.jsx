import { useState, useEffect } from "react";
import PatientAppointments from "../Scheduling/PatientAppointments";
import ProfileBody from "./ProfileBody";
import Documents from "../PatientDocuments/Documents";
import {
  Tabs,
  Tab,
  Box
} from '@mui/material';

const RenderProfile = (props) => {
  const {userProfile} = props;
  const [leftComponent, setLeftComponent] = useState(null);
  const [rightComponent, setRightComponent] = useState(null);
  const [isClinic, setIsClinic] = useState(true);

  useEffect(() => {
    if(isClinic){
      console.log("a clinic")
    } else {
      setLeftComponent(<Documents userProfile={userProfile} />)
      setRightComponent(<PatientAppointments patient_id={userProfile.id}/>)
    }
  }, [isClinic])

  return(
    <>
      {isClinic &&
        <Box marginRight={"50px"} width="20vw" display={'inline-block'} borderRight={'1px solid lightgrey'}>
          <Tabs value={0} orientation='vertical'>
            <Tab label="Clinic Profile" tabIndex={0} value={0}/>
            <Tab label="Scheduling" tabIndex={1} value={1}/>
          </Tabs>
        </Box>
      }
      <ProfileBody
        isClinic={isClinic}
        userProfile={userProfile}
        profileComponentLeft={leftComponent}
        profileComponentRight={rightComponent}
      />
    </>
  )
}

export default RenderProfile;