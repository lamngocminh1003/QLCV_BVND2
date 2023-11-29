import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

import ModalPropose from '../ManagePropose/ModalPropose';
import "./ListPropose.scss";

import moment from 'moment';
import { Button } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { getProposeSendByUserLogin } from '../../services/proposeService';

const ListPropose = () => {
    const { user } = useContext(UserContext);

    const [listPropose, setListPropose] = useState([]);
    
    //set paginate 
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    //config search field
    const [searchValue, setSearchValue] = useState('');

    //config modal propose
    const [showModalPropose, setShowModalPropose] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [dataModalPropose, setDataModalPropose] = useState({});

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    const btnActiveModalPropose = () => {
        setActionModal("CREATE");
        setShowModalPropose(true);
    }

    const btnInActiveModalPropose = () => {
        setDataModalPropose({});
        fetchAllPropose();
    }

    const btnInfo = (itemListPropose) => {
        setActionModal("INFO");
        setDataModalPropose(itemListPropose);
        setShowModalPropose(true);
    }

    const btnEdit = () => {

    }

    const btnDel = () => {

    }

    const btnFeedBack = () => {

    }

    const fetchAllPropose = async () => {
        let resultListPropose = await getProposeSendByUserLogin();
        if(resultListPropose.length !== 0){
            setListPropose(resultListPropose);
        }
    }

    useEffect(()=> {
        fetchAllPropose();
    }, [currentPage])

    return(
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2 mt-1'>
                                <div className='col-4'>
                                    <h3 className="row text-primary text-uppercase mb-2">Danh sách đề xuất</h3>
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
                                                <th scope="col">Nội dung đề xuất</th>
                                                <th scope="col">Thời gian gửi</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody className='text-start'>
                                            {listPropose.map((itemListPropose, indexListPropose) => {
                                                return(
                                                    <tr key={`row-${indexListPropose}`}>
                                                        <td className='align-middle'>{indexListPropose+1}</td>
                                                        <td style={{width: '26%'}} className='align-middle'><button className='title-doc text-start' onClick={() => btnInfo(itemListPropose)}>{itemListPropose.document_Incomming_Title}</button></td>
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
                inactive={btnInActiveModalPropose}
                dataModalPropose={dataModalPropose}
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