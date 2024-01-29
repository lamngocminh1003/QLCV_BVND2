import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import viLocale from '@fullcalendar/core/locales/vi';
import moment from 'moment';
//bs5
import * as bootstrap from "bootstrap";
//mui theme
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//css
import "./SCSS/Work.scss";
//modal
import ModalWork from '../ManageWork/ModalWork';
//api
import { getListTaskReceiveCurrentMonth, getByTaskId } from '../../services/taskService';

function MyWorkCalendar() {
    const [workCalenderList, setWorkCalenderList] = useState([]);
    const [eventList, setEventList] = useState([]);

    const [doSomething, setDoSomething] = useState(false);

    //config Modal Work
    const [openModalWork, setOpenModalWork] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        completed: true,
        nearingDeadline: true,
        overdue: true,
        unfinished: true,
    });

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
            description: task.task_Content,
            start: task.task_DateStart,
            end: task.task_DateEnd,
            timeEnd: task.time_Update,
            state: task.task_State,
            titleColor: 'black',
            backgroundColor: handleRenderColor(task.task_DateEnd, task.task_DateStart, task.task_State),
            borderColor: handleRenderColor(task.task_DateEnd, task.task_DateStart, task.task_State)
        }))

        setEventList(events);
    }

    const handleRenderColor = (end, start, state) => {
        let startDay = moment(start).startOf('day');
        let endDay = moment(end).startOf('day');
        let today = moment().startOf('day');

        if (state === 5) {
            return '#66bb6a'; // Màu cho trạng thái 5
        }
        else if (endDay.diff(today, 'days') < 0) {
            return '#ef5350'; // Màu cho hết hạn
        }
        else if (endDay.diff(today, 'days') === 0) {
            return '#ffa726'; // Màu cho gần hết hạn
        }
        else {
            return '#4fc3f7'; // Màu cho đang thực hiện
        }
    }

    const handleMouseEnter = (info) => {
        return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "right",
            trigger: 'hover',
            customClass: "popoverStyle",
            content: `<p class='popoverContent'>${info.event._def.extendedProps.description}</p> <p class='popoverContent'>${moment(info.event.start).format('DD/MM/YYYY HH:mm')} - ${moment(info.event.end).format('DD/MM/YYYY HH:mm')}</p> <p class='popoverContent'>${info.event._def.extendedProps.state === 5 ? `Hoàn thành lúc: ${moment(info.event._def.extendedProps.timeEnd).format('DD/MM/YYYY HH:mm')}` : ''}</p>`,
            html: true
        });
    }

    const handleEventClick = (info) => {
        setTaskId(info.event.id);
        setOpenModalWork(true);
    }

    const handleDateClick = (info) => {
        const calendarApi = info.view.calendar;
        calendarApi.changeView('dayGridDay', info.date);
    }

    const handleCheckboxOnChange = (event, filterKey) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [filterKey]: event.target.checked,
        }))


    }

    useEffect(() => {
        if (doSomething === true) {
            handleGetTaskScheduleByUserId();
            setDoSomething(false);
        }
        else {
            handleGetTaskScheduleByUserId();
        }
    }, [doSomething])

    return (
        <>
            <div className='mt-3 d-flex container-working-list-calendar'>
                <div className='instruction'>
                    <FormGroup>
                        <Typography variant="body1" sx={{ color: '#e91e63', fontSize: '24px' }}>Bộ lọc</Typography>
                        <FormControlLabel control={<Checkbox checked={filterOptions.unfinished} onChange={(event) => handleCheckboxOnChange(event, 'unfinished')} sx={{
                            color: '#03a9f4',
                            fill: '#03a9f4',
                            '&.Mui-checked': {
                                color: '#03a9f4',
                            },
                        }} />} label="Đang thực hiện" />

                        <FormControlLabel control={<Checkbox checked={filterOptions.nearingDeadline} onChange={(event) => handleCheckboxOnChange(event, 'nearingDeadline')} sx={{
                            color: '#ff9800',
                            fill: '#ff9800',
                            '&.Mui-checked': {
                                color: '#ff9800',
                            },
                            fontSize: '10px'
                        }} />} label="Gần hết hạn" />

                        <FormControlLabel control={<Checkbox checked={filterOptions.overdue} onChange={(event) => handleCheckboxOnChange(event, 'overdue')} sx={{
                            color: 'red',
                            fill: 'red',
                            '&.Mui-checked': {
                                color: 'red',
                            },
                        }} />} label="Hết hạn" />

                        <FormControlLabel control={<Checkbox checked={filterOptions.completed} onChange={(event) => handleCheckboxOnChange(event, 'completed')} sx={{
                            color: '#4caf50',
                            fill: '#4caf50',
                            '&.Mui-checked': {
                                color: '#4caf50',
                            },
                        }} />} label="Hoàn thành" />

                    </FormGroup>
                </div>
                <div className='working-list-calendar pl-3 pr-3' style={{ width: '85%' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: 'today prev,next',
                            center: 'title',
                            right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek',
                        }}
                        views={
                            {
                                dayGridMonth: { dayHeaderFormat: { weekday: 'long' }, dayMaxEvents: 6 },
                                dayGridWeek: { titleFormat: { year: 'numeric', month: 'long', day: 'numeric' } }
                            }
                        }
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
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                        eventDidMount={handleMouseEnter}
                    />
                </div>
            </div>

            <ModalWork
                taskId={taskId}
                activeModalWork={openModalWork}
                closeModalWork={setOpenModalWork}

                makeMyWorkCalendarDo={setDoSomething}
            />
        </>

    )
}

export default MyWorkCalendar