import { useState, useEffect } from "react";
import { useGet } from "../../hooks/useAPI";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import AppointmentsList from "../AppointmentsList/AppointmentsList";
import UnbookedAppointments from "./UnbookedAppointments";

const PatientAppointments = (props) => {
  const { userProfile } = props;
  const [appointments, setAppointments] = useState([]);

  const {loading, data} = useGet(
    'appointments/patients',
    userProfile.id
  )

  useEffect(() => {
    data && setAppointments(data);
  }, [data]);

  return(
    <>
      <h2>Appointments</h2>
      <AccordionWrapper title="Request">
        <UnbookedAppointments userProfile={userProfile}/>
      </AccordionWrapper>                
      {!appointments.length 
        ? 
        <span>You do not have any appointments booked</span>
        :
        <div className="appointments-booked">
          <AppointmentsList patient_id={userProfile.id} appointments={appointments}/>
        </div>
        }
    </>
  )
}

export default PatientAppointments;