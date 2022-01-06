import * as React from 'react'
import { Paper, Box, Typography, Container, Grid, Divider, Checkbox } from '@material-ui/core'
import { CircleShape } from '../../Standard UI/shape/shape.ui'
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { Colors, IconColor, getStatusColor } from '../../res/color'
import * as moment from 'moment'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { FromMeList, OrdersProps, logs } from '../../../lib/types/fromme.types'
import { QRCode } from 'react-qrcode-logo'
import logo from '../../res/images/ic_beexprss.jpeg'

type FromMeItemProps = {
    no: string | number,
    id: number | string,
    from?: number | string | boolean,
    create: string | Date,
    amount?: number,
    status: string,
    to?: string | boolean,
    estPickup?: string | Date,
    items?: string | number,
    selected?: boolean,
    onCLick?: () => any,
    onDelete?: () => any,
    onSelect?: () => any,
    colorCode: string
}
export function FromMeItem(props: FromMeItemProps) {
    return (
        <Paper elevation={2} style={{ margin: "2%", backgroundColor: Colors.THEME_PRIMARY }} onClick={props.onCLick}>
            <Box display="flex" flexDirection="row" alignItems="center" style={{ padding: "2%" }}>
                <CircleShape
                    text={props.no}
                    stylesProps={{ size: "50px", fontWeight: "bold" }} />
                <Box flexGrow={1} flexDirection="column" style={{ paddingLeft: "20px" }}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{props.id}</Typography>
                    <Typography>To: {props.to != false ? props.to : ""}</Typography>
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


export function OrderItem(props: FromMeItemProps) {
    return (
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: "center" }}>
            <Checkbox
                checked={props.selected ? true : false}
                onChange={(event) => {
                    event.stopPropagation()
                    props.onSelect()
                }}
                style={{ width: 50, height: 50 }}
                {...props.selected}
            />
            <Paper elevation={2} style={{ width: "95%", margin: "2%", backgroundColor: props.selected ? Colors.WHITE : Colors.THEME_PRIMARY }} onClick={props.onCLick}>
                <Box display="flex" flexDirection="row" alignItems="center" style={{ padding: "2%" }}>
                    {/* <div onClick={(event) => {
                        event.stopPropagation()
                        props.onSelect()
                    }}> */}
                    <CircleShape
                        text={props.no}
                        stylesProps={{ size: "50px", fontWeight: "bold" }} />
                    {/* </div> */}
                    <Box flexGrow={1} flexDirection="column" style={{ paddingLeft: "20px" }}>
                        <Grid container spacing={0}>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{props.id}</Typography>
                            </Grid>
                            <Grid item xs={2} direction="row" alignItems="flex-end">
                                <div onClick={(event) => {
                                    event.stopPropagation()
                                    props.onDelete()
                                }}>
                                    <Icons name={IconKeys.trash} size={22} style={{ float: 'right' }} />
                                </div>
                            </Grid>
                        </Grid>
                        <Typography>To: {props.to != false ? props.to : ""}</Typography>
                        <Typography>Created Date : {moment(props.create).add(6.5, "hours").format('DD-MM-YYYY hh:mm:ss')}</Typography>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <Typography><Icons size={15} name={IconKeys.tag} /> COD: {props.amount} MMK</Typography>
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
        </div>
    )
}


export type UserDetailsBoxProps = {
    userLabel: "Sender" | "Receiver" | "Courier" | string,
    text1?: string | number,
    text2?: string | number,
    text3?: string | number,
    text4?: string | number,
}
export function UserDetailsBox(Props: UserDetailsBoxProps) {
    return (
        <CustomizedPaper>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Icons name={IconKeys.username} size={30} />
                    <Typography>{Props.userLabel}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box style={{ padding: 10 }} >
                    <Typography>{Props.text1}</Typography>
                    <Typography>{Props.text2}</Typography>
                    <Typography>{Props.text3}</Typography>
                    <Typography>{Props.text4}</Typography>
                </Box>
            </Box>
        </CustomizedPaper>
    )
}

export function TypesContainer(props: FromMeList | OrdersProps) {
    return (
        <Paper style={{ backgroundColor: Colors.THEME_PRIMARY }}>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ marginTop: 30, padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Typography>Priority</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.service_priority == 'regular' ? 'Regular' : 'Document'}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Typography>Service Type</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.service_type_id.name}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Typography>Payment Type</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.payment_type_id.name}</Typography>
                </Box>

            </Box>
        </Paper>
    )
}


export function ChargesAndCODContainer(props: {
    delivery_charges?: string | number,
    cod_amount?: string | number,
    other_cost?: string | number,
    to_pay?: string | number,
    extra?: boolean
    payment_type_id?: { id: number, name: string },
}) {
    return (
        <Paper style={{ backgroundColor: Colors.THEME_PRIMARY }}>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ marginTop: 30, padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Typography>Delivery Charges</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.delivery_charges || 0} MMK</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <Typography>Nominal COD</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.cod_amount || 0} MMK</Typography>
                </Box>
            </Box>
            {props.extra ?
                <Box display="flex" alignItems="center" flexDirection="row" style={{ marginTop: 30, padding: 10 }}>
                    <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                        <Typography>Other Cost</Typography>
                        <Typography style={{ fontWeight: "bold" }}>{props.other_cost || 0} MMK</Typography>
                    </Box>
                    <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                        <Typography color={"secondary"}>To Receive</Typography>
                        <Typography color={"secondary"} style={{ fontWeight: "bold" }}>
                            {props?.payment_type_id?.name == "Special Service" ?
                                props.cod_amount - (props.delivery_charges + props.other_cost) : props.cod_amount} MMK
                        </Typography>
                    </Box>
                </Box>
                : <span />
            }

        </Paper>
    )
}


export function QrCodeContainer(props: FromMeList | OrdersProps) {
    return (
        <Box display="flex" alignItems="center" flexDirection="row">
            <Box style={{ paddingTop: "2%" }}>
                <QRCode value={props.name} />
            </Box>
            <Box display="flex" flexDirection="column" style={{ paddingTop: "2%", paddingLeft: 50 }} >
                <Box>
                    <Typography variant="h5" component="h5">{props.name} </Typography>
                </Box>
                {props.current_status &&
                    <Box>
                        <Typography variant="h6" component="h6">{props.current_status.name.split('] ')[1]}</Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export function GoodsContainer(props: { description?: string, weight?: string | number, remark?: string }) {
    return (
        <CustomizedPaper>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" >
                    <Typography>Goods Description</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.description ? props.description : " ..."}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" >
                    <Typography>Goods Weight</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.weight || 0}KG</Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" >
                    <Typography>Remark</Typography>
                    <Typography style={{ fontWeight: "bold" }}>{props.remark ? props.remark : " ..."}</Typography>
                </Box>
            </Box>
        </CustomizedPaper>
    )
}

export function PickUpItem(props: FromMeItemProps) {
    const create = moment(props.create).add(6.5, "hours").format('DD-MM-YYYY hh:mm:ss')
    const estPickup = moment(props.estPickup).add(6.5, "hours").format('DD-MM-YYYY hh:mm:ss')
    return (
        <Paper elevation={2} style={{ margin: "2%", backgroundColor: Colors.THEME_PRIMARY }} onClick={props.onCLick}>
            <Box display="flex" flexDirection="row" alignItems="center" style={{ padding: "2%" }}>
                <CircleShape
                    text={props.no}
                    stylesProps={{ size: "50px", fontWeight: "bold" }} />
                <Box flexGrow={1} flexDirection="column" style={{ paddingLeft: "20px" }}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{props.id}</Typography>
                    <Typography>Create Date : {create}</Typography>
                    <Typography>Estd PickUp : {estPickup}</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Typography> Items:  {props.items}</Typography>
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

export const TimeSeriesList = ({ log }: { log: Array<logs> }) => {
    let ui: Array<JSX.Element> = []
    log.map((row, index) => {
        ui.push(
            <li key={index} >
                <Typography>
                    {moment(row.updated_on).format("LLL") + "   "}
                    <strong>
                        {
                            (row.message == "Arrived at") ? row.message + " " + row.depot : (row.message == "On Transport from") ? row.message + " " + row.depot : row.message
                        }
                    </strong>
                </Typography>
            </li>
        )
    })

    return (
        <Paper style={{ backgroundColor: Colors.THEME_PRIMARY, marginTop: 30 }}>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ padding: 10 }}>
                <ul> {ui}</ul>
            </Box>
        </Paper>)
}


export function PrintContainer(props: { order: OrdersProps }) {
    return (
        <Paper style={{ backgroundColor: Colors.WHITE, padding: 16, margin: 32 }}>
            <Typography style={{ fontWeight: "bold", paddingLeft: 16, paddingTop: 32 }}> Created Date : {moment(props.order.create_date).add(6.5, "hours").format('DD-MM-YYYY hh:mm:ss')} </Typography>
            <Box display="flex" alignItems="center" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <img src={logo} style={{ width: 150, height: 150, margin: "0 auto" }} />
                    <Typography style={{ fontWeight: "bold" }}> www.beexprss.com</Typography>
                    <Typography style={{ fontWeight: "bold" }}>09 977 835553</Typography>
                </Box>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" style={{ padding: 10 }}>
                    <QRCode value={props.order.display_name} />
                    <Typography style={{ fontWeight: "bold" }}>{props.order.display_name} </Typography>
                </Box>
            </Box>
            <Typography style={{ paddingLeft: 16 }}> Customer Reference : {props.order.customer_reference} </Typography>
            <Box display="flex" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" flexGrow={1} flexDirection="column" style={{ padding: 10 }}>
                    <Typography style={{ fontWeight: "bold" }}> Receiver : {props.order.receiver_name} </Typography>
                    <Typography style={{ fontWeight: "bold" }}> {props.order.receiver_full_address} </Typography>
                    <Typography> Phone : {props.order.receiver_mobile}</Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" style={{ padding: 10 }}>
                    <Typography style={{ fontWeight: "bold" }}> Sender : {props.order.sender_id.name} </Typography>
                    <Typography style={{ fontWeight: "bold" }}> {props.order.sender_full_address} </Typography>
                    <Typography> Phone : {props.order.sender_mobile}</Typography>
                </Box>
            </Box>

            <div style={{ backgroundColor: "grey", height: 1, marginLeft: 8, marginRight: 8 }}></div>

            <Box display="flex" flexDirection="row">
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Origin </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Transit</Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Destination </Typography>
                </Box>
            </Box>

            <Box display="flex" flexDirection="row">
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> {props.order.origin_twsp_id.name.split("] ")[1]} </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> - </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> {props.order.dest_twsp_id.name.split("] ")[1]} </Typography>
                </Box>
            </Box>

            <div style={{ backgroundColor: "grey", height: 1, marginLeft: 8, marginRight: 8 }}></div>

            <Typography style={{ paddingLeft: 16, marginTop: 16 }}> Consignment : {props.order.weight} kg</Typography>
            <Typography style={{ paddingLeft: 16 }}> Service & Payment : {props.order.service_type_id.name} & {props.order.payment_type_id.name}</Typography>
            <Typography style={{ paddingLeft: 16 }}> Description : {props.order.description} </Typography>
            <Typography style={{ paddingLeft: 16 }}> Remark : {props.order.remark} </Typography>

            <Box display="flex" flexDirection="row" style={{ padding: 10 }}>
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> COD Amount(MMK) </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Delivery Charges(MMK)</Typography>
                </Box>
                {/* <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Other Cost(MMK) </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> Cash Collect(MMK) </Typography>
                </Box> */}
            </Box>

            <Box display="flex" flexDirection="row">
                <Box display="flex" flexGrow={1} alignItems="center" flexDirection="column" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> {props.order.cod_amount} </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> {props.order.delivery_charges} </Typography>
                </Box>
                {/* <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> {props.order.delivery_charges} </Typography>
                </Box>
                <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center" >
                    <Typography style={{ fontWeight: "bold", alignItems: "center" }}> 1000.0 </Typography>
                </Box> */}
            </Box>


            <Typography style={{ paddingLeft: 16, marginTop: 16 }}> *This document is created automatically by "BeeXprssonline system". For checking consignment status, please visit www.beexprss.com</Typography>
            <Typography style={{ paddingLeft: 16, marginBottom: 32 }}> *Term and condition please check www.beexprss.com. </Typography>

            <div style={{ height: 50 }}></div>
        </Paper >
    )
}


