import { useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";

const ClinicListItem = (props) => {
  const {name, address, id} = props;

  const [visible, setVisible] = useState(true);

  // If there are no doctors to display, hide clinic from list
  const checkIfRenderClinic = render => {
    setVisible(render);
  };
  
  return(
    <>
    { visible &&
      <li>
        <div>
          <p>
            {name} <br />
            {address}
          </p>
          {/* <DoctorsList 
            clinic_id={id} 
            renderClinic={checkIfRenderClinic}
          /> */}
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