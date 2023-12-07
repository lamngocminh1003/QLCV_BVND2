import React, { useState, useEffect, useContext, useCallback } from 'react';
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
//import some api
import { createPropose, createProposeByHeader } from '../../services/proposeService';
import { getAllDepartmentByType } from '../../services/departmentService'; 

const ModalPropose = (props) => {
    const { user } = useContext(UserContext);

    const dataProposeSentDefault = {
        document_Incomming_Id: '',
        document_Incomming_Title: '',
        document_Incomming_Content: '',
        document_Incomming_Time: '',
        document_Incomming_UserSend: '',
        document_Incomming_UserSend_FullName: '',
        deparment_NameReceive: '',
        document_Incomming_UserReceive: '',
        document_Incomming_State: '',
        document_Incomming_Comment: '',
        proposeFile: ''
    }

    const [dataModalProposeSent, setDataModalProposeSent] = useState(dataProposeSentDefault);
    const [dataProposeFile, setDataProposeFile] = useState([]);

    const [listDepartmentByType, setListDepartmentByType] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    //config react mui checkboxes
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />
    const checkedIcon = <CheckBoxIcon fontSize="medium" />

    const handleHideModal = () => {
        props.closeModalProposeSent(false)
        setDataModalProposeSent(dataProposeSentDefault)
    }

    const handleOnchange = (value, name) => {
        let _dataPropose = cloneDeep(dataModalProposeSent);
        _dataPropose[name] = value;
        setDataModalProposeSent(_dataPropose);
    }

    const handleFile = (event) => {
        let selectedFile = event.target.files;
        if(selectedFile){
            setDataProposeFile(selectedFile);
        }
    }

    const handleChangeSelectedDepartment = (e, value) => {
        setSelectedDepartmentId(value.department_ID);
    };

    //gửi đề xuất bởi nhân viên
    const handleCreateProposeByEmploy = async () => {
        let formDataFile = new FormData();

        let i;
        for(i = 0; i < dataProposeFile.length; i++)
        {
            formDataFile.append('proposeFiles', dataProposeFile[i])
        }

        dataModalProposeSent.proposeFile = formDataFile;
        let response = await createPropose(dataModalProposeSent);
        if(response === 200){
            toast.success('Gửi đề xuất thành công!');
            props.makeModalProposeSentDoing(true); 
            setDataModalProposeSent(dataProposeSentDefault);
        }else{
            toast.error('Đã có lỗi xảy ra ở server vui lòng liên hệ quản trị viên để kiểm tra lại!');
        }
    }

    //gửi đề xuất bởi trưởng phòng
    const handleCreateProposeByHeader = async () => {
        let formDataFile = new FormData();
        
        let i;
        for(i = 0; i < dataProposeFile.length; i++)
        {
            formDataFile.append('proposeFiles', dataProposeFile[i])
        }
        dataModalProposeSent.proposeFile = formDataFile;
        let result = await createProposeByHeader(dataModalProposeSent, selectedDepartmentId);
        if(result === 200){
            toast.success('Gửi đề xuất thành công!');
            props.makeModalProposeSentDoing(true);
            setDataModalProposeSent(dataProposeSentDefault);
        }else{
            toast.error(result);
        }
    }

    const getDepartmentByType = async () => {
        let resultListDepartment = await getAllDepartmentByType(2);
        if(resultListDepartment.length !== 0){
            setListDepartmentByType(resultListDepartment);
        }   
    }     

    useEffect(()=> {
        if(props.actionModalProposeSent === 'INFO'){
            setDataModalProposeSent({...props.dataModalProposeSent})
        }
        else if(props.actionModalProposeSent === 'CREATE' && user.account.userId === user.account.departmentHead){
            getDepartmentByType();
        }
    }, [props.dataModalProposeSent])

    return(
        <>
            <div>
                <Modal show={props.activeModalProposeSent} onHide={() => handleHideModal()} size='lg' className='mt-4'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {(() => {
                                if(props.actionModalProposeSent === "CREATE"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Gửi đề xuất</div></>
                                    )
                                }
                                else if(props.actionModalProposeSent === "EDIT"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Sửa đề xuất</div></>
                                    )
                                }
                                else if(props.actionModalProposeSent === "INFO"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Thông tin đề xuất</div></>
                                    )
                                }
                                else if(props.actionModalProposeSent === "FEEDBACK"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Phản hồi đề xuất</div></>
                                    )
                                }
                                else{
                                    return(
                                        <><div className='text-primary text-uppercase'>Xóa đề xuất</div></>
                                    )
                                }
                            })()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {(() => {
                            switch(props.actionModalProposeSent){
                                case 'CREATE':
                                    return(
                                        <>
                                            <div className="user-info-container col-xs-12">
                                                <form method="POST" action="/user/create-user" autoComplete='off'>
                                                    <div className="container" style={{ overflow: "visible" }}>
                                                        <div className="row d-flex justify-content-center form-group">
                                                            <div className="row">
                                                                <div className='col-sm-12'>
                                                                    <label className='form-label fs-5' htmlFor='propose'>Tên đề xuất <span className='text-danger'>(*)</span></label>
                                                                    <input type='text' className='form-control' id="propose" onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Title')} value={dataModalProposeSent.document_Incomming_Title || ""}></input>   
                                                                </div>
                                                                <div className='col-sm-12 mt-3'>
                                                                    <label className='form-label fs-5' htmlFor='proposeFile'>File đính kèm</label>
                                                                    <input type='file' className='form-control' id="proposeFile" onChange={(e) => handleFile(e)} 
                                                                    accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input>
                                                                </div>
                                                                <div className='col-sm-12 mt-3'>
                                                                    <label className='form-label fs-5' htmlFor='document_Incomming_Content'>Nội dung đề xuất <span className='text-danger'>(*)</span></label>
                                                                    <textarea className='form-control' id="document_Incomming_Content" rows="5" onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Content')} value={dataModalProposeSent.document_Incomming_Content || ""}></textarea>
                                                                </div>
                                                                {user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead ? 
                                                                    <>
                                                                    <div className="col-sm-12 mt-3">
                                                                        <Typography variant='body1' fontSize={17} color='FireBrick'>Gửi lên phòng chức năng</Typography>
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
                                                                : 
                                                                    null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )
                                case 'INFO':
                                default: 
                                    return null;
                            }
                        })()}  
                    </Modal.Body>
                    <Modal.Footer>
                        {(() => {
                            switch(props.actionModalProposeSent){
                                case 'CREATE':
                                    if(user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead){
                                        return(<><Button variant="primary" onClick={() => handleCreateProposeByHeader()}>Gửi</Button></>)
                                    }
                                    else{
                                        return(<><Button variant="primary" onClick={() => handleCreateProposeByEmploy()}>Gửi</Button></>)
                                    }
                                
                                case 'INFO':
                                    //chờ duyệt
                                    if(dataModalProposeSent.document_Incomming_State === 0){
                                        return(
                                            <>
                                                <Button variant='warning'>Sửa đề xuất</Button>
                                                <Button variant='danger'>Xóa đề xuất</Button>
                                            </>
                                        )
                                    }
                                    //từ chối
                                    else if(dataModalProposeSent.document_Incomming_State === 1){
                                        return(
                                            <>
                                                <Button variant='primary'>Gửi đề xuất</Button>
                                                <Button variant='danger'>Xóa đề xuất</Button>
                                            </>
                                        )
                                    }
                                    //trả về chỉnh sửa
                                    else if(dataModalProposeSent.document_Incomming_State === 2){
                                        return(
                                            <>
                                                <Button variant='primary'>Gửi đề xuất</Button>
                                                <Button variant='danger'>Xóa đề xuất</Button>
                                            </>
                                        )
                                    }
                                    //đã duyệt
                                    else if(dataModalProposeSent.document_Incomming_State === 3){
                                        return(<></>)
                                    }
                                
                                break;

                                default:
                                    return null
                            }
                        })()}
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalPropose