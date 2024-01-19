import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import viLocale from '@fullcalendar/core/locales/vi';
import moment from 'moment';
//mui them
import Tooltip from '@mui/material/Tooltip';
//api
import { getListTaskReceiveCurrentMonth } from '../../services/taskService';

function MyWorkCalendar() {
    const [workCalenderList, setWorkCalenderList] = useState([]);
    const [eventList, setEventList] = useState([]);

    const handleEventAddDateTimeTask = () => {

    }

    const addText = () => {
        let myDiv = document.getElementById("fc-dom-1");
        myDiv.prepend("Lịch công việc ");
    }

    const handleGetTaskScheduleByUserId = async () => {
        let responseWorkCalenderList = await getListTaskReceiveCurrentMonth();
        setWorkCalenderList(responseWorkCalenderList);

        let events = responseWorkCalenderList.map((task) => ({
            id: task.task_Id,
            title: task.task_Title,
            start: task.task_DateStart,
            end: task.task_DateEnd,
            backgroundColor: handleRenderColor(task.task_DateEnd, task.task_DateStart, task.task_State)
        }))

        setEventList(events);

    }

    const handleRenderColor = (end, start, state) => {
        let startDay = moment(start);
        let endDay = moment(end);
        let today = moment();

        if (state === 5) {
            return 'SeaGreen';
        }
        else if (endDay.diff(today, 'days') < 0) {
            return 'red';
        }
        else if (endDay.diff(today, 'days') === 0) {
            return 'Orange';
        }
        else {
            return '#3788d8';
        }
    }

    useEffect(() => {
        handleGetTaskScheduleByUserId();
    }, [])

    return (
        <div className='container sm mt-3' >
            {/* <div className='instruction' style={{ width: '10%' }}>
                <div className='instruction-processing' style={{ display: 'inline-flex', width: '100%' }}>
                    <div className='instruction-processing-bg p-2' style={{ height: '1px', backgroundColor: '#3788d8' }}></div>
                    <div className='instruction-text p-2' style={{ lineHeight: '0px' }}>Đang thực hiện</div>
                </div>

                <div className='instruction-nearing-deadline' style={{ display: 'inline-flex', width: '100%' }}>
                    <div className='instruction-nearing-deadline-bg p-2' style={{ height: '1px', backgroundColor: 'orange' }}></div>
                    <div className='instruction-text p-2' style={{ lineHeight: '0px' }}>Gần hết hạn</div>
                </div>

                <div className='instruction-expired' style={{ display: 'inline-flex', width: '100%' }}>
                    <div className='instruction-expired-bg p-2' style={{ height: '1px', backgroundColor: 'red' }}></div>
                    <div className='instruction-text p-2' style={{ lineHeight: '0px' }}>Hết hạn</div>
                </div>

                <div className='instruction-complete' style={{ display: 'inline-flex', width: '100%' }}>
                    <div className='instruction-complete-bg p-2' style={{ height: '1px', backgroundColor: 'SeaGreen' }}></div>
                    <div className='instruction-text p-2' style={{ lineHeight: '0px' }}>Hoàn thành</div>
                </div>
            </div> */}
            <div className='schedule'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: 'today prev,next',
                        center: 'title',
                        right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek'
                    }}
                    views={
                        { dayGridMonth: { dayMaxEventRows: 3, dayHeaderFormat: { weekday: 'long' } } }
                    }

                    eventMouseEnter={(event) => {
                        <Tooltip title={event.event.title} arrow>

                        </Tooltip>


                    }}
                    eventRender
                    //showNonCurrentDates={false}
                    fixedWeekCount={false}
                    displayEventEnd={true}
                    locale={viLocale}
                    height={"90vh"}
                    events={eventList}
                />
            </div>

        </div>
    )
}

export default MyWorkCalendar