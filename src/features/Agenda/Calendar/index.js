"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import CreateEventDrawer from '../CreateEventDrawer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventDetailsDrawer from '../EventDetailsDrawer';
import { setSelectedEvent } from 'src/store/slices/agenda';
import { getAllEventsApi } from 'src/store/slices/agenda/apis';
import { getAllEvents } from 'src/store/slices/agenda/selector';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const CustomCalendar = () => {
    const [slotDrawer, setSlotDrawer] = useState(false);
    const [eventDrawer, setEventDrawer] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
        start: null,
        end: null
    });

const [preparedEvents,setPreparedEvents]=useState([])


    const dispatch = useDispatch()
    const events = useSelector(getAllEvents)
    
    useEffect(() => {
    const newEvents= events.map((e)=>{
        return{
            ...e,
            start:new Date(e.start),
            end:new Date(e.end)
        }
    })
    setPreparedEvents(newEvents)
    }, [events])
    

    const onSelectSlot = (slot) => {
        setSelectedDate({
            start: slot.start,
            end: slot.end
        });
        setSlotDrawer(true);
        console.log('selected slot', slot)
    };

    const handleSlotDrawerClose = () => {
        setSlotDrawer(false);
    };

    const onEventClick = async (event) => {
        dispatch(setSelectedEvent(event))
        setEventDrawer(true)
    }

    const handleEventDrawerClose = () => {
        setEventDrawer(false);
    };

    const CustomEventComponent = ({ event }) => {
        console.log(event, 'ss')
        return (
            <div>
                <strong>{event.jobTitle}</strong>
                <br />
                {/* <p>{event?.clientName}</p> */}
            </div>
        );
    };

    useEffect(() => {
   dispatch(getAllEventsApi())
    }, [])
    

    return (
        <div>

            <Calendar
                localizer={localizer}
                events={preparedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 100px)' }}
                timeslots={1}
                step={30}
                selectable={true}
                onSelectSlot={onSelectSlot}
                onSelectEvent={onEventClick}
                components={{
                    event: CustomEventComponent
                }}
            />

            <CreateEventDrawer selectedDate={selectedDate} isDrawerOpen={slotDrawer} handleDrawerClose={handleSlotDrawerClose} />
            <EventDetailsDrawer isDrawerOpen={eventDrawer} handleDrawerClose={handleEventDrawerClose} />
        </div>
    );
};

export default CustomCalendar;
