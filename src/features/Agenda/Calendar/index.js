import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsApi } from "src/store/slices/agendaSlice/apis";
import { setSelectedEvent, showEventDrawer } from "src/store/slices/agendaSlice";
import { getAllEvents, isEventLaoding } from "src/store/slices/agendaSlice/selector";
import { CallType } from "src/constant/callTypes";
import { toast } from "react-toastify";
import SalesDrawer from "../SalesDrawer";
import EventDetailsDrawer from "../SalesCallDetailsDrawer";
import CustomEvent from "./CustomEvent";
import ClientEventDrawer from "../ClientEventDrawer";
import SelectEventTypeModal from "../SelectEventTypeModal";
import ClientCallDetailsModal from "../ClientCallDetailsModal";
import CustomToolbar from "./CustomToolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Spin } from "antd";
import Loader from "src/components/Loader";
import SalesEventDrawer from "../SalesDrawer";


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
  const isLoading = useSelector(isEventLaoding);

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
    if (currentView !== "month") {
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
      [CallType.Initial]: "#3498db",
      [CallType.Technical]: "#00FF00",
      [CallType.Final]: "#000fff",
      [CallType.Reschedule]: "#FFD700",
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

  const workDayStartHour = 9;
  const workDayEndHour = 18;

  const onView = useCallback((newView) => setCurrentView(newView), [setCurrentView]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div style={{ height: 'calc(100vh - 110px)', backgroundColor: '#fff' }}>
      <Calendar
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
          toolbar: CustomToolbar
        }}
        popup
        eventPropGetter={getEventStyle}
        onView={onView}
        defaultView={Views.WEEK}
        views={["day", "week", "work_week", "month", "agenda"]}
        min={new Date(0, 0, 0, workDayStartHour)}
        max={new Date(0, 0, 0, workDayEndHour)}
        formats={
          {
            monthHeaderFormat: (date) => format(date, 'MMMM d, yyyy'),
            dayHeaderFormat: (date) => format(date, 'MMMM d, yyyy'),
          }
        }
      />

      <SelectEventTypeModal isOpen={isSelectEventTypeModal} handleClose={() => setIsSelectEventTypeModal(false)} />
      <ClientCallDetailsModal isOpen={isClientCallDetailsModal} handleClose={() => setIsClientCallDetailsModal(false)} />

      <SalesEventDrawer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ClientEventDrawer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <EventDetailsDrawer />
    </div>
  );
};

export default CustomCalendar;
