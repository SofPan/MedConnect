
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

  const [events, setEvents] = useState([])
  const [singleAppointmentDisplay, setsingleAppointmentDisplay] = useState(false);
  const [appointment_id, setappointment_id] = useState('');
  const [appointmentInfo, setappointmentInfo] = useState({
    id: "",
    patient_id: "",
    doctor_id: "",
    patient_name: '',
    doctor_name: '',
    start_time: new Date(),
    end_time: new Date(),
    clinic_id: '',
    status: true,
    created_at: new Date(),
    clinic_address: ''
  });


  const getAppointments = async () => {


    if (userState.userInfo.is_clinic) {
   
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


  useEffect(() => {

    const fetchAppointments = async () => {

      const appointments = await getAppointments();



      if (appointments) {
        const dates = appointments.map((date) => {
          return {
            extendedProps: {
              appointmentId: 2
            }, title: date.patient_name, start: date.start_time, end: date.end_time
          }
        })

        setEvents(dates);
      }

    };

    fetchAppointments();

  }, [userState.userInfo]);

  useEffect(() => {
    

    if (appointment_id) {
      
      const getAppointment = async () => {
        
        if (appointment_id) {

          console.log("yo dawg this is getting a single appointments", appointment_id);
    
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
            const responseData = await response.json();
            
            setappointmentInfo(responseData)
          setsingleAppointmentDisplay(!singleAppointmentDisplay)
            
            
          } catch (error) {
            console.error('Error registering user:', error);
            // Handle error
          }
        }
      };

      getAppointment();
  }



  }, [appointment_id]);

 



  const handleDateClick =  (e) => {

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
      {singleAppointmentDisplay ? <SingleAppointment doctor_name={appointmentInfo.doctor_name}
        details={appointmentInfo.start_time}
        clinic_address={appointmentInfo.address}
        status={appointmentInfo.status}
        appointment={"hehehehehe"}
        user_id={1} 
        patient_name={appointmentInfo.patient_name}
        start_time={appointmentInfo.start_time}
        end_time={appointmentInfo.end_time}/> :
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

