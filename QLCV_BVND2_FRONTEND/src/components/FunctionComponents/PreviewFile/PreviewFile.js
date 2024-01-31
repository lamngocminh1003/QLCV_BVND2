import React, { useState, useEffect, useContext, useCallback } from 'react';
import FileViewer from 'react-file-viewer';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Preview from 'preview-office-docs'
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
            console.log(props.uri)
        }
    }, [props.show])

    return (
        <Modal fullscreen={true} show={show} onHide={handleClose}>
            <Modal.Body>
                <Preview url={props.uri} height='700px' width='800px' />
            </Modal.Body>
        </Modal>
    )
}

export default PreviewFile