import React, { useState, useEffect, useContext, useCallback } from 'react';
import FileViewer from 'react-file-viewer';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-bootstrap/Modal';

function PreviewFile(props) {
    const [show, setShow] = useState(false);

    const docs = [
        {
            uri: props.uri,
            fileType: props.fileType,
            fileName: props.fileName
        }
    ];

    const handleClose = () => {

    }

    useEffect(() => {
        if (props.show === true) {
            setShow(true);
        }
    }, [props.show])

    return (
        <Modal fullscreen={true} show={show} onHide={handleClose}>
            <Modal.Body style={{ height: '100%' }}>
                <FileViewer fileType={props.fileType} filePath={props.uri} />
            </Modal.Body>
        </Modal>
    )
}

export default PreviewFile