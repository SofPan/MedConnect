import { useState, useEffect } from "react";
import AccordionWrapper from "../GeneralComponents/AccordionWrapper";


const AppointmentsList = (props) => {
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

export default AppointmentsList;