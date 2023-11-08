import React, { useState, useContext } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { UserContext } from '../../context/UserContext';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

//import progressbar
import CircularProgress from "../ProgressBar/CircularProgressWithLabel";

import ReactPaginate from 'react-paginate';
import ModalDocumentOfDepartment from '../ManageDocument/ModalDocumentOfDepartment';

const ListDocOfDepartment = () => {
    const { user } = useContext(UserContext);

    const [searchValue, setSearchValue] = useState('');

    const keys = ["docName", "docDes", "docExpireStart", "docExpireEnd", "docHandOver"];

    const today = moment();

    const listDocDepartment = [
        {
            idDoc: 1,
            docName: "Văn bản 1",
            docFile: "vanban1.pdf",
            docDes: "Mô tả a",
            docExpireStart: "2023-07-05",
            docExpireEnd: "2024-01-01",
            docHandOver: "Tiêu hóa",
            docStatus: 3,
            docProgress: 0
        },
        {
            idDoc: 2,
            docName: "Văn bản 2",
            docFile: "vanban2.pdf",
            docDes: "Mô tả b",
            docExpireStart: "2023-11-20",
            docExpireEnd: "2024-07-05",
            docHandOver: "Tiêu hóa",
            docStatus: 4,
            docProgress: 100
        },
        {
            idDoc: 3,
            docName: "Văn bản 3",
            docFile: "vanban3.pdf",
            docDes: "Mô tả c",
            docExpireStart: "2023-12-10",
            docExpireEnd: "2024-01-31",
            docHandOver: "Khoa tiêu hóa",
            docStatus: 3,
            docProgress: 22
        },
        {
            idDoc: 4,
            docName: "Văn bản 4",
            docFile: "vanban4.pdf",
            // docDes: "Văn bản có thời hạn xử lý nhỏ hơn ngày hiện tại với tiến độ 100% sẽ hiển thị trạng thái hoàn thành",
            docDes: "Mô tả d",
            docExpireStart: "2024-02-02",
            docExpireEnd: "2023-07-05",
            docHandOver: "Khoa tiêu hóa",
            docStatus: 4,
            docProgress: 100
        },
        {
            idDoc: 5,
            docName: "Văn bản 5",
            docFile: "vanban5.pdf",
            //docDes: "Văn bản có thời hạn xử lý nhỏ hơn ngày hiện tại với tiến độ nhỏ hơn 100% sẽ hiển thị trạng thái hết hạn",
            docDes: "Mô tả e",
            docExpireStart: "2023-04-20",
            docExpireEnd: "2023-09-11",
            docHandOver: "Khoa tiêu hóa",
            docStatus: 4,
            docProgress: 67
        },
    ]

    const btnEdit = () => {

    }

    const btnDel = () => {

    }

    const btnInfo = () => {

    }

    const btnHandOver = () => {

    }

    return (
        <>
            <div className='container'>
                <div className='container-body'>
                    <div className='row mb-2 mt-3'>
                        <div className='col-12'>
                            <h3 className="row text-primary text-uppercase mb-2">{`Danh sách văn bản ${(user.account.departmentName)}`}</h3>
                        </div>

                        <div className='row px-0 d-flex mt-2'>
                            <div className='col-2'>
                                <button type="button" className="btn btn-primary">Chua biet nut nay lam gi</button>
                            </div>

                            <div className='col-4'>
                                <form method='GET' autoComplete='off'>
                                    <div className='d-flex'>
                                        <input type="text" className="form-control" placeholder="&#xF002; Tìm văn bản..." name="keyDoc" onChange={(e) => setSearchValue(e.target.value)} style={{ fontFamily: "Arial, FontAwesome" }} />
                                        {/* <button type="button" className="btn btn-warning ml-2 py-2 "><i className="fa fa-search text-white"></i></button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='row table-doc mt-4'>
                        <table className="table table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <th scope='col'>STT</th>
                                    <th scope="col">Tên văn bản</th>
                                    <th scope="col">Mô tả văn bản</th>
                                    <th scope="col">Thời hạn xử lý</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Tiến trình</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listDocDepartment.filter((itemListDocDepartment) => {
                                    return keys.some(key => itemListDocDepartment[key].toLowerCase().includes(searchValue))
                                }).map((itemListDocDepartment, indexListDocDepartment) => {
                                    return (
                                        <tr key={`row-${indexListDocDepartment}`}>
                                            <td>{indexListDocDepartment + 1}</td>
                                            <td><button className='title-doc' onClick={() => btnInfo(itemListDocDepartment)}>{itemListDocDepartment.docName}</button></td>
                                            <td>{itemListDocDepartment.docDes}</td>
                                            <td>{`${moment(itemListDocDepartment.docExpireStart).format('L')} - ${moment(itemListDocDepartment.docExpireEnd).format('L')}`}</td>
                                            <td>
                                                {itemListDocDepartment.docStatus === 3 ?
                                                    <>
                                                        <span className="status rounded-pill ahead">Tiếp nhận</span>
                                                    </>
                                                    :
                                                    <>
                                                        {today > moment(itemListDocDepartment.docExpireEnd) && itemListDocDepartment.docProgress < 100 ?
                                                            <span className="status rounded-pill expired">Hết hạn</span>
                                                            :
                                                            <span className="status rounded-pill success">Hoàn thành</span>
                                                        }
                                                    </>
                                                }
                                            </td>
                                            <td>
                                                <CircularProgress progressValue={itemListDocDepartment.docProgress} />
                                            </td>

                                            <td>
                                                {(() => {
                                                    if (itemListDocDepartment.docStatus === 3) {
                                                        return (
                                                            <>
                                                                <button className="btn btn-warning" onClick={() => btnEdit(itemListDocDepartment)}> <AssignmentOutlinedIcon /></button>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <button className="btn btn-share" style={{ backgroundColor: "#d63384" }} onClick={() => btnHandOver()}> <i className="fa-solid fa fa fa-share text-white"></i></button>
                                                            </>
                                                        )
                                                    }
                                                })()}
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListDocOfDepartment
