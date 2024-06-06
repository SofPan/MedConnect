import { useContext, useEffect, useState } from "react";
import { useDelete } from "../../hooks/useAPI";
import EditDoctorForm from "./EditDoctor";
import {
  Box,
    Button,
  } from '@mui/material';
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import CardWrapper from "../GeneralComponents/CardWrapper";
import UserSignedIn from "../GeneralComponents/UserSignedIn";

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
        <CardWrapper class="roster" >
            <Box type="div" className="pr-4">
              <img src={photo} alt={name}/>
            </Box>
            <Box type="div" width="40%" className="border-r-2 border-red-900 ">    
              <p><strong>{name}</strong> <br />
                  Can accept {patients} more patients
              </p>
              <p> <small><i>{qualifications}</i></small></p>
            </Box>
            <Box type='div' sx={{width: "40%"}} className="flex flex-col justify-evenly ml-4" >
              <AccordionWrapper title={"Edit"}>
                <EditDoctorForm doctor={doctor}/>
              </AccordionWrapper>
              <Button onClick={handleClickDelete} sx={{marginTop: "12px"}}>Delete</Button>
            </Box>
        </CardWrapper>
      </Box>
    </li>
  )
}

export default DoctorsListItem;