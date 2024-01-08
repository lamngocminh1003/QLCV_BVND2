import React, { useEffect, useState } from 'react';
import _, { assign, cloneDeep, set } from 'lodash';
import Dayjs from "dayjs";
//mui react date time picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
//mui theme
import Box from '@mui/material/Box';

export default function DateTimePickerViewRenderers(props) {
    //config data was sent by Modal AssignDivineWorkPublic
    const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState(null);

    const handleSelectedDateTimeStartAssignWork = (value) => {
        value = JSON.stringify(value);

        let replaceFirst = _.replace(value, "\"", "");
        let replaceSecond = _.replace(replaceFirst, "\"", "");

        let a = Dayjs(replaceSecond);
        console.log(a)

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
            console.log(props.dataModalDivineWork.documentSend.document_Send_Deadline)
        }
    }, [props.stateExtra1])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ paddingBottom: '14px', paddingTop: '0px' }}>
                <div className='row col-12 pt-2'>
                    <div className='col-6' style={{ left: '30px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày" views={['month', 'day']} value={props.stateExtra1.task_DateStart !== "" ? Dayjs(props.stateExtra1.task_DateStart) : null}
                            minDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart)} maxDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline)}
                            onChange={(e) => handleSelectedDateTimeStartAssignWork(e.$d)} viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                    <div className='col-6' style={{ left: '25px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" views={['month', 'day']} value={props.stateExtra1.task_DateEnd !== "" ? Dayjs(props.stateExtra1.task_DateEnd) : null}
                            minDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart)} maxDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline)}
                            onChange={(e) => handleSelectedDateTimeEndAssignWork(JSON.stringify(e.$d))} viewRenderers={{ hours: null, minutes: null, seconds: null, }} />
                    </div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}