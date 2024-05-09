import {
  Tabs,
  Tab,
  Box
} from '@mui/material';

const ClinicTabs = (props) => {
  return (
    <Box marginRight={"50px"} width="20vw" display={'inline-block'} borderRight={'1px solid lightgrey'}>
      <Tabs value={0} orientation='vertical'>
        <Tab label="Clinic Profile" tabIndex={0} value={0}/>
        <Tab label="Scheduling" tabIndex={1} value={1}/>
      </Tabs>
    </Box>
  )
}

export default ClinicTabs;