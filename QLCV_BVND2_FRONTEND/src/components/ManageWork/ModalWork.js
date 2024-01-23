import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ImageConfig } from '../../config/ImageConfig';
import moment from 'moment';
//bs5
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//mui theme
import Box from '@mui/material/Box';
import ButtonMui from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//api
import { getByTaskId } from '../../services/taskService';

function ModalWork(props) {
    const dataWorkDefault = {
        task: {
            task_Id: '',
            task_Title: '',
            task_Content: '',
            task_Catagory_Name: '',
            task_DateSend: '',
            task_DateStart: '',
            task_DateEnd: '',
            task_Person_Send: '',
            userSend_FullName: '',
            task_Person_Receive: '',
            userReceive_FullName: '',
            task_State: '',
            document_Send_Id: '',
            task_TimeUpdate: ''
        },
        fileIds: [],
        fileComfirms: [],
    }

    const [open, setOpen] = useState(false);
    const [taskIdModalWork, setTaskIdModalWork] = useState(null);
    const [dataWork, setDataWork] = useState(dataWorkDefault);
    const [fileListState, setFileListState] = useState([]);

    const handleClose = () => {
        props.closeModalWork(false);
        setTaskIdModalWork(props.taskId);
        setOpen(false);
    }

    const handleGetByTaskId = async (taskId) => {
        let resultDataWork = await getByTaskId(taskId);
        setDataWork(resultDataWork);
    }

    const onSelectFile = () => {

    }

    const onDeleteFile = () => {

    }

    useEffect(() => {
        if (props.taskId !== null) {
            setOpen(true);
            handleGetByTaskId(props.taskId);
        }
    }, [props.taskId])

    useEffect(() => {
        if (props.activeModalWork !== false && taskIdModalWork !== null) {
            setOpen(true);
        }
    }, [props.activeModalWork])

    return (
        <div>
            <Modal show={open} onHide={handleClose} size='lg' className='mt-4'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '100%' }}><div className='text-primary text-uppercase text-uppercase d-flex justify-content-center'>{`${dataWork.task.task_Title} (${moment(dataWork.task.task_DateStart).format('DD/MM/YYYY HH:mm')} - ${moment(dataWork.task.task_DateEnd).format('DD/MM/YYYY HH:mm')})`}</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-info-container col-xs-12">
                        <div className="row">
                            <div className='col-sm-12'>
                                <Typography sx={{ color: '#black' }} variant="subtitle1" component="h2">{`Tên công việc: ${dataWork.task.task_Title}`}</Typography>
                            </div>
                            <div className='col-sm-12 mt-2'>
                                <Typography sx={{ color: 'black' }} variant="subtitle1" component="h2">{`Nội dung công việc: ${dataWork.task.task_Content}`}</Typography>
                            </div>
                            <div className='col-sm-7 mt-2'>
                                <Typography sx={{ color: '#black' }} variant="subtitle1" component="h2">{`Thời hạn xử lý: ${moment(dataWork.task.task_DateStart).format('DD/MM/YYYY HH:mm')} - ${moment(dataWork.task.task_DateEnd).format('DD/MM/YYYY HH:mm')}`}</Typography>
                            </div>
                            <div className='col-sm-5 mt-2'>
                                <Typography sx={{ color: '#black' }} variant="subtitle1" component="h2">{`Loại công việc: ${dataWork.task.task_Catagory_Name}`}</Typography>
                            </div>
                            {dataWork.fileIds.length > 0 ?
                                <div className='col-sm-12 mt-2'>
                                    <div className='wrap' style={{ width: '100%', margin: 'auto' }}>
                                        <Typography sx={{ color: '#black' }} variant='subtitle1' component="h2" color='black'>File đính kèm</Typography>
                                        <div className='selected-file-preview-item col-sm-12 row' style={{ marginTop: '.40rem' }}>
                                            {dataWork.fileIds.map((itemFile, index) => {
                                                return (
                                                    <Tooltip TransitionComponent={Fade} arrow title={itemFile.file_Name} key={index}>
                                                        <div className='selected-file-preview-item-info col-sm-5 mt-2'>
                                                            <div className='selected-file-preview-item-info-img-type-file'>
                                                                <img alt='' src={ImageConfig[itemFile.contentType] || ImageConfig['default']} />
                                                            </div>
                                                            <div className='selected-file-preview-item-info-label'>
                                                                <Typography className='selected-file-preview-item-info-label-file-name' component="span" variant="body1">
                                                                    {itemFile.file_Name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {dataWork.task.task_Person_Send !== dataWork.task.task_Person_Receive ?
                                ""
                                :
                                null
                            }
                            <div className='col-sm-12 mt-3'>
                                <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 15px', height: 'auto', p: 1, m: 0, borderRadius: 2, textAlign: 'center' }}>
                                    <div className='wrap' style={{ width: '100%', margin: 'auto' }}>
                                        <Typography variant='body1' fontSize='1.1rem' color='black'>File hoàn thành công việc (nếu có)</Typography>
                                        <div className='file-input-container'>
                                            <div className='file-input-label'>
                                                <CloudUploadIcon sx={{ color: 'darkturquoise', fontSize: '70px' }}></CloudUploadIcon>
                                                <Typography variant='subtitle2' fontWeight='600' color='gray' fontSize='0.8rem'>Nhấn vào đây để chọn file</Typography>
                                            </div>
                                            <div className='file-input'>
                                                <input type='file' accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple onChange={(e) => onSelectFile(e)}></input>
                                            </div>
                                        </div>
                                        {
                                            fileListState.length > 0 ? (
                                                <div className='selected-file-preview-item col-sm-12 row' style={{ marginTop: '.70rem' }}>
                                                    {
                                                        fileListState.map((itemFile, index) => {
                                                            return (
                                                                <Tooltip TransitionComponent={Fade} arrow title={itemFile.name} key={index}>
                                                                    <div className='selected-file-preview-item-info col-sm-5 mt-2'>
                                                                        <div className='selected-file-preview-item-info-img-type-file'>
                                                                            <img alt='' src={ImageConfig[itemFile.type] || ImageConfig['default']} />
                                                                        </div>
                                                                        <div className='selected-file-preview-item-info-label'>
                                                                            <Typography className='selected-file-preview-item-info-label-file-name' component="span" variant="body1">
                                                                                {itemFile.name}
                                                                            </Typography><p className='selected-file-preview-item-info-label-file-size'>{itemFile.size} B</p>
                                                                        </div>
                                                                        <span className='selected-file-preview-delete-item fa fa-times-circle' onClick={() => onDeleteFile(itemFile)}></span>
                                                                    </div>
                                                                </Tooltip>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonMui variant="contained" color="success">Hoàn thành</ButtonMui>
                    <Button variant="secondary" onClick={() => handleClose()}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalWork