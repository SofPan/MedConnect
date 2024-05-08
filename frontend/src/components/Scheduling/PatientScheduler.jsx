
import React, { useState, useContext, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import Grid from '@mui/material/Grid';

import { UserSignedIn } from "../../App"




export default function PatientScheduler() {

  const { userState, dispatch } = useContext(UserSignedIn);

  const [events, setEvents ] = useState([])


  const getClinicByUserId = async () => {

    const userId = sessionStorage.getItem("user_id");

    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      
      const responseData = await response.json();


      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      
      return responseData;

    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  }


  const getAppointments = async () => {

   
    
    const clinic = await getClinicByUserId();
    
    
   
    if (userState.is_clinic) {

      try {
        const response = await fetch(`http://localhost:8080/appointments/${clinic.id}`, {
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
      console.log(appointments);
      if (appointments) {
        const dates = appointments.map((date)=>{
          return {id:date.id,title:date.patient_name,start:date.start_time, end: date.end_time}
        })

        setEvents(dates);
      }
     
    };

    fetchAppointments();
    
  }, []);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.time}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

console.log(events);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Clinic Appointments</h1>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          weekends={false}
          events={events}
          eventContent={renderEventContent}
          slotMinTime={"10:00:00"}
          slotMaxTime={"20:00:00"}

        />
      </LocalizationProvider>
    </div>
  );
}

