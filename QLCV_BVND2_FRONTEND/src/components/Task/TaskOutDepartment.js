import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import ModalProposeReceiveOut from '../ManagePropose/ModalProposeReceiveOut';
import moment from 'moment';
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { getProposeReceiveOut } from '../../services/proposeService';
import { toast } from 'react-toastify';
//progress bar
import CircularProgress from "../ProgressBar/CircularProgressWithLabel";
//api
import { getAllDocSendPublicByUserLogin } from '../../services/docSendService';

function TaskOutDepartment() {
    const [listDocSend, setListDocSend] = useState([]);

    //config default number propose to display in gridview
    const [pageSize, setPageSize] = useState(10);

    //config expand document_Incomming_Content
    const ExpandableCell = ({ value }) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <div>
                {expanded ? value : value.slice(0, 100)}
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
        { field: "document_Send_Title", headerName: "Tên công việc", width: 210 },
        { field: "document_Send_Content", headerName: "Nội dung công việc", width: 400, renderCell: (params) => <ExpandableCell {...params} /> },
        { field: "document_Send_TimeStart", headerName: "Thời hạn xử lý", width: 200, renderCell: (params) => moment(params.row.document_Send_TimeStart).format('l') + ' - ' + moment(params.row.document_Send_Deadline).format('l') },
        { field: "document_Send_Catagory", headerName: "Loại công việc", width: 150 },
        {
            field: "document_Send_State", headerName: "Trạng thái", headerAlign: 'center', width: 155, renderCell: (params) => {
                if (params.row.document_Send_State === 3) {
                    return (
                        <><span className="status rounded-pill processing">Đang thực hiện</span></>
                    )
                }
                else if (params.row.document_Send_State === 4) {
                    return (
                        <><span className="status rounded-pill processed">Đã hoàn thành</span></>
                    )
                }
                else {
                    return (
                        <><span className="status rounded-pill expired">TH này chưa biết</span></>
                    )
                }
            }
        },
        { field: "progress", headerName: "Tiến độ", headerAlign: 'center', width: 100, renderCell: () => { return (<><CircularProgress progressValue={50} /></>) } },
    ]

    const getAllDocSendPublic = async () => {
        let resultListDocSend = await getAllDocSendPublicByUserLogin();
        setListDocSend(resultListDocSend);
    }

    useEffect(() => {
        getAllDocSendPublic();
    }, [])

    return (
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2 mt-1'>
                                <div className='col-4'>
                                    <h3 className="row text-primary text-uppercase mb-2">Công việc ngoại bộ</h3>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <Box className="px-0 py-0 mt-2" sx={{ height: 'auto', width: '100%', '& .center-progress': { justifyContent: 'center!important' } }}>
                                    <DataGrid
                                        style={{ fontSize: '15px' }}
                                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                        rows={listDocSend.map((row, index) => ({
                                            ...row,
                                            stt: index + 1,
                                        }))}
                                        columns={columns}
                                        getRowHeight={() => 'auto'}
                                        getCellClassName={(params) => {
                                            if (params.field === 'progress') {
                                                return 'center-progress';
                                            }
                                            return '';
                                        }}
                                        components={{ Toolbar: GridToolbar }}
                                        //autoPageSize={true}
                                        autoHeight={true}
                                        pagination={true}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
                                        getRowId={(row) => row.document_Send_Id}
                                        // onRowDoubleClick={(value) => btnActiveModalProposeActionInfo(value.row)}
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
        </>
    )
}

export default TaskOutDepartment