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
import { toast } from 'react-toastify';

export default function DateTimePickerViewRenderers(props) {
    //config data was sent by Modal AssignDivineWorkPublic

    const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState(null);

    const [docDateStart, setDocDateStart] = useState();
    const [docDateEnd, setDocDateEnd] = useState();

    const [taskDateStart, setTaskDateStart] = useState();
    const [taskDateEnd, setTaskDateEnd] = useState();

    const handleSelectedDateTimeStartAssignWork = (dateTime) => {
        let hour = Dayjs().hour();
        let minutes = Dayjs().minute();

        if (taskDateStart) {
            setTaskDateStart(dateTime);
            handleSaveDateTimeStartAssignWork(dateTime);
        }
        else {
            let DateSelectedWithCurrentTime = Dayjs().set('date', dateTime.$D).set('month', dateTime.$M).set('hour', hour).set('minute', minutes);
            setTaskDateStart(DateSelectedWithCurrentTime);
        }
    }

    const handleSaveDateTimeStartAssignWork = (TaskDateStart) => {
        TaskDateStart = Dayjs(TaskDateStart, "YYYY-MM-DD");

        //lấy thời hạn của task tổng để so sánh
        let compareDate = Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart, "YYYY-MM-DD");
        let compareDate2 = Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline, "YYYY-MM-DD");
        console.log(compareDate2);

        let isValid = Dayjs(TaskDateStart).isAfter(compareDate);
        if (isValid === true) {
            let isValid2 = Dayjs(TaskDateStart).isBefore(compareDate2);
            console.log(Dayjs(TaskDateStart))
            if (isValid2 === true) {
                let value = JSON.stringify(TaskDateStart);

                let replaceFirst = _.replace(value, "\"", "");
                let replaceSecond = _.replace(replaceFirst, "\"", "");

                let input_task_DateStart = 'task_DateStart';
                let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataModalAssignDivineWorkPublic);
                _dataModalAssignDivineWorkPublic[input_task_DateStart] = replaceSecond;
                props.setStateExtra1(_dataModalAssignDivineWorkPublic);
            }
            else {
                toast.error('Ngày bắt đầu công việc không hợp lệ.');
            }
        }
    }

    const handleSelectedDateTimeEndAssignWork = (dateTime) => {
        let hour = Dayjs().hour(23);

        let DateSelectedWithCurrentTime = Dayjs().set('date', dateTime.$D).set('month', dateTime.$M).set('hour', 23).set('minute', 59);
        setTaskDateEnd(DateSelectedWithCurrentTime)

        // if (taskDateStart) {
        //     setTaskDateEnd(dateTime);
        //     //handleSaveDateTimeStartAssignWork(dateTime);
        // }
        // else {
        //     let DateSelectedWithCurrentTime = Dayjs().set('date', dateTime.$D).set('month', dateTime.$M).set('hour', hour).set('minute', minutes);
        //     setTaskDateEnd(DateSelectedWithCurrentTime);
        // }
        // let replaceFirst = _.replace(value, "\"", "");
        // let replaceSecond = _.replace(replaceFirst, "\"", "");

        // let input_task_DateEnd = 'task_DateEnd';
        // let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataModalAssignDivineWorkPublic);
        // _dataModalAssignDivineWorkPublic[input_task_DateEnd] = replaceSecond;
        // props.setStateExtra1(_dataModalAssignDivineWorkPublic);
    }

    useEffect(() => {
        if (Object.values(props.stateExtra1).every(value => value !== null || value !== '')) {
            setDataModalAssignDivineWorkPublic(props.stateExtra1);
            setDocDateStart(Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart, "YYYY-MM-DD"));
            setDocDateEnd(Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline, "YYYY-MM-DD"));
            //console.log(props.dataModalDivineWork);
        }
    }, [props.stateExtra1])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ paddingBottom: '14px', paddingTop: '0px' }}>
                <div className='row col-12 pt-2'>
                    <div className='col-6' style={{ left: '30px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Từ ngày" views={['month', 'day']} value={props.stateExtra1.task_DateStart !== "" ? Dayjs(props.stateExtra1.task_DateStart) : taskDateStart ? taskDateStart : null}
                            minDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart)} maxDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline)}
                            onChange={(e) => handleSelectedDateTimeStartAssignWork(e)} />
                    </div>
                    <div className='col-6' style={{ left: '25px' }}>
                        <DateTimePicker ampm={false} format='DD/MM/YYYY HH:mm' label="Đến ngày" views={['month', 'day']} value={props.stateExtra1.task_DateEnd !== "" ? Dayjs(props.stateExtra1.task_DateEnd) : taskDateEnd ? taskDateEnd : null}
                            minDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_TimeStart)} maxDate={Dayjs(props.dataModalDivineWork.documentSend.document_Send_Deadline)}
                            onChange={(e) => handleSelectedDateTimeEndAssignWork(e)} />
                    </div>
                </div>
            </DemoContainer>
        </LocalizationProvider>

    );
}