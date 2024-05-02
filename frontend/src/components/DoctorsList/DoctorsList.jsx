import axios from "axios";
import DoctorsListItem from "./DoctorsListItem";

const DoctorsList = (props) => {
  const {clinic_id, renderClinic, doctors} = props;

  const mapAndFilterDoctors = doctors.filter(doctor => {
      // Only show the Clinic's doctors that are accepting patients
      return doctor.clinic_id === clinic_id && doctor.number_of_patients
    })
    .map(doctor => {
      return <DoctorsListItem
              key={doctor.id}
              name={doctor.name}
              qualifications={doctor.qualifications}
              photo={`./assets/images/${doctor.photo_url}`}
              patients={doctor.number_of_patients}
            />
    });

  //   // renderClinic(mapAndFilterDoctors.length > 0);
  return(
    <ul>
      {mapAndFilterDoctors}
    </ul>
  )
}

export default DoctorsList;