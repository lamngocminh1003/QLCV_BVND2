import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import viLocale from '@fullcalendar/core/locales/vi';

function MyWorkCalendar() {
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: 'today prev,next',
                            center: 'title',
                            right: 'dayGridDay,dayGridWeek,dayGridMonth'
                        }}
                        locale={viLocale}
                        height={"720px"}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyWorkCalendar