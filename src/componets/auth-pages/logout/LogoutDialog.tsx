import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconKeys, Icons } from '../../Standard UI/Icon';
import { CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton';
import { COLORS } from '../../res/color';

export default function LogoutDialog({cb,state}:{cb:(status:boolean)=>{},state:boolean}) {
  const [open, setOpen] = React.useState(false);

    React.useEffect(()=>{
        setOpen(state)
    })

  const handleClose = (status:boolean) => {
    cb(status)
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title"><Icons name={IconKeys.logout} size={18}/>{" Log out "}</DialogTitle> */}
        <DialogTitle id="alert-dialog-title">{" Logout "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)} color="primary">
            No
          </Button>
          <Button onClick={()=>handleClose(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
