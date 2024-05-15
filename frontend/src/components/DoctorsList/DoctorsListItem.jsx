import React, { useContext, useEffect, useState } from "react";
import { useDelete } from "../../hooks/useAPI";
import EditDoctorForm from "./EditDoctor";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import { UserSignedIn } from "../../App";

const DoctorsListItem = (props) => {
  const {
    name,
    qualifications,
    photo,
    patients,
    id,
    doctor,
  } = props;

  const [deleting, setDeleting] = useState(false);
  const { deleteRecord } = useDelete();
  const { dispatch } = useContext(UserSignedIn);

  useEffect(() => {
    if (deleting) {
      deleteRecord("doctors", doctor.id);
      dispatch({ type: "DELETE_DOCTOR", payload: doctor });
    }
  }, [deleting]);

  const handleClickDelete = () => {
    setDeleting(true);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Avatar alt={name} src={photo} sx={{ width: 60, height: 60 }} />
            </Box>
            <Box flex="1" ml={2}>
              <Typography variant="h6" component="h2">
                {name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Accepting {patients} patients
              </Typography>
              <Typography variant="body2" component="p">
                {qualifications}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <AccordionWrapper title="Edit">
            <EditDoctorForm doctor={doctor} />
          </AccordionWrapper>
          <Button onClick={handleClickDelete} color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DoctorsListItem;
