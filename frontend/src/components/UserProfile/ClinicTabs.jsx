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
      width: "20vw",
      display: 'inline-flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      borderRight: '1px solid lightgrey',
      height: "80vh"
    }}>
      <Tabs value={activeTab} onChange={handleTabChange} orientation='vertical' height="100%">
        <Tab label="Clinic Profile"/>
        <Tab label="Scheduling"/>
      </Tabs>
    </Box>
  )
}

export default ClinicTabs;