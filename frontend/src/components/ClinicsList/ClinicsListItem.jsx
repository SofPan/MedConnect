import { useContext, useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";
import { useNavigate } from "react-router-dom";
import { UserSignedIn } from "../../App";
import { Button } from "@mui/material";

const ClinicListItem = (props) => {
  const {name, address, id, distance} = props;
  const { dispatch } = useContext(UserSignedIn);
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
    dispatch({ type: "SET_CLINIC_INFO", payload: info});
    navigate("/register");
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