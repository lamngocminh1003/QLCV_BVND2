import React, { useEffect, useState } from 'react';
import _, { assign, cloneDeep, set } from 'lodash';
//mui react date time picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
//mui theme
import Box from '@mui/material/Box';

export default function DateTimePickerViewRenderers(props) {
    //config data was sent by Modal AssignDivineWorkPublic
    const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState(null);

    const handleSelectedDateTimeStartAssignWork = (value) => {
        let replaceFirst = _.replace(value, "\"", "");
        let replaceSecond = _.replace(replaceFirst, "\"", "");

        let input_task_DateStart = 'task_DateStart';
        let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataModalAssignDivineWorkPublic);
        _dataModalAssignDivineWorkPublic[input_task_DateStart] = replaceSecond;
        props.setStateExtra1(_dataModalAssignDivineWorkPublic);
    }

    const handleSelectedDateTimeEndAssignWork = (value) => {
        let replaceFirst = _.replace(value, "\"", "");
        let replaceSecond = _.replace(replaceFirst, "\"", "");

        let input_task_DateEnd = 'task_DateEnd';
        let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataModalAssignDivineWorkPublic);
        _dataModalAssignDivineWorkPublic[input_task_DateEnd] = replaceSecond;
        props.setStateExtra1(_dataModalAssignDivineWorkPublic);
    }

    useEffect(() => {
        if (Object.values(props.stateExtra1).every(value => value !== null || value !== '')) {
            setDataModalAssignDivineWorkPublic(props.stateExtra1);
        }
    }, [props.stateExtra1])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ paddingBottom: '14px', paddingTop: '0px' }}>
                <div className='row col-12 pt-2'>
                    <div className='col-6' style={{ left: '30px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày" views={['month', 'day']} onChange={(e) => handleSelectedDateTimeStartAssignWork(JSON.stringify(e.$d))}
                            viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                    <div className='col-6' style={{ left: '25px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" views={['month', 'day']} onChange={(e) => handleSelectedDateTimeEndAssignWork(JSON.stringify(e.$d))}
                            viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}