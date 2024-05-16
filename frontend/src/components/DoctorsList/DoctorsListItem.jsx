import { useContext, useEffect, useState } from "react";
import { useDelete } from "../../hooks/useAPI";
import EditDoctorForm from "./EditDoctor";
import {
  Box,
    Button,
    Card,
  } from '@mui/material';
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
  const {deleteRecord} = useDelete();
  const {dispatch} = useContext(UserSignedIn)


  useEffect(() => {
    if (deleting) {
      deleteRecord(
        'doctors',
        doctor.id
      )
      dispatch({type: "DELETE_DOCTOR", payload: doctor});
    }
    
  }, [deleting]);

  const handleClickDelete = () => {
    setDeleting(true);
  }

  return(
    <li>
      {/* For Available Doctors page */}
      <span className="available-doctors">
        <p>{name} accepting {patients} patients </p>
      </span>
      {/* For Clinic Profile Page */}
      <Box type="div" margin="24px auto" >
        <Card className="roster" sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', minHeight: "150px"}} >
            <Box type="div" maxWidth={"15%"}>
              <img src={photo} alt={name}/>
            </Box>
            <Box type="div" width="40%">    
              <p>{name} <br />
                  Can accept {patients} more patients
              </p>
              <p> {qualifications} </p>
            </Box>
            <Box type='div' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: "40%"}} >
              <AccordionWrapper title={"Edit"}>
                <EditDoctorForm doctor={doctor}/>
              </AccordionWrapper>
              <Button onClick={handleClickDelete} sx={{marginTop: "12px"}}>Delete</Button>
            </Box>
        </Card>
      </Box>
    </li>
  )
}

export default DoctorsListItem;