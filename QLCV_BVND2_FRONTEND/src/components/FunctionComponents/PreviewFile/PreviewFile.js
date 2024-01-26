import React, { useState, useEffect, useContext, useCallback } from 'react';
import FileViewer from 'react-file-viewer';
import Modal from 'react-bootstrap/Modal';

function PreviewFile() {
    const [show, setShow] = useState(false);

    const handleClose = () => {

    }

    return (
        <Modal fullscreen={true} show={show} onHide={handleClose}>
            <Modal.Body>

            </Modal.Body>
        </Modal>
    )
}

export default PreviewFile