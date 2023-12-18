import React, { useEffect, useState } from 'react'
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
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
//mui icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//css
import "../SCSS/DivineWork.scss";
//api
import { getListTaskByDocSendId } from '../../../services/taskService';


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
                      return (
                        <Accordion key={`task-${itemKey}`} className={`list-title rounded-3 ${itemKey > 0 ? 'mt-2' : ''}`} sx={{ wordBreak: 'break-all', boxShadow: 3 }}>
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
                                <Typography variant="subtitle1">{itemValue.task_Content}</Typography>

                              </div>
                              <div className='task-person-receive'>
                                <Stack direction="row" spacing={0.5}>
                                  <Typography variant='subtitle1' color='red'>Người thực hiện: </Typography>
                                  <Typography variant="subtitle1">{itemValue.userReceive_FullName}</Typography>
                                </Stack>

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