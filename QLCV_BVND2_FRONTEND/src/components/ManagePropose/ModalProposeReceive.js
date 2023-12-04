import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Modal from 'react-bootstrap/Modal';
//import some theme from mui
import Typography from '@mui/material/Typography';
//import some shit to create assign to department
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//import api for propose
import { updateProposeState, moveupProposeByHeader } from '../../services/proposeService';

function ModalProposeReceive(props) {
    const { user, logoutContext } = useContext(UserContext);

    //config react mui checkboxes
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />
    const checkedIcon = <CheckBoxIcon fontSize="medium" />

    const dataModalProposeReceiveDefault = {
        document_Incomming_Id: '',
        document_Incomming_Title: '',
        document_Incomming_Content: '',
        document_Incomming_UserSend: '',
        document_Incomming_UserSend_FullName: '',
        document_Incomming_UserReceive: '',
        document_Incomming_State: '',
        document_Incomming_Comment: '',
        document_Incomming_Time: '',
    }

    const [dataModalProposeReceive, setDataModalProposeReceive] = useState(dataModalProposeReceiveDefault);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    const handleOnchange = (value, inputName) => {
        let _dataModalProposeReceive = cloneDeep(dataModalProposeReceive);
        _dataModalProposeReceive[inputName] = value;
        setDataModalProposeReceive(_dataModalProposeReceive);
    }
 
    const handleChangeSelectedDepartment = (e, value) => {
        setSelectedDepartmentId(value);
    };
    
    const proposeCheck = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 3)
        if(response === 200){
            toast.success('Đã duyệt đề xuất!');
            props.makeModalDoing(true);
            props.close(false);
            setDataModalProposeReceive(dataModalProposeReceiveDefault);
        }
    }

    const proposeRefuse = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 1)
        if(response === 200){
            toast.error('Đã từ chối đề xuất!');
            props.makeModalDoing(true);
            props.close(false);
            setDataModalProposeReceive(dataModalProposeReceiveDefault);
        }
    }

    const proposeReturn = async (dataModalProposeReceive) => {
        let response = await updateProposeState(dataModalProposeReceive, 2)
        if(response === 200){
            toast.warning('Đã trả đề xuất về!');
            props.makeModalDoing(true);
            props.close(false);
            setDataModalProposeReceive(dataModalProposeReceiveDefault);
        }
    }

    const proposeMoveUp = async (dataModalProposeReceive) => {
        let response = await moveupProposeByHeader(dataModalProposeReceive, selectedDepartmentId.idPhongKhoa)
        if(response === 200){
            toast.info(`Đã chuyển đề xuất lên! ${selectedDepartmentId.tenPhongKhoa}`);
            props.makeModalDoing(true);
            props.close(false);
            setDataModalProposeReceive(dataModalProposeReceiveDefault);
        }
    }

    const handleHideModal = () => {
        props.close(false);
        setDataModalProposeReceive(dataModalProposeReceiveDefault);
    }

    useEffect(() => {
        if(props.actionModal === "INFO"){
            setDataModalProposeReceive({...props.dataModalPropose});
        }
    }, [props.dataModalPropose])

    return (
        <>
            <div>
                <Modal show={props.active} onHide={() => handleHideModal()} size='lg' className='mt-4'>
                    <Modal.Header closeButton>
                        <Modal.Title><div className='text-primary text-uppercase'>Thông tin đề xuất</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-info-container col-xs-12">
                            <form method="POST" action="/user/create-user" autoComplete='off'>
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row d-flex justify-content-center form-group">
                                        <div className="row">
                                            <div className='col-sm-12'>
                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Tên đề xuất</Typography>
                                                <Typography variant='body1' className='form-control mt-1'>{dataModalProposeReceive.document_Incomming_Title}</Typography>
                                            </div>   
                                            <div className='col-sm-12 mt-3'>
                                                <Typography variant='body1' fontSize={17} color='FireBrick'>Nội dung đề xuất</Typography>
                                                <Typography variant='body1' className='form-control mt-1'>{dataModalProposeReceive.document_Incomming_Content}</Typography>
                                            </div>
                                            {dataModalProposeReceive.document_Incomming_State === 0 || dataModalProposeReceive.document_Incomming_State === 1 || dataModalProposeReceive.document_Incomming_State === 2 ?
                                                <>
                                                    <div className='col-sm-12 mt-3 mb-3'>
                                                        <Typography variant='body1' fontSize={17} color='FireBrick'>Ý kiến giải quyết</Typography>
                                                        <Typography >
                                                            <textarea className='form-control mt-1 fs-6' id="document_Incomming_Comment" rows="4" 
                                                            onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Comment')} value={dataModalProposeReceive.document_Incomming_Comment || ""}></textarea>
                                                        </Typography>
                                                    </div>
                                                </>
                                            :
                                                <>
                                                    <div className="col-sm-12 mt-3 mb-3">
                                                        <Typography variant='body1' fontSize={17} color='FireBrick'>Gửi lên phòng chức năng</Typography>
                                                        <Autocomplete
                                                            options={dataPhongChucNang}
                                                            getOptionLabel={(option) => option.tenPhongKhoa}
                                                            renderOption={(props, option, { selected }) => (
                                                                <li {...props}>
                                                                <Checkbox
                                                                    icon={icon}
                                                                    checkedIcon={checkedIcon}
                                                                    style={{ marginRight: 8 }}
                                                                    checked={selected}
                                                                />
                                                                {option.tenPhongKhoa}
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
                                            }
                                            <div className='col-sm-12'>
                                                <Typography variant='body1' fontSize={17} color='FireBrick'>File đính kèm</Typography>
                                                {/* <input type='file' className='form-control' id="proposeFile"
                                                accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='mb-2'>
                        {(() => {
                            if(dataModalProposeReceive.document_Incomming_State === 0){
                                return(
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="danger" onClick={() => proposeRefuse(dataModalProposeReceive)}>Từ chối đề xuất</Button>
                                        <Button variant="warning" onClick={() => proposeReturn(dataModalProposeReceive)}>Trả đề xuất về</Button>
                                    </>
                                )
                            }
                            else if(dataModalProposeReceive.document_Incomming_State === 1){
                                return(
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="warning" onClick={() => proposeReturn(dataModalProposeReceive)}>Trả đề xuất về</Button>
                                    </>
                                )
                            }
                            else if(dataModalProposeReceive.document_Incomming_State === 2){
                                return(
                                    <>
                                        <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive)}>Duyệt đề xuất</Button>
                                        <Button variant="danger" onClick={() => proposeRefuse(dataModalProposeReceive)}>Từ chối đề xuất</Button>
                                    </>
                                )
                            }
                            else{
                                return(
                                    <><Button variant="info" onClick={() => proposeMoveUp(dataModalProposeReceive)}>Chuyển tiếp đề xuất </Button></>
                                )
                            }
                        })()}                                      
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

const dataPhongChucNang = [
    {
        "idPhongKhoa": 'KHTH',
        "tenPhongKhoa": "Phòng Kế hoạch tổng hợp"
    },
    {
        "idPhongKhoa": 'TCCB',
        "tenPhongKhoa": "Phòng Tổ chức cán bộ"
    },
    {
        "idPhongKhoa": 'TCKT',
        "tenPhongKhoa": "Phòng Tài chính kế toán"
    },
    {
        "idPhongKhoa": 'HCQT',
        "tenPhongKhoa": "Phòng Hành chính quản trị"
    },
    {
        "idPhongKhoa": 'ĐD',
        "tenPhongKhoa": "Phòng Điều dưỡng"
    },
    {
        "idPhongKhoa": 'CNTT',
        "tenPhongKhoa": "Phòng Công nghệ thông tin"
    },
    {
        "idPhongKhoa": 'QLCL',
        "tenPhongKhoa": "Phòng Quản lý chất lượng"
    },
    {
        "idPhongKhoa": 'CĐT',
        "tenPhongKhoa": "Phòng Chỉ đạo tuyến"
    },
    {
        "idPhongKhoa": 'VTYT',
        "tenPhongKhoa": "Phòng Vật tư, trang thiết bị y tế"
    },
    {
        "idPhongKhoa": 'CTXH',
        "tenPhongKhoa": "Phòng Công tác xã hội"
    },
];

export default ModalProposeReceive