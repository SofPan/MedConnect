import DoctorsListItem from "./DoctorsListItem";

const DoctorsList = (props) => {
  const {clinic_id, doctors, changeDoctorState} = props;

  const mapAndFilterDoctors = doctors.filter(doctor => {
      // Only show the Clinic's doctors that are accepting patients
      return doctor.clinic_id === clinic_id && doctor.number_of_patients
    })
    .map(doctor => {
      return <DoctorsListItem
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              qualifications={doctor.qualifications}
              photo={`./assets/images/${doctor.photo_url}`}
              patients={doctor.number_of_patients}
              changeDoctorState={changeDoctorState}
            />
    });

  return(
    <ul>
      {mapAndFilterDoctors}
    </ul>
  )
}

export default DoctorsList;