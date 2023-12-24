import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
//mui theme
import Box from '@mui/material/Box';

export default function DateTimePickerViewRenderers() {
    const [selectedDateTime, setSelectedDateTime] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ paddingBottom: '14px', paddingTop: '0px' }}>
                <div className='row col-12 pt-2'>
                    <div className='col-6' style={{ left: '30px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày" views={['month', 'day']} onChange={(e) => console.log(JSON.stringify(e.$d))}
                            viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                    <div className='col-6' style={{ left: '25px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" views={['month', 'day']}
                            viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}