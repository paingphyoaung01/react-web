import * as React from 'react'
import { Box, Typography, Divider, Paper } from "@material-ui/core";
import { QRCode } from 'react-qrcode-logo';
import { ToMeList, toMeLogs } from '../../../../lib/types/tome.types';
import { IconKeys, Icons } from '../../../Standard UI/Icon';
import { Colors } from '../../../res/color';
import { logs } from '../../../../lib/types/fromme.types';
import * as moment from 'moment';

export function QrCodeContainer(props:ToMeList){
    return(
        <Box display="flex"  alignItems="center" flexDirection="row">
                <Box style={{paddingTop: "2%"}}>
                    <QRCode value={props.name} />
                </Box>
                <Box display="flex" flexDirection="column"  style={{paddingTop: "2%",paddingLeft: 50}} >
                    <Box>
                        <Typography variant="h4" component="h4">{props.name} </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="h6">{props.current_status.name.split('] ')[1]}</Typography>
                    </Box>
                </Box>
        </Box>
    )
}

export function SenderContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{marginTop: 30,padding:10}}>
                <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 20}}>
                    <Icons name={IconKeys.username} size={30} />
                    <Typography>Sender</Typography>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box style={{padding: 20}} >
                    <Typography>{props.sender_id.name||""}</Typography>
                    <Typography>{props.sender_mobile}</Typography>
                    <Typography>{props.sender_full_address}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export function ReceiverContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{marginTop: 30,padding:10}}>
                <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 20}}>
                    <Icons name={IconKeys.username} size={30} />
                    <Typography>Receiver</Typography>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box style={{padding: 20}} >
                    <Typography>{props.receiver_id.name||""}</Typography>
                    <Typography>{props.receiver_mobile}</Typography>
                    <Typography>{props.receiver_full_address}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export function CourierContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{marginTop: 30,padding:10}}>
                <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 20}}>
                    <Icons name={IconKeys.username} size={30} />
                    <Typography>Courier</Typography>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box style={{padding: 20}} >
                    <Typography>{props.last_mile_pic_id[0]}</Typography>
                    <Typography>{props.last_mile_pic_id[1]}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}


export function TypesContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{marginTop: 30,padding:10}}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Priority</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.service_priority == 'regular' ? 'Regular' : 'Document'}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Service Type</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.service_type_id.name}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Payment Type</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.payment_type_id.name}</Typography>
                </Box>
        
            </Box>
        </Paper>
    )
}

export function CostContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY,marginTop:30}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Delivery Charges</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.delivery_charges} MMK</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Nominal COD</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.cod_amount} MMK</Typography>
                </Box>
            </Box>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Other Cost</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.other_cost} MMK</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography color={"secondary"}>To Pay</Typography>
                    <Typography color={"secondary"} style={{fontWeight:"bold"}}>
                        { props.payment_type_id.name == "Receiver Pay" ? 
                          props.delivery_charges + props.cod_amount + props.other_cost : props.cod_amount
                        } MMK
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}


export function DescriptionContainer(props:ToMeList){
    return(
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY,marginTop:30}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Goods Description</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.description.length > 0 ? props.description : " ..."}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Goods Weight</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.weight}KG</Typography>
                </Box>
            </Box>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column"  style={{padding: 10}}>
                    <Typography>Remark</Typography>
                    <Typography style={{fontWeight:"bold"}}>{props.remark.length > 0 ? props.remark : " ..."}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export const timeSeriesList = (logs:Array<toMeLogs>) =>{
    let ui:Array<JSX.Element> = []
    logs.map((row,index)=>{
        ui.push(
            <li key={index} >
                <Typography>
                    {  moment(row.updated_on).format("LLL") + "   "}
                    <strong>
                        { 
                            (row.message == "Arrived at") ? row.message +" "+ row.depot : (row.message == "On Transport from") ? row.message +" "+ row.depot : row.message
                        }
                    </strong>
                 </Typography>
            </li>
        )
    })

    return (
        <Paper style={{backgroundColor:Colors.THEME_PRIMARY,marginTop:30}}>
            <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                <ul> {ui}</ul>
            </Box>
        </Paper>)
}