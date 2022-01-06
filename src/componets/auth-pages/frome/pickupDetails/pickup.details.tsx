import * as React from 'react'
import { AppContainer, LeftContainer, RightContainer } from '../../../Standard UI/container/Container'
import { Typography, Box, Divider } from '@material-ui/core'
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper'
import { Icons, IconKeys } from '../../../Standard UI/Icon'
import { UserDetailsBox } from '../fromMe.ui'
import history from '../../../history'
import frommeContext from '../../../../context/awb.context'
import {Text} from '../../../Standard UI/Text/Text'
import { Colors } from '../../../res/color'
import { CustomizedButton } from '../../../Standard UI/button/CustomizedButton'
import Button from '@material-ui/core/Button';
import { cancelPickup } from '../../../../lib/api';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as moment from 'moment'

export function PickUpDetails(props:any){
    const [state,dispatch] = React.useContext(frommeContext)
    const [loading,setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [cancelReason, setCancelReason] = React.useState("");
    // const [courierName, setCourierName] = React.useState("");
    // const [courierPhone, setCourierPhone] = React.useState<string|Number|any|boolean|null|undefined>("");

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleConfirm = () => {
        if(cancelReason == "") return
        setLoading(true);
        setOpen(false);
        onsubmit();
    };

    const onsubmit = async () => {
        if(!state.Pickup) return
        const response = await cancelPickup({
            id : state.Pickup.id, 
            reason : cancelReason,
        })

        setLoading(false);

        if(response.success) {
            alert("Pick Cancelled")
            history.push("/home/fromme")
        }else alert(response)
    }

    const setTextValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCancelReason(event.target.value);
    }

    React.useEffect(()=>{
        if(!state||!state.Pickup||!state.Pickup.id) history.push("/home/fromme")
    },[])

    if(!state||!state.Pickup||!state.Pickup.id) return <div />
    const { Pickup } = state

    return(
        <AppContainer>

            <div>
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open form dialog
                </Button> */}
                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Pickup Cancellation</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To cancel this pickup order, please enter your reason here.
                    </DialogContentText>
                    <TextField
                        onChange={setTextValue}
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="Reason"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={ () => setOpen(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <LeftContainer>
                <Box display="flex" flexDirection="row">
                    <Box flexGrow={3}><Typography variant="h5" component="h5">{Pickup.name}</Typography></Box>
                    <Box flexGrow={1}>
                        <Typography variant="h6" component="h6">
                            <Icons name={IconKeys.tag} style={{marginRight:10}} />{Pickup.state}
                        </Typography>
                    </Box>
                </Box>
                <UserDetailsBox 
                    userLabel="Sender"
                    text1={Pickup.customer_name.name}
                    text2={Pickup.customer_phone_no}
                    text3={Pickup.address}   />
                
                <CustomizedPaper>
                    <Box display="flex" flexDirection="row" style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Items</b></Typography></Box>
                        <Box><Typography align="left">{Pickup.items}</Typography></Box>
                    </Box>
                    <Box display="flex" flexDirection="row"  style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Create Date</b></Typography></Box>
                        <Box><Typography align="left">{moment(Pickup.create_date).add(6.5,"hours").format('DD-MM-YYYY hh:mm:ss')}</Typography></Box>
                    </Box>
                    <Box display="flex" flexDirection="row"  style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Estimated Pickup Time</b></Typography></Box>
                        <Box><Typography align="left">{moment(Pickup.time_to_pick).add(6.5,"hours").format('DD-MM-YYYY hh:mm:ss')}</Typography></Box>
                        <Text style={{marginLeft: 8, marginTop: 2 , color:Colors.THEME_SECONDARY, fontSize: 14}}>The Pickup time is considered to our courier activity.</Text>
                    </Box>
                    <Box display="flex" flexDirection="row"  style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Note</b></Typography></Box>
                        <Box><Typography align="left">{Pickup.note}</Typography></Box>
                    </Box>

                </CustomizedPaper>

                { Pickup.state == "accepted" && <UserDetailsBox 
                    userLabel="Courier"
                    text1={Pickup.courier[1]}
                    text2={Pickup.courier[2]}
                /> }

                <CustomizedButton
                    label="Cancel Request"
                    icon={IconKeys.cancel}
                    containerStyle={{width:"40%",marginTop:20}}
                     onClick={()=>handleClickOpen()}
                     buttonColor={Colors.THEME_PRIMARY}
                     loading={loading}
                />
                
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
}