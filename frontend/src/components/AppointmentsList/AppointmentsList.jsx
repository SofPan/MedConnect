import AppointmentsListItem from "./AppointmentsListItem"

const AppointmentsList = (props) => {
  
  const {
    appointments,
    user_id,
    appointmentDispatch,
    name
  } = props;
  
  const mapAppointments = appointments.map(appointment => {

    return <AppointmentsListItem
            key={appointment.id}
            id={appointment.id}
            doctor_name={appointment.doctor_name}
            doctor_id={appointment.doctor_id}
            start_time={appointment.start_time}
            end_time={appointment.end_time}
            clinic_address={appointment.clinic_address}
            clinic_id={appointment.clinic_id}
            status={appointment.status}
            appointment={appointment}
            user_id={user_id}
            appointmentDispatch={appointmentDispatch}
            name={name}
          />
  });

  return(
    <ul>
      {mapAppointments}
    </ul>
  )
}

export default AppointmentsList;