import React, { useState, useContext } from "react";
import { UserSignedIn } from "../../App";
import { useTheme } from '@mui/material/styles';
import { 
  Box, 
  Card, 
  Typography, 
  Button, 
  Grid, 
  Avatar, 
  IconButton, 
  ListItemSecondaryAction, 
  CardMedia,
  Divider,
  Paper
} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import EditDoctorForm from "./EditDoctor";
import { useDelete } from "../../hooks/useAPI";
import DoctorsListItem from "./DoctorsListItem";
import EditIcon from '@mui/icons-material/Edit';


const DoctorsList = (props) => {
  const { clinic_id } = props;
  const { userState } = useContext(UserSignedIn);
  const [activeStep, setActiveStep] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { deleteRecord } = useDelete();
  const { dispatch } = useContext(UserSignedIn);
  const [isEditFormExpanded, setIsEditFormExpanded] = useState(false);

  const handleEditClick = () => {
    setIsEditFormExpanded(!isEditFormExpanded);
  };

  const theme = useTheme();

  const mapAndFilterDoctors = userState.doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinic_id && doctor.number_of_patients;
  });

  const maxSteps = mapAndFilterDoctors.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleClickDelete = () => {
    setDeleting(true);
  }

  return (
    <Box p={3}>
     
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar  alt={mapAndFilterDoctors[activeStep].name}
                    src={`/assets/images/${mapAndFilterDoctors[activeStep].photo_url}`}
                    sx={{ width: 150, height: 150 }} />
            <Typography variant="h5" mt={2}>{mapAndFilterDoctors[activeStep].name}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">
              Accepting {mapAndFilterDoctors[activeStep].number_of_patients} patients
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              {mapAndFilterDoctors[activeStep].qualifications}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12}>
     
      <AccordionWrapper title={ <EditIcon />} >
        <EditDoctorForm doctor={mapAndFilterDoctors[activeStep].doctor} />
      </AccordionWrapper>
    </Grid>

        <Grid item xs={12}>
          
            <IconButton onClick={handleClickDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
         
        </Grid>

        <Grid item xs={12}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorsList;
