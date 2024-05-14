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
      <Card className="roster">
        <Box width="50px" height="50px" borderRadius={'50%'}>
          <img src={photo} alt={name}/>
        </Box>
        <div>    
          <p>{name} <br />
              Can accept {patients} more patients
          </p>
          <p> {qualifications} </p>
        </div>
        <div>
          <AccordionWrapper title={"Edit"}>
            <EditDoctorForm doctor={doctor}/>
          </AccordionWrapper>
          <Button onClick={handleClickDelete}>Delete</Button>
        </div>
      </Card>
    </li>
  )
}

export default DoctorsListItem;