import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import _, { cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Modal from 'react-bootstrap/Modal';
//mui
import Typography from "@mui/material/Typography";
//css
import "./SCSS/ModalConfirm.scss";
//modal task
import ModalCreateTaskPublic from "./ModalCreateTaskPublic";
import ModalCreateTaskPrivate from "./ModalCreateTaskPrivate";

function ModalCofirmCreateTask(props) {
    const [dataModalConfirmCreateTask, setDataModalConfirmCreateTask] = useState({});

    //config modal create task public
    const [showModalCreateTaskPublic, setShowModalCreateTaskPublic] = useState(false);
    const [dataModalCreateTaskPublic, setDataModalCreateTaskPublic] = useState({});

    const handleHideModal = () => {
        props.closeModalConfirmCreateTask(false);
    }

    const confirmCreateTaskPublic = () => {
        setDataModalCreateTaskPublic(dataModalConfirmCreateTask);
        props.closeModalConfirmCreateTask(false);
        props.closeModalProposeReceiveOut(false);
        setShowModalCreateTaskPublic(true);
    }

    const confirmCreateTaskPrivate = () => {

    }

    useEffect(() => {
        setDataModalConfirmCreateTask({ ...props.dataModalConfirmCreateTask })
    }, [props.dataModalConfirmCreateTask])

    return (
        <>
            <Modal show={props.activeModalConfirmCreateTask} onHide={() => handleHideModal()} style={{ background: 'rgba(0, 0, 0, 0.6)' }} backdrop={'static'} keyboard={false} centered dialogClassName="modal-confirm">
                <Modal.Header closeButton>
                    <Modal.Title><div className='text-danger text-uppercase position-relative start-50'>Đồng ý tiếp nhận?</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="subtitle1">
                        Tạo công việc {`${props.typeModalConfirmCreateTask === "PUBLIC" ? "" : "nội bộ"}`} cho đề xuất
                        "<strong style={{ fontFamily: '"DM Sans", sans-serif' }}>{`${dataModalConfirmCreateTask.document_Incomming_Title}`}</strong>"?
                    </Typography>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    {props.typeModalConfirmCreateTask === "PUBLIC" ?
                        <Button variant="primary" onClick={() => confirmCreateTaskPublic()}>Có, tạo đi, hỏi lắm</Button>
                        :
                        <Button variant="primary" onClick={() => confirmCreateTaskPrivate()}>Có, tạo đi, hỏi lắm</Button>
                    }
                    <Button variant="secondary" onClick={() => handleHideModal()}>Không, tao click nhầm</Button>
                </Modal.Footer>
            </Modal>

            <ModalCreateTaskPublic
                activeModalCreateTaskPublic={showModalCreateTaskPublic}
                closeModalConfirmCreateTask={setShowModalCreateTaskPublic}
                dataModalCreateTaskPublic={dataModalCreateTaskPublic}

                activeModalProposeReceiveOut={props.closeModalProposeReceiveOut}
            />
        </>
    )
}

export default ModalCofirmCreateTask