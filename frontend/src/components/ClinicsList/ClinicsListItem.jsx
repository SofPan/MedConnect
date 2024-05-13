import { useContext, useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";
import { useNavigate } from "react-router-dom";
import { UserSignedIn } from "../../App";
import { Button } from "@mui/material";
import axios from "axios";

const ClinicListItem = (props) => {
  const {name, address, id, distance, setErrorMessage} = props;
  const { userState, dispatch } = useContext(UserSignedIn);
  let navigate = useNavigate();

  const clinicInfo = {
    clinic_id: id,
    clinic_name: name,
    clinic_address: address
  }

  const [visible, setVisible] = useState(true);

 

  // If there are no doctors to display, hide clinic from list
  // const checkIfRenderClinic = render => {
  //   setVisible(render);
  // };

  const [alterDoctors, setAlterDoctors] = useState(0);
  const triggerDoctorStateUpdate = () => {
    setAlterDoctors(alterDoctors + 1);

  }

  const handleRequest = (info) => {
    if (userState.userInfo.id && !userState.userInfo.is_clinic) {
      dispatch({ type: "SET_CLINIC_INFO", payload: info});
      axios.get(`http://localhost:8080/patients/${userState.userInfo.id}`)
      .then((res) => {
          if(res.data) {
            navigate("/register");
          } else {
            setErrorMessage("Please, submit the required information to register with a doctor")
            navigate("/required_information");
          }
      })
      .catch(error => {
          console.error("Error fetching patient:", error);
        });
    
    }  else if (!userState.userInfo.id) {
      setErrorMessage("Please login or sign up to register with a doctor");
    } else {
      setErrorMessage("You cannot register with a doctor. Please, login or sign up as a patient");
    }
  }

  return(
    <>
    { visible &&
      <li>
        <div>
          <p>
            {name} <br />
            {address} <br />
            distance: {distance} km
          </p>
          <DoctorsList 
            clinic_id={id} 
            // renderClinic={checkIfRenderClinic}
            changeDoctorState={triggerDoctorStateUpdate}
          />
        </div>
        <div>
            <Button onClick={() => handleRequest(clinicInfo)}>Request to Register</Button>
        </div>
      </li>
    }
    </>
  )
}

export default ClinicListItem;