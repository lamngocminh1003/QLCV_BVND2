import React, { useState } from 'react'
import { Box } from '@mui/material';
//notifi icon
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
//notifi icon bottom app bar
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
//css
import './NotifiIcon.scss';

function NotifiIcon() {

  const dataNotifi = [
    {
      id: 1,
      department: 'Khoa hô hấp 1',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis commodo nibh quis dapibus. Nam nec ipsum justo. In iaculis elementum risus nec molestie. Quisque mauris tellus, cursus non mauris eu, porttitor semper augue. Mauris et euismod mauris. Praesent laoreet turpis sit amet congue ultricies. Nunc malesuada tellus sit amet augue pretium ultrices.'
    },
    {
      id: 2,
      department: 'Khoa hô hấp 2',
      message: 'Nullam non urna ac tortor molestie lacinia ac a odio. Praesent accumsan rhoncus libero vel aliquam. Suspendisse vitae nisl ante. Vestibulum ornare bibendum interdum. Proin non metus sodales, volutpat magna non, vestibulum enim. Morbi quis volutpat neque.'
    },
    {
      id: 3,
      department: 'Khoa nội',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 4,
      department: 'Khoa tieu hoa',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 5,
      department: 'Khoa nhiễm',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 6,
      department: 'Khoa nhiễm',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis commodo nibh quis dapibus. Nam nec ipsum justo. In iaculis elementum risus nec molestie. Quisque mauris tellus, cursus non mauris eu, porttitor semper augue. Mauris et euismod mauris. Praesent laoreet turpis sit amet congue ultricies. Nunc malesuada tellus sit amet augue pretium ultrices.'
    },
    {
      id: 7,
      department: 'Khoa nhiễm',
      message: 'Nullam non urna ac tortor molestie lacinia ac a odio. Praesent accumsan rhoncus libero vel aliquam. Suspendisse vitae nisl ante. Vestibulum ornare bibendum interdum. Proin non metus sodales, volutpat magna non, vestibulum enim. Morbi quis volutpat neque.'
    },
    {
      id: 8,
      department: 'Khoa nhiễm',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 9,
      department: 'Khoa nhiễm',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 10,
      department: 'Khoa nhiễm',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
  ]

  const [showNotifiIconBottom, setShowNotifiIconBottom] = useState(false);

  const handleClick = () => {

  }

  const clickToShowNotifiIconBottom = () => {
    showNotifiIconBottom ? setShowNotifiIconBottom(false) : setShowNotifiIconBottom(true)
  }

  return (
    <>
      <div className='notifiicon-header'>
        <Box>
          <IconButton size="large" style={{color: 'white'}} onClick={() => clickToShowNotifiIconBottom()} >
            <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{overflow: 'auto'}}/>
            </Badge>
          </IconButton>
        </Box>
      </div>

      {showNotifiIconBottom ? 
        <>
          <div className='notifiicon-bottom'>
            <Box>
              <Paper square sx={{ borderRadius: '0.35rem', width: '360px', backgroundColor: 'white'}}>
                <Typography variant="h5" className='ml-2 py-2 text-dark' sx={{fontFamily: 'Inter, sans-serif', fontWeight: 'bolder', fontSize: '25px'}}>Thông báo</Typography>
                <Stack direction="row" sx={{ml: 1}} spacing={1.5}>
                  {/* spacing dùng để giãn cách giữa các chip */}
                  <Chip label="Đề xuất" variant="outlined" onClick={handleClick} />
                  <Chip label="Bàn giao" variant="outlined" onClick={handleClick} />
                  <Chip label="Công việc" variant="outlined" onClick={handleClick} />
                  <Chip label="chưa biết" variant="outlined" onClick={handleClick} />
                </Stack>
                <List>
                {dataNotifi.map(({ id, department, message }) => (
                  <>
                    <ListItem button>
                      <ListItemText primary={department} secondary={message}/>
                    </ListItem>
                  </>
                ))}
                </List>
              </Paper>
            </Box>
          </div>
        </>
      : 
        <></>
      }
    </>
  )
}

export default NotifiIcon