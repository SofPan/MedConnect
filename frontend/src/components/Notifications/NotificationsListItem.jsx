const NotificationsListItem = (props) => {
  const {
    id,
    patient_id,
    doctor_id,
    type,
    appointment_id
  } = props;

  const requestType = (requestType) => {
    let message = "";
    if (requestType === "register") {
      message = `to register with ${doctor_id}.`
    } else if (requestType === "appointment") {
      message = `to book ${appointment_id} with ${doctor_id}.`
    } else {
      message = `to change doctors to ${doctor_id}.`
    }

    return message;
  }
  return(
    <li>{patient_id} is requesting {requestType(type)}</li>
  )
}

export default NotificationsListItem;