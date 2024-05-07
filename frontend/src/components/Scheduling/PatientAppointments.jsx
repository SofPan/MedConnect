import { useState, useEffect } from "react";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";

const DUMMY_APPOINTMENTS = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    details: '2024-05-12 09:00:00',
    clinic_id: 1,
    status: false
  },
  {
    id: 2,
    patient_id: 1,
    doctor_id: 1,
    details: '2024-05-16 09:00:00',
    clinic_id: 1,
    status: false
  },
  {
    id: 3,
    patient_id: 2,
    doctor_id: 2,
    details: '2024-05-20 09:00:00',
    clinic_id: 2,
    status: false
  },
  {
    id: 4,
    patient_id: 3,
    doctor_id: 3,
    details: '2024-05-01 09:00:00',
    clinic_id: 1,
    status: false
  }
];

const PatientAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);

  return(
    <>
    <AccordionWrapper title="Request">
        {/* <NewDoctorForm 
          clinic_id={userProfile.id}
          addDoctor={triggerDoctorStateUpdate}
        /> */}
      </AccordionWrapper>                
      {!appointments.length && <span>You do not have any appointments booked</span>}
      {/* <DoctorsList clinic_id={userProfile.id} doctors={doctors} changeDoctorState={triggerDoctorStateUpdate} /> */}
    </>
  )
}

export default PatientAppointments;