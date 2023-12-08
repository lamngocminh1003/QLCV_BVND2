import React, { useState, useRef, useEffect } from 'react'
import { Box } from '@mui/material';
import moment from 'moment';
//notifi icon
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
//notifi icon bottom app bar
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
//api
import { getProposeReceiveNotification, updateProposeStateSeen } from '../../services/proposeService';
import { getHandOverNotification } from '../../services/handoverService';

function NotifiIcon() {

  const [dataNotification, setDataNotification] = useState([]);
  const [notificationType, setNotificationType] = useState('PROPOSE');

  const [showNotifiIconBottom, setShowNotifiIconBottom] = useState(false);
  //config detect ref
  const menuRef = useRef();

  //config moment render
  moment.updateLocale('vi', {
    relativeTime: {
      d: "1 ngày",
    }
  });

  const clickToShowNotifiIconBottom = () => {
    showNotifiIconBottom ? setShowNotifiIconBottom(false) : setShowNotifiIconBottom(true)
  }

  const getProposeReceiveNotificationFunc = async () => {
    let listProposeNotSeen = await getProposeReceiveNotification();
    if (listProposeNotSeen.length !== 0) {
      setDataNotification(listProposeNotSeen)
    }
  }

  const getHandOverNotificationFunc = async () => {
    let listHandOverNotSeen = await getHandOverNotification();
    console.log(listHandOverNotSeen);
  }

  const updateStateProposeSeen = async (proposeId) => {
    await updateProposeStateSeen(proposeId)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowNotifiIconBottom(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  })

  useEffect(() => {
    if (notificationType === 'PROPOSE') {
      getProposeReceiveNotificationFunc();
    }
    else if (notificationType === 'HANDOVER') {
      getHandOverNotificationFunc();
    }
  }, [notificationType])

  console.log(notificationType)

  return (
    <>
      <Box className='notifiicon' ref={menuRef}>
        <div className='notifiicon-header' >
          <Box>
            <IconButton size="large" style={{ color: 'white' }} onClick={() => clickToShowNotifiIconBottom()} className={showNotifiIconBottom ? 'active' : ''}>
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ overflow: 'auto' }} />
              </Badge>
            </IconButton>
          </Box>
        </div>

        {showNotifiIconBottom ?
          <>
            <div className='notifiicon-bottom'>
              <div id="notifiicon-bottom-box" style={{ overflowY: 'auto', height: '56rem' }}>
                <Typography variant="h5" className='py-2 text-dark' sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bolder', fontSize: '24.5px', marginLeft: '0.75rem' }}>Thông báo</Typography>
                <Stack direction="row" sx={{ ml: 1.5 }} spacing={1}>
                  {/* spacing dùng để giãn cách giữa các chip */}
                  <Badge badgeContent={dataNotification.totalNotification} color="primary">
                    <Chip label="Đề xuất" variant="outlined" onClick={() => setNotificationType('PROPOSE')} />
                  </Badge>
                  <Badge badgeContent={4} color="primary">
                    <Chip label="Bàn giao" variant="outlined" onClick={() => setNotificationType('HANDOVER')} />
                  </Badge>
                  <Badge badgeContent={4} color="primary">
                    <Chip label="Công việc" variant="outlined" onClick={() => setNotificationType('TASK')} />
                  </Badge>
                  <Badge badgeContent={4} color="primary">
                    <Chip label="Thảo luận" variant="outlined" onClick={() => setNotificationType('DISCUSS')} />
                  </Badge>
                </Stack>
                <List>
                  {/* {dataNotification.documents ? "co ton tai data" : "khong ton tai data"} */}
                  {Object.entries(dataNotification.documents).map(([itemKey, itemValue]) => {
                    return (
                      <ListItem button alignItems="flex-start" onClick={() => updateStateProposeSeen(itemValue.document_Incomming_Id)}>
                        <ListItemAvatar>
                          <Avatar alt="Profile Picture" src={logo} />
                        </ListItemAvatar>
                        <ListItemText sx={{ marginTop: '0px' }}
                          primary={<><Typography sx={{ display: 'inline', fontSize: '1.1rem', color: '#000' }}>{itemValue.document_Incomming_UserSend_FullName}</Typography></>}
                          secondary={<>
                            <div className='message-notifi'>
                              <Typography sx={{ fontSize: '15px', color: 'rgb(176, 179, 184', fontFamily: 'Arimo, sans-serif' }}>{`Bạn nhận được đề xuất với tiêu đề: ${itemValue.document_Incomming_Title}`}</Typography>
                            </div>
                            <div>
                              <Typography sx={{ fontSize: '13.5px', color: 'rgb(8, 102, 255)', fontFamily: 'Arimo, sans-serif', pt: 0.15 }}>{moment(itemValue.document_Incomming_Time).startOf().fromNow()}</Typography>
                            </div>
                          </>}
                        />
                      </ListItem>
                    )
                  })}
                </List>
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