import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
//mui theme
import Box from '@mui/material/Box';

export default function DateTimePickerViewRenderers() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ paddingBottom: '10px', paddingTop: '0px' }}>
                <div className='row col-12'>
                    <div className='col-6' style={{ left: '30px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày"
                            viewRenderers={{ hours: null, minutes: null, seconds: null, }} onChange={(e) => console.log(e.target.value)} />
                    </div>
                    <div className='col-6' style={{ left: '25px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" viewRenderers={{ hours: null, minutes: null, seconds: null, }} setInitialDate={(date) => {
                            // Cập nhật thời gian mặc định thành 23:59
                            const time = new Date();
                            time.setHours(23);
                            time.setMinutes(59);
                            time.setSeconds(59);
                            time.setMilliseconds(999);
                            return new Date(date.getTime(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
                        }} />
                    </div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}