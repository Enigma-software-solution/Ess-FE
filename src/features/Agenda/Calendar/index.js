import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEventDrawer from "../CreateEventDrawer";
import EventDetailsDrawer from "../EventDetailsDrawer";
import {
  closeEventDrawer,
  closeSlotDrawer,
  setSelectedEvent,
  showEventDrawer,
  showSlotDrawer,
} from "src/store/slices/agenda";
import { getAllEventsApi } from "src/store/slices/agenda/apis";
import {
  checkEventDrawer,
  checkSlotDrawer,
  getAllEvents,
} from "src/store/slices/agenda/selector";
import { CallType } from "src/constant/callTypes";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    end: null,
  });

  const dispatch = useDispatch();
  const events = useSelector(getAllEvents);

  const [preparedEvents, setPreparedEvents] = useState([]);
  const [currentView, setCurrentView] = useState("month");

  useEffect(() => {
    const newEvents = events.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setPreparedEvents(newEvents);
  }, [events]);

  const onSelectSlot = (slot) => {
    if (currentView === "day" || currentView === "week") {
      setSelectedDate({
        start: slot.start,
        end: slot.end,
      });
      dispatch(showSlotDrawer());
    }
  };

  const onEventClick = async (event) => {
    dispatch(setSelectedEvent(event));
    dispatch(showEventDrawer());
  };

  const getEventStyle = (event) => {
    const colorMap = {
      [CallType.Initial]: "#7591e0",
      [CallType.Final]: "blue",
      [CallType.Technical]: "green",
      [CallType.Reschedule]: "orange",
    };
    const backgroundColor = colorMap[event.callType] || "gray";

    return {
      style: {
        backgroundColor,
      },
    };
  };

  useEffect(() => {
    dispatch(getAllEventsApi());
  }, []);

  const CustomEventComponent = ({ event }) => (
    <div>
      <strong>{event?.apply?.clientName}</strong>
      <br />
      {event?.assignTo && (
       
       <>
       <strong>  Assign To : </strong>
          {` ${event?.assignTo?.first_name} ${event?.assignTo?.last_name}`}
       </>
      )}
    </div>
  );

  return (
    <>
      <Calendar
        localizer={localizer}
        events={preparedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 146px)" }}
        timeslots={1}
        step={15}
        selectable={true}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onEventClick}
        components={{
          event: CustomEventComponent,
        }}
        eventPropGetter={getEventStyle}
        onView={(view) => setCurrentView(view)}
      />

      <CreateEventDrawer selectedDate={selectedDate} />
      <EventDetailsDrawer />
    </>
  );
};

export default CustomCalendar;
