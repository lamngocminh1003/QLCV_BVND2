import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';

import Modal from 'react-bootstrap/Modal';

import { updateProposeState } from '../../services/proposeService';

function ModalProposeReceive(props) {
    const { user, logoutContext } = useContext(UserContext);

    const dataModalProposeReceiveDefault = {
        document_Incomming_Id: '',
        document_Incomming_Title: '',
        document_Incomming_Content: '',
        document_Incomming_UserSend: '',
        document_Incomming_UserSend_FullName: '',
        document_Incomming_UserReceive: '',
        document_Incomming_State: '',
        document_Incomming_Comment: '',
        document_Incomming_Time: ''
    }

    const [dataModalProposeReceive, setDataModalProposeReceive] = useState(dataModalProposeReceiveDefault);

    const handleHideModal = () => {
        props.close(false);
        setDataModalProposeReceive(dataModalProposeReceiveDefault);
    }

    const handleOnchange = (e, inputName) => {

    }
    
    const proposeCheck = async (document_Incomming_Id) => {
        let response = await updateProposeState(document_Incomming_Id, 3)
        if(response === 200){
            toast.success('Đã duyệt đề xuất!')
        }
    }

    const proposeRefuse = async (document_Incomming_Id) => {
        let response = await updateProposeState(document_Incomming_Id, 1)
        if(response === 200){
            toast.success('Đã từ chối đề xuất!')
        }
    }

    const proposeReturn = async (document_Incomming_Id) => {
        let response = await updateProposeState(document_Incomming_Id, 2)
        if(response === 200){
            toast.success('Đã trả đề xuất về!')
        }
    }

    const proposeMoveUp = async (document_Incomming_Id) => {
        let response = await updateProposeState(document_Incomming_Id, 4)
        if(response === 200){
            toast.success('Đã chuyển đề xuất lên!')
        }
    }

    useEffect(() => {
        setDataModalProposeReceive(props.dataModalPropose);
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
                                                <label className='form-label fs-5' htmlFor='propose'>Tên đề xuất</label>
                                                <h3>{dataModalProposeReceive.document_Incomming_Title}</h3>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='proposeFile'>File đính kèm</label>
                                                <input type='file' className='form-control' id="proposeFile"
                                                accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,pptx,.jpg,.jpeg,.png" multiple></input>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='document_Incomming_Content'>Nội dung đề xuất</label>
                                                <textarea className='form-control' id="document_Incomming_Content" rows="4"
                                                onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Content')} value={dataModalProposeReceive.document_Incomming_Content || ""}></textarea>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='document_Incomming_Comment'>Ý kiến giải quyết</label>
                                                <textarea className='form-control' id="document_Incomming_Comment" rows="4" 
                                                onChange={(e) => handleOnchange(e.target.value, 'document_Incomming_Comment')} value={dataModalProposeReceive.document_Incomming_Comment || ""}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='mb-2'>
                        {dataModalProposeReceive.document_Incomming_State === 0 || dataModalProposeReceive.document_Incomming_State === 1 || dataModalProposeReceive.document_Incomming_State === 2 ?
                            <>
                                <Button variant="success" onClick={() => proposeCheck(dataModalProposeReceive.document_Incomming_Id)}>Duyệt đề xuất</Button>
                                <Button variant="danger" onClick={() => proposeRefuse(dataModalProposeReceive.document_Incomming_Id)}>Từ chối đề xuất</Button>
                                <Button variant="warning" onClick={() => proposeMoveUp(dataModalProposeReceive.document_Incomming_Id)}>Chuyển đề xuất về</Button>
                            </>
                        :
                            <>
                                <Button variant="info" onClick={() => proposeCheck(dataModalProposeReceive.document_Incomming_Id)}>Chuyển tiếp đề xuất </Button>
                            </>
                        }
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalProposeReceive