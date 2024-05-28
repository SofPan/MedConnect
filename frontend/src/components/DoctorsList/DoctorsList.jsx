import { useContext } from "react";
import DoctorsListItem from "../List/DoctorsListItem";
import { UserSignedIn } from "../../App";

const DoctorsList = (props) => {
  const { clinic_id } = props;
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

  return (
    <ul>
      {!mapAndFilterDoctors.length && <span>You do not have any doctors listed</span>}
      {mapAndFilterDoctors}
    </ul>
  )
}

export default DoctorsList;