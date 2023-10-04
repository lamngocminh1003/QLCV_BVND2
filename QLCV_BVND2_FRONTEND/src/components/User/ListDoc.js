import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import "./ListDoc.scss";
import ModalDocument from '../ManageDocument/ModalDocument';

function Index() {
    const { user } = useContext(UserContext);
    const [isShowModalDoc, setIsShowModalDoc] = useState(false);
    const [actionModalDoc, setActionModalDoc] = useState("CREATE");

    const btnActiveModalAddDoc = () => {
        setActionModalDoc("CREATE");
        setIsShowModalDoc(true);
    }

    const btnInActiveModalAddDoc = () => {
        setIsShowModalDoc(false);
    }

    const btnEdit = () => {
        setActionModalDoc("EDIT");
        setIsShowModalDoc(true);
    }

    const btnHandOver = () => {
        setActionModalDoc("HANDOVER");
        setIsShowModalDoc(true);
    }

    return (
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <h3 className="row text-primary text-uppercase mb-3">Danh sách văn bản</h3>
                            <div className="row">
                                {user && user.account.departmentId === 3 ?
                                    <>
                                        <div className='actions'>
                                            <button className='btn btn-primary mb-3 add-user' onClick={() => btnActiveModalAddDoc()} ><i className="fa fa-plus i-add"></i>Tạo văn bản</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                <div className="row justify-content-center">
                                    <table className="table table-hover table-bordered ">
                                        <thead>
                                            <tr>
                                                <th scope='col'>STT</th>
                                                <th scope="col">Tên văn bản</th>
                                                <th scope="col">Mô tả văn bản</th>
                                                <th scope="col">Thời hạn xử lý</th>
                                                <th scope="col">Bàn giao</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><button className="title-doc">Khoa nội</button></td>
                                                <td>Mô tả văn bản 1</td>
                                                <td>10/10/2023 - 01/01/2024</td>
                                                <td></td>
                                                <td><span className="status rounded-pill wait">Chờ duyệt</span></td>
                                                <td className='text-center'>
                                                    <button className="btn btn-warning" onClick={() => btnEdit()}> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                    <button className="btn btn-danger mx-2"> <i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><button className='title-doc'>Khoa ngoại tổng hợp</button></td>
                                                <td>Mô tả văn bản 2</td>
                                                <td>20/11/2023 - 05/07/2024</td>
                                                <td></td>
                                                <td><span className="status rounded-pill checked">Đã duyệt</span></td>
                                                <td className='text-center'>
                                                    <button className="btn btn-warning" onClick={() => btnHandOver()}> <i className="fa-solid fa fa-arrow-right text-white"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td><button className='title-doc'>Khoa ngoại tiêu hóa</button></td>
                                                <td>Mô tả văn bản 3</td>
                                                <td>10/12/2023 - 31/01/2024</td>
                                                <td>Khoa tiêu hóa</td>
                                                <td><span className="status rounded-pill ahead">Bàn giao</span></td>
                                                {/* <td className='text-center'>
                                                <button className="btn btn-warning"> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                            </td> */}
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td><button className='title-doc'>Phòng cháy chữa cháy</button></td>
                                                <td>Mô tả văn bản 4</td>
                                                <td>29/12/2023 - 14/02/2024</td>
                                                <td></td>
                                                <td><span className="status rounded-pill wait">Chờ duyệt</span></td>
                                                <td className='text-center'>
                                                    <button className="btn btn-warning"> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                    <button className="btn btn-danger mx-2"> <i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td><button className='title-doc'>Phòng chống cướp giật</button></td>
                                                <td>Mô tả văn bản 5</td>
                                                <td>02/02/2024 - 05/07/2024</td>
                                                <td>Phòng bảo vệ</td>
                                                <td><span className="status rounded-pill success">Hoàn thành</span></td>
                                                <td className='text-center'>
                                                    {/* <button className="btn btn-warning"> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                <button className="btn btn-danger mx-2"> <i className="fa-solid fa-trash"></i></button> */}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalDocument
                active={isShowModalDoc}
                inactive={btnInActiveModalAddDoc}
                setActionModalDoc={actionModalDoc}
            />
        </>
    )
}

export default Index
