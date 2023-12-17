import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonMui from '@mui/material/Button';
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Modal from 'react-bootstrap/Modal';
//import some theme from mui
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
//import some shit to create assign to department
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//modal
import ModalCofirmCreateTask from '../ManageTask/ModalCofirmCreateTask';
//import api
import { updateProposeState, moveupProposeDepartmentOut, getProposeReceiveById } from '../../services/proposeService';
import { getAllDepartmentByType } from '../../services/departmentService';
//css
import "./SCSS/ModalPropose.scss"
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box } from '@mui/material';

function ModalProposeReceive(props) {
    const { user, logoutContext } = useContext(UserContext);

    //config react mui checkboxes
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />
    const checkedIcon = <CheckBoxIcon fontSize="medium" />

    const dataModalProposeReceiveDefault = {
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
        },
        fileIds: []
    }

    const [dataModalProposeReceive, setDataModalProposeReceive] = useState(dataModalProposeReceiveDefault);
    const [listDepartmentByType, setListDepartmentByType] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);

    //config modal confirm create task
    const [showModalConfirmCreateTask, setShowModalConfirmCreateTask] = useState(false);
    //nếu click vào đồng ý ở modal confirm create task data này sẽ gửi từ modal hiện tại -> confirm create task -> modal create task public/private
    const [dataModalConfirmCreateTask, setDataModalConfirmCreateTask] = useState({});
    //set loại confirm create task public/private
    const [typeModalConfirmCreateTask, setTypeModalConfirmCreateTask] = useState("UNSET");

    const handleOnchange = (value, inputName) => {
        let _dataModalProposeReceive = cloneDeep(dataModalProposeReceive);
        _dataModalProposeReceive.documentIncomming[inputName] = value;
        setDataModalProposeReceive(_dataModalProposeReceive);
    }

    const handleChangeSelectedDepartment = (e, value) => {
        setSelectedDepartment(value);
    };

    const proposeCheck = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 3)
        if (response === 200) {
            toast.success('Đã duyệt đề xuất!');
            props.makeModalProposeReceiveOutDoing(true);
            handleGetProposeReceiveById(props.dataModalProposeReceiveOut);
        }
    }

    const proposeRefuse = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 1)
        if (response === 200) {
            toast.error('Đã từ chối đề xuất!');
            props.makeModalProposeReceiveOutDoing(true);
            handleGetProposeReceiveById(props.dataModalProposeReceiveOut);
        }
    }

    const proposeReturn = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 2)
        if (response === 200) {
            toast.warning('Đã trả đề xuất về!');
            props.makeModalProposeReceiveOutDoing(true);
            handleGetProposeReceiveById(props.dataModalProposeReceiveOut);
        }
    }

    const handleMoveupProposeDepartmentOut = async (dataModalProposeReceive) => {
        let response = await moveupProposeDepartmentOut(dataModalProposeReceive, selectedDepartment.department_ID)
        if (response === 200) {
            toast.info(`Đã chuyển tiếp đề xuất qua ${selectedDepartment.department_Name}!`);
            props.makeModalProposeReceiveOutDoing(true);
            handleGetProposeReceiveById(props.dataModalProposeReceiveOut);
        }
    }

    const handleGetProposeReceiveById = async (proposeId) => {
        let propse = await getProposeReceiveById(proposeId);
        setDataModalProposeReceive(propse);
        if (propse.documentIncomming.document_Incomming_State === 3 && Object.keys(listDepartmentByType).length === 0) {
            getDepartmentByType();
        }
    }

    const handleHideModal = () => {
        props.closeModalProposeReceiveOut(false);
    }

    //gọi modal confirm create task
    const btnOpenModalConfirmCreateTask = (dataModalProposeReceive) => {
        setTypeModalConfirmCreateTask("PUBLIC");
        setDataModalConfirmCreateTask(dataModalProposeReceive);
        setShowModalConfirmCreateTask(true);
    }

    const getDepartmentByType = async () => {
        let resultListDepartment = await getAllDepartmentByType(2);
        if (resultListDepartment.length !== 0) {
            setListDepartmentByType(resultListDepartment);
        }
    }

    useEffect(() => {
        if (props.dataModalProposeReceiveOut.length !== 0) {
            handleGetProposeReceiveById(props.dataModalProposeReceiveOut);
        }
    }, [props.dataModalProposeReceiveOut])

    return (
        <>
            <div>
                <Modal show={props.activeModalProposeReceiveOut} onHide={() => handleHideModal()} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title><div className='text-primary text-uppercase'>Thông tin đề xuất</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-info-container col-xs-12">
                            <form autoComplete='off'>
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row d-flex justify-content-center form-group">
                                        <div className="row">
                                            <div className='col-sm-12'>
                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Tên đề xuất</Typography>
                                                <Typography variant='body1' className='form-control mt-1'>{dataModalProposeReceive.documentIncomming.document_Incomming_Title}</Typography>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Nội dung đề xuất</Typography>
                                                <Typography variant='body1' className='form-control mt-1'>{dataModalProposeReceive.documentIncomming.document_Incomming_Content}</Typography>
                                            </div>
                                            {(() => {
                                                if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 0 || dataModalProposeReceive.documentIncomming.document_Incomming_State === 1 || dataModalProposeReceive.documentIncomming.document_Incomming_State === 2) {
                                                    return (
                                                        <>
                                                            <div className='col-sm-12 mt-3 mb-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Ý kiến giải quyết</Typography>
                                                                <Typography >
                                                                    <textarea className='form-control mt-1 fs-6' id="document_Incomming_Comment" rows="4"
                                                                        onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Comment')} value={dataModalProposeReceive.documentIncomming.document_Incomming_Comment || ""}></textarea>
                                                                </Typography>
                                                            </div>
                                                            <div className='col-sm-12 mt-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>File đính kèm</Typography>
                                                                {/* <input type='file' className='form-control' id="proposeFile"
                                                accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input> */}
                                                            </div>
                                                        </>
                                                    )
                                                } else if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 3) {
                                                    return (
                                                        <>
                                                            <div className='col-sm-12 mt-3 mb-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Ý kiến giải quyết</Typography>
                                                                <Typography variant='body1' className='form-control mt-1'>
                                                                    {dataModalProposeReceive.documentIncomming.document_Incomming_Comment}
                                                                </Typography>
                                                            </div>

                                                            <div className='col-sm-12 mb-4'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>File đính kèm</Typography>
                                                                {/* <input type='file' className='form-control' id="proposeFile"
                                                accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input> */}
                                                            </div>

                                                            <div className='mb-1 d-flex'>
                                                                <AutoFixHighIcon></AutoFixHighIcon>
                                                                <hr style={{ border: '1.5px solid red', color: 'red', width: '100%' }} />
                                                            </div>

                                                            <div className='col-sm-12 mt-2 mb-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Lý do chuyển tiếp</Typography>
                                                                <Typography >
                                                                    <textarea className='form-control mt-1 fs-6' id="document_Incomming_Transition_Reason" rows="4"
                                                                        onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Transition_Reason')} value={dataModalProposeReceive.documentIncomming.document_Incomming_Transition_Reason || ""}></textarea>
                                                                </Typography>
                                                            </div>
                                                            <div className="col-sm-12 mt-1">
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Chuyển tiếp qua phòng chức năng</Typography>
                                                                <Autocomplete
                                                                    options={listDepartmentByType}
                                                                    getOptionLabel={(option) => option.department_Name}
                                                                    renderOption={(props, option, { selected }) => (
                                                                        <li {...props}>
                                                                            <Checkbox
                                                                                icon={icon}
                                                                                checkedIcon={checkedIcon}
                                                                                style={{ marginRight: 8 }}
                                                                                checked={selected}
                                                                            />
                                                                            {option.department_Name}
                                                                        </li>
                                                                    )}
                                                                    style={{ width: 718 }}
                                                                    onChange={(e, value) => handleChangeSelectedDepartment(e, value)}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="Gõ hoặc nhấn chọn một phòng chức năng..." />
                                                                    )}
                                                                />
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <>
                                                            <div className='col-sm-12 mt-3 mb-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Ý kiến giải quyết</Typography>
                                                                <Typography variant='body1' className='form-control mt-1'>
                                                                    {dataModalProposeReceive.documentIncomming.document_Incomming_Comment}
                                                                </Typography>
                                                            </div>
                                                            <div className='col-sm-12 mt-3'>
                                                                <Typography variant='body1' fontSize={17} color='FireBrick'>File đính kèm</Typography>
                                                                {/* <input type='file' className='form-control' id="proposeFile" accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input> */}
                                                            </div>
                                                            xem lịch sử đường đi của đề xuất ở dưới này
                                                        </>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='mb-2'>
                        {(() => {
                            if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 0) {
                                return (
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="danger" onClick={() => proposeRefuse(dataModalProposeReceive)}>Từ chối đề xuất</Button>
                                        <Button variant="warning" onClick={() => proposeReturn(dataModalProposeReceive)}>Trả đề xuất về</Button>
                                    </>
                                )
                            }
                            else if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 1) {
                                return (
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="warning" onClick={() => proposeReturn(dataModalProposeReceive)}>Trả đề xuất về</Button>
                                    </>
                                )
                            }
                            else if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 2) {
                                return (
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="danger" onClick={() => proposeRefuse(dataModalProposeReceive)}>Từ chối đề xuất</Button>
                                    </>
                                )
                            }
                            else if (dataModalProposeReceive.documentIncomming.document_Incomming_State === 3) {
                                return (
                                    <>
                                        <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="success" onClick={() => btnOpenModalConfirmCreateTask(dataModalProposeReceive)}>Tiếp nhận</ButtonMui>
                                        <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="secondary">Bàn giao</ButtonMui>
                                        <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="primary" onClick={() => handleMoveupProposeDepartmentOut(dataModalProposeReceive)}>Chuyển tiếp</ButtonMui>
                                    </>
                                )
                            }
                            else {
                                return (
                                    null
                                )
                            }
                        })()}
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <ModalCofirmCreateTask
                activeModalConfirmCreateTask={showModalConfirmCreateTask}
                closeModalConfirmCreateTask={setShowModalConfirmCreateTask}
                typeModalConfirmCreateTask={typeModalConfirmCreateTask}
                dataModalConfirmCreateTask={dataModalConfirmCreateTask}

                //truyền props qua modal confirm để đóng modal propseReceiveOut
                closeModalProposeReceiveOut={props.closeModalProposeReceiveOut}
                makeListProposeReceiveOutDoing={props.makeModalProposeReceiveOutDoing}
            />
        </>
    )
}

export default ModalProposeReceive