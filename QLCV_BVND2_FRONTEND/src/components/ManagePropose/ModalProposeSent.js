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
//import some api
import { createPropose, createProposeByHeader } from '../../services/proposeService';
import { getAllDepartmentByType } from '../../services/departmentService'; 

const ModalPropose = (props) => {
    const { user, logoutContext } = useContext(UserContext);

    const dataProposeDefault = {
        document_Incomming_Title: '',
        proposeFile: '',
        document_Incomming_Content: ''
    }

    const [dataPropose, setDataPropose] = useState(dataProposeDefault);
    const [dataProposeFile, setDataProposeFile] = useState([]);

    const [listDepartmentByType, setListDepartmentByType] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    //config react mui checkboxes
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />
    const checkedIcon = <CheckBoxIcon fontSize="medium" />

    const handleHideModal = () => {
        props.close(false)
        setDataPropose(dataProposeDefault)
    }

    const handleOnchange = (value, name) => {
        let _dataPropose = cloneDeep(dataPropose);
        _dataPropose[name] = value;
        setDataPropose(_dataPropose);
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

        dataPropose.proposeFile = formDataFile;
        let response = await createPropose(dataPropose);
        if(response === 200){
            toast.success('Gửi đề xuất thành công!');
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
        dataPropose.proposeFile = formDataFile;
        let result = await createProposeByHeader(dataPropose, selectedDepartmentId);
        if(result === 200){
            toast.success('Gửi đề xuất thành công!');
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
        if(props.setActionModalPropose === 'INFO'){
            setDataPropose({...props.dataModalPropose})
        }
        else if(props.setActionModalPropose === 'CREATE' && user.account.userId === user.account.departmentHead){
            setDataPropose({...props.dataModalPropose})
            getDepartmentByType();
        }
    }, [props.dataModalPropose])

    return(
        <>
            <div>
                <Modal show={props.active} onHide={() => handleHideModal()} size='lg' className='mt-4'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {(() => {
                                if(props.setActionModalPropose === "CREATE"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Gửi đề xuất</div></>
                                    )
                                }
                                else if(props.setActionModalPropose === "EDIT"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Sửa đề xuất</div></>
                                    )
                                }
                                else if(props.setActionModalPropose === "INFO"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Thông tin đề xuất</div></>
                                    )
                                }
                                else if(props.setActionModalPropose === "FEEDBACK"){
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
                        <div className="user-info-container col-xs-12">
                            <form method="POST" action="/user/create-user" autoComplete='off'>
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row d-flex justify-content-center form-group">
                                        <div className="row">
                                            <div className='col-sm-12'>
                                                <label className='form-label fs-5' htmlFor='propose'>Tên đề xuất <span className='text-danger'>(*)</span></label>
                                                <input type='text' className='form-control' id="propose" onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Title')} value={dataPropose.document_Incomming_Title || ""}></input>   
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='proposeFile'>File đính kèm</label>
                                                <input type='file' className='form-control' id="proposeFile" onChange={(e) => handleFile(e)} 
                                                accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='document_Incomming_Content'>Nội dung đề xuất <span className='text-danger'>(*)</span></label>
                                                <textarea className='form-control' id="document_Incomming_Content" rows="4" onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Content')} value={dataPropose.document_Incomming_Content || ""}></textarea>
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
                    </Modal.Body>
                    <Modal.Footer>
                        {user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead ? 
                            <><Button variant="primary" onClick={() => handleCreateProposeByHeader()}>Gửi</Button> </>
                        : 
                            <><Button variant="primary" onClick={() => handleCreateProposeByEmploy()}>Gửi</Button></>
                        }
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalPropose