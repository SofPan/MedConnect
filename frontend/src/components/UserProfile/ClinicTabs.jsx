import {
  Tabs,
  Tab,
  Box,
  } from '@mui/material';


const ClinicTabs = (props) => {
  const {activeTab, handleTabChange} = props;

  
  return (
    <Box sx={{
      marginRight: "50px",
      width: "15%",
      display: 'inline-flex',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      borderRight: '1px solid lightgrey',
      height: "80vh",
      paddingTop: "50px"
    }}>
      <Tabs value={activeTab} onChange={handleTabChange} orientation='vertical'>
        <Tab label="Clinic Profile" />
        <Tab label="Scheduling"/>
        <Tab label="Patients" />
      </Tabs>
    </Box>
  )
}

export default ClinicTabs;