import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';
import "./ListDoc.scss";
import ModalDocument from '../ManageDocument/ModalDocument';
import {getAllDocSendUserLogin} from '../../services/docService'

function ListDoc() {
    const { user } = useContext(UserContext);
    //set ẩn hiện cho modal
    const [isShowModalDoc, setIsShowModalDoc] = useState(false);
    //set phương thức thực hiện cho modal
    const [actionModalDoc, setActionModalDoc] = useState("CREATE");
    //set paginate 
    const [currentPage, setCurrentPage] = useState(1);
    //lấy data trong table row để truyền qua modal khác để edit
    const [dataDocEdit, setDataDocEdit] = useState({});
    //lấy data trong table row để truyền qua modal khác
    const [dataDoc, setDataDoc] = useState({});

    // const [listDoc, setListDoc] = useState([])

    const listDoc = [
        {
            idDoc: 1,
            docName: "Khoa nội",
            docFile: "khoanoi.pdf",
            docDes: "Mô tả văn bản 1",
            docExpireStart: "2023-07-05",
            docExpireEnd: "2024-01-01",
            docHandOver: "",
            docStatus: 0
        },
        {
            idDoc: 2,
            docName: "Khoa ngoại tổng hợp",
            docFile: "khoangoaitonghop.pdf",
            docDes: "Mô tả văn bản 2",
            docExpireStart: "2023-11-20",
            docExpireEnd: "2024-07-05",
            docHandOver: "",
            docStatus: 1
        },
        {
            idDoc: 3,
            docName: "Thực phẩm thức ăn",
            docFile: "khoatieuhoa.pdf",
            docDes: "Mô tả văn bản 3",
            docExpireStart: "2023-12-10",
            docExpireEnd: "2024-01-31",
            docHandOver: "Khoa tiêu hóa",
            docStatus: 2
        },
        {
            idDoc: 4,
            docName: "Trang thiết bị",
            docFile: "trangthietbi.pdf",
            docDes: "Mô tả văn bản 4",
            docExpireStart: "2024-02-02",
            docExpireEnd: "2024-07-05",
            docHandOver: "Khoa Phẫu thuật trong ngày",
            docStatus: 3
        },
        {
            idDoc: 5,
            docName: "Chăm sóc trẻ em",
            docFile: "treem.pdf",
            docDes: "Props Format theo tháng ngày năm",
            docExpireStart: "2023-10-18",
            docExpireEnd: "2024-07-29",
            docHandOver: "",
            docStatus: 0
        },
        // {
        //     idDoc: 6,
        //     docName: "Khoa thần kinh",
        //     docFile: "thankinh.pdf",
        //     docDes: "Mô tả văn bản 6",
        //     docExpireStart: "2023-10-10",
        //     docExpireEnd: "2024-01-01",
        //     docHandOver: "",
        //     docStatus: 0
        // },
        // {
        //     idDoc: 7,
        //     docName: "Khoa nội tổng hợp",
        //     docFile: "khoanoitonghop.pdf",
        //     docDes: "Mô tả văn bản 7",
        //     docExpireStart: "2023-02-11",
        //     docExpireEnd: "2024-05-17",
        //     docHandOver: "",
        //     docStatus: 1
        // },
        // {
        //     idDoc: 8,
        //     docName: "Khoa dược",
        //     docFile: "khoaduoc.pdf",
        //     docDes: "Mô tả văn bản 8",
        //     docExpireStart: "2023-10-12",
        //     docExpireEnd: "2024-05-31",
        //     docHandOver: "Khoa dược",
        //     docStatus: 2
        // },
        // {
        //     idDoc: 9,
        //     docName: "Phòng chống bắt cóc",
        //     docFile: "phongchongbatcoc.pdf",
        //     docDes: "Mô tả văn bản 9",
        //     docExpireStart: "2023-06-02",
        //     docExpireEnd: "2024-01-10",
        //     docHandOver: "Phòng bảo vệ",
        //     docStatus: 3
        // },
        // {
        //     idDoc: 10,
        //     docName: "Phòng chống covid",
        //     docFile: "phongchongcovid.pdf",
        //     docDes: "Mô tả văn bản 10",
        //     docExpireStart: "2023-10-18",
        //     docExpireEnd: "2024-07-29",
        //     docHandOver: "",
        //     docStatus: 0
        // }
    ]
    //config search field
    const [searchValue, setSearchValue] = useState('');
    const keys = ["docName", "docDes", "docExpireStart", "docExpireEnd", "docHandOver"];

    const totalPages = 5;

    const btnActiveModalAddDoc = () => {
        setActionModalDoc("CREATE");
        setIsShowModalDoc(true);
    }

    const btnInActiveModalAddDoc = () => {
        setDataDocEdit({});
    }

    const btnEdit = (itemListDoc) => {
        setActionModalDoc("EDIT");
        setDataDocEdit(itemListDoc)
        setIsShowModalDoc(true);
    }

    const btnInfo = (itemListDoc) => {
        setActionModalDoc("INFO");
        setDataDocEdit(itemListDoc)
        setIsShowModalDoc(true);
    }

    const btnDel = (itemListDoc) => {
        setActionModalDoc("DELETE");
        setDataDoc(itemListDoc);
        setIsShowModalDoc(true);
    }

    const btnHandOver = () => {
        setActionModalDoc("HANDOVER");
        setIsShowModalDoc(true);
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    // const fetchAllDoc = async () => {
    //     let result = await getAllDocSendUserLogin();
    //     setListDoc(result)
    // }

    // useEffect(()=> {
    //     fetchAllDoc();
    // }, [])
    
    return (
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2 mt-1'>
                                <div className='col-3'>
                                    <h3 className="row text-primary text-uppercase mb-2">Danh sách văn bản</h3>
                                </div>
                                <div className='col-4 mt-1'>
                                    <form method='GET' autoComplete='off'>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control fa py-2" placeholder="&#xF002; Tìm văn bản..." name="keyDoc" onChange={(e) => setSearchValue(e.target.value)} style={{ fontFamily: "Arial, FontAwesome" }} />
                                            {/* <button type="button" className="btn btn-warning ml-2 py-2 "><i className="fa fa-search text-white"></i></button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                {user && user.isAuthenticated === true && user.account.departmentName === 'Phòng Hành chính quản trị' ?
                                    <>
                                        <div className='px-0' style={{ display: "block", zIndex: "100" }}>
                                            <button className='btn btn-primary mb-3 col-1 add-doc' style={{ paddingRight: "7.1rem" }} onClick={() => btnActiveModalAddDoc()} ><i className="fa fa-plus i-add"></i>Tạo văn bản</button>
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                                <div className="row justify-content-center mt-2">
                                    <table className="table table-hover table-bordered ">
                                        <thead>
                                            <tr>
                                                <th scope='col'>STT</th>
                                                <th scope="col">Tên văn bản</th>
                                                <th scope="col">Mô tả văn bản</th>
                                                <th scope="col">Thời hạn xử lý</th>
                                                <th scope="col">Bàn giao</th>
                                                <th scope="col">Trạng thái</th>
                                                {user && user.isAuthenticated === true && user.account.departmentName === 'Phòng Hành chính quản trị' ?
                                                    <><th scope="col">Thao tác</th></>
                                                    :
                                                    null
                                                }
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {listDoc.filter((itemListDoc) => {
                                                // return searchValue.toLocaleLowerCase() === '' ? itemListDoc : itemListDoc.docName.toLocaleLowerCase().includes(searchValue)
                                                return keys.some(key => itemListDoc[key].toLowerCase().includes(searchValue))
                                            }).map((itemListDoc, indexListDoc) => {
                                                return (
                                                    <tr key={`row-${indexListDoc}`}>
                                                        <td>{indexListDoc + 1}</td>
                                                        <td><button className='title-doc' onClick={() => btnInfo(itemListDoc)}>{itemListDoc.docName}</button></td>
                                                        <td>{itemListDoc.docDes}</td>
                                                        <td>{`${moment(itemListDoc.docExpireStart).format('L')} - ${moment(itemListDoc.docExpireEnd).format('L')}`}</td>
                                                        <td>{itemListDoc.docHandOver.length !== 0 ? itemListDoc.docHandOver : null}</td>
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

                                                        {user && user.isAuthenticated === true && user.account.departmentName === 'Phòng Hành chính quản trị' ?
                                                            <td className='text-center'>
                                                                {(() => {
                                                                    if (itemListDoc.docStatus === 0) {
                                                                        return (
                                                                            <>
                                                                                <button className="btn btn-warning" onClick={() => btnEdit(itemListDoc)}> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                                                <button className="btn btn-danger mx-2" onClick={() => btnDel(itemListDoc)} > <i className="fa-solid fa-trash text-white"></i></button>
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
                                                                            null
                                                                        )
                                                                    }
                                                                })()}
                                                            </td>
                                                            :
                                                            <></>
                                                        }
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
                            <div className='table-footer row d-flex justify-content-center mt-2'>
                                <div className='col-6 d-flex justify-content-center table-paginate'>
                                    <ReactPaginate
                                        nextLabel=">"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={4}
                                        pageCount={totalPages}
                                        previousLabel="<"
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
                            </div>
                        }
                    </div>
                </div>
            </div>

            <ModalDocument
                active={isShowModalDoc}
                //reset lại data cho modal theo action edit
                inactive={btnInActiveModalAddDoc}
                close={setIsShowModalDoc}
                setActionModalDoc={actionModalDoc}
                assignDataDocEdit={dataDocEdit}
                assignDataDoc={dataDoc}
            />
        </>
    )
}

export default ListDoc
