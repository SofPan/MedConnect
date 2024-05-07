import { useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";

const ClinicListItem = (props) => {
  const {name, address, id, distance, doctors} = props;

  const [visible, setVisible] = useState(true);
 

  // If there are no doctors to display, hide clinic from list
  // const checkIfRenderClinic = render => {
  //   setVisible(render);
  // };

  const [alterDoctors, setAlterDoctors] = useState(0);
  const triggerDoctorStateUpdate = () => {
    setAlterDoctors(alterDoctors + 1);
  }

  return(
    <>
    { visible &&
      <li>
        <div>
          <p>
            {name} <br />
            {address} <br />
            distance: {distance/1000} km
          </p>
          <DoctorsList 
            clinic_id={id} 
            doctors={doctors}
            // renderClinic={checkIfRenderClinic}
            changeDoctorState={triggerDoctorStateUpdate}
          />
        </div>
        <div>
            <button on>Request to Register</button>
        </div>
      </li>
    }
    </>
  )
}

export default ClinicListItem;