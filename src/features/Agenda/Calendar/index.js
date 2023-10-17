import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllEventsApi } from "src/store/slices/agendaSlice/apis";
import { setSelectedEvent, showEventDrawer } from "src/store/slices/agendaSlice";
import { getAllEvents } from "src/store/slices/agendaSlice/selector";
import { CallType } from "src/constant/callTypes";
import { toast } from "react-toastify";
import SalesDrawer from "../SalesDrawer";
import EventDetailsDrawer from "../EventDetailsDrawer";
import CustomEvent from "./CustomEvent";
import { Button, Modal } from "antd";
import ClientEventDrawer from "../ClientEventDrawer";
import SelectEventTypeModal from "../SelectEventTypeModal";
import ClientCallDetailsModal from "../ClientCallDetailsModal";
import CustomToolbar from "./CustomToolbar";

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  timeZone: 'America/New_York',
});


const CustomCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(getAllEvents);

  const [preparedEvents, setPreparedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [currentView, setCurrentView] = useState("month");
  const [isSelectEventTypeModal, setIsSelectEventTypeModal] = useState(false)
  const [isClientCallDetailsModal, setIsClientCallDetailsModal] = useState(false)

  useEffect(() => {
    const newEvents = events?.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setPreparedEvents(newEvents);
  }, [events]);

  const onSelectSlot = (slot) => {
    const currentDate = new Date();
    const isPastDate = slot.start < currentDate;

    if (currentView === 'month') {
      return
    }

    if (isPastDate) {
      toast.warn("Cannot create events on past dates.");
      return;
    }

    if (currentView === "day" || currentView === "week") {
      dispatch(setSelectedEvent(null))

      setIsSelectEventTypeModal(true)
      setSelectedDate({ start: slot.start, end: slot.end });
    }
  };

  const onEventClick = async (event) => {
    if (event?.eventType === 'clientCall') {
      setIsClientCallDetailsModal(true)
      dispatch(setSelectedEvent(event));

      return
    }

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
  }, [dispatch]);

  const workDayStartHour = 9;
  const workDayEndHour = 17;

  const onView = useCallback((newView) => setCurrentView(newView), [setCurrentView]);


  return (
    <>
      <Calendar
        style={{ height: 'calc(100vh - 110px)' }}
        localizer={localizer}
        events={preparedEvents}
        startAccessor="start"
        endAccessor="end"
        timeslots={1}
        step={15}
        selectable={true}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onEventClick}
        components={{
          event: CustomEvent,
          // toolbar: CustomToolbar
        }}
        eventPropGetter={getEventStyle}
        onView={onView}
        min={new Date(0, 0, 0, workDayStartHour)}
        max={new Date(0, 0, 0, workDayEndHour)}
      />

      <SelectEventTypeModal isOpen={isSelectEventTypeModal} handleClose={() => setIsSelectEventTypeModal(false)} />
      <ClientCallDetailsModal isOpen={isClientCallDetailsModal} handleClose={() => setIsClientCallDetailsModal(false)} />

      <SalesDrawer selectedDate={selectedDate} />
      <ClientEventDrawer selectedDate={selectedDate} />



      <EventDetailsDrawer />
    </>
  );
};

export default CustomCalendar;
