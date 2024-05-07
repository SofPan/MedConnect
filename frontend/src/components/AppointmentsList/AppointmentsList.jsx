import AppointmentsListItem from "./AppointmentsListItem"

const AppointmentsList = (props) => {
  const {
    patient_id,
    appointments
  } = props;

  const mapAndFilterAppointments = appointments.filter(appointment => {
    // Only show the Clinic's appointments that are accepting patients
    return appointment.patient_id === patient_id
  })
  .map(appointment => {
    return <AppointmentsListItem
            key={appointment.id}
            id={appointment.id}
            doctor_id={appointment.doctor_id}
            details={appointment.details}
            clinic_id={appointment.clinic_id}
            status={appointment.status}
            appointment={appointment}
          />
  });

  return(
    <ul>
      {mapAndFilterAppointments}
    </ul>
  )
}

export default AppointmentsList;