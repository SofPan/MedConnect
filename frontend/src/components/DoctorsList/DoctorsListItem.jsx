import { useState } from "react";
import {Button} from '@mui/material';
import { deleteDoctor } from "../../hooks/tempUseAPI";

const DoctorsListItem = (props) => {
  const {name, qualifications, photo, patients, id} = props;


  const handleClickDelete = async () => {
    return await deleteDoctor(id);
  }
  return(
    <li>
      {/* For Available Doctors page */}
      <span className="available-doctors">
        <p>{name} accepting {patients} patients </p>
      </span>
      {/* For Clinic Profile Page */}
      <span className="roster">
        <div>
          <img src={photo} alt={name}/>
        </div>
        <div>    
          <p>{name} <br />
              Can accept {patients} more patients
          </p>
          <p> {qualifications} </p>
        </div>
        <div>
          <Button>Edit</Button>
          <Button onClick={handleClickDelete}>Delete</Button>
        </div>
      </span>
    </li>
  )
}

export default DoctorsListItem;