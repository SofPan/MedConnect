import { useContext } from "react";
import DoctorsListItem from "./DoctorsListItem";
import UserSignedIn from "../GeneralComponents/UserSignedIn";

const DoctorsList = (props) => {
  const {clinic_id} = props;
  const { userState } = useContext(UserSignedIn);

  const mapAndFilterDoctors = userState.doctors.filter(doctor => {
      // Only show the Clinic's doctors that are accepting patients
      return doctor.clinic_id === clinic_id && doctor.number_of_patients
    })
    .map(doctor => {
      return <DoctorsListItem
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              qualifications={doctor.qualifications}
              photo={`./../assets/images/${doctor.photo_url}`}
              patients={doctor.number_of_patients}
              doctor={doctor}
            />
    });

  return(
    <ul>
      {!mapAndFilterDoctors.length && <li><span>You do not have any doctors listed</span></li>}
      {mapAndFilterDoctors}
    </ul>
  )
}

export default DoctorsList;