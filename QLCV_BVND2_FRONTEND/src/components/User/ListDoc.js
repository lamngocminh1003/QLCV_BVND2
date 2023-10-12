import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';
import "./ListDoc.scss";
import ModalDocument from '../ManageDocument/ModalDocument';

function ListDoc() {
    const { user } = useContext(UserContext);
    //set ẩn hiện cho modal
    const [isShowModalDoc, setIsShowModalDoc] = useState(false);
    //set phương thức thực hiện cho modal
    const [actionModalDoc, setActionModalDoc] = useState("CREATE");
    //set paginate 
    const [currentPage, setCurrentPage] = useState(1);
    //lấy data trong table row để edit
    const [dataDocEdit, setDataDocEdit] = useState({});


    const listDoc = [
        {
            idDoc: 1,
            docName: "Khoa nội",
            docFile: "khoanoi.pdf",
            docDes: "Mô tả văn bản 1",
            docExpire: "10/10/2023 - 01/01/2024",
            docHandOver: "",
            docStatus: 0
        },
        {
            idDoc: 2,
            docName: "Khoa ngoại tổng hợp",
            docFile: "khoangoaitonghop.pdf",
            docDes: "Mô tả văn bản 2",
            docExpire: "20/11/2023 - 05/07/2024",
            docHandOver: "",
            docStatus: 1
        },
        {
            idDoc: 3,
            docName: "Khoa tiêu hóa",
            docFile: "khoatieuhoa.pdf",
            docDes: "Mô tả văn bản 3",
            docExpire: "10/12/2023 - 31/01/2024",
            docHandOver: "Khoa tiêu hóa",
            docStatus: 2
        },
        {
            idDoc: 4,
            docName: "Phòng chống trộm cắp",
            docFile: "phongchongtromcap.pdf",
            docDes: "Mô tả văn bản 4",
            docExpire: "02/02/2024 - 05/07/2024",
            docHandOver: "Phòng bảo vệ",
            docStatus: 3
        },
        {
            idDoc: 5,
            docName: "Phòng cháy chữa cháy",
            docFile: "phongchaychuachay.pdf",
            docDes: "Mô tả văn bản 5",
            docExpire: "02/02/2024 - 05/07/2024",
            docHandOver: "",
            docStatus: 0
        }
    ]

    const totalPages = 5;

    const btnActiveModalAddDoc = () => {
        setActionModalDoc("CREATE");
        setIsShowModalDoc(true);
    }

    const btnInActiveModalAddDoc = () => {
        setActionModalDoc("CREATE");
        setDataDocEdit({});
        setIsShowModalDoc(false);
    }

    const btnEdit = (itemListDoc) => {
        setActionModalDoc("EDIT");
        setDataDocEdit(itemListDoc)
        setIsShowModalDoc(true);
    }

    const btnHandOver = () => {
        setActionModalDoc("HANDOVER");
        setIsShowModalDoc(true);
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };


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

                                            {listDoc.map((itemListDoc, indexListDoc) => {
                                                return (
                                                    <tr key={`row-${indexListDoc}`}>
                                                        <td>{indexListDoc + 1}</td>
                                                        <td><button className='title-doc'>{itemListDoc.docName}</button></td>
                                                        <td>{itemListDoc.docDes}</td>
                                                        <td>{itemListDoc.docExpire}</td>
                                                        <td>{itemListDoc.docHandOver.length !== 0 ? itemListDoc.docHandOver : ''}</td>
                                                        <td>
                                                            {(() => {
                                                                if (itemListDoc.docStatus === 0) {
                                                                    return (
                                                                        <>
                                                                            <span className="status rounded-pill wait">Chờ duyệt</span>
                                                                        </>
                                                                    )
                                                                }
                                                                else if (itemListDoc.docStatus === 1) {
                                                                    return (
                                                                        <>
                                                                            <span className="status rounded-pill checked">Đã duyệt</span>
                                                                        </>
                                                                    )
                                                                }
                                                                else if (itemListDoc.docStatus === 2) {
                                                                    return (
                                                                        <>
                                                                            <span className="status rounded-pill ahead">Bàn giao</span>
                                                                        </>
                                                                    )
                                                                }
                                                                else {
                                                                    return (
                                                                        <>
                                                                            <span className="status rounded-pill success">Hoàn thành</span>
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                        </td>


                                                        <td className='text-center'>
                                                            {(() => {
                                                                if (itemListDoc.docStatus === 0) {
                                                                    return (
                                                                        <>
                                                                            <button className="btn btn-warning" onClick={() => btnEdit(itemListDoc)}> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                                            <button className="btn btn-danger mx-2"> <i className="fa-solid fa-trash text-white"></i></button>
                                                                        </>
                                                                    )
                                                                } else if (itemListDoc.docStatus === 1) {
                                                                    return (
                                                                        <>
                                                                            <button className="btn btn-share" style={{ backgroundColor: "#d63384" }} onClick={() => btnHandOver()}> <i className="fa-solid fa fa fa-share text-white"></i></button>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <></>
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
                        {totalPages > 0 &&
                            <div className='table-footer'>
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={4}
                                    pageCount={totalPages}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>
                </div>

            </div>



            <ModalDocument
                active={isShowModalDoc}
                inactive={btnInActiveModalAddDoc}
                setActionModalDoc={actionModalDoc}
                assignDataDocEdit={dataDocEdit}
            />
        </>
    )
}

export default ListDoc
