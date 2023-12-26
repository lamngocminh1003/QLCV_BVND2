import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
  } from "@mui/x-data-grid";
  import React, { useState, useEffect, useContext } from 'react';
  import { Box } from "@mui/material";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import Button from '@mui/material/Button';
  import Checkbox from '@mui/material/Checkbox';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import Link from '@mui/material/Link';
  import { styled } from '@mui/material/styles';
  import {getListTaskReceiver} from '../../services/docService'
  // import ModalEmployee  from '../ManageDocument/ModalEmployee.js'
  
  const TaskInDepartment = () => {
    function ExpandableCell ({value}){
        const [expanded, setExpanded] = useState(false);
      
        return (
          <div>
            {expanded ? value : value.slice(0, 200)}&nbsp;
            {value.length > 200 && (
              <Link
                type="button"
                component="button"
                sx={{ fontSize: 'inherit', color:'blue' }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Rút gọn' : 'Xem thêm'}
              </Link>
            )}
          </div>
        )
      }
    
    const [isLoading, setIsLoading] = useState(false);
  
    const [isOpenTimeModal, setisOpenTimeModal] = useState(false);
    
    const [dataModal, setDataModal] = useState();
  
    const handleOpenTimeModal = (item) =>{
      console.log('clicked!!!');
    }
  
    const handleCloseTimeModal = () =>{
      setisOpenTimeModal(false);
    }
  
    const handleReload = () => {
      window.location.reload(); // Tải lại trang
    };
  
  
    
    //Fetch data
    const fetchTaskData = async () =>{
  
    }
  
    const data = [
        {
          id:1,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 1',
          description:'Aliquam dapibus, lorem vel mattis aliquet, purus lorem tincidunt mauris, in blandit quam risus sed ipsum. Maecenas non felis venenatis, porta velit quis, consectetur elit. Sed feugiat venenatis nulla, sit amet dictum nulla convallis sit amet.',
          time: '2023-07-05 - 2024-01-01',
          status: 3,
          action: ''
        },
    
        {
          id:2,
          docName: 'Khoa Ngoại Tổng hợp',
          taskName:'Tên công việc 2',
          description:'Aliquam dapibus, lorem vel mattis aliquet, purus lorem tincidunt mauris, in blandit quam risus sed ipsum. Maecenas non felis venenatis, porta velit quis, consectetur elit. Sed feugiat venenatis nulla, sit amet dictum nulla convallis sit amet.',
          time: '2023-07-05 - 2024-01-01',
          status: 'Hoàn thành',
          action: ''
        },
    
        {
          id:3,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 3',
          description:'Aliquam dapibus, lorem vel mattis aliquet, purus lorem tincidunt mauris, in blandit quam risus sed ipsum. Maecenas non felis venenatis, porta velit quis, consectetur elit. Sed feugiat venenatis nulla, sit amet dictum nulla convallis sit amet.',
          time: '2023-07-05 - 2024-01-01',
          status: 3,
          action: ''
        },
    
        {
          id:4,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 4',
          description:'Aliquam dapibus, lorem vel mattis aliquet, purus lorem tincidunt mauris, in blandit quam risus sed ipsum. Maecenas non felis venenatis, porta velit quis, consectetur elit. Sed feugiat venenatis nulla, sit amet dictum nulla convallis sit amet.',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
    
        {
          id:5,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
    
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        },
        {
          id:6,
          docName: 'Khoa Nội',
          taskName:'Tên công việc 5',
          description:'cmkscmlksCn,zjv navlknxzv,nakjvn lznv zm vkzxvnlamv nvldz vnkxzvn,zxvmxv, vz,vn,zvnlznv',
          time: '2023-07-05 - 2024-01-01',
          status: 4,
          action: ''
        }
      ]
  
      const columns=[
        {
            field: 'id',
            headerName:'STT',
            sortable: false,
            filterable: false,
            headerAlign:'center',
            align:'center',
            valueGetter: (params) => params.row.id 
        }, 
        {
            field: 'docName',
            headerName: 'TÊN VĂN BẢN',
            align:'center',
            width:300,
            headerAlign:'center',
            align:'center',
            renderCell: (params) => {
            return(
              <>
                <h3 
                //   onClick={() => handleOnClickDocName(params.row.docName)}
                    style={{
                    color:'blue', 
                    cursor:'pointer',
                    fontSize:'20px'}}
                  >
                    <u>{`${params.row.docName}`}</u>
                </h3>
              </>
            )
          }
        },
        {
            field: 'taskName',
            headerName:'TÊN CÔNG VIỆC',
            width:300,
            headerAlign:'center',
            align:'center',
            renderCell: (params) => {
            return(
              <>
                <h3 
                //   onClick={() => handleOnClickTaskName(params.row.taskName)}
                    style={{
                    color:'blue', 
                    cursor:'pointer',
                    fontSize:'20px'}}
                  >
                    <u>{`${params.row.taskName}`}</u>
                </h3>
              </>
            )
          }
        },
        {
            field:'description',
            headerName: 'NỘI DUNG CÔNG VIỆC',
            width:500,
            headerAlign:'center',
            align:'center',
            renderCell: (params) => <ExpandableCell {...params} />,
        },
        {
            field:'time',
            headerName:'THỜI GIAN THỰC HIỆN',
            width:300,
            editable: true,
            headerAlign:'center',
            align:'center',
            valueGetter: (params) => params.row.time 
          //   renderCell: (params) =>{
          //   return(
          //     <>
          //       <button
          //         onClick={()=>handleOpenTimeModal(params.row.id)}
          //         variant="contained"
          //         title="Thời gian"
          //         className="btn btn-primary"
          //       >
          //         <CalendarMonthIcon />{" "}
          //       </button>
          //     </>
          //   )
          // }
        },
        {
            field: 'status',
            headerName:'TRẠNG THÁI',
            width:300,
            headerAlign:'center',
            align:'center',
            renderCell: (params) =>{
            return(
              <>
                  {`${params.row.status}`== 3 ?
                    <>
                      <span className='status rounded-pill success'>Tiếp nhận</span>
                    </>
                    :
                    <>
                      <span className='status rounded-pill ahead'>Hoàn thành</span>
                    </>} 
              </>
            )
          }
        },
        {
            field: 'action',
            headerName:'THAO TÁC',
            sortable: false,
            filterable: false,
            headerAlign:'center',
            align:'center',
            width:300,
            renderCell: (params) => {
            return (
              <>
                <div>
                  <Checkbox color="success" />
                </div>
                <div>
                  <Button 
                    component="label" 
                    variant="contained" 
                    // onClick={() =>  handleOnClickUpload(params.row.id)}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </div>
              </>
            );
          }
        }
      ]
  
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{
            fileName: `Danh sách công việc`,
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  return (
    <>
      {!isLoading && (
        <>
          <div className="h3 text-center text-primary m-3">
            Danh sách công việc
          </div>
          <Box m="20px" width="100%" height="600" >
            <Box
              m="0px 100px 0 100px"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: "#2e7c67" },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#61dafb",
                  borderBottom: "none",
                },
                '.MuiDataGrid-columnHeaderTitle': { 
                    fontWeight: 'bold !important',
                    overflow: 'visible !important',
                 },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#f2f0f0",
                },
                "& .MuiTablePagination-root ": {
                  display: "none",
                },
                "& .MuiDataGrid-selectedRowCount ": {
                  display: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#0f2922 !important",
                },
              }}
            >
             {data.length > 0 ? ( 
                <DataGrid
                  rows={data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                  }))}
                    columns={columns}
                    getEstimatedRowHeight={() => 50}
                    getRowHeight={() => 'auto'}
                    autoHeight={true}
                    components={{
                    Toolbar: CustomToolbar,
                  }}
                />
               ) : (
                <div className="h6 text-center text-secondary m-3">
                  Vui lòng load lại trang{" "}
                  <button
                    onClick={() => handleReload()}
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-rotate-right"></i> Reload
                  </button>
                </div>
              )} 
            </Box>
          </Box>
        </>
      )}
  
    {/* <ModalEmployee isOpen={isOpenTimeModal} onClose={handleCloseTimeModal} /> */}
    </>
  );
  };
  export default TaskInDepartment;