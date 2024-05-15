import React from "react";
import BoxWrapper from "../GeneralComponents/BoxWrapper";
import PatientScheduler from "../Scheduling/PatientScheduler";
import TabContent from "./TabContent";
import UserInformation from "./UserInformation";
import { Box, Typography, Grid,  Slide } from '@mui/material';

const ProfileBody = (props) => {
  const {
    isClinic,
    userProfile,
    profileComponentLeft,
    profileComponentRight,
    activeTab,
  } = props;





  return (
    
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TabContent value={activeTab} index={0}>
            <BoxWrapper type="profileLeft">
              <Typography variant="h5" gutterBottom>
                User Information
              </Typography>
              <UserInformation userProfile={userProfile} />
              {profileComponentLeft}
            </BoxWrapper>
          </TabContent>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TabContent value={activeTab} index={0}>
            <BoxWrapper type="profileRight">
              {profileComponentRight}
            </BoxWrapper>
          </TabContent>
        </Grid>
      {isClinic && (
        <TabContent value={activeTab} index={1}>
          <Box mt={3}>
            <Typography variant="h5" gutterBottom>
              Patient Scheduler
            </Typography>
            <PatientScheduler />
          </Box>
        </TabContent>
      )}
      </Grid>

  );
};



export default ProfileBody;
