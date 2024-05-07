import { useState, useEffect } from "react";
import { fetchPatientAppointments } from '../../hooks/tempUseAPI';
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";
import AppointmentsList from "../AppointmentsList/AppointmentsList";

// Appointments that have not been claimed
const DUMMY_OPEN_APPOINTMENTS = [
  {
    id: 1,
    patient_id: null,
    doctor_id: 1,
    details: '2024-05-16T13:00:00.000Z',
    clinic_id: 1,
    status: false
  },
  {
    id: 2,
    patient_id: null,
    doctor_id: 1,
    details: '2024-05-20T9:00:00.000Z',
    clinic_id: 1,
    status: false
  },
]

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

    fetchUnbookedAppointments();

    if (patient_id){
      fetchAppointments();
    }
  }, [patient_id]);

  return(
    <>
      <AccordionWrapper title="Request">
        <div className="appointments-open" >
          <AppointmentsList patient_id={null} appointments={DUMMY_OPEN_APPOINTMENTS} user_id={patient_id} />
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