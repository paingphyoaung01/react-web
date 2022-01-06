import * as React from 'react'
import { FormContainer, AppContainer, LeftContainer, RightContainer } from '../../Standard UI/container/Container'
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper, Box, makeStyles, Grid, Typography, Divider, ThemeProvider, Link, Button, Chip, Avatar } from '@material-ui/core'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper';
import { Colors, IconColor } from '../../res/color';
import { filterStatement, getCustomerStatement } from '../../../lib/api';
import { StatementProps } from '../../../lib/types/statement.type';
import { CustomizedLinkButton, CustomizedButton } from '../../Standard UI/button/CustomizedButton';
import { Icons, IconKeys } from '../../Standard UI/Icon';
import history from '../../history';
import { RouteProps } from 'react-router';
import {Excel} from '../../../lib/excel/excel';
import { Zip } from '../../../lib/zip/zip';
import { currencyFormat } from '../../../lib/formattor/curencyFormat';
import { colors } from 'material-ui/styles';
import { CreditNoteProps } from '../../../lib/types/creaditNote.types';
import { tabletheme } from './statement.style';
import * as moment from 'moment'
import { ScrollListener } from '../../listener/ScrollListen'
import { StatementsFilter, StatementsFilterBar } from '../../Standard UI/filter/StatementFilter';
import { API_TIMEOUT } from '../../../lib/config'

export interface ChipObject { 
    key : string, 
    value : string
}

const useStyles  = makeStyles({
    table: {
      minWidth: 650,
      borderColor: Colors.THEME_PRIMARY
    },
});

export function Statement() {
    const [statement,setStatement] = React.useState<Array<StatementProps>>([])
    const [total,setTotal] = React.useState<String>()
    const [filterItems, setFilterItems] = React.useState<Array<StatementProps>>([])
    const currentDate = moment().format('YYYY-MM-DD')
    const firstDayOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const [filterFromDate, setFilterFromDate] = React.useState<string | Date>(firstDayOfMonth)
    const [filterToDate, setFilterToDate] = React.useState<string | Date>(currentDate)
    const [chipList, setChipList] = React.useState<Array<ChipObject>>([])
    const [filterMood, setFilterMood] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(false)
    const [openFilter, setOpenFilter] = React.useState(false)
    const [oneTimeCall, setOneTimeCall] = React.useState(true)
    const [filterOneTimeCall, setFilterOneTimeCall] = React.useState(true)

    const apiCall = async (page = 0) =>{
        try {
            const res=  await getCustomerStatement(page)
            
            if(res) {
                getTotal(res, false)
            }
            return Promise.resolve(res.length)   
        } catch (error) {
           alert(error.message)
        } finally {
            setOneTimeCall(false)
        }
    }

    const apiFilterCall = async (page = 0) => {
        try {
            const results = await filterStatement(getRequestData(page))
            if (results.length > 0) {
                //setFilterItems( prev => ([...prev, ...results]))
                getTotal(results, true)
            }
            return Promise.resolve(results.length)
        } catch (error) {
            if(error == "Error: timeout of "+ API_TIMEOUT +"ms exceeded"){
                alert("Exceeded timeout, Please try agian.")
            }
            return Promise.reject()
        } finally {
            setFilterOneTimeCall(false)
        }
    }

    function getTotal(datas : Array<StatementProps>, isFilter : boolean){
        
        datas.map((data,index)=>{
            var net_total = 0;
            var total_amount = 0;
            data.vendor_bill_list.map((row,index)=>{
                total_amount = row.amount_total + total_amount
            })
            net_total =  data.vendor_bill_credit_note_batch_total + data.service_charges 
            net_total =  ( total_amount + data.commission ) - net_total
            data.net_total = currencyFormat(net_total)
        })
        if(isFilter) setFilterItems(prev => ([...prev, ...datas]))
        else setStatement([...statement,...datas])
    }

    React.useEffect(()=>{
        apiCall()
    },[])

    const _onFilter = async () => {
        setFilterMood(true)
        await setFilterItems( prev => ([]) )
        await setOpenFilter(false)
        await setChipList([])
        
        var list : ChipObject[] = []
        if (filterFromDate != "" && filterToDate != "") list.push({ key: "date", value: filterFromDate + " to " + filterToDate })

        setChipList(list)
        apiFilterCall()
    }

    const _onOpenDialog = () => {
        //if (items.length == 0) return
        setOpenFilter(true)
    }

    const _onCloseDialog = () => {
        setOpenFilter(false)
    }

    const renderChipList = () => {
        let list: Array<JSX.Element> = []
        chipList.map((row, index) => {
            list.push(
                <Chip label={row.value}
                    color="primary"
                    style={{ paddingRight: 8, margin: 4 }}
                    avatar={<Avatar> <Icons name={IconKeys.CheckCircle} size={30} /> </Avatar>}
                />
            )
        })
        return list
    }

    const clearFilter = () => {
        setFilterMood(false)
        setChipList([])
        setFilterItems([])
        window.location.reload();
    }

    const getRequestData = (page : number) => {
        return {
            "date_from": filterFromDate,
            "date_to": filterToDate,
            "page": page
        }
    }

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        let data = filterMood ? filterItems : statement
        let firstTime = filterMood ? filterOneTimeCall : oneTimeCall
        data.map((row, index) => {
            list.push(
                <TableRow key={index}>
                    <TableCell>
                        <CustomizedLinkButton 
                            underline 
                            label={row.name} 
                            onClick={()=>history.push("/home/statement/details",row)} 
                            color="info" />
                    </TableCell>
                    
                    <TableCell>
                        <CustomizedLinkButton 
                            underline 
                            label={`Statement Date - ${moment(row.payment_date).format("DD/MM/YYYY")}`}
                            onClick={()=>history.push("/home/statement/details",row)} 
                            color="info" />
                    </TableCell>

                    <TableCell>
                        <CustomizedLinkButton 
                            label={`Total : ${row.net_total}`}
                            onClick={()=>history.push("/home/statement/details",row)} 
                            color="info" />
                    </TableCell>

                    <TableCell>
                        <CustomizedLinkButton 
                            label="Credit Notes"
                            icon={IconKeys.tag}
                            onClick={()=>history.push("/home/statement/credit_notes",row)} 
                            color="info" />
                    </TableCell>

                    <TableCell>
                        <CustomizedLinkButton 
                            label="Attachment"
                            icon={IconKeys.download}
                            onClick={()=>{Zip(row.attachments,row.name.replace("/","_"))}} 
                            color="info" />
                    </TableCell>

                    <TableCell>
                        <CustomizedLinkButton 
                            label={row.batch_state}
                            onClick={()=>history.push("/home/statement/details",row)} 
                            color="secondary" />
                    </TableCell>
                </TableRow>
            )
        })
        if (data.length == 0 && !firstTime) {
            return [<span />]
        }
        return list
    }

    return (
        <AppContainer>
            <LeftContainer>
                {/* <CustomizedPaper title="Customer Statement"> */}
               
                <CustomizedPaper>
                    <StatementsFilter 
                        openFilter = {openFilter}
                        title = "Filter Statement"
                        filterFromDate = {filterFromDate}
                        onChangeFromDate = { (e) => setFilterFromDate(e.target.value) }
                        filterToDate = {filterToDate}
                        onChangeToDate = { (e) => setFilterToDate(e.target.value) }
                        onCloseDialog = { () => _onCloseDialog() }
                        onFilter = { () => _onFilter() }/>

                    <StatementsFilterBar 
                        renderChipList = { () => renderChipList()} 
                        filterMood = {filterMood}
                        clearFilter={ () => clearFilter()}
                        onOpenDialog={ () => _onOpenDialog()}
                        loading = {loading}/>

                    <Table>
                        <TableBody>
                            { !filterMood && <ScrollListener cb={page => apiCall(page)}>
                                {
                                    // statement && statement.map((row,index)=>{
                                    //     return(
                                    //         <TableRow key={index}>
                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     underline 
                                    //                     label={row.name} 
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>
                                                
                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     underline 
                                    //                     label={`Statement Date - ${moment(row.payment_date).format("DD/MM/YYYY")}`}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label={`Total : ${row.net_total}`}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label="Credit Notes"
                                    //                     icon={IconKeys.tag}
                                    //                     onClick={()=>history.push("/home/statement/credit_notes",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label="Attachment"
                                    //                     icon={IconKeys.download}
                                    //                     onClick={()=>{Zip(row.attachments,row.name.replace("/","_"))}} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label={row.batch_state}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="secondary" />
                                    //             </TableCell>
                                    //         </TableRow>
                                    //     )
                                    // })
                                    
                                    RenderItemList()
                                }
                            </ScrollListener> }

                            { filterMood && <ScrollListener cb={page => apiFilterCall(page)}>
                                {
                                    // filterItems && filterItems.map((row,index)=>{
                                    //     return(
                                    //         <TableRow key={index}>
                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     underline 
                                    //                     label={row.name} 
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>
                                                
                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     underline 
                                    //                     label={`Statement Date - ${moment(row.payment_date).format("DD/MM/YYYY")}`}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label={`Total : ${row.net_total}`}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label="Credit Notes"
                                    //                     icon={IconKeys.tag}
                                    //                     onClick={()=>history.push("/home/statement/credit_notes",row)} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label="Attachment"
                                    //                     icon={IconKeys.download}
                                    //                     onClick={()=>{Zip(row.attachments,row.name.replace("/","_"))}} 
                                    //                     color="info" />
                                    //             </TableCell>

                                    //             <TableCell>
                                    //                 <CustomizedLinkButton 
                                    //                     label={row.batch_state}
                                    //                     onClick={()=>history.push("/home/statement/details",row)} 
                                    //                     color="secondary" />
                                    //             </TableCell>
                                    //         </TableRow>
                                    //     )
                                    // })
                                    RenderItemList()
                                }
                            </ScrollListener> }
                        </TableBody>
                    </Table>

                    

                </CustomizedPaper>
            </LeftContainer>
            <RightContainer/>
        </AppContainer>
    )
}

//  filterMood && statement.length == 0 &&
//                         <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="500px">
//                             <Icons name={IconKeys.emptyIcon} color={IconColor.THEME_SECONDARY} size={30} />
//                             {/* <TraceSpinner size={50} loading={true} frontColor={IconColor.THEME_PRIMARY} /> */}
//                             <Typography color="secondary" style={{ marginLeft: 20 }} variant="h6">No record found</Typography>
//                         </Box>
                    

                    //  !filterMood && filterItems.length == 0 && 
                    //     <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="500px">
                    //         <Icons name={IconKeys.emptyIcon} color={IconColor.THEME_SECONDARY} size={30} />
                    //         {/* <TraceSpinner size={50} loading={true} frontColor={IconColor.THEME_PRIMARY} /> */}
                    //         <Typography color="secondary" style={{ marginLeft: 20 }} variant="h6">No record found</Typography>
                    //     </Box>
                    

export function statementDetails(props:any){

    const statementDetails:StatementProps = props.location.state
    const [total,setTotal] = React.useState(0);
    const totalCreditNote  = statementDetails.vendor_bill_credit_note_batch_total || 0;
    const isCommission = statementDetails.commission > 0 ? true : false;
    React.useEffect(()=>{
        if(!statementDetails||!statementDetails.vendor_bill_list) history.push("/home/statement")
    },[])
    if(!statementDetails||!statementDetails.vendor_bill_list) return <div />

    const classes = useStyles();

    const excelFormator = () => {
        const excelDataSet:Array<{}> = []
        statementDetails.vendor_bill_list.map(row=>{
            excelDataSet.push({
                "No.":row.number,         
                "Awb":row.awb_id,        
                "Awb Date":row.awb_created_date,        
                "Receiver Name":row.receiver_id,       
                "Receiver Mobile":row.receiver_mobile, 
                "Receiver Township":row.receiver_township,    
                "Amount":row.amount_total,      
                "Status":row.state,  
            })
        })
        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"",    
            "Amount":"",      
            "Status":"",  
        })
        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"",    
            "Amount":"",      
            "Status":"",  
        })


        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"Vendor Bill Batch Total",    
            "Amount":"",      
            "Status":currencyFormat(total),  
        })

        if(statementDetails.commission>0){
            excelDataSet.push({
                "No.":"",         
                "Awb":"",        
                "Awb Date":"",        
                "Receiver Name":"",       
                "Receiver Mobile":"", 
                "Receiver Township":"Commission",    
                "Amount":"",      
                "Status":currencyFormat(statementDetails.commission),  
            })
        }

        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"Service Charge",    
            "Amount":"",      
            "Status":"-"+currencyFormat(statementDetails.service_charges||0),  
        })
        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"Credit Notes",    
            "Amount":"",      
            "Status":"-"+currencyFormat(statementDetails.vendor_bill_credit_note_batch_total),  
        })
        excelDataSet.push({
            "No.":"",         
            "Awb":"",        
            "Awb Date":"",        
            "Receiver Name":"",       
            "Receiver Mobile":"", 
            "Receiver Township":"Total",    
            "Amount":"",      
            "Status":currencyFormat((total+statementDetails.commission-totalCreditNote)-statementDetails.service_charges)
        })
        return excelDataSet                             
    }

    const RenderItemList = () =>{
        let list:Array<JSX.Element> =[]
        if(!statementDetails) return list
        let totalAmount = 0;
        statementDetails.vendor_bill_list.map((row,index)=>{
            totalAmount += row.amount_total;
            list.push(
                <TableRow key={index}>
                    <TableCell component="th" scope="row">{row.number}</TableCell>
                    <TableCell align="center">{row.awb_id}</TableCell>
                    <TableCell align="center">{row.awb_created_date}</TableCell>
                    <TableCell align="center">{row.receiver_id}</TableCell>
                    <TableCell align="center">{row.receiver_mobile}</TableCell>
                    <TableCell align="center">{row.receiver_township}</TableCell>
                    <TableCell align="center">{row.amount_total}</TableCell>
                    <TableCell align="center">{row.state}</TableCell>
                </TableRow>
            )
        })
        if(totalAmount != total){
            setTotal(totalAmount)
        }
        return list
    }

       
        return(
            <FormContainer>
                <CustomizedPaper 
                    title={props.location.state.name}
                     action={ 
                        <Excel 
                            dataSet={[{sheetName:"Vendor Bills",data:excelFormator()}]}
                            name={statementDetails.name} 
                        >
                            <CustomizedLinkButton 
                                containerStyle={{marginTop:0}}
                                label="Export as Excel"
                                icon={IconKeys.excel}
                                onClick={()=>{}}
                            />
                        </Excel>
                }>
                    <TableContainer component={"div"}>
                        <Table className={classes.table} size="medium">
                            <caption style={{color:"black"}}>

                                <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={4}>
                                        <Typography variant="body2">Vendor Bill Batch Total</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" align="right">{currencyFormat(total)}</Typography>
                                    </Grid>
                                </Grid>

                                {isCommission && <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={4}>
                                        <Typography variant="body2">Commission</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" align="right">{currencyFormat(statementDetails.commission)}</Typography>
                                    </Grid>
                                </Grid>}

                                
                                <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={4}>
                                        <Typography variant="body2">Service Charge</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" align="right">-{currencyFormat(statementDetails.service_charges)}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={4}>
                                        <Typography variant="body2">Credit Note </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" align="right">-{currencyFormat(statementDetails.vendor_bill_credit_note_batch_total||"0")}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={4}>
                                            <Button 
                                                onClick={()=>history.push("/home/statement/credit_notes",statementDetails)}
                                                style={{color:"green",padding:0,textDecoration: "underline"}} color="inherit">
                                                {statementDetails.vd_cn_batch_id}
                                            </Button>
                                    </Grid>
                                </Grid>

                                
                                
                                <Grid container style={{marginBottom:10}} spacing={0} alignItems="flex-end">
                                    <Grid item xs={6} />
                                    <Grid item xs={6}>
                                        <Divider orientation="horizontal" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} alignItems="flex-end">
                                    <Grid item xs={8} />
                                    <Grid item xs={2}>
                                        <Typography>Total</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography align="right">{currencyFormat((total+statementDetails.commission-totalCreditNote)-statementDetails.service_charges)}</Typography>
                                    </Grid>
                                </Grid>
                            </caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell align="center">Awb</TableCell>
                                    <TableCell align="center">Awb Date</TableCell>
                                    <TableCell align="center">Receiver Name</TableCell>
                                    <TableCell align="center">Receiver Mobile</TableCell>
                                    <TableCell align="center">Receiver Township</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{borderColor:Colors.THEME_PRIMARY}}>
                            {RenderItemList()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomizedPaper>
            </FormContainer>
        )
}


export function creditNoteDetails(props:any){

    const statementDetails:StatementProps = props.location.state
    const [total,setTotal] = React.useState(0);
    const [totalCreditNote,setTotalCreditNote] = React.useState(0);

    React.useEffect(()=>{
        if(!statementDetails||!statementDetails.vendor_bill_credit_note_list) history.push("/home/statement")
    },[])
    if(!statementDetails||!statementDetails.vendor_bill_credit_note_list) return <div />

    const classes = useStyles();


    const RenderItemList = () =>{
        let list:Array<JSX.Element> =[]
        if(!statementDetails) return list
        statementDetails.vendor_bill_credit_note_list.map((row,index)=>{
            list.push(
                <TableRow key={index}>
                    <TableCell component="th">{row.awb_id}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.date_invoice}</TableCell>
                    <TableCell align="center">{row.receiver_id}</TableCell>
                    <TableCell align="center">{row.receiver_mobile}</TableCell>
                    <TableCell align="center">{row.receiver_township}</TableCell>
                    <TableCell align="center">{row.cod}</TableCell>
                    <TableCell align="center">{row.other_cost}</TableCell>
                    <TableCell align="center">{row.delivery_charges}</TableCell>
                    <TableCell align="center">{row.amount_total_signed}</TableCell>
                    <TableCell align="center">{row.residual_signed}</TableCell>
                    <TableCell align="center">{row.amount_topay}</TableCell>
                </TableRow>
            )
        })
        return list
    }

    const excelFormator = () => {
        const excelDataSet:Array<{}> = []
        statementDetails.vendor_bill_credit_note_list.map(row=>{
            excelDataSet.push({
                "AWB": row.awb_id,
                "Number": row.number,
                "Invoice Date": row.date_invoice,
                "Reveiver Name": row.receiver_id,
                "Reveiver Mobile": row.receiver_mobile,
                "Reveiver Township": row.receiver_township,
                "COD": row.cod,
                "Other Cost":row.other_cost,
                "Delievery Charges": row.delivery_charges,
                "Total": row.amount_total_signed,
                "AmountDue": row.residual_signed,
                "Amount": row.amount_topay, 
            })
        })
        excelDataSet.push({
            "AWB": "",
            "Number": "",
            "Invoice Date": "",
            "Reveiver Name": "",
            "Reveiver Mobile": "",
            "Reveiver Township": "",
            "COD": "",
            "Other Cost":'' ,
            "Delievery Charges": "",
            "Total": "",
            "AmountDue": "",
            "Amount": "",  
        })
        excelDataSet.push({
            "AWB": "",
            "Number": "",
            "Invoice Date": "",
            "Reveiver Name": "",
            "Reveiver Mobile": "",
            "Reveiver Township": "",
            "COD": "",
            "Other Cost":'' ,
            "Delievery Charges": "",
            "Total": "",
            "AmountDue": "",
            "Amount": "",  
        })


        excelDataSet.push({
            "AWB": "",
            "Number": "",
            "Invoice Date": "",
            "Reveiver Name": "",
            "Reveiver Mobile": "",
            "Reveiver Township": "",
            "COD": "",
            "Other Cost":'' ,
            "Delievery Charges": "",
            "Total": "Total",
            "AmountDue": "",
            "Amount": currencyFormat(statementDetails.vendor_bill_credit_note_batch_total),
        })
        return excelDataSet                             
    }

       
        return(
            <FormContainer>
                <CustomizedPaper 
                    title={statementDetails.vd_cn_batch_id}
                     action={ 
                        <Excel 
                            dataSet={[{sheetName:"Vendor Bills",data:excelFormator()}]}
                            name={statementDetails.name} 
                        >
                            <CustomizedLinkButton 
                                containerStyle={{marginTop:0}}
                                label="Export as Excel"
                                icon={IconKeys.excel}
                                onClick={()=>{}}
                            />
                        </Excel>
                        }
                >
                    <ThemeProvider theme={tabletheme}>
                        <TableContainer component={"div"}>
                            <Table className={classes.table} size="medium">
                                <caption style={{color:"black"}}>
                                    <Grid container spacing={0} alignItems="flex-end">
                                        <Grid item xs={8} />
                                        <Grid item xs={2}>
                                            <Typography>Total</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="right">{currencyFormat(statementDetails.vendor_bill_credit_note_batch_total||0)}</Typography>
                                        </Grid>
                                    </Grid>
                                </caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">AWB</TableCell>
                                        <TableCell align="center">Number</TableCell>
                                        <TableCell align="center">Invoice Date</TableCell>
                                        <TableCell align="center">Receiver Name</TableCell>
                                        <TableCell align="center">Receiver Phone</TableCell>
                                        <TableCell align="center">Receiver Township</TableCell>
                                        <TableCell align="center">COD</TableCell>
                                        <TableCell align="center">Other Cost</TableCell>
                                        <TableCell align="center">Delievery Charges</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                        <TableCell align="center">Amount Due</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{borderColor:Colors.THEME_PRIMARY}}>
                                {RenderItemList()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ThemeProvider>
                </CustomizedPaper>
            </FormContainer>
        )
}