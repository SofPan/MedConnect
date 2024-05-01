import DoctorsList from "../DoctorsList/DoctorsList";

const ClinicListItem = (props) => {
  const {name, address, id} = props;

  // If there are no doctors to display, hide clinic from list
  const checkIfRenderClinic = render => render;
  return(
    <>
      {
        checkIfRenderClinic && 
        <li>
          <p>
            {name} <br />
            {address}
          </p>
          <DoctorsList clinic_id={id}/>
        </li>
      }
    </>
  )
}

export default ClinicListItem;