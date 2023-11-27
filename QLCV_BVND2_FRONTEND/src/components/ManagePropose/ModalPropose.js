import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import _, { set } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';

import Modal from 'react-bootstrap/Modal';

const ModalPropose = (props) => {
    return(
        <>
            <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
            </div>
        </>
    )
}

export default ModalPropose