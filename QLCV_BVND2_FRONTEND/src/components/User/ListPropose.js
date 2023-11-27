import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

const ListPropose = () => {
    const { user } = useContext(UserContext);

    //set paginate 
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    //config search field
    const [searchValue, setSearchValue] = useState('');

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    const btnActiveModalAddDoc = () => {
        
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
                                    <button className='btn btn-primary mb-3 col-1 add-doc' style={{ paddingRight: "7.1rem" }} onClick={() => btnActiveModalAddDoc()} ><i className="fa fa-plus i-add"></i>Tạo đề xuất</button>
                                </div>
                                <div className="row  mt-2">
                                    <table className="table table-hover table-bordered ">
                                        <thead>
                                            <tr>
                                                <th scope='col'>STT</th>
                                                <th scope="col">Tên đề xuất</th>
                                                <th scope="col">Mô tả đề xuất</th>
                                                <th scope="col">Thời gian gửi</th>
                                                <th scope="col">Trạng thái</th>
                                                <th>Phản hồi</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody className='text-start'>
                                            
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

            {/* <ModalDocument
                active={isShowModalDoc}
                //reset lại data cho modal theo action edit
                inactive={btnInActiveModalAddDoc}
                close={setIsShowModalDoc}
                setActionModalDoc={actionModalDoc}
                assignDataDocEdit={dataDocEdit}
                assignDataDoc={dataDoc}
            /> */}
        </>
    )
}

export default ListPropose