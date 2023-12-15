import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

import ModalProposeSent from '../ManagePropose/ModalProposeSent';

import "./SCSS/ListPropose.scss";

import moment from 'moment';
import { Button } from '@mui/material';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

import { getProposeSend } from '../../services/proposeService';

function ListProposeSent() {
    const { user } = useContext(UserContext);

    //config default number propose to display in gridview
    const [pageSize, setPageSize] = useState(10);

    //config visible column base on employee or manager
    const columnUnVisibilityModel = {
        deparment_NameReceive: true
    }

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        deparment_NameReceive: false
    });

    //config expand document_Incomming_Content
    const ExpandableCell = ({ value }) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <div>
                {expanded ? value : value.slice(0, 100)}&nbsp;
                {value.length > 100 && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <Link
                        type="button"
                        component="button"
                        sx={{ fontSize: 'inherit' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'bớt' : 'thêm'}
                    </Link>
                )}
            </div>
        );
    }

    //config datagrid columns name
    const columns = [
        { field: "stt", headerName: "STT", width: 100, valueGetter: (params) => params.row.stt },
        { field: "document_Incomming_Title", headerName: "Tên đề xuất", width: 205 },
        { field: "document_Incomming_Content", headerName: "Nội dung đề xuất", width: 415, renderCell: (params) => <ExpandableCell {...params} /> },
        { field: "document_Incomming_Time", headerName: "Thời gian gửi", width: 195, valueFormatter: (params) => moment(params.value).format('llll') },
        { field: "deparment_NameReceive", headerName: "Nơi nhận", width: 135 },
        {
            field: "document_Incomming_State", headerName: "Trạng thái", width: 133, renderCell: (params) => {
                if (params.row.document_Incomming_State === 0) {
                    return (
                        <><span className="status rounded-pill wait">Chờ duyệt</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 1) {
                    return (
                        <><span className="status rounded-pill reject">Từ chối</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 2) {
                    return (
                        <><span className="status rounded-pill edit">Chỉnh sửa</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 3) {
                    return (
                        <><span className="status rounded-pill browse">Đã duyệt</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 4) {
                    return (
                        <><span className="status rounded-pill move-up">Chuyển lên</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 5) {
                    return (
                        <><span className="status rounded-pill processing">Đang xử lý...</span></>
                    )
                }
                else if (params.row.document_Incomming_State === 6) {
                    return (
                        <><span className="status rounded-pill processed">Đã xử lý <i className="fa">&#xf00c;</i></span></>
                    )
                }
                else {
                    return (
                        <><span className="status rounded-pill move-up">TH này chưa biết</span></>
                    )
                }
            }
        },
        {
            field: "department_Location", headerName: "Vị trí", width: 135, renderCell: (params) => {
                if (params.row.department_Location === null) {
                    return ("");
                }
                else {
                    return (params.row.department_Location)
                }
            }
        }
    ]

    //config listPropose when useEffect
    const [listPropose, setListPropose] = useState([]);

    //config modal propose sent
    const [showModalPropose, setShowModalPropose] = useState(false);
    const [dataModalPropose, setDataModalPropose] = useState({});
    const [actionModalPropose, setActionModalPropose] = useState('CREATE');
    const [done, setDone] = useState(false);

    const btnActiveModalProposeActionCreate = () => {
        setActionModalPropose('CREATE');
        setShowModalPropose(true);
    }

    const btnActiveModalProposeActionInfo = (itemListPropose) => {
        setDataModalPropose(itemListPropose);
        setActionModalPropose('INFO');
        setShowModalPropose(true);
    }

    const btnEdit = () => {

    }

    const btnDel = () => {

    }

    const btnFeedBack = () => {

    }

    const fetchAllPropose = async () => {
        let resultListPropose = await getProposeSend();
        if (resultListPropose.length !== 0) {
            setListPropose(resultListPropose);
        }
    }

    const setColumnVisible = () => {
        if (user.account.userId === user.account.departmentHead) {
            setColumnVisibilityModel(columnUnVisibilityModel);
        }
    }

    useEffect(() => {
        if (done === true) {
            fetchAllPropose();
            setDone(false);
        }
        fetchAllPropose();
        setColumnVisible();
    }, [done])

    return (
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2'>
                                <div className='col-4'>
                                    <h3 className="row text-primary text-uppercase mb-0">Đề xuất gửi</h3>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className='px-0 col-6' style={{ display: "block" }}>
                                    <button className='btn btn-primary mt-1 mb-3 col-1 add-doc' style={{ paddingRight: "7.1rem" }} onClick={() => btnActiveModalProposeActionCreate()} ><i className="fa fa-plus i-add"></i>Gửi đề xuất</button>
                                </div>
                                <Box className="px-0 py-0 mt-2" sx={{ height: 'auto', width: '100%' }}>
                                    <DataGrid
                                        style={{ fontSize: '15px' }}
                                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                        rows={listPropose.map((row, index) => ({
                                            ...row,
                                            stt: index + 1,
                                        }))}
                                        columns={columns}
                                        columnVisibilityModel={columnVisibilityModel}
                                        getRowHeight={() => 'auto'}
                                        components={{ Toolbar: GridToolbar }}
                                        //autoPageSize={true}
                                        autoHeight={true}
                                        pagination={true}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
                                        getRowId={(row) => row.document_Incomming_Id}
                                        onRowDoubleClick={(value) => btnActiveModalProposeActionInfo(value.row)}
                                        sx={{
                                            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                                                py: '10px',
                                            },
                                            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                                                py: '22px',
                                            },
                                        }}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalProposeSent
                activeModalProposeSent={showModalPropose}
                closeModalProposeSent={setShowModalPropose}
                actionModalProposeSent={actionModalPropose}
                makeModalProposeSentDoing={setDone}
                dataModalProposeSent={dataModalPropose}
            />
        </>
    )
}

export default ListProposeSent