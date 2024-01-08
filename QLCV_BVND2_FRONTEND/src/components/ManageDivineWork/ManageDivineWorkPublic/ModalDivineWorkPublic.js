import React, { useEffect, useState, useContext, useMemo } from 'react'
import _, { assign, cloneDeep, forEach, set, debounce } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import moment from 'moment';
import Dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
//function components
import CircularProgressWithBackdrop from '../../FunctionComponents/ProgressBar/CircularProgressWithBackdrop';
//bs5
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//ant theme
import { Input } from 'antd';
//mui theme
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import ButtonMui from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { assignDivineWork, getListTaskByDocSendId, getDocByDocId, getListDiscussByTaskId, createSendDiscuss } from '../../../services/taskService';
import { getDate } from 'date-fns';
//cdn
<style>
  @import url('https://www.w3schools.com/w3css/4/w3.css');
</style>


function ModalDivineWorkPublic(props) {
  const { user } = useContext(UserContext);

  // const dataModalDivineWorkPublicDefault = {
  //   task_Id: '',
  //   task_Title: '',
  //   task_Content: '',
  //   task_DateStart: '',
  //   task_DateEnd: '',
  //   task_Catagory_Id: '',
  //   task_Catagory_Name: '',
  //   userReceive_FullName: '',
  //   userSend_FullName: '',
  //   task_State: '',
  // }

  const dataModalDivineWorkPublicDefault = {
    documentSend: {
      document_Send_Id: '',
      document_Send_Title: '',
      document_Send_Content: '',
      document_Send_Time: '',
      document_Send_TimeStart: '',
      document_Send_Deadline: '',
      document_Send_UserSend: '',
      userSend_FullName: '',
      department_Name_Receive: '',
      catagory_Name: '',
      document_Send_Comment: '',
      document_Send_State: '',
      document_Send_TimeUpdate: '',
      document_Send_Percent: '',
    },
    fileIds: [],
    userIdReceive: ''
  }

  //config this modal
  const [dataModalDivineWorkPublic, setDataModalDivineWorkPublic] = useState(dataModalDivineWorkPublicDefault);

  //config divine work
  const [divineWork, setDivineWork] = useState(''); //1 divine work
  const [objDivineWork, setObjDivineWork] = useState({}); //1 obj divine work
  const [objDivineWorkEdit, setObjDivineWorkEdit] = useState(null); //1 obj divine work eidt dùng khi cập nhật thông tin của 1 task
  const [listDivineWork, setListDivineWork] = useState([]); //1 list chứa 1 đống obj divine work

  //config modal assign divine work public
  const [showModalAssignDivineWorkPublic, setShowModalAssignDivineWorkPublic] = useState(false);
  const [dataModalAssignDivineWorkPublic, setDataModalAssignDivineWorkPublic] = useState({});

  //config backdrop when submit
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //config discuss
  let [listDiscuss, setListDiscuss] = useState([]);

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

  //tạo công việc
  const createDivineWork = () => {
    //create new obj devine work
    let _objDivineWork = _.cloneDeep(objDivineWork);
    _objDivineWork = {
      document_Send_Id: props.taskSendId,
      task_Id: `task-clone ${uuidv4()}`,
      task_Title: divineWork,
      task_Content: '',
      task_DateSend: moment(),
      task_DateStart: '',
      task_DateEnd: '',
      task_Catagory_Id: '',
      task_Catagory_Name: '',
      userReceive_Id: '',
      userReceive_FullName: '',
      userSend_Id: user.account.userId,
      userSend_FullName: user.account.fullName,
      task_file: '',
      task_Clone: true
    }
    setObjDivineWork(_objDivineWork);

    //push obj to listDivineWork array
    let _listDivineWork = _.cloneDeep(listDivineWork);
    _listDivineWork.push(_objDivineWork);
    setListDivineWork(_listDivineWork);
    setDivineWork('');
  }

  const updateDivineWork = () => {
    let check = _.isEqual(dataModalAssignDivineWorkPublic, objDivineWorkEdit);
    if (check === true) {

    }
    else {
      const result = listDivineWork.map((item) => {
        return item.task_Id === objDivineWorkEdit.task_Id ? objDivineWorkEdit : item;
      });

      let _listDivineWork = _.cloneDeep(listDivineWork);
      _listDivineWork = result;
      setListDivineWork(_listDivineWork);
    }
  }

  const deleteDivineWork = (task_Id_Value, event) => {
    event.stopPropagation();
    let _listDivineWork = _.cloneDeep(listDivineWork);
    _listDivineWork = _.filter(_listDivineWork, function (currentObject) {
      return currentObject.task_Id !== task_Id_Value;
    })
    setListDivineWork(_listDivineWork);
  }

  //mở modal giao việc
  const assignInfoDivineWork = (e, itemValue) => {
    e.stopPropagation();
    setDataModalAssignDivineWorkPublic(itemValue)
    setShowModalAssignDivineWorkPublic(true);
  }

  const editInfoDivineWork = (e) => {
    e.stopPropagation();
    alert('user nhan viec khong rong');
  }

  //lưu công việc đã tạo
  const handleSaveListDivineWork = async () => {
    //tìm những obj có key clone là true
    let arrayToHandleDivineWork = _.filter(listDivineWork, (item) => item.task_Clone === true);

    // let count = 0;
    // for (let item of arrayToHandleDivineWork) {
    //   let response = await assignDivineWork(item);
    //   if (response === 200) {
    //     console.log(response);
    //     count++;
    //     if (count === arrayToHandleDivineWork.length) {
    //       toast.success('Lưu công việc thành công!');
    //     }
    //   }
    // }
  }

  //gửi bình luận
  const delayedHandleChange = debounce((taskId, value) => {
    const updatedList = listDiscuss.map(itemDiscuss => itemDiscuss.task_Id === taskId ? { ...itemDiscuss, task_DiscussContent: value } : itemDiscuss);
    setListDiscuss(updatedList);
    console.log(listDiscuss);
  })

  const handleOnChangeDiscussContent = (taskId, value) => {
    delayedHandleChange(taskId, value)


    // let _listDiscuss = _.cloneDeep(listDiscuss);

    // _listDiscuss.forEach(itemDiscuss => {
    //   if (itemDiscuss.task_Id === taskId) {
    //     itemDiscuss.task_DiscussContent = value;
    //   }
    // })
    // setListDiscuss(_listDiscuss);



    //let _listDiscussUpdated = _listDiscuss.map(itemDiscuss => itemDiscuss.task_Id === taskId ? { ...itemDiscuss, task_DiscussContent: value } : itemDiscuss)

    //setListDiscuss([..._listDiscuss]);


    // let _listDivineWorkUpdated = _listDivineWork.map(item =>
    //   item.task_Id === taskId ? { ...item, task_DiscussContent: value } : item
    // );

    // setListDivineWork(_listDivineWorkUpdated);
  }

  const handleOnKeyDownEnter = (event, task_Id) => {
    if (event.which === 13 && event.code === "Enter") {
      event.preventDefault();
      handleSendDiscuss(task_Id);
    }
  }

  const handleSendDiscuss = async (task_Id) => {
    let _listDivineWork = _.cloneDeep(listDivineWork);
    let _listDivineWorkUpdated = _listDivineWork.filter(item => item.task_Id === task_Id);
    let _listDivineWorkSendDisucss = _listDivineWorkUpdated[0];
    let response = await createSendDiscuss(_listDivineWorkSendDisucss);
    if (response === 200) {
      handleGetListDicussAfterCreate(task_Id);
    }
  }

  //format dán text
  const pasteAsPlainText = (event) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  //lấy danh sách bình luận bởi từng id công việc
  const handleGetListTaskByDocSendId = async (docSendId) => {
    let resultListDivineWork = await getListTaskByDocSendId(docSendId);
    let resultListDiscuss = []; //n list discuss
    let discussByTask; //1 list discuss

    if (resultListDivineWork.length !== 0) {
      //gọi n lần api discuss và dùng biến resultListDiscuss hứng bằng cách đẩy vào array
      for (let object of resultListDivineWork) {
        discussByTask = await getListDiscussByTaskId(object.task_Id);
        resultListDiscuss.push(discussByTask);
      }

      let resultListDivineWorkWithDiscuss = resultListDivineWork.map(task => {
        let resultListDiscussForTask = resultListDiscuss.find(discuss => discuss.some(discuss => discuss.discuss_Task === task.task_Id));
        return {
          ...task,
          task_Discuss: resultListDiscussForTask || [],
          task_DiscussContent: ''
        };
      });

      setListDivineWork(resultListDivineWorkWithDiscuss);

      let findTaskId = resultListDivineWorkWithDiscuss.map(task => ({ "task_Id": task.task_Id, "task_DiscussContent": '' }));
      setListDiscuss(findTaskId);
    }
    else {
      setListDivineWork(resultListDivineWork);
    }
  }

  const handleGetListDicussAfterCreate = async (taskId) => {
    let _listDivineWork = _.cloneDeep(listDivineWork);
    let listDiscussByTaskId = await getListDiscussByTaskId(taskId);

    let lastListDiscussByTaskId = listDiscussByTaskId[listDiscussByTaskId.length - 1];

    let foundTask = _listDivineWork.find(task => task.task_Id === lastListDiscussByTaskId.discuss_Task);
    if (foundTask) {
      foundTask.task_Discuss.push(lastListDiscussByTaskId);
      foundTask.task_DiscussContent = '';
    }

    setListDivineWork(_listDivineWork);
    // let _listDivineWorkUpdated = _listDivineWork.map(task => {
    //   let _listDiscussByTaskIdUpdated = listDiscussByTaskId.find(discuss => discuss.discuss_Task === task.task_Id);
    //   return { task_Discuss: _listDiscussByTaskIdUpdated };
    // }).filter(item => item.task_Discuss !== undefined);

    // _listDivineWorkUpdated.forEach(discuss => {
    //   let foundTask = _listDivineWork.find(task => task.task_Id === discuss.task_Discuss.discuss_Task);
    //   if (foundTask) {
    //     console.log(discuss);
    //     console.log(discuss.task_Discuss);
    //     console.log(foundTask);
    //     // foundTask.task_Discuss.push(discuss.task_Discuss);
    //     // foundTask.task_DiscussContent = '';
    //   }
    //   //listDivineWork.task_Discuss.push(discuss.task_Discuss);
    // })

    //console.log(_listDivineWork);
  }

  const handleGetDetailsTaskByDocSendId = async (docSendId) => {
    let resultDetailsTask = await getDocByDocId(docSendId);
    setDataModalDivineWorkPublic(resultDetailsTask);
  }

  useEffect(() => {
    if (props.taskSendId.length !== 0) {
      handleGetListTaskByDocSendId(props.taskSendId);
      handleGetDetailsTaskByDocSendId(props.taskSendId);
    }
  }, [props.taskSendId])

  useEffect(() => {
    if (objDivineWorkEdit !== null) {
      updateDivineWork();
    }
  }, [objDivineWorkEdit])

  return (
    <>
      {/* <CircularProgressWithBackdrop open={openBackdrop} setOpen={setOpenBackdrop} progressValue={progress} /> */}
      <Modal size='lg' show={props.activeModalDivineWorkPublic} onHide={() => handleHideModal()} backdrop={'static'} keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: '100%' }}>
            <div className='text-primary text-uppercase d-flex justify-content-center'>{`${dataModalDivineWorkPublic.documentSend.document_Send_Title} 
              (${Dayjs(dataModalDivineWorkPublic.documentSend.document_Send_TimeStart).format('DD/MM/YYYY')} - 
              ${Dayjs(dataModalDivineWorkPublic.documentSend.document_Send_Deadline).format('DD/MM/YYYY')})`}
            </div>
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
                                    <AssignmentIndIcon className='mr-2' fontSize='medium' onClick={(e) => itemValue.userReceive_FullName === "" || itemValue.task_Clone === true ? assignInfoDivineWork(e, itemValue) : editInfoDivineWork(e, itemValue)} />
                                  </Tooltip>
                                  {itemValue.userReceive_FullName === "" || itemValue.task_Clone === true ?
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

                                {itemValue.task_Person_Receive !== itemValue.task_Person_Send ?
                                  <div className='task-discuss mt-1' >
                                    {
                                      itemValue.task_Discuss.length !== 0 ?
                                        <div className='discuss-show'>
                                          {
                                            itemValue.task_Discuss.map((discuss, index) => {
                                              return (
                                                <div className='warp-comment' key={index}>
                                                  <List sx={{ mt: 0, p: 0 }}>
                                                    <ListItem sx={{ px: 0 }}>
                                                      <ListItemAvatar sx={{ minWidth: '52px' }}><Avatar sx={{ bgcolor: 'rgb(160, 166, 255)' }}></Avatar></ListItemAvatar>
                                                      <Box className='discuss-box'>
                                                        <ListItemText className='dissucss-content'
                                                          primary={discuss.userSend_Fullname}
                                                          secondary={discuss.discuss_Content} />
                                                      </Box>
                                                    </ListItem>
                                                  </List>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                        :
                                        "Hiện chưa có bình luận."
                                    }

                                    {
                                      listDiscuss.map((itemDiscuss, index) => {
                                        if (itemDiscuss.task_Id === itemValue.task_Id) {
                                          return (
                                            <div className='task-discuss-input mt-2 d-flex ' key={index}>
                                              <div className='input-area'>
                                                {/* <Input value={itemDiscuss.task_DiscussContent} onChange={(e) => handleOnChangeDiscussContent(itemDiscuss.task_Id, e.target.value)}
                                                  placeholder="Controlled autosize" autoSize={{ minRows: 1 }}
                                                /> */}
                                                <div
                                                  className='child-1' contentEditable='true' aria-label='Viết bình luận...'
                                                  onInput={(e) => handleOnChangeDiscussContent(itemDiscuss.task_Id, e.currentTarget.textContent)}
                                                  onKeyPress={(e) => handleOnKeyDownEnter(e, itemValue.task_Id)} onPaste={(e) => pasteAsPlainText(e)}>

                                                </div>
                                              </div>
                                              <div className='input-send-icon' style={itemDiscuss.task_DiscussContent === "" ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}>
                                                <IconButton color={itemDiscuss.task_DiscussContent === "" ? 'default' : 'primary'}
                                                  disabled={itemDiscuss.task_DiscussContent === "" ? true : false} size="large" onClick={() => handleSendDiscuss(itemDiscuss.task_Id)}>
                                                  <SendIcon />
                                                </IconButton>
                                              </div>
                                            </div>)
                                        }
                                        else {
                                          return null
                                        }
                                      })
                                    }
                                  </div>
                                  :
                                  null
                                }
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
          {/* <LoadingButton sx={{ textTransform: 'none' }} endIcon={<SendIcon />} loading loadingPosition="end" variant="contained"> Lưu </LoadingButton> */}
          <ButtonMui sx={{ textTransform: 'none' }} variant="contained" color="primary" onClick={(e) => handleSaveListDivineWork()}>Lưu</ButtonMui>
          <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      <ModalAssignDivineWorkPublic
        activeModalAssignDivineWorkPublic={showModalAssignDivineWorkPublic}
        closeModalAssignDivineWorkPublic={setShowModalAssignDivineWorkPublic}
        dataModalAssignDivineWorkPublic={dataModalAssignDivineWorkPublic}
        setDataModalAssignDivineWorkPublic={setDataModalAssignDivineWorkPublic}
        dataModalDivineWorkPublic={dataModalDivineWorkPublic}

        setDataObjDivineWorkEdit={setObjDivineWorkEdit}
      />
    </>
  )
}

export default ModalDivineWorkPublic