import React, { useEffect, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar({ inputValue }) {
  const [events, setEvents] = useState([{ title: 'Event 1', start: new Date('2024-05-01T10:00:00') }]);

  const handleDateClick = (e) => {
    const newEvent = { title: inputValue, start: e.dateStr };
    setEvents(prev => [...prev, newEvent]);
  }

  const clinicId = '1';

  const initialEvents = async (clinicId) => {
    try {
      const response = await fetch(`http://localhost:8080/calendar/${clinicId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get appointments');
      }

      const data = await response.json();
      const newEvent = { title: "IT WORKED", start: new Date(data.details) };
      setEvents(prev => [...prev, newEvent]);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  useEffect(() => {
    initialEvents(clinicId);
  }, []);

  console.log(events);

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
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        dateClick={(e) => handleDateClick(e)}
        slotMinTime={"10:00:00"}
        slotMaxTime={"20:00:00"}
      />
    </div>
  );
}
