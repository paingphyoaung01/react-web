import * as React from 'react'
import { Container, Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
import { FromMeList, logs } from '../../../lib/types/fromme.types'
import * as moment  from 'moment'
import { ToMeList } from '../../../lib/types/tome.types';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    doc: {
        fontSize: "3em"
    }
  }),
);

const timeSeriesList = (logs:Array<logs>) =>{
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

    return <ul> {ui}</ul>
}

export function ShowTracking(props:FromMeList){

    return(
            <Container maxWidth={false}>
            
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Sender Name : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.sender_id.name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Sender Phone : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.sender_mobile}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Sender Address : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.sender_full_address}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography></Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Receiver Name : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.receiver_name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Receiver Phone : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.receiver_mobile}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Receiver Address : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.receiver_full_address}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography></Typography>
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Goods Type : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.goods_type}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Priority : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{(props.service_priority) == 'regular' ? "Regular" : 
                            (props.service_priority) == 'priority' ? 'Priority' : props.service_priority}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Payment Type : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.payment_type_id.name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Service Type : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.service_type_id.name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>COD Amount : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.cod_amount} MMK</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Other Cost : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.other_cost} MMK</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Delivery Charges : </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{props.delivery_charges} MMK</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>{timeSeriesList(props.log)}</Grid>
                </Grid>

            </Container>
    )
    
}