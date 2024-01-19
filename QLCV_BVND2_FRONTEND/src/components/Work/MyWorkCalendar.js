import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import viLocale from '@fullcalendar/core/locales/vi';
import moment from 'moment';
//mui them
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//css
import "./SCSS/Work.scss";
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
            titleColor: 'black',
            backgroundColor: handleRenderColor(task.task_DateEnd, task.task_DateStart, task.task_State),
            borderColor: handleRenderColor(task.task_DateEnd, task.task_DateStart, task.task_State)
        }))

        setEventList(events);
    }

    const handleRenderColor = (end, start, state) => {
        let startDay = moment(start);
        let endDay = moment(end);
        let today = moment();

        if (state === 5) {
            return '#66bb6a';
        }
        else if (endDay.diff(today, 'days') < 0) {
            return '#ef5350';
        }
        else if (endDay.diff(today, 'days') === 0) {
            //gần hết hạn
            return '#ffa726';
        }
        else {
            //đang thực hiện
            return '#4fc3f7';
        }
    }

    useEffect(() => {
        handleGetTaskScheduleByUserId();
    }, [])

    return (
        <div className='sm mt-3' style={{ marginLeft: '70px' }}>
            <div className='d-flex'>
                <div className='instruction' style={{ padding: '0px', width: '10%' }} >
                    <FormGroup>
                        <Typography variant="body1" sx={{ color: '#e91e63', fontSize: '24px' }}>Bộ lọc</Typography>
                        <FormControlLabel control={<Checkbox sx={{
                            color: '#03a9f4',
                            fill: '#03a9f4',
                            '&.Mui-checked': {
                                color: '#03a9f4',
                            },
                        }} />} label="Đang thực hiện" />

                        <FormControlLabel control={<Checkbox sx={{
                            color: '#ff9800',
                            fill: '#ff9800',
                            '&.Mui-checked': {
                                color: '#ff9800',
                            },
                        }} />} label="Gần hết hạn" />

                        <FormControlLabel control={<Checkbox sx={{
                            color: 'red',
                            fill: 'red',
                            '&.Mui-checked': {
                                color: 'red',
                            },
                        }} />} label="Hết hạn" />

                        <FormControlLabel control={<Checkbox sx={{
                            color: '#4caf50',
                            fill: '#4caf50',
                            '&.Mui-checked': {
                                color: '#4caf50',
                            },
                        }} />} label="Hoàn thành" />

                    </FormGroup>
                </div>
                <div className='schedule col-10' style={{ padding: '0px' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: 'today prev,next',
                            center: 'title',
                            right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek',
                        }}
                        views={
                            {
                                dayGridMonth: { dayHeaderFormat: { weekday: 'long' } },
                                dayGridWeek: { titleFormat: { year: 'numeric', month: 'long', day: 'numeric' } }
                            }
                        }
                        eventDidMount={(event) => console.log(event)}
                        //showNonCurrentDates={false}
                        fixedWeekCount={false}
                        displayEventEnd={true}
                        eventTimeFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                        }}
                        locale={viLocale}
                        events={eventList}

                    />
                </div>
            </div>
        </div>
    )
}

export default MyWorkCalendar