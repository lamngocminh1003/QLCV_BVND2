import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { fetchAllDepartment, delDepartment } from "../../services/departmentService";
import ModalDelete from './modalDelete';
import ModalDepartment from './ModalDepartment';
import './department.scss';
const Department = (props) => {

    const [listDepartment, setListDepartment] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    //modal xoá
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setdataModal] = useState({});

    //modal department tạo mới/chỉnh sửa
    const [isShowModalDepartment, setIsShowModalDepartment] = useState(false)
    const [actionModalDepartment, setActionModalDepartment] = useState("CREATE");
    const [dataModalDepartment, setdataModalDepartment] = useState({});

    useEffect(() => {
        fetchDepartment();
    }, [currentPage])

    const fetchDepartment = async () => {
        let response = await fetchAllDepartment(currentPage, currentLimit);
        console.log("check res:", response)

        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListDepartment(response.DT.department);

        }
    }
    // Invoke when user click to request another page.
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleXoaDepartment = async (department) => {
        setdataModal(department);
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setdataModal({});
    }

    const confirmDeleteDepartment = async () => {
        let response = await delDepartment(dataModal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchDepartment();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }

    const onHideModalDepartment = async () => {
        setIsShowModalDepartment(false);
        setdataModalDepartment({});
        await fetchDepartment();
    }

    const handleSuaDepartment = (department) => {
        setActionModalDepartment("UPDATE");
        console.log("<<< check data :", department)
        setdataModalDepartment(department);
        setIsShowModalDepartment(true);
    }

    const handleRefesh = async () => {
        await fetchDepartment();
    }

    ///////// PHẦN CODE CỦA GIAO DIỆN DEPARTMENT
    ///////// PHẦN CODE CỦA GIAO DIỆN DEPARTMENT
    ///////// PHẦN CODE CỦA GIAO DIỆN DEPARTMENT
    ///////// PHẦN CODE CỦA GIAO DIỆN DEPARTMENT

    return (
        <>
            <div className='container'>
                <div className="d-flex col-sm-12 col-12 gap-3 py-3">
                    <div className="container container-department mt table-responsive">
                        <div className="title text-center">
                            <h1>Danh sách Phòng Khoa</h1>
                        </div>
                        <div className='action'>
                            {/* nút làm mới */}
                            <button className='btn btn-success refresh'
                                onClick={() => handleRefesh()}>
                                <i className="fa fa-refresh">
                                </i></button>
                            {/* nút thêm */}
                            <button className='btn btn-primary mx-1'
                                onClick={() => {
                                    setIsShowModalDepartment(true);
                                    setActionModalDepartment("CREATE");
                                }
                                }>
                                <i className="fa fa-user-plus"></i>
                            </button>
                        </div>
                        <div className='department-body'>
                            <table className="table table-hover table-bordered">
                                <thead className="table-info">
                                    <tr>
                                        <th scope='col'>STT</th>
                                        <th scope='col'>Mã phòng khoa</th>
                                        <th scope='col'>Tên phòng khoa</th>
                                        <th scope='col'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listDepartment && listDepartment.length > 0 ?
                                            <>
                                                {listDepartment.map((item, index) => {
                                                    return (
                                                        <tr key={'row-${index}'}>
                                                            {/* công thức tính toán số thứ tự */}
                                                            <td> {(currentPage - 1) * currentLimit + index + 1} </td>
                                                            <td> {item.id} </td>
                                                            <td> {item.departmentName} </td>
                                                            {/* <td> {item.users ? item.users : ''} </td> */}
                                                            <td>

                                                                {/* nút chỉnh sửa */}
                                                                <button className='btn btn-warning mx-1' onClick={
                                                                    () => handleSuaDepartment(item)}
                                                                ><i class="fa fa-pencil"></i>
                                                                </button>

                                                                {/* nút xoá */}
                                                                <button className='btn btn-danger mx-1'
                                                                    onClick={() => handleXoaDepartment(item)}
                                                                ><i class="fa fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </>
                                            :
                                            <>
                                                <tr>
                                                    <td>
                                                        hok có hiện list được rùi nha má
                                                    </td>
                                                </tr>
                                            </>
                                    }
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 0 &&
                            <div className='department-footer'>
                                <ReactPaginate
                                    nextLabel=">>>"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="<<<"
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

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteDepartment={confirmDeleteDepartment}
                dataModal={dataModal}
            />
            <ModalDepartment
                onHide={onHideModalDepartment}
                show={isShowModalDepartment}
                action={actionModalDepartment}
                dataModalDepartment={dataModalDepartment}
            />
        </>
    )
}
export default Department;
