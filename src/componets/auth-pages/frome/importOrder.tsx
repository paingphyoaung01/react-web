import * as React from 'react'
import { FormContainer, AppContainer, LeftContainer, RightContainer } from '../../Standard UI/container/Container'
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper, makeStyles, Grid, Typography, Divider, ThemeProvider, Link, Button } from '@material-ui/core'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper';
import { COLORS, Colors, IconColor } from '../../res/color';
import { createDraftAwbList, getDeliveryChargesList } from '../../../lib/api';
import { CustomizedLinkButton, CustomizedButton } from '../../Standard UI/button/CustomizedButton';
import { Icons, IconKeys } from '../../Standard UI/Icon';
import history from '../../history';
import { RouteProps } from 'react-router';
import { Excel } from '../../../lib/excel/excel';
import { Zip } from '../../../lib/zip/zip';
import { currencyFormat } from '../../../lib/formattor/curencyFormat';
import { colors } from 'material-ui/styles';
import { CreditNoteProps } from '../../../lib/types/creaditNote.types';
import { tabletheme } from '../statement /statement.style';
import * as moment from 'moment'
import { ScrollListener } from '../../listener/ScrollListen'
import frommeContext from '../../../context/awb.context'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        borderColor: Colors.THEME_PRIMARY
    },
});

export function ImportOrder(props: any) {

    const [state, dispatch] = React.useContext(frommeContext)
    const [unableCreate, setUnableCreate] = React.useState(false)
    const [unableCalculate, setUnableCalculate] = React.useState(true)
    const [loadingCreate, setLoadingCreate] = React.useState(false)
    const [loadingCalculate, setLoadingCalculate] = React.useState(false)

    React.useEffect(() => {
        if (!state || !state.ImportOrder) history.push("/home/fromme")
    }, [])

    if (!state || !state.ImportOrder) return <div />
    const { ImportOrder } = state

    const classes = useStyles();

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        if (!ImportOrder) return list
        ImportOrder.map((row, index) => {
            list.push(
                <TableRow key={index}>
                    <TableCell align="center">{_getValidity(row.valid)}</TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.sender_id.name}</TableCell>
                    <TableCell align="center">{row.sender_mobile}</TableCell>
                    <TableCell align="center">{row.origin_city.name}</TableCell>
                    <TableCell align="center">{row.origin_twsp_id.name}</TableCell>
                    <TableCell align="center">{row.receiver_name}</TableCell>
                    <TableCell align="center">{row.receiver_mobile}</TableCell>
                    <TableCell align="center">{row.dest_city.name}</TableCell>
                    <TableCell align="center">{row.dest_twsp_id.name}</TableCell>
                    <TableCell align="center">{row.receiver_full_address}</TableCell>
                    <TableCell align="center">{row.weight}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.service_type_id.name}</TableCell>
                    <TableCell align="center">{row.payment_type_id.name}</TableCell>
                    <TableCell align="center">{row.cod_amount}</TableCell>
                    <TableCell align="center" style={{color: 'blue'}}>{row.delivery_charges}</TableCell>
                    <TableCell align="center">{row.goods_type}</TableCell>
                    <TableCell align="center">{row.service_priority}</TableCell>
                    <TableCell align="center">{row.remark}</TableCell>
                </TableRow>
            )
            //}
        })
        return list
    }

    const _getValidity = (state: string) => {
        switch (state) {
            case "check": return "";
            case "valid": return <Icons name={IconKeys.CheckCircle} style={{ marginRight: 4 }} />;
            case "invalid": return <Icons name={IconKeys.cancel} style={{ marginRight: 4, color: 'red' }} />;
        }
    }

    const _onCalculateDeliveryCharges = async () => {
        setLoadingCalculate(true)
        let isValid = true
        const result = await getDeliveryChargesList(ImportOrder)

        if (result.delivery_data) {
            result.delivery_data.map((row, index) => {
                if (row.delivery_charges > 0) {
                    if (ImportOrder.filter(order => order.id == row.id).length == 1) {
                        ImportOrder.filter(order => order.id == row.id)[0].delivery_charges = row.delivery_charges
                        ImportOrder.filter(order => order.id == row.id)[0].valid = "valid"
                    } else {
                        ImportOrder.filter(order => order.id == row.id).map((row) => {
                            row.delivery_charges = 0
                            row.valid = "invalid"
                        })
                        isValid = false
                    }
                } else {
                    ImportOrder.filter(order => order.id == row.id)[0].delivery_charges = 0
                    ImportOrder.filter(order => order.id == row.id)[0].valid = "invalid"
                    isValid = false
                }

            })
            dispatch({ ImportOrder })
            if (isValid) {
                setUnableCreate(true)
                setUnableCalculate(false)
            }
        }
        setLoadingCalculate(false)
    }

    const _onCreateDraftAwb = async () => {
        setLoadingCreate(true)
        var failedCount = 0
        const result = await createDraftAwbList(ImportOrder)
        if (result) {
            if (result.error) {
                alert(result.error.message)
            } else if (result.temp_awb_data) {
                result.temp_awb_data.map((row: { success: any; id: number; }) => {
                    if (!row.success) {
                        failedCount = failedCount + 1
                        ImportOrder.filter(order => order.id == row.id).map((row) => {
                            row.valid = "invalid"
                        })
                    }
                })
            }
        }

        setLoadingCreate(false)
        setUnableCreate(false)

        if (failedCount == 0) {
            alert("All draft Awbs Successfully Created")
            history.push("/home/fromme")
        } else {
            alert("Failed to create " + failedCount + " records")
        }
    }

    return (
        <FormContainer>
            {/* {!unableCreate && <Button color="primary" style={{ textTransform: "none"}} variant="contained" component="label" onClick={() => _onCalculateDeliveryCharges()}>
                Calculate Delivery Charges
            </Button>}
            {unableCreate && <Button color="primary" style={{ textTransform: "none"}} variant="contained" component="label" onClick={() => _onCreateDraftAwb()}>
                Create Draft AWB
            </Button>} */}

            {unableCalculate && <CustomizedButton
                onClick={() => _onCalculateDeliveryCharges()}
                containerStyle={{ paddingLeft: "40px", paddingRight: "40px" }}
                color={IconColor.DARK_GREY}
                label="Calculate Delivery Charges"
                icon={IconKeys.quote}
                buttonColor={Colors.THEME_PRIMARY}
                loading={loadingCalculate}
            />}
            {unableCreate && <CustomizedButton
                onClick={() => _onCreateDraftAwb()}
                containerStyle={{ paddingLeft: "40px", paddingRight: "40px" }}
                color={IconColor.DARK_GREY}
                label="Create Draft AWB"
                icon={IconKeys.awb}
                buttonColor={Colors.THEME_PRIMARY}
                loading={loadingCreate}
            />}

            <TableContainer component={"div"}>
                <Table className={classes.table} size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>No.</TableCell>
                            <TableCell align="center">Sender Name</TableCell>
                            <TableCell align="center">Sender Mobile</TableCell>
                            <TableCell align="center">Origin City</TableCell>
                            <TableCell align="center">Origin Township</TableCell>
                            <TableCell align="center">Receiver Name</TableCell>
                            <TableCell align="center">Receiver Mobile</TableCell>
                            <TableCell align="center">Destination City</TableCell>
                            <TableCell align="center">Destination Township</TableCell>
                            <TableCell align="center">Receiver Full Address</TableCell>
                            <TableCell align="center">Weight</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Service Type</TableCell>
                            <TableCell align="center">Payment Type</TableCell>
                            <TableCell align="center">COD Amount</TableCell>
                            <TableCell align="center">Delivery Charges</TableCell>
                            <TableCell align="center">Goods Type</TableCell>
                            <TableCell align="center">Service Priority</TableCell>
                            <TableCell align="center">Remark</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody style={{ borderColor: Colors.THEME_PRIMARY }}>
                        {RenderItemList()}
                    </TableBody>
                </Table>
            </TableContainer>
        </FormContainer>
    )
}
