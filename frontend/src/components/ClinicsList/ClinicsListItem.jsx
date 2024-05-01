import DoctorsList from "../DoctorsList/DoctorsList";

const ClinicListItem = (props) => {
  const {name, address, id} = props;
  return(
    <li>
      <p>
        {name} <br />
        {address}
      </p>
      <DoctorsList clinic_id={id}/>
    </li>
  )
}

export default ClinicListItem;