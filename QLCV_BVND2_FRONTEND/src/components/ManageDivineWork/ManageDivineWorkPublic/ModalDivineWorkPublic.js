import React, { useEffect, useState } from 'react'
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import moment from 'moment';
//bs5
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//mui theme
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
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//css
import "../SCSS/DivineWork.scss";
//api
import { getListTaskByDocSendId } from '../../../services/taskService';
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
    task_Catagory_Name: '',
    userReceive_FullName: '',
    userSend_FullName: '',
    task_State: '',
  }

  const [divineWork, setDivineWork] = useState(); //1 divine work
  const [listDivineWork, setListDivineWork] = useState({}); //1 đống divine work

  //config discuss
  const [discussContent, setDiscussContent] = useState('');

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
    <Modal size='lg' show={props.activeModalDivineWorkPublic} onHide={() => handleHideModal()} backdrop={'static'} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className='text-primary text-uppercase'>{`Công việc cho ${props.taskSendTitle}`}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-xs-12">
          <div className='row d-flex justify-content-center'>
            <div className='row col-9'>
              <Stack direction="row" spacing={0}>
                <TextField id="outlined-basic" label="Thêm công việc" variant="outlined" sx={{ width: 555 }} />
                <IconButton color='primary' size="large"><AddCircleIcon fontSize="inherit" sx={{ transform: 'Scale(1.4)' }} /></IconButton>
              </Stack>
            </div>
            <div className='list-task mt-2'>
              <div className='list-task-div'>
                {listDivineWork.length !== 0 ?
                  <>
                    <Typography variant="h6" color='red' sx={{ mb: 0.8 }}>Danh sách công việc</Typography>
                    {Object.entries(listDivineWork).map(([itemKey, itemValue]) => {
                      let expire = getExpireDateTime(itemValue.task_DateEnd)
                      return (
                        <Accordion key={`task-${itemKey}`} className={`list-title ${itemKey > 0 ? 'mt-2' : ''}`} sx={{ wordBreak: 'break-all', boxShadow: 3 }}>
                          <div className='list-parent-task p-1'>
                            <AccordionSummary>
                              <Typography className={`item child ${itemKey} text-uppercase text-white fw-bolder col-11 px-0`} sx={{ fontSize: '17px' }}>
                                {itemValue.task_Title}
                              </Typography>
                              <Box className='text-white d-flex ms-auto align-items-center col-0'>
                                <EditIcon className='mr-1' fontSize='medium' />
                                <DeleteIcon fontSize='medium' color="inherit" />
                              </Box>
                            </AccordionSummary>
                          </div>
                          <div className='list-children-task border border-top-0 rounded-bottom' style={{ backgroundColor: "#fff" }}>
                            <AccordionDetails>

                              <div className='task-content'>
                                <Typography variant="h6">{itemValue.task_Content}</Typography>
                              </div>

                              <div className='details-task-receive mt-1' style={{ borderTop: '1.8px solid silver' }}>
                                <Stack direction="row" sx={{ mt: 0.5 }} spacing={1}>
                                  <Typography variant='subtitle1' color='brown'>Ngày tạo công việc: </Typography>
                                  <Typography variant="subtitle1">{`${moment(itemValue.document_Incomming_Time).format('LLLL')} - `}</Typography>
                                  <Typography variant='subtitle1' color='brown'>Loại công việc: </Typography>
                                  <Typography variant="subtitle1">{itemValue.task_Catagory_Name}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.6}>
                                  <Typography variant='subtitle1' color='brown'>Thời hạn: </Typography>
                                  <Typography variant="subtitle1">
                                    {`${moment(itemValue.task_DateStart).format('L')} - ${moment(itemValue.task_DateEnd).format('L')} (còn lại ${expire.days()} ngày) -`}
                                  </Typography>
                                  <Typography variant='subtitle1' color='brown'>Người thực hiện: </Typography>
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

                                <div className='task-discuss-input mt-2 d-flex'>
                                  <div className='input-area'>
                                    {/* onInput={(e) => setDiscussContent(e.currentTarget.textContent)} */}
                                    <div className='child-1' contentEditable='true' aria-label='Viết bình luận...'>
                                    </div>
                                  </div>
                                  <div className='input-send-icon'>
                                    <IconButton color='primary' size="large"><SendIcon /></IconButton>
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
        <ButtonMui variant="contained" color="success">Tạo</ButtonMui>
        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDivineWorkPublic