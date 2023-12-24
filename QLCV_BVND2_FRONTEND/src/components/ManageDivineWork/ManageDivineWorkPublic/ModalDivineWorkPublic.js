import React, { useEffect, useState } from 'react'
import _, { assign, cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
//bs5
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//mui theme
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import ButtonMui from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
//mui icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//css
import "../SCSS/DivineWork.scss";
//modal
import ModalAssignDivineWorkPublic from './ModalAssignDivineWorkPublic';
//api
import { getListTaskByDocSendId } from '../../../services/taskService';
import { getDate } from 'date-fns';
//cdn
<style>
  @import url('https://www.w3schools.com/w3css/4/w3.css');
</style>


function ModalDivineWorkPublic(props) {
  const dataModalDivineWorkPublicDefault = {
    task_Id: '',
    task_Title: '',
    task_Content: '',
    task_DateStart: '',
    task_DateEnd: '',
    task_Catagory_Id: '',
    task_Catagory_Name: '',
    userReceive_FullName: '',
    userSend_FullName: '',
    task_State: '',
  }

  const dataDiscussContentDefault = {
    taskId: '',
    discussContent: ''
  }

  const [divineWork, setDivineWork] = useState(''); //1 divine work
  const [objDivineWork, setObjDivineWork] = useState({}); //1 obj divine work
  const [listDivineWork, setListDivineWork] = useState([]); //1 list chứa 1 đống obj divine work

  //config discuss
  const [dataDiscussContent, setDataDiscussContent] = useState(dataDiscussContentDefault);

  //config modal assign divine work public
  const [showModalAssignDivineWorkPublic, setShowModalAssignDivineWorkPublic] = useState(false);
  const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState({});

  const getExpireDateTime = (task_DateEnd) => {
    const expiration = moment(task_DateEnd);
    // get the difference between the moments
    const diff = expiration.diff(moment());
    //express as a duration
    const diffDuration = moment.duration(diff);
    return diffDuration;
  }

  const handleHideModal = () => {
    props.closeModalDivineWorkPublic(false);
  }

  const handlePressEnter = (event) => {
    if (event.which === 13 && event.code === "Enter") {
      createDivineWork();
    }
  }

  const createDivineWork = () => {
    //create new obj devine work
    let _objDivineWork = _.cloneDeep(objDivineWork);
    _objDivineWork = {
      document_Send_Id: props.taskSendId,
      task_Id: `task ${uuidv4()}`,
      task_Title: divineWork,
      task_Content: '',
      task_DateSend: '',
      task_DateStart: '',
      task_DateEnd: '',
      task_Catagory_Id: '',
      task_Catagory_Name: '',
      userReceive_Id: '',
      userReceive_FullName: '',
      userSend_FullName: '',
    }
    setObjDivineWork(_objDivineWork);

    //push obj to listDivineWork array
    let _listDivineWork = _.cloneDeep(listDivineWork);
    _listDivineWork.push(_objDivineWork);
    setListDivineWork(_listDivineWork);
    setDivineWork('');
  }

  const deleteDivineWork = (task_Id_Value, event) => {
    event.stopPropagation();
    let _listDivineWork = _.cloneDeep(listDivineWork);
    _listDivineWork = _.filter(_listDivineWork, function (currentObject) {
      return currentObject.task_Id !== task_Id_Value;
    })
    setListDivineWork(_listDivineWork);
  }

  const assignInfoDivineWork = (e, itemValue) => {
    e.stopPropagation();
    setDataModalAssignDivineWorkPublic(itemValue)
    setShowModalAssignDivineWorkPublic(true);
  }

  const editInfoDivineWork = (e) => {
    e.stopPropagation();
    alert('user nhan viec khong rong');
  }

  const handleOnChangeDiscussContent = (value, inputNameDiscussContent, taskId, inputNameTaskId, e) => {
    if (dataDiscussContent.discussContent === '') {
      if (dataDiscussContent.taskId === '') {
        let _dataDiscussContent = _.cloneDeep(dataDiscussContent);
        _dataDiscussContent[inputNameTaskId] = taskId;
        _dataDiscussContent[inputNameDiscussContent] = value;
        setDataDiscussContent(_dataDiscussContent);
      }
      else {
        let _dataDiscussContent = _.cloneDeep(dataDiscussContent);
        _dataDiscussContent[inputNameDiscussContent] = value;
        setDataDiscussContent(_dataDiscussContent);
      }
    }
    else {
      let _dataDiscussContent = _.cloneDeep(dataDiscussContent);
      _dataDiscussContent[inputNameTaskId] = taskId;
      _dataDiscussContent[inputNameDiscussContent] = value;
      setDataDiscussContent(_dataDiscussContent);
    }
  }

  const handleOnKeyDownDelete = (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 8 && dataDiscussContent.discussContent === '') {
      let _dataDiscussContent = _.cloneDeep(dataDiscussContent);
      _dataDiscussContent.taskId = '';
      setDataDiscussContent(_dataDiscussContent.taskId);
    }
  }

  //format dán text
  const pasteAsPlainText = (event) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  const handleGetListTaskByDocSendId = async (docSendId) => {
    let resultListDivineWork = await getListTaskByDocSendId(docSendId);
    setListDivineWork(resultListDivineWork);
  }

  useEffect(() => {
    if (props.taskSendId.length !== 0) {
      handleGetListTaskByDocSendId(props.taskSendId);
    }
  }, [props.taskSendId])

  return (
    <>
      <Modal size='lg' show={props.activeModalDivineWorkPublic} onHide={() => handleHideModal()} backdrop={'static'} keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='text-primary text-uppercase'>{`Công việc cho ${props.taskSendTitle}`}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-xs-12">
            <div className='row d-flex justify-content-center'>
              <div className='row col-8 p-0'>
                <Form.Group>
                  <Form.Label >Thêm công việc</Form.Label>
                  <Stack direction="row" spacing={0.5}>
                    <Form.Control type="text" value={divineWork || ""} onChange={(e) => setDivineWork(e.target.value)} onKeyDown={(event) => handlePressEnter(event)} />
                    <IconButton color='primary' size="medium" onClick={() => createDivineWork()}><AddCircleIcon fontSize="inherit" sx={{ transform: 'Scale(1.4)' }} /></IconButton>
                  </Stack>
                </Form.Group>
              </div>
              <div className='list-task mt-2'>
                <div className='list-task-div'>
                  {listDivineWork.length !== 0 ?
                    <>
                      <Typography variant="h6" color='red' sx={{ mb: 0.8 }}>Danh sách công việc</Typography>
                      {Object.entries(listDivineWork).map(([itemKey, itemValue]) => {
                        let expire = getExpireDateTime(itemValue.task_DateEnd)
                        return (
                          <Accordion key={`task-${itemKey}`} className={`list-title ${itemKey > 0 ? 'mt-3' : ''}`} sx={{ wordBreak: 'break-all', boxShadow: 3 }}>
                            <div className='list-parent-task p-1'>
                              <AccordionSummary>
                                <Typography className={`item child ${itemKey} text-uppercase text-white fw-bolder col-10 px-0`} sx={{ fontSize: '17px' }}>
                                  {itemValue.task_Title}
                                </Typography>
                                <Box className='text-white d-flex flex-row col-2 justify-content-end p-0'>
                                  <Tooltip title="Thông tin giao việc">
                                    <AssignmentIndIcon className='mr-2' fontSize='medium' onClick={(e) => itemValue.userReceive_FullName === "" ? assignInfoDivineWork(e, itemValue) : editInfoDivineWork(e, itemValue)} />
                                  </Tooltip>
                                  {itemValue.userReceive_FullName === "" ?
                                    <Tooltip title="Xóa công việc">
                                      <DeleteIcon fontSize='medium' onClick={(event) => deleteDivineWork(itemValue.task_Id, event)} />
                                    </Tooltip>
                                    :
                                    ""
                                  }
                                </Box>
                              </AccordionSummary>
                            </div>
                            <div className='list-children-task border border-top-0 rounded-bottom' style={{ backgroundColor: "#fff" }}>
                              <AccordionDetails>

                                <div className='task-content'>
                                  <Typography variant="h6">{itemValue.task_Content}</Typography>
                                </div>

                                <div className='details-task-receive mt-1 py-1' style={{ borderTop: '1.8px solid silver' }}>
                                  <Stack direction="row" sx={{ mt: 0.5 }} spacing={1}>
                                    <Typography variant='subtitle1' color='#0e9193'>Ngày tạo công việc: </Typography>
                                    <Typography variant="subtitle1">{`${itemValue.task_DateSend !== '' ? moment(itemValue.task_DateSend).format('LLLL') : ""} - `}</Typography>
                                    <Typography variant='subtitle1' color='#0e9193'>Loại công việc: </Typography>
                                    <Typography variant="subtitle1">{itemValue.task_Catagory_Name}</Typography>
                                  </Stack>
                                  <Stack direction="row" spacing={0.6}>
                                    <Typography variant='subtitle1' color='#0e9193'>Thời hạn: </Typography>
                                    <Typography variant="subtitle1">
                                      {itemValue.task_DateStart && itemValue.task_DateEnd !== '' ?
                                        `${moment(itemValue.task_DateStart).format('L')} - ${moment(itemValue.task_DateEnd).format('L')} 
                                      (còn lại ${expire.days() !== 0 ? expire.days() + ' ngày' : expire.hours() + ' giờ'}) -`
                                        :
                                        ""
                                      }
                                    </Typography>
                                    <Typography variant='subtitle1' color='#0e9193'>Người thực hiện: </Typography>
                                    <Typography variant="subtitle1">{itemValue.userReceive_FullName}</Typography>
                                  </Stack>
                                  <Stack direction="row" spacing={0.6}>

                                  </Stack>
                                </div>

                                <div className='task-discuss mt-1'>
                                  <List sx={{ mt: 0 }}>
                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemAvatar sx={{ minWidth: '52px' }}><Avatar sx={{ bgcolor: 'rgb(160, 166, 255)' }}></Avatar></ListItemAvatar>
                                      <Box className='discuss-box'>
                                        <ListItemText className='dissucss-content' primary='Lê Phú Quí' secondary='bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận' />
                                      </Box>
                                    </ListItem>

                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemAvatar sx={{ minWidth: '52px' }}><Avatar alt="Profile Picture" sx={{ bgcolor: 'rgb(160, 166, 255)' }}></Avatar></ListItemAvatar>
                                      <Box className='discuss-box'>
                                        <ListItemText className='dissucss-content' primary='Lê Phú Quí' secondary='bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận bình luận' />
                                      </Box>
                                    </ListItem>

                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemAvatar sx={{ minWidth: '52px' }}><Avatar alt="Profile Picture" sx={{ bgcolor: 'rgb(160, 166, 255)' }}></Avatar></ListItemAvatar>
                                      <Box className='discuss-box'>
                                        <ListItemText className='dissucss-content' primary='Lê Phú Quí' secondary='bình luận bình luận bình luận' />
                                      </Box>
                                    </ListItem>

                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemAvatar sx={{ minWidth: '52px' }}><Avatar alt="Profile Picture" sx={{ bgcolor: 'rgb(160, 166, 255)' }}></Avatar></ListItemAvatar>
                                      <Box className='discuss-box'>
                                        <ListItemText className='dissucss-content' primary='Lê Phú Quí' secondary='luận bình luận bình luận bình luận luận bình luận bình luận bình luận' />
                                      </Box>
                                    </ListItem>
                                  </List>

                                  <div className='task-discuss-input mt-2 d-flex '>
                                    <div className='input-area'>
                                      <div
                                        className='child-1'
                                        contentEditable='true'
                                        aria-label='Viết bình luận...'
                                        onInput={(e) => handleOnChangeDiscussContent(e.currentTarget.textContent, 'discussContent', itemValue.task_Id, 'taskId', e)}
                                        onKeyPress={(e) => handleOnKeyDownDelete(e)}
                                        onPaste={(e) => pasteAsPlainText(e)}
                                      >
                                      </div>
                                    </div>
                                    <div className='input-send-icon' style={dataDiscussContent.discussContent === '' || dataDiscussContent.taskId !== itemValue.task_Id ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}>
                                      <IconButton
                                        color={dataDiscussContent.discussContent === '' || dataDiscussContent.taskId !== itemValue.task_Id ? 'default' : 'primary'}
                                        disabled={dataDiscussContent.discussContent === '' || dataDiscussContent.taskId !== itemValue.task_Id ? true : false} size="large"
                                      >
                                        <SendIcon />
                                      </IconButton>
                                    </div>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </div>

                          </Accordion>
                        )
                      })}
                    </>
                    :
                    <Typography variant="h6" color='red' className='text-center mt-2'>Hiện chưa có danh sách công việc, hãy thêm mới</Typography>
                  }
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="primary">Lưu</ButtonMui>
          <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      <ModalAssignDivineWorkPublic
        activeModalAssignDivineWorkPublic={showModalAssignDivineWorkPublic}
        closeModalAssignDivineWorkPublic={setShowModalAssignDivineWorkPublic}
        dataModalAssignDivineWorkPublic={dataModalAssignDivineWorkPublic}
      />
    </>
  )
}

export default ModalDivineWorkPublic