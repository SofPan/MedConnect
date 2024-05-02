import { useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";

const ClinicListItem = (props) => {
  const {name, address, id, distance, doctors} = props;

  const [visible, setVisible] = useState(true);

  // If there are no doctors to display, hide clinic from list
  // const checkIfRenderClinic = render => {
  //   setVisible(render);
  // };

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
          />
        </div>
        <div>
            <button>Request to Register</button>
        </div>
      </li>
    }
    </>
  )
}

export default ClinicListItem;