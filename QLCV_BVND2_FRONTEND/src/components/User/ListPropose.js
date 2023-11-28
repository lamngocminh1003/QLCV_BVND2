import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

import ModalPropose from '../ManagePropose/ModalPropose';
import "./ListPropose.scss";

import moment from 'moment';
import { Button } from '@mui/material';

const ListPropose = () => {
    const { user } = useContext(UserContext);

    const listPropose = [
        {
            document_Incomming_Id: '1',
            document_Incomming_Title: 'Sửa máy lạnh',
            document_Incomming_Content: 'Đây là đề xuất sửa máy lạnh',
            document_Incomming_Time: "2023-11-22T11:32:03.607",
            document_Incomming_State: 0
        },
        {
            document_Incomming_Id: '2',
            document_Incomming_Title: 'Nâng cấp nhà vệ sinh',
            document_Incomming_Content: 'Đây là đề xuất nâng cấp nhà vệ sinh',
            document_Incomming_Time: "2023-11-23T08:10:17.013",
            document_Incomming_State: 1
        },
        {
            document_Incomming_Id: '3',
            document_Incomming_Title: 'Nâng cấp máy tính của cả phòng lên window 10',
            document_Incomming_Content: 'Đây là đề xuất nâng cấp máy tính của cả phòng lên window 10',
            document_Incomming_Time: "2023-11-25T11:46:33.047",
            document_Incomming_State: 2
        },
        {
            document_Incomming_Id: '4',
            document_Incomming_Title: 'Trồng thêm cây cảnh',
            document_Incomming_Content: 'Đây là đề xuất trồng thêm cây cảnh',
            document_Incomming_Time: "2023-11-26T11:46:33.047",
            document_Incomming_State: 3
        },
        {
            document_Incomming_Id: '5',
            document_Incomming_Title: 'Mua thiết bị vật tư y tế kim tiêm, máy đo huyết áp',
            document_Incomming_Content: 'Đây là đề xuất mua thiết bị vật tư y tế kim tiêm, máy đo huyết áp',
            document_Incomming_Time: "2023-11-27T11:46:33.047",
            document_Incomming_State: 4
        }
    ]
    
    //set paginate 
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    //config search field
    const [searchValue, setSearchValue] = useState('');

    //config modal propose
    const [showModalPropose, setShowModalPropose] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    const btnActiveModalPropose = () => {
        setActionModal("CREATE");
        setShowModalPropose(true);
    }

    const btnEdit = () => {

    }

    const btnDel = () => {

    }

    const btnFeedBack = () => {

    }

    return(
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2 mt-1'>
                                <div className='col-4'>
                                    <h3 className="row text-primary text-uppercase mb-2">Danh sách đề xuất đã gửi</h3>
                                </div>
                                <div className='col-4 mt-1'>
                                    <form method='GET' autoComplete='off'>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control fa py-2" placeholder="&#xF002; Tìm đề xuất..." name="keyDoc" onChange={(e) => setSearchValue(e.target.value)} style={{ fontFamily: "Arial, FontAwesome" }} />
                                            {/* <button type="button" className="btn btn-warning ml-2 py-2 "><i className="fa fa-search text-white"></i></button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className='px-0' style={{ display: "block", zIndex: "100" }}>
                                    <button className='btn btn-primary mb-3 col-1 add-doc' style={{ paddingRight: "7.1rem" }} onClick={() => btnActiveModalPropose()} ><i className="fa fa-plus i-add"></i>Tạo đề xuất</button>
                                </div>
                                <div className="row mt-2">
                                    <table className="table table-hover table-bordered ">
                                        <thead>
                                            <tr>
                                                <th scope='col'>STT</th>
                                                <th scope="col">Tên đề xuất</th>
                                                <th scope="col">Mô tả đề xuất</th>
                                                <th scope="col">Thời gian gửi</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody className='text-start'>
                                            {listPropose.map((itemListPropose, indexListPropose) => {
                                                return(
                                                    <tr key={`row-${indexListPropose}`}>
                                                        <td className='align-middle'>{itemListPropose.document_Incomming_Id}</td>
                                                        <td style={{width: '26%'}} className='align-middle'><button className='title-doc text-start'>{itemListPropose.document_Incomming_Title}</button></td>
                                                        <td style={{width: '30%'}} className='align-middle'>{itemListPropose.document_Incomming_Content}</td>
                                                        <td className='align-middle'>{`${moment(itemListPropose.document_Incomming_Time).format('llll')}`}</td>
                                                        <td className='align-middle'>
                                                            {(() => {
                                                                if(itemListPropose.document_Incomming_State === 0){
                                                                    return(
                                                                        <><span className="status rounded-pill wait">Chờ duyệt</span></>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 1){
                                                                    return(
                                                                        <><span className="status rounded-pill reject">Từ chối</span></>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 2){
                                                                    return(
                                                                        <><span className="status rounded-pill edit">Chỉnh sửa</span></>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 3){
                                                                    return(
                                                                        <><span className="status rounded-pill browse">Đã duyệt</span></>
                                                                    )
                                                                }
                                                                else{
                                                                    return(
                                                                        <><span className="status rounded-pill move-up">Chuyển lên</span></>
                                                                    )
                                                                }
                                                            })()}
                                                        </td>
                                                        <td className='align-middle text-center'>
                                                            {(() => {
                                                                if(itemListPropose.document_Incomming_State === 0){
                                                                    return(
                                                                        <>
                                                                            <button className="btn btn-warning" onClick={() => btnEdit(itemListPropose)}> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                                            <button className="btn btn-danger mx-2" onClick={() => btnDel(itemListPropose)} > <i className="fa-solid fa-trash text-white"></i></button>
                                                                        </>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 1){
                                                                    return(
                                                                        <><button className="btn btn-feedback" onClick={() => btnFeedBack(itemListPropose)}> <i className="fa-solid fa fa-envelope text-white"></i></button></>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 2){
                                                                    return(
                                                                        <>
                                                                            <button className="btn btn-warning" onClick={() => btnEdit(itemListPropose)}> <i className="fa-solid fa-pen-to-square text-white"></i></button>
                                                                            <button className="btn btn-feedback mx-2" onClick={() => btnFeedBack(itemListPropose)}> <i className="fa-solid fa fa-envelope text-white"></i></button>
                                                                        </>
                                                                    )
                                                                }
                                                                else if(itemListPropose.document_Incomming_State === 3){
                                                                    return(
                                                                        <><button className="btn btn-feedback" onClick={() => btnFeedBack(itemListPropose)}> <i className="fa-solid fa fa-envelope text-white"></i></button></>
                                                                    )
                                                                }
                                                            })()}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
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

            <ModalPropose
                active={showModalPropose}
                close={setShowModalPropose}
                setActionModalPropose={actionModal}
                //inactive={btnInActiveModalAddDoc}
                //reset lại data cho modal theo action edit
                // inactive={btnInActiveModalAddDoc}
                // close={setIsShowModalDoc}
                // setActionModalDoc={actionModalDoc}
                // assignDataDocEdit={dataDocEdit}
                // assignDataDoc={dataDoc}
            />
        </>
    )
}

export default ListPropose