import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconKeys, Icons } from '../../componets/Standard UI/Icon';

export default function DialogInfo(){

  // const [open, setOpen] = React.useState(false);
  // const [message, setMessage] = React.useState("");

  //   React.useEffect(()=>{
  //     console.log("useEffect  ")
  //       setMessage(msg)
  //   })

  // const handleClose = (status:boolean) => {
  //   console.log("handleClose  ")
  //  // cb(status)
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={true}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><Icons name={IconKeys.about} />{"Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {"hello"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> console.log("hello")} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
