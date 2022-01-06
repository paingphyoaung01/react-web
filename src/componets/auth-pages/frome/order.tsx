import * as React from 'react'
import { FromMeItem, OrderItem } from './fromMe.ui'
import { orders, deleteDraftAwb } from '../../../lib/api'
import { ExportOrderList, FromMeList, OrdersProps } from '../../../lib/types/fromme.types'
import history from '../../history'
import frommeContext from '../../../context/awb.context'
import { ScrollListener } from '../../listener/ScrollListen'
import { Checkbox, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import readXlsxFile from 'read-excel-file'
import { getCityByName, getTownshipByName } from '../../../lib/storage/CityAndTownship'
import auth from '../../../auth/auth';
import fileExcel from '../../res/files/DraftAWBImport_BeeXprss.xlsx'

export function OrderList() {

    const [items, setItems] = React.useState<Array<OrdersProps>>([])
    const [state, dispatch] = React.useContext(frommeContext)
    const [oneTimeCall, setOneTimeCall] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedRow, setSelectedRow] = React.useState<OrdersProps>()
    const [attachment, setAttachment] = React.useState()
    const [services, setServices] = React.useState(auth.getServiceTypes)
    const [payments, setPayments] = React.useState(auth.getPaymentTypes)
    const [enablePrint, setEnablePrint] = React.useState(false)
    const [selectAll, setSelectAll] = React.useState(false)

    const apiCall = async (page: number) => {
        try {
            const results = await orders(page)
            if (results) {
                setItems([...items, ...results])
            }
            return Promise.resolve(results.length)
        } catch (error) {
            alert(error.messge)
            return Promise.reject()
        } finally {
            setOneTimeCall(true)
        }
    }

    const _onClick = (param: OrdersProps) => {
        dispatch({ Order: param })
        history.push("/home/fromme/OrderDetails")
    }

    const _openDialog = (row: OrdersProps) => {
        setSelectedRow(row)
        setOpenDialog(true)
    }

    const handleConfirm = async () => {
        if (!selectedRow) return
        let ids: number[] = [selectedRow.id]
        try {
            const result = await deleteDraftAwb({ temp_awb_id: ids })
            if (result) {
                if (result.error) alert(result.error)
                else if (result.message) {
                    alert(result.message)
                }
            }
        } catch (error) {
            alert(error.messge)
        } finally {
            window.location.reload();
        }
    }

    const _closeDialog = () => {
        setOpenDialog(false)
    }

    const _onSelect = (row: OrdersProps) => {
        items.filter(item => row.display_name === item.display_name)[0].selected = !items.filter(item => row.display_name === item.display_name)[0].selected
        dispatch({ Order: items })

        if (selectAll) setEnablePrint(true)
        else if (items.filter(item => item.selected == true).length > 0) setEnablePrint(true)
        else setEnablePrint(false)
    }

    const onSelectAll = () => {

        items.map(item => item.selected = !selectAll)
        dispatch({ Order: items })

        if (!selectAll) setEnablePrint(true)
        else setEnablePrint(false)

        setSelectAll(!selectAll)
    }

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        items.map((row, index) => {
            list.push(
                <OrderItem
                    key={index}
                    id={row.name}
                    amount={row.cod_amount}
                    create={row.create_date}
                    to={row.receiver_name}
                    no={index + 1}
                    status={row.state}
                    selected={row.selected}
                    onCLick={() => _onClick(row)}
                    onDelete={() => _openDialog(row)}
                    onSelect={() => _onSelect(row)}
                    colorCode={row.state.split("]")[0].replace("[", "").trim()}
                />
            )
        })
        if (items.length == 0 && oneTimeCall) {
            return [<span key="1" />]
        }
        return list
    }

    const handleChange = async (e) => {
        const files = Array.from(e.target.files);
        e.target.value = null;
        const [file] = files;
        let messages = ""
        var importList: Array<ExportOrderList> = []
        setAttachment(file);

        await readXlsxFile(file).then((data) => {
            data.map(async(rows, index : number) => {
                
                var data: ExportOrderList = {
                    id: rows[0],
                    sender_id: { id: 0, name: rows[1], mobile: rows[2] },
                    sender_mobile: rows[2],
                    origin_city: { id: getCityId(rows[3]), name: rows[3] },
                    origin_twsp_id: { id: getTownshipId(rows[4]), name: rows[4] },
                    receiver_name: rows[5],
                    receiver_mobile: rows[6],
                    dest_city: { id: getCityId(rows[7]), name: rows[7] },
                    dest_twsp_id: { id: getTownshipId(rows[8]), name: rows[8] },
                    receiver_full_address: rows[9],
                    weight: rows[10],
                    description: rows[11],
                    service_type_id: { id: getServiceId(rows[12]), name: rows[12] },
                    payment_type_id: { id: getPaymentId(rows[13]), name: rows[13] },
                    cod_amount: rows[14],
                    delivery_charges: 0,
                    // goods_type: rows[16],
                    // service_priority: rows[17],
                    goods_type: "Parcel",
                    service_priority: "Regular",
                    remark: rows[15] || "",
                    valid: "check"
                }
                let result = await checkData(data)
                if(result != "success" && index > 0){
                    let i = index + 1
                    messages = messages + result + "in row " + i + ".\n"
                }else {
                    importList.push(data)
                }
                
            })
        })

        if(messages != ""){
            alert(messages)
        }else if(importList.length > 1 ){
            importList.shift()
            dispatch({ ImportOrder: importList })
            history.push("/home/fromme/ImportOrder")
        }else {
            alert("No record to create")
        }
        
    };

    const checkData = async (row : ExportOrderList) => {
        if(row.sender_mobile == null || row.sender_mobile == "") return "Please input sender mobile "
        if(row.origin_city?.id <= 0 ) return "Invalid origin city "
        if(row.origin_twsp_id?.id <= 0 ) return "Invalid origin township "
        if(row.receiver_name == null || row.receiver_name == "") return "Please input receiver name "
        if(row.receiver_mobile == null || row.receiver_mobile == "") return "Please input receiver mobile "
        if(row.dest_city?.id <= 0) return "Invalid destination city "
        if(row.dest_twsp_id?.id <= 0) return "Invalid destination township "
        if(row.receiver_full_address == null || row.receiver_full_address == "") return "Please input receiver full address "
        if(row.weight <= 0) return "Weight must be greater than 0 "
        if(row.service_type_id?.id <= 0) return "Invalid service type "
        if(row.payment_type_id?.id <= 0) return "Invalid payment type "
        if(row.goods_type == null || row.goods_type == "") return "Please choose goods type "
        if(row.service_priority == null || row.service_priority == "") return "Please choose service priority "

        return "success"

    }

    const getCityId = (name: string) => {
        return getCityByName(name)?.id || 0
    }

    const getTownshipId = (name: string) => {
        return getTownshipByName(name)?.id || 0
    }

    const getServiceId = (name: string) => {
        if (!services) return 0
        const service = services.find(serviceType => serviceType.name == name)
        return service?.id || 0
    }

    const getPaymentId = (name: string) => {
        if (!payments) return 0
        const payment = payments.find(paymentType => paymentType.name == name)
        return payment?.id || 0
    }

    const handlePrint = () => {
        if (items.filter(row => row.selected == true).length > 0) {
            let selectedRows = items.filter(row => row.selected == true)
           
            dispatch({ OrderList: selectedRows })
            history.push("/home/fromme/PrintOrder")
        }
    }

    React.useEffect(() => {
        apiCall(0)
    }, [])

    return (
        <div>
            <div>
                <Dialog open={openDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{selectedRow?.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this draft AWB ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            No
                        </Button>
                        <Button onClick={() => {
                            _closeDialog()
                            handleConfirm()
                        }} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Grid container spacing={0}>
                <Grid item xs={2}>
                    {items.length > 0 && <Checkbox value={selectAll}
                        onChange={(event) => {
                            event.stopPropagation()
                            onSelectAll()
                        }}
                        style={{ width: 50, height: 50 }}
                    />}
                </Grid>

                <Grid item xs={10} container justify="flex-end" style={{ alignSelf: "center", alignItems: "center" }}>

                    {enablePrint && <Button color="primary" variant="contained" component="label" style={{ marginLeft: 8, marginRight: 8, textTransform: "none" }}>
                        Print
                        <input hidden onClick={() => handlePrint()} />
                    </Button>}

                    <Button color="primary" variant="contained" component="label" style={{ marginLeft: 8, marginRight: 16, textTransform: "none" }}>
                        <a href={fileExcel} download>Download Excel</a>
                    </Button>

                    <Button color="primary" variant="contained" component="label" style={{ marginLeft: 8, marginRight: 16, textTransform: "none" }}>
                        Import Excel
                        <input type="file" hidden 
                            onChange={(e) => handleChange(e)} 
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </Button>

                </Grid>
            </Grid>

            <ScrollListener cb={page => Promise.resolve(0)}>
                {RenderItemList()}
            </ScrollListener>
        </div>
    )
}