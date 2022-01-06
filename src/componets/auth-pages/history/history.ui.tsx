import * as React from 'react'
import { Paper, Box, Typography, Container, Grid } from '@material-ui/core'
import { CircleShape } from '../../Standard UI/shape/shape.ui'
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { Colors, getStatusColor } from '../../res/color'
import * as moment from 'moment'

type ItemProps = {
    create:string|Date,
    status:string,
    text?:string,
    colorCode: string
}
export function HistoryItem(props:ItemProps) {
    return (
        <Paper elevation={2} style={{margin:"2%",backgroundColor:Colors.THEME_PRIMARY}}>
            <Box display="flex" flexDirection="row" alignItems="center" style={{padding:"2%"}}>
                <Box flexGrow={1} flexDirection="column" style={{paddingLeft:"20px"}}>
                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>{props.text}</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Typography>{moment(props.create).add(6.5,'hours').format('DD-MMM-YY hh:mm A')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography 
                                align={"right"} 
                                style={{color:getStatusColor(props.colorCode)}}>
                                    {props.status}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

