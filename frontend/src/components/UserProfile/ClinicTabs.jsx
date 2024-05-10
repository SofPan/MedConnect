import {
  Tabs,
  Tab,
  Box,
  } from '@mui/material';


const ClinicTabs = (props) => {
  const {activeTab, handleTabChange} = props;


  console.log(activeTab)
  
  return (
    <Box marginRight={"50px"} width="20vw" display={'inline-block'} borderRight={'1px solid lightgrey'}>
      <Tabs value={activeTab} onChange={handleTabChange} orientation='vertical'>
        <Tab label="Clinic Profile"/>
        <Tab label="Scheduling"/>
      </Tabs>
    </Box>
  )
}

export default ClinicTabs;