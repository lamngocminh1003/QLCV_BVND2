import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//import components react datepicker
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from 'date-fns';
import vi from "date-fns/locale/vi";
//css
import "./SCSS/ModalCreateTask.scss";
//api
import { createDocSendPublicByDocIn } from '../../services/docSendService';
import { getTaskCategory } from '../../services/docSendService';

function ModalCreateTaskPublic(props) {
    const dataModalCreateTaskPublicDefault = {
        documentIncomming: {
            document_Incomming_Id: '',
            document_Incomming_Title: '',
            document_Incomming_Content: '',
            document_Incomming_UserSend: '',
            document_Incomming_UserSend_FullName: '',
            document_Incomming_UserReceive: '',
            document_Incomming_State: '',
            document_Incomming_Comment: '',
            document_Incomming_Transition_Reason: '',
            document_Incomming_Time: '',
            document_Incomming_TimeStart: '',
            document_Incomming_Deadline: '',
            document_Incomming_Category: '',
            filesDocSend: ''
        },
        fileIds: []
    }

    const [dataModalCreateTaskPublic, setDataModalCreateTaskPublic] = useState(dataModalCreateTaskPublicDefault);

    //config thời hạn xử lý
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const onChangeStart = (dateStart) => {
        if (dateStart === null) {
            setStartDate('');
        }
        else {
            let startDate = new Date((dateStart));
            setStartDate(startDate);
        }
    };

    const onChangeEnd = (dateEnd) => {
        if (dateEnd === null) {
            setEndDate('');
        }
        else {
            let endDate = new Date((dateEnd));
            setEndDate(endDate);
        }
    };

    const formatDateISO8601 = () => {
        //lấy value của 2 ô input date start và date end
        let docExpireStartValue = document.getElementById("dateStart").value;
        let docExpireEndValue = document.getElementById("dateFinish").value;

        //cắt value
        let docExpireStartValueFormat = docExpireStartValue.split("/");
        let docExpireEndValueFormat = docExpireEndValue.split("/");

        //template string chuỗi đã cắt thành chuỗi yyyy/mm/dd
        let docStartDate = `${docExpireStartValueFormat[2]}${docExpireStartValueFormat[1]}${docExpireStartValueFormat[0]}`;
        let docEndDate = `${docExpireEndValueFormat[2]}${docExpireEndValueFormat[1]}${docExpireEndValueFormat[0]}`;

        //format chuỗi yyyy/mm/dd sang ISO
        let TimeStart = moment(moment(docStartDate).format("YYYY-MM-DDT00:00:ssZ")).toISOString();

        let TimeEnd = moment(moment(docEndDate).format("YYYY-MM-DDT23:59:ssZ")).toISOString();

        dataModalCreateTaskPublic.documentIncomming.document_Incomming_TimeStart = TimeStart;
        dataModalCreateTaskPublic.documentIncomming.document_Incomming_Deadline = TimeEnd;
    }

    //config chọn loại công việc
    const [taskType, setTaskType] = useState();
    const [listTaskCategory, setListTaskCategory] = useState([]);

    const handleOnchange = (value, name) => {

    }

    const handleHideModal = () => {
        props.closeModalConfirmCreateTask(false);
        props.activeModalProposeReceiveOut(true);
    }

    const handleCreateDocSend = async () => {
        dataModalCreateTaskPublic.documentIncomming.document_Incomming_Category = taskType;
        formatDateISO8601();
        let formDataFile = new FormData();
        formDataFile.append('files', '');
        dataModalCreateTaskPublic.documentIncomming.filesDocSend = formDataFile;
        let response = await createDocSendPublicByDocIn(dataModalCreateTaskPublic);
        if (response === 200) {
            toast.success('Tạo công việc thành công!');
            props.makeModalConfirmCreateTaskDoing(true);
            props.makeListProposeReceiveOutDoing(true);
            props.closeModalConfirmCreateTask(true);
        }
        else {
            toast.error(response);
        }
    }

    const getTaskCategoryFunc = async () => {
        let resultListTaskCategory = await getTaskCategory();
        setListTaskCategory(resultListTaskCategory);
    }

    useEffect(() => {
        if (Object.keys(props.dataModalCreateTaskPublic).length !== 0) {
            setDataModalCreateTaskPublic({ ...props.dataModalCreateTaskPublic })
            getTaskCategoryFunc();
        }
    }, [props.dataModalCreateTaskPublic])

    return (
        <>
            <div>
                <Modal size='lg' className='mt-1' show={props.activeModalCreateTaskPublic} onHide={() => handleHideModal()} backdrop={'static'} keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title><div className='text-primary text-uppercase'>Tạo công việc</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-info-container col-xs-12">
                            <Form autoComplete='off'>
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row d-flex justify-content-center form-group">
                                        <div className="row">
                                            <Form.Group className="mb-3">
                                                <Form.Label className='label-input-create-task'>Tên công việc <span className='text-danger'>(*)</span></Form.Label>
                                                <Form.Control type="text" value={dataModalCreateTaskPublic.documentIncomming.document_Incomming_Title || ""} onChange={(e) => handleOnchange(e.value, 'document_Incomming_Title')} />
                                            </Form.Group>
                                            <Form.Group className='mb-3'>
                                                <Form.Label className='label-input-create-task'>Nội dung công việc <span className='text-danger'>(*)</span></Form.Label>
                                                <Form.Control as="textarea" value={dataModalCreateTaskPublic.documentIncomming.document_Incomming_Content || ""} onChange={(e) => handleOnchange(e.value, 'document_Incomming_Content')} rows={4} />
                                            </Form.Group>
                                            <Form.Group className="date-expire-group mb-3">
                                                <fieldset className="border rounded-3 p-4 ">
                                                    <legend className="float-none w-auto"
                                                        style={{ fontWeight: "bold", color: "#dc3545", fontSize: "1.1rem" }}>Thời hạn xử lý</legend>
                                                    <div className="row date-expire-input d-flex" style={{ position: 'relative', bottom: '8px' }}>
                                                        <div className="date-start-group col-sm-6">
                                                            <div className="input-date-start">
                                                                <div className="mx-2" style={{ display: "inline-block" }}>
                                                                    <label htmlFor="dateStart" >Từ ngày</label>
                                                                </div>
                                                                <DatePicker
                                                                    className="form-control"
                                                                    autoComplete="off"
                                                                    showPopperArrow={true}
                                                                    dateFormat="dd/MM/yyyy"
                                                                    locale={vi}
                                                                    minDate={new Date()}
                                                                    maxDate={addMonths(new Date(), 12)}
                                                                    todayButton="Hôm nay"
                                                                    selected={startDate !== false || dataModalCreateTaskPublic.docExpireStart === undefined ? startDate : new Date(dataModalCreateTaskPublic.docExpireStart)}
                                                                    onChange={onChangeStart}
                                                                    startDate={startDate}
                                                                    showMonthYearDropdown //không viết tắt của tháng
                                                                    // useShortMonthInDropdown //viết tắt của tháng 
                                                                    showTwoColumnMonthYearPicker
                                                                    disabledKeyboardNavigation
                                                                    isClearable={true}
                                                                    id='dateStart'
                                                                    onKeyDown={(event) => { event.preventDefault() }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="date-finish-group col-sm-6">
                                                            <div className="input-date-finish">
                                                                <div className="mx-2" style={{ display: "inline-block" }}>
                                                                    <label htmlFor="dateFinish" className="form-label">Đến ngày</label>
                                                                </div>
                                                                <DatePicker
                                                                    className="form-control"
                                                                    autoComplete="off"
                                                                    showPopperArrow={true}
                                                                    dateFormat="dd/MM/yyyy"
                                                                    locale={vi}
                                                                    minDate={startDate === false ? new Date(dataModalCreateTaskPublic.docExpireStart) : startDate}
                                                                    maxDate={addMonths(new Date(), 12)}
                                                                    todayButton="Hôm nay"
                                                                    selected={endDate !== false || dataModalCreateTaskPublic.docExpireEnd === undefined ? endDate : new Date(dataModalCreateTaskPublic.docExpireEnd)}
                                                                    onChange={onChangeEnd}
                                                                    endDate={endDate}
                                                                    showMonthYearDropdown //không viết tắt của tháng
                                                                    // useShortMonthInDropdown //viết tắt của tháng 
                                                                    showTwoColumnMonthYearPicker
                                                                    disabledKeyboardNavigation
                                                                    isClearable={true}
                                                                    id='dateFinish'
                                                                    disabled={startDate === "" ? true : false}
                                                                    onKeyDown={(event) => { event.preventDefault() }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </Form.Group>
                                            <Form.Group className='mb-3'>
                                                <Form.Label className='label-input-create-task'>Loại công việc <span className='text-danger'>(*)</span></Form.Label>
                                                <Form.Select onChange={(e) => setTaskType(+e.currentTarget.value)}>
                                                    <option>Chọn 1 loại công việc</option>
                                                    {listTaskCategory.map((item, index) => {
                                                        return (<option key={item.task_Category_Id} value={item.task_Category_Id}>{item.category_Name}</option>)
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className='label-input-create-task'>File đính kèm</Form.Label>
                                                <Form.Control type="file" multiple />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleCreateDocSend()}>Tạo</Button>
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalCreateTaskPublic