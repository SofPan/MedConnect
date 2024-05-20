import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserSignedIn } from "../../App";
import PatientsListItem from "./PatientsListItem";
import { Typography } from "@mui/material";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const { userState, dispatch } = useContext(UserSignedIn);

  useEffect(() => {
    axios.get(`http://localhost:8080/patients/clinic/${userState.userInfo.id}`)
      .then(response => {
        setPatients(response.data);
        console.log('Response:', response);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const mapAndFilterPatients = patients.map(patient => (
     <PatientsListItem 
        key={patient.id} 
        id={patient.id}
        name={patient.name}
        date_of_birth={patient.date_of_birth}
        gender={patient.gender}
        health_card={patient.health_card}
        doctor={patient.doctor}/>  
  ));

  return (
    <>
      <Typography variant="h3" className="pl-6">Current Patients</Typography>
      {!mapAndFilterPatients.length && <div width="100%" className="flex justify-center text-center mt-4"><p className="text-red-500">You do not have any patients listed.</p></div>}
      <div className="flex flex-wrap">
        
        {mapAndFilterPatients}
      </div>
    </>
  );
}

export default PatientsList;
