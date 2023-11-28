import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import _, { set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';

import Modal from 'react-bootstrap/Modal';

const ModalPropose = (props) => {

    const handleHideModal = () => {
        props.close(false)
    }

    return(
        <>
            <div>
                <Modal show={props.active} onHide={() => handleHideModal()} size='lg' className='mt-4'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {(() => {
                                if(props.setActionModalPropose === "CREATE"){
                                    return(
                                        <><div className='text-primary text-uppercase'>Tạo đề xuất</div></>
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
                                                <input type='text' className='form-control' id="propose"></input>   
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='proposeFile'>File đính kèm</label>
                                                <input type='file' className='form-control' id="proposeFile"></input>
                                            </div>
                                            <div className='col-sm-12 mt-3'>
                                                <label className='form-label fs-5' htmlFor='proposeContent'>Nội dung đề xuất <span className='text-danger'>(*)</span></label>
                                                <textarea className='form-control' id="proposeContent" rows="4"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" >Tạo</Button>
                        <Button variant="secondary" onClick={() => handleHideModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalPropose