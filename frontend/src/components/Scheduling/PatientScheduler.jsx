
import React, { useState, useContext, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import SingleAppointment from '../AppointmentsList/SingleAppointment';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import Grid from '@mui/material/Grid';

import { UserSignedIn } from "../../App"




export default function PatientScheduler() {

  const { userState, dispatch } = useContext(UserSignedIn);

  const [events, setEvents ] = useState([])
  const [singleAppointmentDisplay, setsingleAppointmentDisplay ] = useState(false);
  const [appointment_id, setappointment_id ] = useState();
  const [appointment, setappointmentInfo ] = useState( {
    id:"",
    patient_id: "",
    doctor_id: "",
    patient_name: '',
    doctor_name: '',
    start_time: new Date(),
    end_time: new Date(),
    clinic_id: '',
    status: true,
    created_at: new Date(),
    address: ''
  });


  const getAppointments = async () => {

   
    if (userState.userInfo.is_clinic) {
      console.log("yo dawg this is getting some appointments");
      try {
        const response = await fetch(`http://localhost:8080/appointments/${userState.userInfo.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }
        const responseData = response.json();

        
        


       return responseData;

      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error
      }
    }
  }

  const getAppointmentbyId = async (appointment_id) => {

   
    if (userState.userInfo.is_clinic) {

      console.log("yo dawg this is getting a single appointments");

      try {
        const response = await fetch(`http://localhost:8080/appointments/single/${appointment_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }
        const responseData = response.json();

        
        


       return responseData;

      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error
      }
    }
  }

  useEffect(() => {
   
    const fetchAppointments = async () => {

      const appointments = await getAppointments();

      

      if (appointments) {
        const dates = appointments.map((date)=>{
          return {extendedProps: {
            appointmentId: 2 
          },title:date.patient_name,start:date.start_time, end: date.end_time}
        })

        setEvents(dates);
      }
     
    };

    fetchAppointments();
    
  }, [userState.userInfo]);

  useEffect(() => {
   
    const getAppointment = async () => {

      const appointment = await getAppointmentbyId(appointment_id);

      

      if (appointment) {
        return appointment
      }
      
    };

    setappointmentInfo(getAppointment());

    
    
  }, [appointment_id]);
  useEffect(() => {
   
    setsingleAppointmentDisplay(!singleAppointmentDisplay)

    
    
  }, [appointment]);



  const handleDateClick = async (e) =>{
    
    setappointment_id(e.event.extendedProps.appointmentId);
    
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.time}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }



  return (
    <div>
       {singleAppointmentDisplay ? <SingleAppointment doctor_name={appointment.doctor_name}
    details={appointment.start_time}
    clinic_address={appointment.address}
    status={appointment.status}
    appointment={"hehehehehe"}
    user_id={1}/>  :
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Clinic Appointments</h1>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          weekends={false}
          events={events}
          eventContent={renderEventContent}
          slotMinTime={"00:00:00"}
          slotMaxTime={"23:00:00"}
          eventClick={handleDateClick}
        />
      </LocalizationProvider>}
      
    </div>
  );
}

