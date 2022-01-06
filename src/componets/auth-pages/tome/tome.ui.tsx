import * as React from 'react'
import { Paper, Box, Typography, Container, Grid } from '@material-ui/core'
import { CircleShape } from '../../Standard UI/shape/shape.ui'
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { Colors, getStatusColor } from '../../res/color'
import * as moment from 'moment'

type ToMeItemProps = {
    no: string | number,
    id: number | string,
    from: number | string | boolean,
    create: string | Date,
    amount: number,
    status: string,
    onClick: Function,
    colorCode: string
}
export function ToMeItem(props: ToMeItemProps) {
    return (
        <Paper elevation={2} style={{ margin: "2%", backgroundColor: Colors.THEME_PRIMARY }} onClick={() => props.onClick()}>
            <Box display="flex" flexDirection="row" alignItems="center" style={{ padding: "2%" }}>
                <CircleShape
                    text={props.no}
                    stylesProps={{ size: "50px", fontWeight: "bold" }} />
                <Box flexGrow={1} flexDirection="column" style={{ paddingLeft: "20px" }}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{"AWB No. " + props.id}</Typography>
                    <Typography>From: {props.from != false ? props.from : ""}</Typography>
                    <Typography>Create Date: {moment(props.create).format("DD-MM-YYYY")}</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Typography><Icons size={15} name={IconKeys.tag} />  {props.amount} MMK</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                align={"right"}
                                style={{ color: getStatusColor(props.colorCode) }}>
                                {props.status}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </Paper>
    )
}