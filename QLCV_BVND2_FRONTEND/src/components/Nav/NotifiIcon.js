import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import moment from "moment";
//notifi icon
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
//notifi icon bottom app bar
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
//css
import "./NotifiIcon.scss";
import logo from "../../assets/image/logo.png";
//api
import {
  getProposeReceiveNotification,
  updateProposeStateSeen,
} from "../../services/proposeService";
import { getHandOverNotification } from "../../services/handoverService";

//cdn
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');
</style>

function NotifiIcon() {
  const [dataNotification, setDataNotification] = useState({});
  const [notificationType, setNotificationType] = useState("NOTOPEN");
  const [chipType, setChipType] = useState("UNSET");
  const [chipPropose, setChipPropose] = useState(true);
  const [chipHandOver, setChipHandOver] = useState(false);
  const [showNotifiIconBottom, setShowNotifiIconBottom] = useState(false);
  const [getData, checkGetData] = useState(false);

  //config detect ref
  const menuRef = useRef();

  //config moment render
  moment.updateLocale("vi", {
    relativeTime: {
      d: "1 ngày",
    },
  });

  const clickToShowNotifiIconBottom = () => {
    showNotifiIconBottom ? setShowNotifiIconBottom(false) : setShowNotifiIconBottom(true);
    setNotificationType("PROPOSE");
    setChipType("CHIP PROPOSE");
  };

  const getProposeReceiveNotificationFunc = async () => {
    let listProposeNotSeen = await getProposeReceiveNotification();
    setDataNotification(listProposeNotSeen);
    checkGetData(true);
  };

  const getHandOverNotificationFunc = async () => {
    let listHandOverNotSeen = await getHandOverNotification();
    setDataNotification(listHandOverNotSeen);
    checkGetData(true);
  };

  const updateStateProposeSeen = async (proposeId) => {
    await updateProposeStateSeen(proposeId);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowNotifiIconBottom(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (notificationType === "PROPOSE") {
      getProposeReceiveNotificationFunc();
    } else if (notificationType === "HANDOVER") {
      getHandOverNotificationFunc();
    }
  }, [notificationType]);

  // console.log(Array.isArray(dataNotification))
  // console.log(Object.prototype.toString.call(dataNotification))
  //   color={chipType === "CHIP PROPOSE" ? "secondary" : null} variant={chipType === "CHIP PROPOSE" ? "filled" : "outlined"}
  // color={chipType === "CHIP HANDOVER" ? "secondary" : null} variant={chipType === "CHIP HANDOVER" ? "filled" : "outlined"} 
  //  color={chipType === "CHIP TASK" ? "secondary" : null} variant={chipType === "CHIP TASK" ? "filled" : "outlined"}
  // color={chipType === "CHIP DISCUSS" ? "secondary" : null} variant={chipType === "CHIP DISCUSS" ? "filled" : "outlined"}

  return (
    <>
      <Box className="notifiicon" ref={menuRef}>
        <div className="notifiicon-header">
          <Box>
            <IconButton size="large" style={{ color: "white" }} onClick={() => clickToShowNotifiIconBottom()} className={showNotifiIconBottom ? "active" : ""}>
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </div>

        {/* ẩn, hiện bottom của icon */}
        {showNotifiIconBottom ?
          <div className='notifiicon-bottom'>
            {/* ẩn hiện Skeleton */}
            {getData ?
              <div id="notifiicon-bottom-box" style={{ overflowY: "auto", height: "92vh" }}>
                <div id="notifiicon-bottom-box" style={{ overflowY: "auto", height: "92vh" }}>
                  <Typography variant="h5" className="py-2 text-dark" sx={{ fontFamily: "Inter, sans-serif", fontWeight: "bolder", fontSize: "24.5px", marginLeft: "0.75rem", }}>Thông báo</Typography>
                  <Stack direction="row" sx={{ ml: 1.2, mt: 0.3 }} spacing={1}>
                    {/* spacing dùng để giãn cách giữa các chip */} {/* hiện thông tổng số thông báo */}
                    <Badge badgeContent={dataNotification.totalNotification} color="primary">
                      <Chip color={chipType === "CHIP PROPOSE" ? "secondary" : null} variant={chipType === "CHIP PROPOSE" ? "filled" : "outlined"} label="Đề xuất" onClick={() => [setNotificationType("PROPOSE"), setChipType("CHIP PROPOSE")]} />
                    </Badge>
                    <Badge badgeContent={4} color="primary">
                      <Chip label="Bàn giao" onClick={() => [setNotificationType("HANDOVER"), setChipType("CHIP HANDOVER")]} />
                    </Badge>
                    <Badge badgeContent={4} color="primary">
                      <Chip label="Công việc" onClick={() => [setNotificationType("TASK"), setChipType("CHIP TASK")]} />
                    </Badge>
                    <Badge badgeContent={2} color="primary">
                      <Chip label="Thảo luận" onClick={() => [setNotificationType("DISCUSS"), setChipType("CHIP DISCUSS")]} />
                    </Badge>
                  </Stack >
                  {/* hiện các thông báo phụ thuộc type của chip */}
                  {dataNotification.documents ?
                    <List sx={{ pb: "0px", pl: "4px" }}>
                      {Object.entries(dataNotification.documents).map(([itemKey, itemValue]) => {
                        return (
                          <ListItem button alignItems="flex-start" onClick={() => updateStateProposeSeen(itemValue.document_Incomming_Id)}>
                            <ListItemAvatar><Avatar alt="Profile Picture" src={logo} /></ListItemAvatar>
                            <ListItemText
                              sx={{ marginTop: "0px" }}
                              primary={
                                <>
                                  <Typography
                                    sx={{ display: "inline", fontSize: "1.1rem", color: "#000", }}>
                                    {itemValue.document_Incomming_UserSend_FullName}
                                  </Typography>
                                </>}
                              secondary={
                                <>
                                  <div className="message-notifi">
                                    <Typography sx={{ fontSize: "15px", color: "rgb(176, 179, 184", fontFamily: "Arimo, sans-serif", }}>
                                      {`Bạn nhận được đề xuất với tiêu đề: ${itemValue.document_Incomming_Title}`}</Typography>
                                  </div>
                                  <div>
                                    <Typography sx={{ fontSize: "13.5px", color: "rgb(8, 102, 255)", fontFamily: "Arimo, sans-serif", pt: 0.15, }}>
                                      {moment(itemValue.document_Incomming_Time).startOf().fromNow()}
                                    </Typography>
                                  </div>
                                </>
                              }
                            />
                          </ListItem>
                        )
                      })}
                    </List>
                    :
                    <Box className='mt-3 ml-2 mr-2'>
                      <Typography sx={{ color: "rgb(176, 179, 184", fontFamily: "Arimo, sans-serif" }}>Bạn không có thông báo nào, hãy quay lại sau.</Typography>
                    </Box>
                  }
                </div>
              </div>
              :
              <Stack spacing={1} sx={{ pl: "4px", pt: "5px" }}>
                <Skeleton variant="rectangular" width={160} height={30} />
                <Skeleton variant="rounded" width={350} height={30} />
                <Skeleton variant="rounded" width={350} height={594} />
              </Stack>
            }
          </div>
          :
          null
        }
      </Box>
    </>
  );
}

export default NotifiIcon;
