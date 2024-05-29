
import React, { useState, useContext, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import SingleAppointment from '../AppointmentsList/SingleAppointment';

import Box from '@mui/material/Box';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { UserSignedIn } from "../../App"
import { Typography } from '@mui/material';




export default function PatientScheduler() {

  const { userState } = useContext(UserSignedIn);


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
    clinic_address: '',
    clinic_name:''
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
        const responseData = await response.json();

        return responseData;

      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error
      }
    }
  }

  
  useEffect(() => {
    
    if(userState.userInfo.is_clinic){
      const fetchAppointments = async () => {

        const appointments = await getAppointments();
        
       
        if (appointments) {
          const dates = appointments.map((date) => {
            if(date.patient_name === null){
              return {
                extendedProps: {
                  appointmentId: date.id
                }, title: "Available", start: date.start_time, end: date.end_time, 
              }
            }
            return {
              extendedProps: {
                appointmentId: date.id
              }, title: date.patient_name, start: date.start_time, end: date.end_time, 
            }
          })
          console.log('these are the dates from get appointments', dates);
          setEvents(dates);
          
          
        }
  
      };
  
      fetchAppointments();
    }

    
    

  }, [userState.userInfo.is_clinic, singleAppointmentDisplay]);

  useEffect(() => {
    
    
    if (appointment_id) {
      
      const getAppointment = async () => {
        
        if (appointment_id) {

    
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
    <Box sx={{width:'90vh'}}>
      {singleAppointmentDisplay ? <SingleAppointment doctor_name={appointmentInfo.doctor_name}
        details={appointmentInfo.start_time}
        clinic_address={appointmentInfo.address}
        status={appointmentInfo.status}
        id={appointmentInfo.id} 
        patient_name={appointmentInfo.patient_name}
        start_time={appointmentInfo.start_time}
        end_time={appointmentInfo.end_time}
        clinic_id={appointmentInfo.clinic_id}
        clinic_name={appointmentInfo.clinic_name}
        patient_id={appointmentInfo.patient_id}
        doctor_id={appointmentInfo.doctor_id}
        setsingleAppointmentDisplay={setsingleAppointmentDisplay}
        singleAppointmentDisplay={singleAppointmentDisplay}/>
        :
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant="h3">Clinic Appointments</Typography>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView='timeGridWeek'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            slotMinTime={"09:00:00"}
            slotMaxTime={"22:00:00"}
            eventClick={handleDateClick}
            eventColor='#800020'
          />
        </LocalizationProvider>}

    </Box>
  );
}

