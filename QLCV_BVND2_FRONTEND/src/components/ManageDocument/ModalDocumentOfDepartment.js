import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import "./Document.scss";
import _ from 'lodash';

const ModalDocumentOfDepartment = (props) => {
    const defaultDataModal = {
        idDoc: '',
        docName: "",
        docFile: "",
        docDes: "",
        docExpireStart: "",
        docExpireEnd: "",
        docHandOver: "",
        docStatus: "",
        docProgress: ""
    }

    //config data for this modal
    const [dataModal, setDataModal] = useState(defaultDataModal);
    const [tasks, setTasks] = useState(); //1 task 
    const [listTask, setListTask] = useState([]); //1 đống task

    //config some state for modal
    const [changeTask, setChangeTask] = useState(false); //sửa tên task, nhân viên làm thực hiệm task này...

    const handleCloseModal = () => {
        props.close(false);
    }

    const handlePressEnter = (event) => {
        if (event.which === 13 && event.code === "Enter") {
            createTask();
            setTasks('');
        }
    }

    const createTask = () => {
        let taskItem = {
            id: Math.floor(Math.random() * 10),
            taskName: tasks,
            employee: ''
        }

        let _listTask = _.cloneDeep(listTask);
        _listTask.push(taskItem);
        setListTask(_listTask);
    }

    const editTask = (itemListTask) => {
        setChangeTask(true)
    }

    const delTask = (taskId) => {
        let _listTask = _.cloneDeep(listTask); 
        //nếu phần tử trong mảng có id khác với taskId thì sẽ return 1 array mới không có id = với taskId
        _listTask = _listTask.filter(itemListTask => itemListTask.id !== taskId);
        setListTask(_listTask);
    }

    useEffect(() => {
        if(props.action === "ASSIGN")
        {
            setDataModal({...props.dataModalDocumentOfDepartment});   
        }
    }, [props.dataModalDocumentOfDepartment])

    return (
        <>
            <div>
                <Modal show={props.open} size="lg" onHide={() => handleCloseModal()} dialogClassName="modal-55mw mt-0"> 
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className='text-primary text-uppercase'>{`${(dataModal.docName)}`}</div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="task-info container col-xs-12" >
                            <div className='row d-flex justify-content-center mt-1'>
                                <div className='col-7 d-flex justify-content-center add-task'>
                                    <input type="text" 
                                        className='form-control px-2 py-2 input-add-task' 
                                        autoComplete='off' 
                                        value={tasks} 
                                        placeholder="&#xf044; Thêm công việc..." 
                                        style={{ fontFamily: "Arial, FontAwesome" }} 
                                        onChange={(e) => setTasks(e.target.value)}
                                        onKeyDown={(event) => handlePressEnter(event)}
                                    />
                                    {/* <button className='btn btn-primary ml-2' style={{boxShadow:'0 1px 6px 0 rgba(0,0,0,.38)'}}>Thêm</button> */}
                                </div>
                            </div>
                            
                            <div className='list-task'>
                                <h4 className="row text-primary text-uppercase mt-3">Danh sách công việc</h4>
                                <div className='list-task-div'>
                                    {listTask.map((itemListTask, indexListTask) => {
                                        return(
                                            <>
                                                <div className='list-task-overview'>
                                                    {changeTask ? 
                                                        <input type='text' value={itemListTask.taskName}/>
                                                        : 
                                                        <>
                                                            <div className='list-task-title' key={itemListTask.id}>
                                                                {itemListTask.taskName}
                                                                <div className='icons'>
                                                                    <button><i class="fa fa-pencil-square" onClick={() => editTask(itemListTask)}></i></button>
                                                                    <button><i class="fa fa-times-square" onClick={() => delTask(itemListTask.id)}></i></button>
                                                                </div>
                                                            </div>   
                                                        </>
                                                    }
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal.Body> 

                    {/* <Modal.Footer>
                        <div>

                        </div>
                    </Modal.Footer>*/}
                </Modal>
            </div>
        </>
    )
}

export default ModalDocumentOfDepartment
