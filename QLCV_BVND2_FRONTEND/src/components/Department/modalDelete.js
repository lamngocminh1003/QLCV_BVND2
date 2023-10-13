import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

///////// PHẦN CODE GIAO DIỆN XOÁ
///////// PHẦN CODE GIAO DIỆN XOÁ
///////// PHẦN CODE GIAO DIỆN XOÁ

const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="mg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xoá khoa phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Có thật mún xoá khoa phòng hok? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Hok
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteDepartment}>
                        Xoá moẹ nó đi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete




