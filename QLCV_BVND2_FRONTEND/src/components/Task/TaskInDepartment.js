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
//modal
import ModalDivineWorkPublic from '../ManageDivineWork/ManageDivineWorkPublic/ModalDivineWorkPublic';
//mui
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
//css
import "./SCSS/Task.scss";
//api

const MemberTask = (props) => {
    return (
        <>
            <div>
                đây là page hiển thị danh sách công việc nội bộ trong phòng khoa
            </div>
        </>
    )
}

export default MemberTask