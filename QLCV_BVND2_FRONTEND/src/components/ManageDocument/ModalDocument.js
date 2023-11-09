import "./Document.scss";

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import _, { set } from 'lodash';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import ModalPreviewDocument from './ModalPreviewDocument';

//import components react datepicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from 'date-fns';
import vi from "date-fns/locale/vi";
import { createDocAPI } from "../../services/userService";

//import some shit to create mention
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

registerLocale("vi", vi);

function ModalAddDoc(props) {
    const { assignDataDocEdit } = props

    //set default value đại diện cho các ô input
    const defaultDocData = {
        docName: '',
        docExpireStart: '',
        docExpireEnd: '',
        docFileName: '',
        docFileData: '',
        docDes: '',
        docHandOver: ''
    }

    //biến để check validate khi submit, khi onChange
    const validateInputDefault = {
        docName: true,
        docExpireStart: true,
        docExpireEnd: true,
        docFileName: true,
        docFileData: true,
        docDes: true,
        docHandOver: true,
    }

    //tạo state cho defaultDocData để mỗi khi event onChange được gọi sẽ set data lại
    const [docData, setdocData] = useState(defaultDocData);
    //tạo state cho valid input 
    const [validInput, setValidInput] = useState(validateInputDefault);

    //pdf onChange inputFile state
    const [fileName, setFileName] = useState();
    const [dataFile, setDataFile] = useState();
    const [pdfFile, setPdfFile] = useState();
    const [ext, setExt] = useState();

    //config modalPreview
    const [isShowModalPreviewDoc, setIsShowModalPreviewDoc] = useState(false);
    const [isAllow, setIsAllow] = useState(false);

    //config reactDatePicker
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const onChangeStart = (dateStart) => {
        if (dateStart === null) {
            setStartDate('');
        }
        else {
            let startDate = new Date((dateStart));
            setStartDate(startDate);
        }
    };

    const onChangeEnd = (dateEnd) => {
        if (dateEnd === null) {
            setEndDate('');
        }
        else {
            let endDate = new Date((dateEnd));
            setEndDate(endDate);
        }
    };

    //config react mui checkboxes
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />
    const checkedIcon = <CheckBoxIcon fontSize="medium" />

    const dataPhongKhoa = [
        {
            "idPhongKhoa": 1,
            "tenPhongKhoa": "Phòng Kế hoạch tổng hợp"
        },
        {
            "idPhongKhoa": 2,
            "tenPhongKhoa": "Phòng Tổ chức cán bộ"
        },
        {
            "idPhongKhoa": 3,
            "tenPhongKhoa": "Phòng Tài chính kế toán"
        },
        {
            "idPhongKhoa": 4,
            "tenPhongKhoa": "Phòng Hành chính quản trị"
        },
        {
            "idPhongKhoa": 5,
            "tenPhongKhoa": "Phòng Điều dưỡng"
        },
        {
            "idPhongKhoa": 6,
            "tenPhongKhoa": "Phòng Công nghệ thông tin"
        },
        {
            "idPhongKhoa": 7,
            "tenPhongKhoa": "Phòng Quản lý chất lượng"
        },
        {
            "idPhongKhoa": 8,
            "tenPhongKhoa": "Phòng Chỉ đạo tuyến"
        },
        {
            "idPhongKhoa": 9,
            "tenPhongKhoa": "Phòng Vật tư, trang thiết bị y tế"
        },
        {
            "idPhongKhoa": 10,
            "tenPhongKhoa": "Phòng Công tác xã hội"
        },
        {
            "idPhongKhoa": 11,
            "tenPhongKhoa": "Khoa Khám bệnh"
        },
        {
            "idPhongKhoa": 12,
            "tenPhongKhoa": "Khoa Sức khỏe trẻ em"
        },
        {
            "idPhongKhoa": 13,
            "tenPhongKhoa": "Khoa Phòng khám chất lượng cao - Tâm lý"
        },
        {
            "idPhongKhoa": 14,
            "tenPhongKhoa": "Khoa Ngoại tổng hợp"
        },
        {
            "idPhongKhoa": 15,
            "tenPhongKhoa": "Khoa Bỏng - Chính trực"
        },
        {
            "idPhongKhoa": 16,
            "tenPhongKhoa": "Khoa Thận niệu"
        },
        {
            "idPhongKhoa": 17,
            "tenPhongKhoa": "Khoa Ngoại thần kinh"
        },
        {
            "idPhongKhoa": 18,
            "tenPhongKhoa": "Khoa Liên chuyên khoa (Mắt, Tai Mũi Họng, Răng Hàm Mặt)"
        },
        {
            "idPhongKhoa": 19,
            "tenPhongKhoa": "Khoa Gây mê hồi sức"
        },
        {
            "idPhongKhoa": 20,
            "tenPhongKhoa": "Khoa Hồi sức tích cực - Chống độc"
        },
        {
            "idPhongKhoa": 21,
            "tenPhongKhoa": "Khoa Hồi sức sơ sinh"
        },
        {
            "idPhongKhoa": 22,
            "tenPhongKhoa": "Khoa Cấp cứu"
        },
        {
            "idPhongKhoa": 23,
            "tenPhongKhoa": "Khoa Điều trị ban ngày"
        },
        {
            "idPhongKhoa": 24,
            "tenPhongKhoa": "Khoa Sơ sinh"
        },
        {
            "idPhongKhoa": 25,
            "tenPhongKhoa": "Khoa thận nội tiết"
        },
        {
            "idPhongKhoa": 26,
            "tenPhongKhoa": "Khoa Hô hấp 1"
        },
        {
            "idPhongKhoa": 27,
            "tenPhongKhoa": "Khoa hô hấp 2"
        },
        {
            "idPhongKhoa": 28,
            "tenPhongKhoa": "Khoa Nội tổng hợp"
        },
        {
            "idPhongKhoa": 29,
            "tenPhongKhoa": "Khoa Thần kinh"
        },
        {
            "idPhongKhoa": 30,
            "tenPhongKhoa": "Khoa Tim mạch"
        },
        {
            "idPhongKhoa": 31,
            "tenPhongKhoa": "Khoa Nhiễm"
        },
        {
            "idPhongKhoa": 32,
            "tenPhongKhoa": "Khoa Ung bướu huyết học"
        },
        {
            "idPhongKhoa": 33,
            "tenPhongKhoa": "Khoa Tiêu hóa"
        },
        {
            "idPhongKhoa": 34,
            "tenPhongKhoa": "Khoa Nội 1"
        },
        {
            "idPhongKhoa": 35,
            "tenPhongKhoa": "Khoa Nội 2"
        },
        {
            "idPhongKhoa": 36,
            "tenPhongKhoa": "Khoa Nội 3"
        },
        {
            "idPhongKhoa": 37,
            "tenPhongKhoa": "Khoa Phẫu thuật trong ngày"
        },
        {
            "idPhongKhoa": 38,
            "tenPhongKhoa": "Khoa Dinh dưỡng"
        },
        {
            "idPhongKhoa": 39,
            "tenPhongKhoa": "Khoa Gan, mật, tụy và ghép gan"
        },
        {
            "idPhongKhoa": 40,
            "tenPhongKhoa": "Khoa COVID-19"
        },
        {
            "idPhongKhoa": 41,
            "tenPhongKhoa": "Khoa Hồi sức tích cực Nhiễm và COVID-19"
        },
        {
            "idPhongKhoa": 42,
            "tenPhongKhoa": "Khoa Kiểm soát nhiễm khuẩn"
        },
        {
            "idPhongKhoa": 43,
            "tenPhongKhoa": "Khoa Dược"
        },
        {
            "idPhongKhoa": 44,
            "tenPhongKhoa": "Khoa Huyết học"
        },
        {
            "idPhongKhoa": 45,
            "tenPhongKhoa": "Khoa Hóa sinh"
        },
        {
            "idPhongKhoa": 46,
            "tenPhongKhoa": "Khoa Vi sinh"
        },
        {
            "idPhongKhoa": 47,
            "tenPhongKhoa": "Khoa Giải phẫu bệnh"
        },
        {
            "idPhongKhoa": 48,
            "tenPhongKhoa": "Khoa Chuẩn đoán hình ảnh"
        }
    ];

    const checkPDF = ['application/pdf'];
    const checkDocType =
        ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; //docx, xlsx

    useEffect(() => {
        if (props.setActionModalDoc === "EDIT" || props.setActionModalDoc === "INFO") {
            setdocData({ ...assignDataDocEdit })
            setStartDate(false) //set giá trị cho state startDate để enabled cho ô input expireDate
            setEndDate(false)
        }
    }, [assignDataDocEdit])

    const handleOnchangeInput = (value, inputName) => {
        setValidInput(validateInputDefault);
        let _docData = _.cloneDeep(docData);
        _docData[inputName] = value;
        setdocData(_docData);
        // {
        //code này dùng để hiện class in-valid khi đang nhập input khác
        //     if (value.length === 0 && inputName === 'docName' || value.length < 5 && inputName === 'docName') {
        //         let _validInput = _.cloneDeep(validInput);
        //         _validInput.docName = false;
        //         setValidInput(_validInput);
        //     }

        //     if (value.length >= 5 && inputName === 'docName') {
        //         let _validInput = _.cloneDeep(validInput);
        //         _validInput.docName = true;
        //         setValidInput(_validInput);
        //     }

        //     if (value.length === 0 && inputName === 'docDes') {
        //         let _validInput = _.cloneDeep(validInput);
        //         _validInput.docDes = false;
        //         setValidInput(_validInput);
        //     }

        //     if (value.length !== 0 && inputName === 'docDes') {
        //         let _validInput = _.cloneDeep(validInput);
        //         _validInput.docDes = true;
        //         setValidInput(_validInput);
        //     }
        // }

        if (value.length === 0 && inputName === 'docName' || value.length < 5 && inputName === 'docName') {
            let _validInput = _.cloneDeep(validateInputDefault);
            _validInput.docName = false;
            setValidInput(_validInput);
        }

        if (value.length >= 5 && inputName === 'docName') {
            let _validInput = _.cloneDeep(validateInputDefault);
            _validInput.docName = true;
            setValidInput(_validInput);
        }
    }

    const handleOnfocusInput = (event) => {
        setValidInput(validateInputDefault);
        let inputName = event.target.name;
        if (event.target.value.length === 0 && inputName === "title") {
            let _validInput = _.cloneDeep(validateInputDefault);
            _validInput.docName = true;
            setValidInput(_validInput);
        }
        else if (event.target.value.length < 5 && inputName === "title") {
            let _validInput = _.cloneDeep(validateInputDefault);
            _validInput.docName = false;
            setValidInput(_validInput);
        }
    }

    const handleOnClickInputFile = (event) => {
        setValidInput(validateInputDefault);
        try {
            let fileType = event.target.files[0].type
            if (fileType && checkPDF.includes(fileType)) {
                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = true;
                setValidInput(_validInput);
            }

            else if (fileType && checkDocType.includes(fileType)) {
                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = false;
                setValidInput(_validInput);
            }

            else {
                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = false;
                setValidInput(_validInput);
            }

        } catch (error) {
            // console.log('chua chon file');
        }
    }

    const checkValidInputWhenSubmit = () => {
        setValidInput(validateInputDefault)
        let check = true;
        for (const key of Object.keys(docData)) {
            if (docData.docName.length === 0) {
                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docName = false;
                setValidInput(_validInput);

                toast.error("Bạn chưa đặt tên cho văn bản!");
                check = false;
                break;
            }
        }
        return check;
    }

    const b64toBlob = (b64Data) => {
        var binary = atob(b64Data.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

        const blob = new Blob( [view], { type: "application/pdf" });

        return blob;
      }

    //xử lý file, đọc file để preview file
    const handlePdfFile = (event) => {
        let selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile && checkPDF.includes(selectedFile.type)) {
                event.target.files?.length && setPdfFile(Array.from(event.target.files))
                let fileName = selectedFile.name.split(".");
                setIsAllow(true);
                setFileName(fileName[0]);

                docData.docName = fileName[0];
                setdocData(docData);

                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = true;
                setValidInput(_validInput);

                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    let result = e.target.result;
                    let result_split = result.split(",");
                    let base64Data = result_split[1];
                    let blob_file = b64toBlob(base64Data);
                    var file = new File([blob_file], "my_image.png",{type:"application/pdf", lastModified:new Date().getTime()})
                    
                    // console.log(blob_file);
                    // console.log('objfile: ', file);

                    setDataFile(base64Data);
                    setPdfFile(file)
                }
            }

            else if (selectedFile && checkDocType.includes(selectedFile.type)) {
                let fileName = selectedFile.name.split(".");
                setIsAllow(true);
                setFileName(fileName[0]);

                docData.docName = fileName[0];
                setdocData(docData);

                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = true;
                setValidInput(_validInput);

                setPdfFile(selectedFile);
                setExt(fileName.pop());

                setFileName(selectedFile.name);
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setDataFile(e.target.result);
                }
            }

            else {
                toast.error('Định dạng file không hợp lệ!');

                let _validInput = _.cloneDeep(validateInputDefault);
                _validInput.docFileData = false;
                setValidInput(_validInput);

                docData.docName = '';
                setdocData(docData);

                setIsAllow(false);
            }
        }
        else {
            toast.warning('Xin hãy chọn tài liệu!');
            docData.docName = '';
            setdocData(docData);
            setIsAllow(false);
        }
    }

    //đóng modal này
    const handleOnCloseModal = () => {
        props.close(false);
        setdocData(defaultDocData);
        setStartDate('');
        setEndDate('');
        setValidInput(validateInputDefault);
        setIsAllow(false);
    }

    const btnSubmit = () => {
        let check = checkValidInputWhenSubmit();
        if (check === true) {
            let docExpireStartValue = document.getElementById("dateStart").value;
            let docExpireEndValue = document.getElementById("dateFinish").value;

            let docExpireStartValueFormat = docExpireStartValue.split("/");
            let docExpireEndValueFormat = docExpireEndValue.split("/");

            let docStartDate = `${docExpireStartValueFormat[2]}${docExpireStartValueFormat[1]}${docExpireStartValueFormat[0]}`;
            let docEndDate = `${docExpireEndValueFormat[2]}${docExpireEndValueFormat[1]}${docExpireEndValueFormat[0]}`;

            docData.docExpireStart = docStartDate;
            docData.docExpireEnd = docEndDate;
            docData.docFileName = fileName;
            docData.docFileData = dataFile;
            console.log('data: ', docData);
            let response = createDocAPI(docData);
            // console.log('response: ', response);
        }
        else {
            console.log(check);
        }
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
                <Modal show={props.active} onHide={() => handleOnCloseModal()} size="lg">
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
                                } else if (props.setActionModalDoc === "DELETE") {
                                    return (
                                        <div className='text-primary text-uppercase'>Xóa văn bản</div>
                                    )
                                } else if (props.setActionModalDoc === "INFO") {
                                    return (
                                        <div className='text-primary text-uppercase'>Thông tin văn bản</div>
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
                            <form method="POST" action="/user/create-user" autoComplete='off' >
                                <div className="container" style={{ overflow: "visible" }}>
                                    <div className="row d-flex justify-content-center form-group">
                                        {(() => {
                                            if (props.setActionModalDoc === "CREATE" || props.setActionModalDoc === "EDIT" || props.setActionModalDoc === "INFO") {
                                                return (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label htmlFor="tit" className="form-label">Tên văn bản</label>
                                                                <input type="text" className={validInput.docName ? 'form-control' : 'form-control is-invalid'} id="tit" name="title" value={docData.docName || ""}
                                                                    onChange={(event) => handleOnchangeInput(event.target.value, "docName")}
                                                                    onFocus={(event) => handleOnfocusInput(event)}
                                                                    // onBlur={(event) => handleOutfocusInput(event)}
                                                                    autoComplete="off"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label htmlFor="doc" className="form-label">Văn bản</label>
                                                                <input type="file" name="document" id="doc" className={validInput.docFileData ? 'form-control' : 'form-control is-invalid'}
                                                                    onChange={(event) => handlePdfFile(event)}
                                                                    onClick={(event) => handleOnClickInputFile(event)}
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                            <div className="mt-4 mb-3 col-sm-12 " >
                                                                <div className="date-expire-group">
                                                                    <fieldset className="border rounded-3 p-4 ">
                                                                        <legend className="float-none w-auto"
                                                                            style={{ fontWeight: "bold", color: "#dc3545", fontSize: "1.1rem" }}>Thời hạn xử lý</legend>
                                                                        <div className="row date-expire-input d-flex">
                                                                            <div className="date-start-group col-sm-6">
                                                                                <div className="input-date-start">
                                                                                    <div className="mx-2" style={{ display: "inline-block" }}>
                                                                                        <label htmlFor="dateStart" >Từ ngày</label>
                                                                                    </div>
                                                                                    <DatePicker
                                                                                        className={validInput.docExpireStart ? 'form-control' : 'form-control is-invalid'}
                                                                                        autoComplete="off"
                                                                                        showPopperArrow={true}
                                                                                        dateFormat="dd/MM/yyyy"
                                                                                        locale="vi"
                                                                                        minDate={new Date()}
                                                                                        maxDate={addMonths(new Date(), 12)}
                                                                                        todayButton="Hôm nay"
                                                                                        selected={startDate !== false || docData.docExpireStart === undefined ? startDate : new Date(docData.docExpireStart)}
                                                                                        onChange={onChangeStart}
                                                                                        startDate={startDate}
                                                                                        showMonthYearDropdown //không viết tắt của tháng
                                                                                        // useShortMonthInDropdown //viết tắt của tháng 
                                                                                        showTwoColumnMonthYearPicker
                                                                                        disabledKeyboardNavigation
                                                                                        isClearable={true}
                                                                                        id='dateStart'
                                                                                        onKeyDown={(event) => { event.preventDefault() }}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="date-finish-group col-sm-6">
                                                                                <div className="input-date-finish">
                                                                                    <div className="mx-2" style={{ display: "inline-block" }}>
                                                                                        <label htmlFor="dateFinish" className="form-label">Đến ngày</label>
                                                                                    </div>
                                                                                    <DatePicker
                                                                                        className={validInput.docExpireEnd ? 'form-control' : 'form-control is-invalid'}
                                                                                        autoComplete="off"
                                                                                        showPopperArrow={true}
                                                                                        dateFormat="dd/MM/yyyy"
                                                                                        locale="vi"
                                                                                        minDate={startDate === false ? new Date(docData.docExpireStart) : startDate}
                                                                                        maxDate={addMonths(new Date(), 12)}
                                                                                        todayButton="Hôm nay"
                                                                                        selected={endDate !== false || docData.docExpireEnd === undefined ? endDate : new Date(docData.docExpireEnd)}
                                                                                        onChange={onChangeEnd}
                                                                                        endDate={endDate}
                                                                                        showMonthYearDropdown //không viết tắt của tháng
                                                                                        // useShortMonthInDropdown //viết tắt của tháng 
                                                                                        showTwoColumnMonthYearPicker
                                                                                        disabledKeyboardNavigation
                                                                                        isClearable={true}
                                                                                        id='dateFinish'
                                                                                        disabled={startDate === "" ? true : false}
                                                                                        onKeyDown={(event) => { event.preventDefault() }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                            </div >
                                                            <div className="mb-2 mt-2 col-sm-12">
                                                                <label htmlFor="des" className="form-label">Mô tả văn bản</label>
                                                                <textarea className={validInput.docDes ? 'form-control' : 'form-control is-invalid'} id="des" name="description" rows="4" value={docData.docDes || ""} onChange={(event) => handleOnchangeInput(event.target.value, "docDes")} autoComplete="off" ></textarea>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                            else if (props.setActionModalDoc === "DELETE") {
                                                return (
                                                    <Modal.Body style={{ textAlign: "center" }}>Bạn có chắc muốn xóa văn bản "<strong>{props.assignDataDoc.docName}</strong>" này không?</Modal.Body>
                                                )
                                            }

                                            else {
                                                return (
                                                    <>
                                                        <div className="row mt-3 row d-flex justify-content-center">
                                                            <div className="mb-3 col-sm-12">
                                                                <label htmlFor="mention" className="form-label">Bàn giao tới phòng khoa</label>
                                                                <Autocomplete
                                                                    multiple
                                                                    id="mention"
                                                                    options={dataPhongKhoa}
                                                                    disableCloseOnSelect
                                                                    getOptionLabel={(option) => option.tenPhongKhoa}
                                                                    renderOption={(props, option, { selected }) => (
                                                                        <li {...props}>
                                                                            <Checkbox
                                                                                icon={icon}
                                                                                checkedIcon={checkedIcon}
                                                                                style={{ marginRight: 8 }}
                                                                                checked={selected}
                                                                            />
                                                                            {option.tenPhongKhoa}
                                                                        </li>
                                                                    )}
                                                                    style={{ width: 715 }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} />
                                                                    )}
                                                                />
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
                    </Modal.Body >

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
                                        <Button variant="primary" onClick={() => btnSubmit()}>Tạo</Button>
                                    </>
                                )
                            } else if (props.setActionModalDoc === "EDIT") {
                                return (
                                    <>
                                        <Button variant="primary" onClick={() => btnSubmit()}>Sửa</Button>
                                    </>
                                )

                            } else if (props.setActionModalDoc === "DELETE") {
                                return (
                                    <>
                                        <Button variant="primary" onClick={() => btnSubmit()}>Xóa</Button>
                                    </>
                                )
                            } else if (props.setActionModalDoc === "INFO") {
                                return (
                                    <>
                                        {docData.docStatus === 0 ?
                                            <>
                                                <Button variant="light" style={{ backgroundColor: "#4dd4ac", borderColor: "white" }}>Xem văn bản</Button>
                                                <Button variant="primary">Duyệt</Button>
                                            </>
                                            :
                                            <>
                                                <Button variant="light" style={{ backgroundColor: "#4dd4ac", borderColor: "white" }}>Xem văn bản</Button>
                                            </>
                                        }
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
                        <Button variant="btn btn-secondary" onClick={() => handleOnCloseModal()}>Đóng</Button>
                    </Modal.Footer>
                </Modal >

                {/* có thể truyền cả phương thức của 1 state qua cho component khác */}
                < ModalPreviewDocument
                    open={isShowModalPreviewDoc}
                    close={setIsShowModalPreviewDoc}
                    dataModalPreviewDoc={pdfFile}
                    setExt={ext}
                    resetdataModalPreviewDoc={setPdfFile}
                    resetExt={setExt}
                />
            </div >
        </>
    )
}

export default ModalAddDoc