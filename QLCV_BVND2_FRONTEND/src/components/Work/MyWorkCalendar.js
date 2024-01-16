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
                        locale={viLocale}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyWorkCalendar