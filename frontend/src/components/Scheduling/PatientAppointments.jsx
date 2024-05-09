import { useState, useEffect } from "react";
import { fetchPatientAppointments } from '../../hooks/tempUseAPI';
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import AppointmentsList from "../AppointmentsList/AppointmentsList";

const PatientAppointments = (props) => {
  const {patient_id } = props;
  const [appointments, setAppointments] = useState([]);
  const [unbookedAppointments, setUnbookedAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentData = await fetchPatientAppointments(patient_id);
      setAppointments(appointmentData);
    }

    const fetchUnbookedAppointments = async () => {
      console.log("fetching unbooked appointments...");
    }

    
    if (patient_id){
      fetchAppointments();
      // fetchUnbookedAppointments();
    }
  }, [patient_id]);

  return(
    <>
      <h2>Appointments</h2>
      <AccordionWrapper title="Request">
        <div className="appointments-open" >
          {/* <AppointmentsList patient_id={null} appointments={DUMMY_OPEN_APPOINTMENTS} user_id={patient_id} /> */}
        </div>
      </AccordionWrapper>                
      {!appointments.length 
        ? 
        <span>You do not have any appointments booked</span>
        :
        <div className="appointments-booked">
          <AppointmentsList patient_id={patient_id} appointments={appointments}/>
        </div>
        }
    </>
  )
}

export default PatientAppointments;