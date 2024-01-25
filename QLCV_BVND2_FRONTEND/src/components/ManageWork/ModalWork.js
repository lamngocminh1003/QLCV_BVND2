import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ImageConfig } from '../../config/ImageConfig';
import { UserContext } from '../../context/UserContext';
import _, { assign, cloneDeep, forEach, set, debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
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
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
//css
import "./SCSS/ModalWork.scss";
//api
import { getByTaskId, getListDiscussByTaskId, createSendDiscuss, updateConfirmCompletionTask } from '../../services/taskService';

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
    const [task_DiscussContent, setTask_DiscussContent] = useState("");
    const [listDiscussTask, setListDiscussTask] = useState([]);

    const { user } = useContext(UserContext);

    const handleClose = () => {
        props.closeModalWork(false);
        setTaskIdModalWork(props.taskId);
        setOpen(false);
    }

    const handleGetByTaskId = async (taskId) => {
        let resultDataWork = await getByTaskId(taskId);
        setDataWork(resultDataWork);
    }

    const handleGetListDiscussTask = async (taskId) => {
        let resultListDiscuss = await getListDiscussByTaskId(taskId);
        setListDiscussTask(resultListDiscuss);
    }

    const renderTaskTextColor = (taskStart, taskEnd, taskState) => {
        let startDay = moment(taskStart);
        let endDay = moment(taskEnd);
        let today = moment();

        if (taskState === 5) {
            return 'task-text-completed';
        }
        else if (endDay.diff(today, 'days') < 0) {
            //hết hạn
            return 'task-text-expired';
        }
        else if (endDay.diff(today, 'days') === 0) {
            //gần hết hạn
            return 'task-text-due-date';
        }
        else {
            //đang thực hiện
            return 'task-text-processing';
        }
    }

    const onSelectFile = (e) => {
        let newListFile = e.target.files;
        let newObjects = _.differenceBy(newListFile, fileListState, 'name');

        if (newObjects.length !== 0) {
            newObjects.forEach((object) => {
                object.file_Id = `File-Clone ${uuidv4()}`;
            })

            let updatedList = [...fileListState, ...newObjects];
            setFileListState(updatedList);
        }
    }

    const onDeleteFile = () => {

    }

    const pasteAsPlainText = () => {

    }

    const handleOnChangeDiscussContent = (value) => {
        setTask_DiscussContent(value);
    }

    const handleOnKeyDownEnter = (event, task_Id) => {
        if (event.which === 13 && event.code === "Enter") {
            event.preventDefault();
            handleSendDiscuss(task_Id);
        }
    }

    const handleSendDiscuss = async (taskId) => {
        let dataObj = { task_Id: taskId, task_DiscussContent: task_DiscussContent }
        let result = await createSendDiscuss(dataObj);
        if (result === 200) {
            handleGetListDiscussTask(props.taskId);
            setTask_DiscussContent('');
            let inputAreaByTaskId = document.getElementById(`input-area ${taskId}`);
            inputAreaByTaskId.textContent = '';
        }
    }

    useEffect(() => {
        if (props.taskId !== null) {
            setOpen(true);
            handleGetByTaskId(props.taskId);
            handleGetListDiscussTask(props.taskId)
        }
    }, [props.taskId])

    useEffect(() => {
        if (props.activeModalWork !== false && taskIdModalWork !== null) {
            setOpen(true);
        }
    }, [props.activeModalWork])

    return (
        <div>
            <Modal show={open} onHide={handleClose} size='lg' className='mt-3'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '100%' }}><div className='text-primary text-uppercase text-uppercase d-flex justify-content-center'>{`${dataWork.task.task_Title}`}</div></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '81vh', overflowY: 'auto' }}>
                    <div className="user-info-container col-xs-12">
                        <div className="row">
                            <div className='col-sm-12'>
                                <Typography sx={{ color: 'black' }} variant="subtitle1" component="h2">Tên công việc:
                                    <span className={renderTaskTextColor(dataWork.task.task_DateStart, dataWork.task.task_DateEnd, dataWork.task_State)}> {dataWork.task.task_Title}</span>
                                </Typography>
                            </div>

                            <div className='col-sm-12 mt-2'>
                                <Typography sx={{ color: 'black' }} variant="subtitle1" component="h2">Nội dung công việc:
                                    <span className={renderTaskTextColor(dataWork.task.task_DateStart, dataWork.task.task_DateEnd, dataWork.task_State)}> {dataWork.task.task_Content}</span>
                                </Typography>
                            </div>

                            <div className='col-sm-7 mt-2'>
                                <Typography sx={{ color: 'black' }} variant="subtitle1" component="h2">Thời hạn xử lý:
                                    <span className={renderTaskTextColor(dataWork.task.task_DateStart, dataWork.task.task_DateEnd, dataWork.task_State)}> {moment(dataWork.task.task_DateStart).format('DD/MM/YYYY HH:mm')} - {moment(dataWork.task.task_DateEnd).format('DD/MM/YYYY HH:mm')} </span>
                                </Typography>
                            </div>

                            <div className='col-sm-5 mt-2'>
                                <Typography sx={{ color: 'black' }} variant="subtitle1" component="h2">Loại công việc:
                                    <span className={renderTaskTextColor(dataWork.task.task_DateStart, dataWork.task.task_DateEnd, dataWork.task_State)}> {dataWork.task.task_Catagory_Name}</span>
                                </Typography>
                            </div>

                            {dataWork.task.task_Person_Send !== dataWork.task.task_Person_Receive ?
                                <div className='col-sm-12' >
                                    <div className='comment-section task-discuss mt-1' >
                                        {listDiscussTask.length > 0 ?
                                            <div className={listDiscussTask.length >= 5 ? "discuss-show" : ""}>
                                                {
                                                    listDiscussTask.map((discuss, index) => {
                                                        return (
                                                            <div className='warp-comment' key={index}>
                                                                <List sx={{ mt: 0, p: 0 }}>
                                                                    <ListItem sx={{ px: 0, paddingBottom: 0, overflowY: 'hidden' }}>
                                                                        <ListItemAvatar sx={{ minWidth: '48px' }}>
                                                                            <Avatar sx={{ bgcolor: discuss.discuss_User === user.account.userId ? 'rgb(11, 229, 222)' : 'rgb(183, 96, 77)', width: 34, height: 34 }}></Avatar>
                                                                        </ListItemAvatar>
                                                                        <Box className='discuss-box'>
                                                                            <ListItemText className='dissucss-content'
                                                                                primary={discuss.userSend_Fullname}
                                                                                secondary={discuss.discuss_Content} />
                                                                        </Box>
                                                                    </ListItem>
                                                                    <div className='comment-time'>
                                                                        <span className='discuss-time-send'>{`${moment(discuss.discuss_Time).startOf().fromNow()} - ${moment(discuss.discuss_Time).format('LLLL')}`}</span>
                                                                    </div>
                                                                </List>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                            :
                                            <div className='empty-comment'>
                                                <QuestionAnswerIcon sx={{ height: 70, width: '100%', color: 'slategray' }} />
                                                <Typography sx={{ color: "rgb(176, 179, 184", fontFamily: "Arimo, sans-serif" }}>Chưa có bình luận nào.</Typography>
                                            </div>
                                        }
                                        <div className='task-discuss-input d-flex mb-1' suppressContentEditableWarning={true}>
                                            <div className='input-area'>
                                                <div className={`child-1 comment-input`} id={`input-area ${dataWork.task.task_Id}`} contentEditable='true' aria-label='Viết bình luận...' onPaste={(e) => pasteAsPlainText(e)}
                                                    onInput={(e) => handleOnChangeDiscussContent(e.currentTarget.textContent)} onKeyPress={(e) => handleOnKeyDownEnter(e, dataWork.task.task_Id)}>
                                                </div>
                                            </div>
                                            <div className='input-send-icon' style={task_DiscussContent === "" ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}>
                                                <IconButton color={task_DiscussContent === "" ? 'default' : 'primary'}
                                                    disabled={task_DiscussContent === "" ? true : false} size="large" onClick={() => handleSendDiscuss(dataWork.task.task_Id)}>
                                                    <SendIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }

                            {dataWork.fileIds.length > 0 ?
                                <div className='col-sm-12 mt-2'>
                                    <div className='wrap' style={{ width: '100%', margin: 'auto' }}>
                                        <Typography sx={{ color: '#black' }} variant='subtitle1' component="h2" color='black'>File công việc đã đính kèm</Typography>
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