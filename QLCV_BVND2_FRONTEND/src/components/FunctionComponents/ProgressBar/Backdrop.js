import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop(props) {
    const [progress, setProgress] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        props.setOpen(false);
        setOpen(false)
    };

    React.useEffect(() => {
        setProgress(props.progressValue)
        setOpen(props.open);
    }, [props.progressValue])

    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                <Box>
                    <CircularProgress variant="determinate" value={progress} color="warning" size={60} />
                    <Box sx={{ top: 0, left: 0, bottom: 3, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption" component="div" color="white" fontSize={20}>
                            {`${Math.round(progress)}%`}
                        </Typography>
                    </Box>
                    <Box sx={{ top: 95, left: 10, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: 'center', justifyContent: "center", fontWeight: 'fontWeightLight' }}>
                        <Typography variant="caption" component="div" fontSize={'14.6px'}>Đang tiến hành xử lý, hãy chờ một chút...</Typography>
                    </Box>
                </Box>
            </Backdrop>
        </div>
    );
}
