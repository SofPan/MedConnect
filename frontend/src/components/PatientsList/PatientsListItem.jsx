import { useContext, useEffect, useState } from "react";
import { UserSignedIn } from "../../App";
import {
  Box,
  } from '@mui/material';
import CardWrapper from "../GeneralComponents/CardWrapper";

const PatientsListItem = (props) => {
  const {
          name,
          date_of_birth,
          gender,
          health_card,
          doctor,
        } = props;

  const formatBirthDate = (date) => {
    return date.split("T").shift();
  }
  
  return(
    <li>
      <Box type="div" margin="24px auto" >
        <CardWrapper >
            <Box type="div" width="100%" padding="20px">    
              <p><b>Name:</b> {name}</p>
              {date_of_birth && <p><b>Date of birth:</b> {formatBirthDate(date_of_birth)}</p>}
              <p><b>Gender:</b> {gender} </p>
              <p><b>Health card:</b> {health_card}</p>
              <p><b>Doctor:</b> {doctor} </p>
            </Box>
        </CardWrapper>
      </Box>
    </li>
  )
}

export default PatientsListItem;