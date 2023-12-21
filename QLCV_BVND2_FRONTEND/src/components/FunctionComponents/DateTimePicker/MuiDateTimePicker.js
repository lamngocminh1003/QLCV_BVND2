import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerViewRenderers() {
    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <div className='row col-12'>
                    <div className='col-6'>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày" viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                    <div className='col-6'><DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" viewRenderers={{ hours: null, minutes: null, seconds: null, }} /></div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}