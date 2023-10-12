import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { toast } from 'react-toastify';
import ModalPreviewDocument from './ModalPreviewDocument';
import "./Document.scss";


function ModalAddDoc(props) {
    const { assignDataDocEdit } = props

    //set default value đại diện cho các ô input
    const defaultDocData = {
        docName: '',
        docExpire: '',
        docFile: [],
        docDes: '',
        docHandOver: ''
    }
    //tạo state cho defaultDocData để mỗi khi event onChange được gọi sẽ set data lại
    const [docData, setdocData] = useState(defaultDocData);

    //pdf onChange inputFile state
    const [pdfFile, setPdfFile] = useState();
    const [ext, setExt] = useState();

    //config modalPreview
    const [isShowModalPreviewDoc, setIsShowModalPreviewDoc] = useState(false);
    const [isAllow, setIsAllow] = useState(false);

    //config reactDatePicker
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        if (props.setActionModalDoc === "EDIT") {
            setdocData({ ...assignDataDocEdit })
        }
    }, [assignDataDocEdit])

    const handleOnchangeInput = (value, inputName) => {
        let _docData = _.cloneDeep(docData);
        _docData[inputName] = value;
        setdocData(_docData);
    }

    const checkPDF = ['application/pdf'];
    const checkDocType =
        ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; //docx, xlsx

    const handlePdfFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && checkPDF.includes(selectedFile.type)) {
                event.target.files?.length && setPdfFile(Array.from(event.target.files))
                setIsAllow(true);
            }

            else if (selectedFile && checkDocType.includes(selectedFile.type)) {
                const fileName = event.target.files[0].name;
                setPdfFile(selectedFile);
                setExt(fileName.split('.').pop());
                setIsAllow(true);
            }

            else {
                toast.error('Định dạng file không hợp lệ!');
                setIsAllow(false);
            }
        }
        else {
            toast.warning('Xin hãy chọn tài liệu!');
            setIsAllow(false);
        }
    }

    const handleOnCloseModal = () => {
        props.inactive();
        setdocData(defaultDocData);
    }

    const btnCreateDoc = () => {
        alert('tao');
    }

    const btnEditDoc = () => {
        alert('sua');
    }

    const btnHandOver = () => {
        alert('ban giao');
    }

    const showPDF = () => {
        setIsShowModalPreviewDoc(true);
    }

    return (
        <>
            <div>
                <Modal size='lg' show={props.active} onHide={() => handleOnCloseModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {(() => {
                                if (props.setActionModalDoc === "CREATE") {
                                    return (
                                        <div className='text-primary text-uppercase'>Tạo văn bản</div>
                                    )
                                } else if (props.setActionModalDoc === "EDIT") {
                                    return (
                                        <div className='text-primary text-uppercase'>Sửa văn bản</div>
                                    )
                                } else {
                                    return (
                                        <div className='text-primary text-uppercase'>Bàn giao văn bản</div>
                                    )
                                }
                            })()}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="user-info-container col-xs-12" >
                            <form method="POST" action="/user/create-user" >
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row mt-2 d-flex justify-content-center form-group">
                                        {(() => {
                                            if (props.setActionModalDoc === "CREATE" || props.setActionModalDoc === "EDIT") {
                                                return (
                                                    <>
                                                        <div className="col-sm-4 form-group">
                                                            <label htmlFor="tit" className="form-label">Tên văn bản</label>
                                                            <input type="text" className="form-control" id="tit" name="title" value={docData.docName} onChange={(event) => handleOnchangeInput(event.target.value, "docName")} autoComplete="off" required />
                                                        </div>
                                                        <div className="col-sm-4 form-group" id='expireInput'>
                                                            <label htmlFor="date" className="form-label">Thời hạn xử lý</label>
                                                            <DatePicker
                                                                className='form-control'
                                                                autoComplete="off"
                                                                dateFormat="dd/MM/yyyy"
                                                                selectsRange={true}
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                isClearable
                                                                onChange={(update) => { setDateRange(update) }}
                                                                // {...docData.docExpire && docData.docExpire === '' ? value : ;

                                                                // }
                                                                id='date'
                                                            />
                                                        </div>

                                                        <div className="col-sm-4 form-group" >
                                                            <label htmlFor="doc" className="form-label">Văn bản</label>
                                                            <input type="file" name="document" id="doc" className="form-control" onChange={(event) => handlePdfFile(event)} autoComplete="off" />
                                                        </div>

                                                        <div className="mt-4 row d-flex justify-content-center">
                                                            <div className="mb-3 col-sm-12 form-group">
                                                                <label htmlFor="des" className="form-label">Mô tả văn bản</label>
                                                                <textarea className="form-control" id="des" name="description" rows="4" value={docData.docDes} onChange={(event) => handleOnchangeInput(event.target.value, "docDes")} autoComplete="off" ></textarea>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            else {
                                                return (
                                                    <>
                                                        <div className="row mt-3 row mt-3 d-flex justify-content-center">
                                                            <div className="mb-3 col-sm-12 form-group">
                                                                <label htmlFor="metion" className="form-label">Bàn giao tới phòng khoa</label>
                                                                <textarea className="form-control" id="metion" name="mentionDepartment" rows="3" value={docData.docHandOver} onChange={(event) => handleOnchangeInput(event.target.value, "docHandOver")} autoComplete="off"></textarea>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })()}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {(() => {
                            if (props.setActionModalDoc === "CREATE") {
                                return (
                                    <>
                                        {isAllow === true ?
                                            <Button variant="light" onClick={() => showPDF()} style={{ backgroundColor: "#4dd4ac", borderColor: "white" }}>Xem trước văn bản</Button>
                                            :
                                            <></>
                                        }
                                        <Button variant="primary" onClick={() => btnCreateDoc()}>Tạo</Button>
                                    </>
                                )
                            } else if (props.setActionModalDoc === "EDIT") {
                                return (
                                    <>
                                        <Button variant="primary" onClick={() => btnEditDoc()}>Sửa</Button>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <Button variant="primary" onClick={() => btnHandOver()}>Bàn giao</Button>
                                    </>
                                )
                            }
                        })()}
                        <Button variant="btn btn-secondary" onClick={props.inactive}>Đóng</Button>
                    </Modal.Footer>
                </Modal>

                {/* có thể truyền cả phương thức của 1 state qua cho component khác */}
                <ModalPreviewDocument
                    open={isShowModalPreviewDoc}
                    close={setIsShowModalPreviewDoc}
                    dataModalPreviewDoc={pdfFile}
                    setExt={ext}
                    resetdataModalPreviewDoc={setPdfFile}
                    resetExt={setExt}
                />
            </div>
        </>
    )
}

export default ModalAddDoc
