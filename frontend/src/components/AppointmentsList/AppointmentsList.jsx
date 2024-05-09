import AppointmentsListItem from "./AppointmentsListItem"

const AppointmentsList = (props) => {
  
  const {
    appointments,
    user_id
  } = props;
  
  const mapAppointments = appointments.map(appointment => {

    return <AppointmentsListItem
            key={appointment.id}
            id={appointment.id}
            doctor_name={appointment.doctor_name}
            start_time={appointment.start_time}
            end_time={appointment.end_time}
            clinic_address={appointment.clinic_address}
            status={appointment.status}
            appointment={appointment}
            user_id={user_id}
          />
  });

  return(
    <ul>
      {mapAppointments}
    </ul>
  )
}

export default AppointmentsList;