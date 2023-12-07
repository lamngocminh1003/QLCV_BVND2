import React, { useState, useRef, useEffect } from 'react'
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

  const [showNotifiIconBottom, setShowNotifiIconBottom] = useState(false);
  //config detect ref
  const menuRef = useRef();

  const handleClick = () => {

  }

  const clickToShowNotifiIconBottom = () => {
    showNotifiIconBottom ? setShowNotifiIconBottom(false) : setShowNotifiIconBottom(true)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(!menuRef.current.contains(e.target)){
        setShowNotifiIconBottom(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside)

    return() => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  })

  return (
    <>
      <Box className='notifiicon' ref={menuRef} sx={{borderRadius: '0.35rem'}}>
        <div className='notifiicon-header' >
          <Box>
            <IconButton size="large" style={{color: 'white'}} onClick={() => clickToShowNotifiIconBottom()} className={showNotifiIconBottom ? 'active' : ''}>
              <Badge badgeContent={17} color="error">
                  <NotificationsIcon sx={{overflow: 'auto'}}/>
              </Badge>
            </IconButton>
          </Box>
        </div>

        {showNotifiIconBottom ? 
          <>
            <div className='notifiicon-bottom'>
              <div>
                <Box sx={{ height: '91.5vh', overflow: 'auto', transition: 'all 0.5s ease-in-out'}} id="notifiicon-bottom-box">
                  <div>
                    <Typography variant="h5" className='py-2 text-dark' sx={{fontFamily: 'Inter, sans-serif', fontWeight: 'bolder', fontSize: '24.5px', marginLeft: '0.75rem'}}>Thông báo</Typography>
                    <Stack direction="row" sx={{ml: 1.5}} spacing={1}>
                        {/* spacing dùng để giãn cách giữa các chip */}
                        <Chip label="Đề xuất" variant="outlined" onClick={handleClick} />
                        <Chip label="Bàn giao" variant="outlined" onClick={handleClick} />
                        <Chip label="Công việc" variant="outlined" onClick={handleClick} />
                        <Chip label="Thảo luận" variant="outlined" onClick={handleClick} />
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
                  </div>
                </Box>
              </div>
            </div>
          </>
        : 
          null
        }
      </Box>
    </>
  )
}

export default NotifiIcon