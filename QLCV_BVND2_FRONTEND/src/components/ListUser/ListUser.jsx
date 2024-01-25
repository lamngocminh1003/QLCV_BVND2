import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid,
  viVN
} from "@mui/x-data-grid";
import { Box, Switch } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import {getUserInDepartment,updateActiveUser} from '../../services/userService';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

const ListUser = () => {
  const [listUser, setListUser] = useState([]);

  const [departmentHead, setDepartmentHead] = useState([]);

  const [isActive, setIsActive] = useState(false);

  //Gọi API GetUser lấy dữ liệu users  
  const getUserInDepartmentFunc = async() =>{
    let resultListUser = await getUserInDepartment();
    setListUser(resultListUser.users); 
    setDepartmentHead(resultListUser.department_Head);
  }

  useEffect(() =>{
    getUserInDepartmentFunc();
  },[])

  //Xử lý checked/unchecked của Switch button 
  const handleSwitchChange = async (userId, newStatus) => {
    try {
      await updateActiveUser(userId, newStatus);
      // Cập nhật trạng thái của Switch button 
      const updatedListUser = listUser.map(
        user => user.user_Id === userId ? { ...user, user_IsActive: newStatus } : user);
      setListUser(updatedListUser);
      toast.success(`Cập nhật trạng thái thành công`);
    } catch (error) {
      console.error('Có Lỗi Trong Quá Trình Cập Nhật Trạng Thái Người Dùng', error);
    }
  };

  const columns=[
    {
        field: 'user_Id',
        headerName:'STT',
        sortable: false,
        filterable: false,
        headerAlign:'center',
        align:'center',
        valueGetter: (params) => params.row.id, 
    }, 
    
    {
        field: 'user_Fullname',
        headerName: 'TÊN NGƯỜI DÙNG',
        align:'center',
        width:300,
        headerAlign:'center',
        align:'center',
        renderCell: (params) => {
        return(
          <>
            <h3 
                style={{
                cursor:'pointer',
                fontSize:'20px'}}
              >
                <b>{params.row.user_FullName}</b>
            </h3>
          </>
        )
      }
    },
    {
        field: 'user_Email',
        headerName:'EMAIL',
        width:300,
        headerAlign:'center',
        align:'center',
        renderCell: (params) => {
      
        return(
          <>
            <h3
                style={{ 
                cursor:'pointer',
                fontSize:'20px'}}
              >
                <b>{params.row.user_Email}</b>
            </h3>
            
          </>
        )
        
      }
    },
    {
        field:'user_Phone',
        headerName: 'SĐT',
        width:300,
        headerAlign:'center',
        align:'center',
        renderCell: (params) => params.row.user_Phone,
    },
    {
        field:'position_Name',
        headerName:'CHỨC VỤ',
        width:300,
        editable: true,
        headerAlign:'center',
        align:'center',
        renderCell:(params) => params.row.position_Name,
    },
    {
        field: 'user_IsActive',
        headerName:'TRẠNG THÁI',
        width:200,
        headerAlign:'center',
        align:'center',
        renderCell: (params) => {
          if(params.row.user_Id == departmentHead){
            return(
              <>
                <Tooltip title="Không thể tự thay đổi trạng thái của bản thân">
                  <div>
                    <Switch defaultChecked disabled/>
                  </div>
                </Tooltip>
              </>
            )
          }
          return(
            <>
              <Switch 
              checked={params.row.user_IsActive}
              onChange={() => handleSwitchChange(params.row.user_Id, !params.row.user_IsActive)}/>
            </>
            
          )
        
        },

    },
    
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
        fileName: `Danh sách Người dùng`,
        utf8WithBom: true,
      }}
    />
  </GridToolbarContainer>
);
}

  return (
    <>
        <div>
            <div className='container mt-3'>
              <h3 className="text-primary text-uppercase text-center">Danh sách người dùng</h3>
              <Box>
              <Box
                m="0px 100px 0 100px"
                sx={{
                  "& .MuiDataGrid-root": { border: "none" },
                  "& .name-column--cell": { color: "#2e7c67" },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#61dafb",
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
              
                <div style={{height: 600, overflow: "auto"}}>
                    <DataGrid
                        rows={listUser.map((row, index) => ({
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
                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
              </Box>
            </Box>  
          </div>
        </div>
           
    </>
     
    
  )
}

export default ListUser
