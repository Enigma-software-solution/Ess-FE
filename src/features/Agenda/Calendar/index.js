import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Views, dateFnsLocalizer, } from "react-big-calendar";
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
import { Pagination } from "swiper/modules";
import SalesCallDetailsDrawer from "../SalesCallDetailsDrawer";
import CustomEvent from "./CustomEvent";
import ClientEventDrawer from "../ClientEventDrawer";
import SelectEventTypeModal from "../SelectEventTypeModal";
import ClientCallDetailsModal from "../ClientCallDetailsModal";
import CustomToolbar from "./CustomToolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, List, Spin } from "antd";
import Loader from "src/components/Loader";
import SalesEventDrawer from "../SalesDrawer";
import Search from "antd/es/input/Search";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
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
  const [isCallSearched, setIsCallSearched] = useState(false)
  const [searchedCalls, setSearchedCalls] = useState(false)

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
    dispatch(setSelectedEvent(null))
    setIsSelectEventTypeModal(true)
    setSelectedDate({ start: slot.start, end: slot.end });
  };

  const onEventClick = async (event) => {
    if (event?.eventType === 'clientcall') {
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

  const [searchInput, setSearchInput] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredEvents = events.filter((event) => {
      if (event.createdBy) {
        return event?.createdBy?.first_name.toLowerCase().includes(searchInput.toLowerCase());
      }
      return false;
    });
    console.log(filteredEvents, "ssssssssss")
    setSearchedCalls(filteredEvents)
    setIsCallSearched(true)
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setIsCallSearched(false);
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
    <div style={{ height: 'calc(100vh - 110px)', backgroundColor: '#fff', marginTop: '20px' }}>

      <div style={{ marginBottom: '10px' }}>
        <Search
          type="text"
          placeholder="Search by First Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: "20%" }}
          onSearch={handleSearch}
          suffix={ // Add a suffix to the Search input
            isCallSearched ? (
              <CloseCircleOutlined
                style={{ color: 'rgba(0, 0, 0, 0.45)', cursor: 'pointer', position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={handleClearSearch}
              />
            ) : null
          }
        />
      </div>

      {!isCallSearched && <Calendar
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
      />}

      {isCallSearched && <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        slidesPerView={4}
        spaceBetween={10}
        grabCursor={true}
        style={{ padding: '30px', marginBottom: '40px' }}
      >
        {searchedCalls.map((call) => (
          <>
            <SwiperSlide>
              <Card
                size="small"
                title={call?.apply?.companyName}
                style={{
                  marginTop: "20px",
                  boxShadow: "0 4px 8px rgba(0.5, 0.5, 0.5, 0.5)",
                }}
              >
                <p>{call?.createdBy?.first_name}</p>
                <p>{call?.callType}</p>
                <p>{call?.callDuration}</p>
                <p>
                  Call Link{" "}
                  <Link to={call?.apply?.link} style={{ float: "right" }}>
                    {call?.apply?.link}
                  </Link>
                </p>
              </Card>
            </SwiperSlide>

          </>
        ))}
      </Swiper>
      }

      <SelectEventTypeModal isOpen={isSelectEventTypeModal} handleClose={() => setIsSelectEventTypeModal(false)} />
      <ClientCallDetailsModal isOpen={isClientCallDetailsModal} handleClose={() => setIsClientCallDetailsModal(false)} />

      <SalesEventDrawer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ClientEventDrawer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <SalesCallDetailsDrawer />
    </div>
  );
};

export default CustomCalendar;
