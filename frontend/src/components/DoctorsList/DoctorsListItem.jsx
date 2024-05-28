import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import { useDelete } from "../../hooks/useAPI";
import EditDoctorForm from "./EditDoctor";
import {
  Box,
    Button,
  } from '@mui/material';
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import CardWrapper from "../GeneralComponents/CardWrapper";

const DoctorsListItem = (props) => {
  const {
          data
        } = props;

  const [deleting, setDeleting] = useState(false);
  const {deleteRecord} = useDelete();
  const {dispatch} = useContext(UserSignedIn);
  
  console.log("data", data);

  useEffect(() => {
    if (deleting) {
      deleteRecord(
        'doctors',
        data.id
      )
      dispatch({type: "DELETE_data", payload: data});
    }
    
  }, [deleting]);

  const handleClickDelete = () => {
    setDeleting(true);
  }

  return(
    <li>
      {/* For Available Doctors page */}
      <span className="available-doctors">
        <p>{data.name} accepting {data.number_of_patients} patients </p>
      </span>
      {/* For Clinic Profile Page */}
      <Box type="div" margin="24px auto" >
        <CardWrapper class="roster" >
            <Box type="div" className="pr-4">
              <img src={`./../assets/images/${data.photo_url}`} alt={data.name}/>
            </Box>
            <Box type="div" width="40%" className="border-r-2 border-red-900 ">    
              <p><strong>{data.name}</strong> <br />
                  Can accept {data.number_of_patients} more patients
              </p>
              <p> <small><i>{data.qualifications}</i></small></p>
            </Box>
            <Box type='div' sx={{width: "40%"}} className="flex flex-col justify-evenly ml-4" >
              <AccordionWrapper title={"Edit"}>
                <EditDoctorForm data={data}/>
              </AccordionWrapper>
              <Button onClick={handleClickDelete} sx={{marginTop: "12px"}}>Delete</Button>
            </Box>
        </CardWrapper>
      </Box>
    </li>
  )
}

export default DoctorsListItem;