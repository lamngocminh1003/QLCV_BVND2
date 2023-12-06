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
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
//css
import './NotifiIcon.scss';
import logo from '../../assets/image/logo.png';

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
      department: 'Khoa tiêu hoá',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 5,
      department: 'Khoa nhiễm',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 6,
      department: 'Khoa Liên chuyên khoa (Mắt, Tai Mũi Họng, Răng Hàm Mặt)',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis commodo nibh quis dapibus. Nam nec ipsum justo. In iaculis elementum risus nec molestie. Quisque mauris tellus, cursus non mauris eu, porttitor semper augue. Mauris et euismod mauris. Praesent laoreet turpis sit amet congue ultricies. Nunc malesuada tellus sit amet augue pretium ultrices.'
    },
    {
      id: 7,
      department: 'Khoa Phòng khám Chất lượng cao-Tâm lý',
      message: 'Nullam non urna ac tortor molestie lacinia ac a odio. Praesent accumsan rhoncus libero vel aliquam. Suspendisse vitae nisl ante. Vestibulum ornare bibendum interdum. Proin non metus sodales, volutpat magna non, vestibulum enim. Morbi quis volutpat neque.'
    },
    {
      id: 8,
      department: 'Khoa Dược',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 9,
      department: 'Khoa Hồi sức tích cực - Chống độc',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
    {
      id: 10,
      department: 'Khoa Phẫu Thuật Hồi sức tích cực Tim mạch-Lồng ngực',
      message: 'Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.'
    },
  ]

  const urlImg = 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.benhviennhi.org.vn%2Fnews%2Fdetail%2F5496%2FY-nghia-cua-logo-benh-vien-nhi-dong-2.html&psig=AOvVaw35A7dJ7HtSzHk8cJzoNxmN&ust=1701963144694000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMC9zPiQ-4IDFQAAAAAdAAAAABAY';

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
            <Box sx={{ boxShadow: 2 }}>
              <Paper square sx={{ borderRadius: '0.35rem', width: '360px', backgroundColor: 'white', overflow: 'auto', height: '43rem'}}>
                <Typography variant="h5" className='py-2 text-dark' sx={{fontFamily: 'Inter, sans-serif', fontWeight: 'bolder', fontSize: '24.5px', marginLeft: '0.75rem'}}>Thông báo</Typography>
                <Stack direction="row" sx={{ml: 1.5}} spacing={1}>
                  {/* spacing dùng để giãn cách giữa các chip */}
                  <Chip label="Đề xuất" variant="outlined" onClick={handleClick} />
                  <Chip label="Bàn giao" variant="outlined" onClick={handleClick} />
                  <Chip label="Công việc" variant="outlined" onClick={handleClick} />
                  <Chip label="chưa biết" variant="outlined" onClick={handleClick} />
                </Stack>
                <List>
                {dataNotifi.map(({ id, department, message }) => (
                  <>
                    <ListItem button alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={logo}/>
                      </ListItemAvatar>
                      <ListItemText sx={{marginTop: '0px'}} 
                        primary={<><Typography sx={{ display: 'inline', fontSize: '1.1rem', color: '#000'}}>{`Đề xuất từ ${department}`}</Typography></>} 
                        secondary={<><div className='message-notifi'>{message}</div></>}/>
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