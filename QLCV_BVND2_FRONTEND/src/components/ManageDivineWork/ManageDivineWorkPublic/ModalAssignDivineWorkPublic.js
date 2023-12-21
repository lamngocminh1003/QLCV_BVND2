import React, { useEffect, useState } from 'react'
import _, { assign, cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import moment from 'moment';
//bs5
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//mui theme
import ButtonMui from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
//date time picker
import DateTimePicker from "../../FunctionComponents/DateTimePicker/MuiDateTimePicker.js";

function ModalAssignDivineWorkPublic(props) {
    const dataModalAssignDivineWorkPublicDefault = {
        document_Send_Id: '',
        task_Catagory_Name: '',
        task_Content: '',
        task_DateEnd: '',
        task_DateSend: '',
        task_DateStart: '',
        task_Id: '',
        task_Title: '',
        userReceive_FullName: '',
        userSend_FullName: ''
    }

    const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState(dataModalAssignDivineWorkPublicDefault);

    const handleOnHide = () => {
        props.closeModalAssignDivineWorkPublic(false);
    }

    const handleOnchange = () => {

    }

    useEffect(() => {
        if (Object.keys(props.dataModalAssignDivineWorkPublic).length !== 0) {
            setDataModalAssignDivineWorkPublic(props.dataModalAssignDivineWorkPublic);
        }
    }, [props.dataModalAssignDivineWorkPublic])

    return (
        <Modal size='lg' show={props.activeModalAssignDivineWorkPublic} onHide={() => handleOnHide()} style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            backdrop={'static'} keyboard={false} dialogClassName='modal-assign'>
            <Modal.Header closeButton>
                <Modal.Title><div className='text-primary text-uppercase'>Thông tin giao việc</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="user-info-container col-xs-12">
                    <div className="container" >
                        <div className="row d-flex justify-content-center form-group">
                            <div className="mb-3 col-sm-12">
                                <Form.Group>
                                    <Form.Label>Tên công việc <span className='text-danger'>(*)</span></Form.Label>
                                    <Form.Control type="text" value={dataModalAssignDivineWorkPublic.task_Title || ""} onChange={(e) => handleOnchange(e.value, 'task_Title')} />
                                </Form.Group>
                            </div>
                            <div className="mb-3 col-sm-12">
                                <Form.Group>
                                    <Form.Label>Nội dung công việc <span className='text-danger'>(*)</span></Form.Label>
                                    <Form.Control as="textarea" value={dataModalAssignDivineWorkPublic.task_Content || ""} onChange={(e) => handleOnchange(e.value, 'task_Title')} rows={4} />
                                </Form.Group>
                            </div>
                            <div className="mb-3 col-sm-12">
                                <fieldset className="border rounded-3 pb-4">
                                    <legend className="float-none w-auto"
                                        style={{ fontWeight: "bold", color: "#dc3545", fontSize: "1.1rem" }}>Thời hạn xử lý</legend>
                                    <div className="row date-expire-input">
                                        <DateTimePicker></DateTimePicker>
                                    </div>
                                </fieldset>
                            </div>

                            <div className='col-sm-6'>
                                <Form.Group>
                                    <Form.Label>Nội dung công việc <span className='text-danger'>(*)</span></Form.Label>

                                </Form.Group>
                            </div>
                            <div className='col-sm-6'>
                                <Form.Group>
                                    <Form.Label>Nội dung công việc <span className='text-danger'>(*)</span></Form.Label>
                                    <Form.Control as="textarea" value={dataModalAssignDivineWorkPublic.task_Content || ""} onChange={(e) => handleOnchange(e.value, 'task_Title')} rows={4} />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="warning">Cập nhật</ButtonMui>
                <Button variant="secondary" onClick={() => handleOnHide()}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAssignDivineWorkPublic