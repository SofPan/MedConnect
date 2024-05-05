import React, { useEffect, useState, useCallback, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import { UserSignedIn } from '../../App';

export default function Calendar({ inputValue }) {
  

    const { userState } = useContext(UserSignedIn);
    console.log(userState)
  const handleDateClick = (e) => {
    const newEvent = { title: inputValue, start: e.dateStr };
    // setEvents(prev => [...prev, newEvent]);
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
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        weekends={false}
        events={userState.events}
        eventContent={renderEventContent}
        dateClick={(e) => handleDateClick(e)}
        slotMinTime={"10:00:00"}
        slotMaxTime={"20:00:00"}
      />
    </div>
  );
}
