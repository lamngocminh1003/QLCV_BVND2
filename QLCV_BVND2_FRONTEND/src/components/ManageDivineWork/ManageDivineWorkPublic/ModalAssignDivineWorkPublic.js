import React, { useEffect, useState, useContext } from 'react'
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//date time picker function
import DateTimePicker from "../../FunctionComponents/DateTimePicker/MuiDateTimePicker.js";
//create filter options
import CreateFilterOptions from '../../FunctionComponents/SearchAndSelect/CreateFilterOptions.js';
//api
import { createTaskCategory, getTaskCategory } from '../../../services/taskService.js';
import { getUserInDepartment } from '../../../services/departmentService.js';

function ModalAssignDivineWorkPublic(props) {
    const { user, logoutContext } = useContext(UserContext);

    const dataAssignDivineWorkPublicDefault = {
        document_Send_Id: '',
        task_Catagory_Id: '',
        task_Catagory_Name: '',
        task_Content: '',
        task_DateEnd: '',
        task_DateSend: '',
        task_DateStart: '',
        task_Id: '',
        task_Title: '',
        userReceive_Id: '',
        userReceive_FullName: '',
        userSend_FullName: ''
    }

    const [doSomething, setDoSomething] = useState(false);
    const [dataAssignDivineWorkPublic, setDataAssignDivineWorkPublic] = useState(dataAssignDivineWorkPublicDefault);
    const [dataAssignDivineWorkPublicEdit, setdataAssignDivineWorkPublicEdit] = useState(null); // dùng khi nhấn nút cập nhật để check xem cái trên với cái dưới có trùng nhau không

    const [listUserInDepartment, setListUserInDepartment] = useState([]);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const handleOnHide = () => {
        setDataAssignDivineWorkPublic(dataAssignDivineWorkPublicDefault);
        props.setDataModalAssignDivineWorkPublic({});
        props.closeModalAssignDivineWorkPublic(false);
    }

    const handleOnchange = (value, inputName) => {
        let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataAssignDivineWorkPublic);
        _dataModalAssignDivineWorkPublic[inputName] = value;
        setDataAssignDivineWorkPublic(_dataModalAssignDivineWorkPublic);
    }

    const handleUpdateData = () => {
        let check = _.isEqual(dataAssignDivineWorkPublic, dataAssignDivineWorkPublicEdit);
        if (check !== true) {
            toast.info(`Đã cập nhật công việc ${dataAssignDivineWorkPublic.task_Title} thành công!`);
            props.setDataObjDivineWorkEdit(dataAssignDivineWorkPublic);
            setdataAssignDivineWorkPublicEdit(dataAssignDivineWorkPublic);
        }
        else {
            toast.warning('Hiện không có gì để cập nhật!');
        }
    }

    const handleGetListUserInDepartment = async (departmentId) => {
        let listUserInDepartment = await getUserInDepartment(departmentId);
        setListUserInDepartment(listUserInDepartment.users);
    }

    const handleSelectedUserReceive = (e, value) => {
        if (value !== null) {
            let input_UserReceive_Id = 'userReceive_Id';
            let input_userReceive_FullName = 'userReceive_FullName';
            let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataAssignDivineWorkPublic);
            _dataModalAssignDivineWorkPublic[input_UserReceive_Id] = value.user_Id;
            _dataModalAssignDivineWorkPublic[input_userReceive_FullName] = value.user_FullName;
            setDataAssignDivineWorkPublic(_dataModalAssignDivineWorkPublic);
        }
        else {
            let _dataModalAssignDivineWorkPublic = _.cloneDeep(dataAssignDivineWorkPublic);
            setDataAssignDivineWorkPublic(_dataModalAssignDivineWorkPublic);
        }
    }

    useEffect(() => {
        if (Object.keys(props.dataModalAssignDivineWorkPublic).length !== 0) {
            setDataAssignDivineWorkPublic(props.dataModalAssignDivineWorkPublic);
            setdataAssignDivineWorkPublicEdit(props.dataModalAssignDivineWorkPublic);
            handleGetListUserInDepartment(user.account.departmentId);
            console.log(props.dataModalAssignDivineWorkPublic);
        }
    }, [props.dataModalAssignDivineWorkPublic])

    return (
        <Modal size='lg' show={props.activeModalAssignDivineWorkPublic} onHide={() => handleOnHide()} style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            backdrop={'static'} keyboard={false} >
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
                                    <Form.Control type="text" defaultValue={dataAssignDivineWorkPublic.task_Title || ""} onChange={(e) => handleOnchange(e.target.value, 'task_Title')} />
                                </Form.Group>
                            </div>
                            <div className="mb-4 col-sm-12">
                                <Form.Group>
                                    <Form.Label>Nội dung công việc <span className='text-danger'>(*)</span></Form.Label>
                                    <Form.Control as="textarea" defaultValue={dataAssignDivineWorkPublic.task_Content || ""} onChange={(e) => handleOnchange(e.target.value, 'task_Content')} rows={4} />
                                </Form.Group>
                            </div>
                            <div className="mb-3 col-sm-12">
                                <fieldset className="border rounded-3 p-4">
                                    <legend className="float-none w-auto"
                                        style={{ fontWeight: "bold", color: "#dc3545", fontSize: "1.1rem" }}>Thời hạn xử lý</legend>
                                    <div className="row date-expire-input">
                                        <DateTimePicker stateExtra1={dataAssignDivineWorkPublic} setStateExtra1={setDataAssignDivineWorkPublic}></DateTimePicker>
                                    </div>
                                </fieldset>
                            </div>

                            <div className='col-sm-6 mt-3'>
                                <Form.Group>
                                    <CreateFilterOptions stateExtra2={dataAssignDivineWorkPublic} setStateExtra2={setDataAssignDivineWorkPublic}></CreateFilterOptions>
                                </Form.Group>
                            </div>
                            <div className='col-sm-6 mt-3'>
                                <Form.Group>
                                    <Autocomplete
                                        options={listUserInDepartment}
                                        getOptionLabel={(option) => option.user_FullName}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.user_FullName}
                                            </li>
                                        )}
                                        onChange={(e, value) => handleSelectedUserReceive(e, value)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Người thực hiện" />
                                        )}
                                    />
                                </Form.Group>
                            </div>

                            <div className='col-sm-12 mt-4'>
                                <Form.Group>
                                    <Form.Label>File đính kèm</Form.Label>
                                    {/* <Form.Control as="textarea" value={dataModalAssignDivineWorkPublic.task_Content || ""} onChange={(e) => handleOnchange(e.value, 'task_Title')} rows={4} /> */}
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="warning" onClick={(e) => handleUpdateData()}>Cập nhật</ButtonMui>
                <Button variant="secondary" onClick={() => handleOnHide()}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAssignDivineWorkPublic