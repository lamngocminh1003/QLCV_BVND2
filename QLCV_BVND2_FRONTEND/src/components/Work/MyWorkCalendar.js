import React, { useState, useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import viLocale from '@fullcalendar/core/locales/vi';
//api
import { getListTaskReceiveCurrentMonth } from '../../services/taskService';

function MyWorkCalendar() {
    const [workCalenderList, setWorkCalenderList] = useState([]);
    const [eventList, setEventList] = useState([]);

    const handleEventAddDateTimeTask = () => {

    }

    const handleGetTaskScheduleByUserId = async () => {
        let responseWorkCalenderList = await getListTaskReceiveCurrentMonth();
        setWorkCalenderList(responseWorkCalenderList);

        let events = responseWorkCalenderList.map((task) => ({
            title: task.task_Title,
            start: task.task_DateStart,
            end: task.task_DateEnd
        }))

        setEventList(events);
    }

    useEffect(() => {
        handleGetTaskScheduleByUserId();
    }, [])

    const text = 'của tôi';

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: 'today prev,next',
                            center: `title ${text}`,
                            right: 'dayGridDay,dayGridWeek,dayGridMonth'
                        }}
                        locale={viLocale}
                        height={"80vh"}
                        dayMaxEvents={3}
                        events={[
                            { title: 'tập đọc', start: '2024-01-01' },
                            { title: 'tô màu', start: '2024-01-01' },
                            { title: 'tập viết', start: '2024-01-25' },
                            { title: 'leo rank', start: '2024-01-15 ', end: '' },



                            { title: 'ooo', start: '2024-01-24', end: '2024-01-26' },
                            { title: 'event 3', start: '2024-01-04T10:15:00', end: '2024-01-04T16:59:00' },
                            // { title: 'leo rank', start: '2024-01-17T06:47:32.000Z', end: '2024-01-20T16:59:39.658Z' }
                            //end - start >= 1 thì cắt giờ đi, không thì vẫn hiển thị giờ bắt đầu và giờ kết thúc
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyWorkCalendar