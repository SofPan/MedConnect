import { useContext } from 'react';
import { UserSignedIn } from '../../App';
import NewDoctorForm from '../DoctorsList/NewDoctor';
import AccordionWrapper from '../GeneralComponents/AccordionWrapper';
import BoxWithScroll from "../GeneralComponents/BoxWithScroll";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import List from '../List/List';
import DoctorsListItem from '../List/DoctorsListItem';

const ProfileDoctors = (props) => {
  const { userProfile } = props;

  const { userState } = useContext(UserSignedIn);

  const filterDoctorsByClinicId = userState.doctors.filter(doctor => {
    return doctor.clinic_id === userProfile.id;
  });

  return (
    <>
      <div>
        <Typography variant="h3">Doctors</Typography>
        <Box className="my-8">
          <AccordionWrapper title="New">
            <NewDoctorForm
              clinic_id={userProfile.id}
            />
          </AccordionWrapper>
        </Box>
      </div>
      <BoxWithScroll height="80vh">
        <List listItems={filterDoctorsByClinicId} ItemComponent={DoctorsListItem} />
      </BoxWithScroll>
    </>

  )
}

export default ProfileDoctors;