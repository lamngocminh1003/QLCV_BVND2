import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalDocumentOfDepartment = (props) => {
    //config data for this modal
    const [dataModal, setDataModal] = useState();

    const handleCloseModal = () => {
        props.close(false);
    }

    useEffect(() => {
        setDataModal(props.dataModalDocumentOfDepartment);
    }, [props.dataModalDocumentOfDepartment])

    return (
        <>
            <div>
                <Modal show={props.open} size="lg" onHide={() => handleCloseModal()}> 
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className='text-primary text-uppercase'>{`${(dataModal.docName)}`}</div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="doc-info-container col-xs-12" >
                            <h4 className="row text-primary text-uppercase mb-2">Danh sách công việc</h4>
                                <div className='job-parent'>
                                    
                                </div>
                        </div>
                    </Modal.Body> 

                    <Modal.Footer>
                        <div>

                        </div>
                    </Modal.Footer>                   
                </Modal>
            </div>
        </>
    )
}

export default ModalDocumentOfDepartment
