import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import _ from "lodash";
import { createNewDepartment, updateCurrentDepartment } from '../../services/departmentService';
import Department from './Department';

const ModalDepartment = (props) => {
    const { action, dataModalDepartment } = props;

    const defaultDepartmentData = {
        departmentName: ''
    }

    const validInputsDefault = {
        departmentName: true
    }

    const [departmentData, setDepartmentData] = useState(defaultDepartmentData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        if (action === 'UPDATE') {
            console.log("<<<check data update", dataModalDepartment);
            setDepartmentData(dataModalDepartment);
        }
    }, [dataModalDepartment])



    const handleOnChangeInput = (value, name) => {
        let _departmentData = _.cloneDeep(departmentData);
        //copy data giúp mình
        _departmentData[name] = value;
        setDepartmentData(_departmentData);
    }

    const checkValidateInputs = () => {
        //create khoa phòng
        if (action === 'UPDATE') return true;

        setValidInputs(validInputsDefault);
        let arr = ['departmentName']
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!departmentData[arr[i]]) {

                //cập nhật biến array input
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                //hiện thông báo
                toast.error(`hok được để trống tên khoa phòng`);
                check = false;
                break; //đến khi invalid là phá khỏi vòng lặp
            }
        }
        return check;
    }

    const handleConfirmDepartment = async () => {
        //tạo khoa phòng
        let check = checkValidateInputs();
        if (check === true) {
            let res = action === 'CREATE' ?
                //action = create thì như vậy    
                await createNewDepartment({ departmentData })
                //còn action = update thì như vậy
                : await updateCurrentDepartment({ departmentData });

            if (res && res.EC === 0) {
                props.onHide();
                setDepartmentData(defaultDepartmentData);
            }

            if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }
    const handleCloseModalDepartment = () => {
        props.onHide();
        setDepartmentData(defaultDepartmentData);
        setValidInputs(validInputsDefault);
    }

    ///////// PHẦN CODE GIAO DIỆN THÊM/SỬA
    ///////// PHẦN CODE GIAO DIỆN THÊM/SỬA
    ///////// PHẦN CODE GIAO DIỆN THÊM/SỬA

    return (
        <>
            <Modal
                size="md"
                centered
                show={props.show}
                className='modal-department'
                onHide={() => handleCloseModalDepartment()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span> {props.action === 'CREATE' ? 'Thêm khoa phòng' : 'Chỉnh sửa khoa phòng'} </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='content-body row'>
                        <div className='col-12 col-sm-12 form-group'>
                            {
                                <>
                                    <label>Tên phòng khoa (<span className='red'>*</span>)</label>
                                    <input
                                        className={validInputs.departmentName ? 'form-control' : 'form-control is-invalid'}
                                        type="text" value={departmentData.departmentName}
                                        onChange={(event) => handleOnChangeInput(event.target.value, "departmentName")}
                                    />
                                </>
                            }
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalDepartment()}>Đóng cửa</Button>
                    <Button variant="primary" onClick={() => handleConfirmDepartment()}>
                        {action === 'CREATE' ? 'Ôkê tạo mới' : 'Cập nhật roài'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalDepartment;