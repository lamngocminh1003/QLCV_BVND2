import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import ReactPaginate from 'react-paginate';

import ModalProposeReceive from '../ManagePropose/ModalProposeReceive';
import "./ListPropose.scss";

import moment from 'moment';
import { Button } from '@mui/material';

import {Box, Typography} from "@mui/material";
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';

import { getProposeReceive } from '../../services/proposeService';
import { toast } from 'react-toastify';

const ListPropose = () => {
    const { user } = useContext(UserContext);

    //config default number propose to display in gridview
    const [pageSize, setPageSize] = useState(10);

    //config datagrid columns name
    const columns = [
        {field: "document_Incomming_Id", headerName: "STT", width: 100},
        {field: "document_Incomming_Title", headerName: "Tên đề xuất", width: 300},
        {field: "document_Incomming_Content", headerName: "Nội dung đề xuất", width: 427},
        {field: "document_Incomming_UserSend_FullName", headerName: "Người gửi", width: 180},
        {field: "document_Incomming_Time", headerName: "Thời gian gửi", width: 180, valueFormatter: (params) => moment(params.value).format('llll')},
        {field: "document_Incomming_State", headerName: "Trạng thái", width: 115, renderCell: (params) => {
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

    //config search field
    const [searchValue, setSearchValue] = useState('');

    //config modal propose
    const [showModalPropose, setShowModalPropose] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [dataModalPropose, setDataModalPropose] = useState({});
    const [done, setDone] = useState(false);

    const btnInfo = (itemListPropose) => {
        setActionModal("INFO");
        setDataModalPropose(itemListPropose);
        setShowModalPropose(true);
    }

    const fetchAllPropose = async () => {
        let resultListPropose = await getProposeReceive();
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
                                    <h3 className="row text-primary text-uppercase mb-2">Đề xuất nhận</h3>
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

                            <div className="row mt-4">
                                <Box className="px-0 py-0" sx={{ height: 666, width: '100%' }}>
                                    <DataGrid
                                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                        rows={listPropose} 
                                        fontSize="1.5rem"
                                        columns={columns} 
                                        components={{Toolbar: GridToolbar}}
                                        //autoPageSize={true}
                                        pagination={true}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
                                        getRowId={(row) => row.document_Incomming_Id}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <table className="table table-hover table-bordered ">
                                        <thead>
                                            <tr>
                                                <th scope='col'>STT</th>
                                                <th scope="col">Tên đề xuất</th>
                                                <th scope="col">Nội dung đề xuất</th>
                                                <th scope="col">Người gửi</th>
                                                <th scope="col">Thời gian gửi</th>
                                                <th scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>

                                        <tbody className='text-start'>
                                            {listPropose.map((itemListPropose, indexListPropose) => {
                                                return(
                                                    <tr key={`row-${indexListPropose}`} style={{cursor: 'pointer'}} onClick={() => btnInfo(itemListPropose)}>
                                                        <td className='align-middle'>{indexListPropose+1}</td>
                                                        <td style={{width: '24%'}} className='align-middle'><button className='title-doc text-start'>{itemListPropose.document_Incomming_Title}</button></td>
                                                        <td style={{width: '24%'}} className='align-middle'>{itemListPropose.document_Incomming_Content}</td>
                                                        <td style={{width: '16%'}} className='align-middle'>{itemListPropose.document_Incomming_UserSend_FullName}</td>
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
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
            </table> */}

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

export default ListPropose
