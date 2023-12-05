import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

import ModalProposeReceive from '../ManagePropose/ModalProposeReceive';
import "./ListPropose.scss";

import moment from 'moment';
import { Button } from '@mui/material';

import {Box, Typography} from "@mui/material";
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';

import { getProposeReceiveOut } from '../../services/proposeService';
import { toast } from 'react-toastify';

function ListProposeReceiveOut() {
  const { user } = useContext(UserContext);

    //config default number propose to display in gridview
    const [pageSize, setPageSize] = useState(10);

    //config datagrid columns name
    const columns = [
        {field: "stt", headerName: "STT", width: 100, valueGetter: (params) => params.row.stt},
        {field: "document_Incomming_Title", headerName: "Tên đề xuất", width: 300},
        {field: "document_Incomming_Content", headerName: "Nội dung đề xuất", width: 400},
        {field: "deparment_NameSend", headerName: "Nơi gửi", width: 220},
        {field: "document_Incomming_Time", headerName: "Thời gian gửi", width: 185, valueFormatter: (params) => moment(params.value).format('llll')},
        {field: "document_Incomming_State", headerName: "Trạng thái", width: 110, renderCell: (params) => {
            if(params.row.document_Incomming_State === 0){
                return(
                    <><span className="status rounded-pill wait">Chờ duyệt</span></>
                )
            }
            else if(params.row.document_Incomming_State === 1){
                return(
                    <><span className="status rounded-pill reject">Từ chối</span></>
                )
            }
            else if(params.row.document_Incomming_State === 2){
                return(
                    <><span className="status rounded-pill edit">Chỉnh sửa</span></>
                )
            }
            else if(params.row.document_Incomming_State === 3){
                return(
                    <><span className="status rounded-pill browse">Đã duyệt</span></>
                )
            }
            else{
                return(
                    <><span className="status rounded-pill move-up">Chuyển lên</span></>
                )
            }
        }}
    ]
    const [listPropose, setListPropose] = useState([]);

    //config modal propose
    const [showModalPropose, setShowModalPropose] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [dataModalPropose, setDataModalPropose] = useState({});
    const [done, setDone] = useState(false);

    const btnInfo = (value) => {
        setActionModal("INFO");
        setDataModalPropose(value);
        setShowModalPropose(true);
    }

    const fetchAllPropose = async () => {
        let resultListPropose = await getProposeReceiveOut();
        if(resultListPropose.length !== 0){
            setListPropose(resultListPropose);
        }
    }

    useEffect(()=> {
        if(done === true){
            fetchAllPropose();
            setDone(false);
        }
        fetchAllPropose();
    }, [done])

    return(
        <>
            <div>
                <div className='table-index'>
                    <div className='container mt-3'>
                        <div className='user-body'>
                            <div className='row mb-2 mt-1'>
                                <div className='col-4'>
                                    <h3 className="row text-primary text-uppercase mb-2">Đề xuất nhận từ phòng khoa</h3>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <Box className="px-0 py-0" sx={{ height: 670, width: '100%' }}>
                                    <DataGrid
                                        style={{fontSize: '14.5px'}}
                                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                        rows={listPropose.map((row, index) => ({
                                            ...row,
                                            stt: index + 1,
                                        }))} 
                                        columns={columns} 
                                        getEstimatedRowHeight={() => 100}
                                        getRowHeight={() => 'auto'}
                                        components={{Toolbar: GridToolbar}}
                                        //autoPageSize={true}
                                        pagination={true}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
                                        getRowId={(row) => row.document_Incomming_Id}
                                        //onRowClick={(value) => btnInfo(value.row)}
                                        onRowDoubleClick={(value) => btnInfo(value.row)}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalProposeReceive
                active={showModalPropose}
                close={setShowModalPropose}
                actionModal={actionModal}
                makeModalDoing={setDone}
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

export default ListProposeReceiveOut