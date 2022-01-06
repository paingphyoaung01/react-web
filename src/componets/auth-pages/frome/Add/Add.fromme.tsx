import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab, Divider, TextField, FormControlLabel, Radio} from "@material-ui/core"
import { makeStyles, Theme } from '@material-ui/core/styles';
import { IconKeys, Icons } from '../../../Standard UI/Icon';
import authContext from '../../../../context/Api.context';
import { getCity,getTownship, cityProps, getCityById, getTownshipByCityId,getTownshipByTownshipId, townshipProps } from '../../../../lib/storage/CityAndTownship';
import Autocomplete from '@material-ui/lab/Autocomplete';
import auth from '../../../../auth/auth';
import { CustomizedInputs, CustomizedPhoneInputs } from '../../../Standard UI/Input/CustomizedInputs';
import { COLORS, Colors, IconColor } from '../../../res/color';
import { CustomizedButton } from '../../../Standard UI/button/CustomizedButton';
import { colors } from 'material-ui/styles';
import { getOrderDeliveryCharges, createOrderAwb, getNameByPhone } from '../../../../lib/api';
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper';
import history from '../../../history';
import { useEffect } from 'react';
const myanmarPhoneNumber = require('myanmar-phonenumber')

export function FromMeAdd(){
    const [state,dispatch] = React.useContext(authContext)
    const CityProps = {
        options: getCity(),
        getOptionLabel: (option: cityProps) => option.name,
    };

    const [selectedCity, setSelectedCity] = React.useState<cityProps|undefined>(auth.getUserCityObj());
    const [selectedTownship, setSelectedTownship] = React.useState<townshipProps | undefined>(auth.getUserTownshipObj());
    const [loadingClose,setLoadingClose] = React.useState(false)
    const [loadingNew,setLoadingNew] = React.useState(false)
    const [selectReceiverCity, setSelectReceiverCity] = React.useState<cityProps|undefined|null>(null);
    const [selectReceiverTownship, setSelectReceiverTownship] = React.useState<townshipProps | undefined|null>(null);

    const [selectReceiverName, setReceiverName] = React.useState("");
    const [selectReceiverPhone, setReceiverPhone] = React.useState("09");
    const [receiverId, setReceiverId] = React.useState(0);
    const [weight, setWegiht] = React.useState(0);
    const [description,setDescription] = React.useState("");
    const [customerReference,setCustomerReference] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState<"parcel"|"document"|string>('parcel');
    const [codAmount,setCodAmount] = React.useState(0);
    const [remark,setRemark] = React.useState("")
    const [deliCharge,setDeliCharge] = React.useState(0)
    const [receiveAmount,setReceiveAmount] = React.useState(0)
    const [receiverFullAddress,setReceiverFullAddress] = React.useState<string>()
    const [creditTerm, setCreditTerm] = React.useState(false)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    const handleReceiverPhone = (phonenumber:string) =>{
        setReceiverPhone(phonenumber)
        if(!state.user_data || !state.user_data.id) return
        const isValid = myanmarPhoneNumber.isValidMMPhoneNumber(phonenumber)
        if(isValid) getReceiver(state.user_data.id,phonenumber)
    }

    const handleChangeShipment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const [priority, setPriority] = React.useState<"priority"|"regular"|string>('regular');
    const handleChangePriority= (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    };

    const [selectedServicePay, setselectedServicePay] = React.useState<"Sender Pay"|"Receiver Pay"|"Special Service"|string>("Sender Pay");
    const handleChangeServicePay = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedServicePay(event.target.value);
    };

    const [selectedServiceTypes, setselectedServiceTypes] = React.useState<"Door to Door"|"Door to Point"|"Door to Car Gate"|string>("Door to Door");
    const handleChangeServiceTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedServiceTypes(event.target.value);
    };


    const getServiceId = () =>{
        if(!state.service_type) return 0
        const service = state.service_type.find(serviceType => serviceType.name == selectedServiceTypes)
        return service?.id || 0
    }

    const getServicePaymentId = () =>{
        if(!state.payment_type) return 0
        const payment = state.payment_type.find(paymentType => paymentType.name == selectedServicePay)
        return payment?.id || 0
    }

    const getCalculateAmout  = async () =>{
        if(!state.user_data || !state.user_data.id  ) return
        if(!selectReceiverTownship || !selectReceiverTownship.id){
            alert("Choose Receiver City & Township")
            return
        }
        if(!selectedTownship || !selectedTownship.id){
            alert("Choose Sender City & Township")
            return
        }
        try {
            const response = await getOrderDeliveryCharges({
                uid:state.user_data.id,
                weight,
                service_priority:priority,
                dest_twsp_id:selectReceiverTownship?.id,
                origin_twsp_id:selectedTownship?.id,
                service_type_id:getServiceId(),
                goods_type:selectedValue,
            })

            setDeliCharge(response)
            calculateReceiveAmount(response)
        } catch (error) {
            alert(error.message)
        }
    }

    const calculateReceiveAmount = (data : any) => {
        var amount = 0
        if(selectedServicePay == "Sender Pay") amount = codAmount
        else if(selectedServicePay == "Receiver Pay") amount = codAmount
        else if(selectedServicePay == "Special Service") amount = codAmount - data
        setReceiveAmount(amount)
    }

    const getReceiver = async (uid:number,receiverMobile:string) =>{
        const receiver = await getNameByPhone(uid,receiverMobile)
        if(receiver.name) setReceiverName(receiver.name)
        if(receiver.id) setReceiverId(receiver.id)
        if(receiver.city_id) setSelectReceiverCity(getCityById(receiver.city_id))
        if(receiver.township_id) setSelectReceiverTownship(getTownshipByTownshipId(receiver.township_id))
        if(receiver.id) return receiver.id
        return
    }

    const addOrderAwb  = async (type : any) =>{
        
        if(!state.user_data || !state.user_data.id || !state.contact_data|| !state.contact_data.id) return
        
        if(!selectReceiverTownship || !selectReceiverTownship.id){
            alert("Choose Receiver City & Township")
            return
        }
        if(!selectedTownship || !selectedCity|| !selectedCity.id ||!selectedTownship.id){
            alert("Choose Sender City & Township")
            return
        }
        if(!selectedTownship || !selectReceiverCity|| !selectReceiverCity.id || !selectedTownship.id){
            alert("Choose Sender City & Township")
            return
        }

        // const receiverId = await getReceiver(state.user_data.id,selectReceiverPhone)
        if(!selectReceiverPhone){
            alert("Invalid receiver moible number")
            return
        }

        if(!selectReceiverName){
            alert("Receiver name is empty")
            return
        }

        // if(!receiverFullAddress){
        //     alert("Receiver Full Address is empty")
        //     return
        // }

        if(deliCharge == 0){
            alert("Please Calculate Delivery Charges")
            return
        }
        
        try {

            if(type === "close") setLoadingClose(true)
            else setLoadingNew(true)

            const response = await createOrderAwb({
                cod_amount:codAmount,
                create_uid:state.user_data.id,
                customer_reference:customerReference,
                delivery_charges:deliCharge,
                description:description,
                dest_city:selectReceiverCity?.id,
                dest_twsp_id:selectReceiverTownship.id,
                goods_type:selectedValue,
                origin_city:selectedCity.id,
                origin_twsp_id:selectedTownship.id,
                payment_type_id:getServicePaymentId(),
                receiver_id:receiverId,
                receiver_mobile:selectReceiverPhone,
                receiver_name:selectReceiverName,
                remark:remark,
                sender_id:state.contact_data.id,
                service_priority:priority,
                service_type_id:getServiceId(),
                weight:weight,
                receiver_full_address:receiverFullAddress
            })
            
            if(response.success){
                if(type === "close") {
                    alert("Awb Create Successful")
                    history.push("/home/fromme")
                } else window.location.reload();
            }
        } catch (error) {
            alert(error.message)
        }
        finally {
            if(type === "close") setLoadingClose(false)
            else setLoadingNew(false)
        }
    }


    return (
        <Container maxWidth={false} style={{marginBottom:50}}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={3} style={{paddingTop: "2%"}}>
                    
                    <CustomizedPaper title="Sender">
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 30,paddingRight:30}}>

                            <Box  flexGrow={1}  display="flex" flexDirection="row"  style={{padding: 20}}>
                                <Icons name={IconKeys.username} size={30} style={{marginRight:10}} />
                                <div style={{width:100}}><Typography>{state.contact_data?state.contact_data.name : ""}</Typography></div>
                            </Box>

                            <Box  flexGrow={1}  display="flex" flexDirection="row" style={{padding: 20}} >
                                <Icons name={IconKeys.phone} size={30} style={{marginRight:10}} />
                                <div style={{width:100}}><Typography>{state.contact_data?state.contact_data.mobile : ""}</Typography></div>
                                {/* <Typography>{state.contact_data?state.contact_data.mobile : ""}</Typography> */}
                            </Box>

                        </Box>

                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding: 20}}>
                            
                            <Box flexGrow={1}  style={{paddingLeft: 30,paddingRight:30}} >
                                <Autocomplete
                                    {...CityProps}
                                    id="City"
                                    defaultValue={auth.getUserCityObj()}
                                    color="secondary"
                                    onChange={(event:any, newValue:any) => {
                                        setSelectedCity(newValue);
                                    }}
                                    renderInput={(params:any) => {
                                        return (
                                            <TextField 
                                                {...params} 
                                                color="secondary"
                                                style={{width:"200px"}} 
                                                autoComplete={false}
                                                label="City"/>
                                        )
                                    }}
                                />
                            </Box>

                            <Box flexGrow={1}  style={{paddingLeft: 30,paddingRight:30}} >
                                { selectedCity &&
                                    <Autocomplete
                                        options={getTownshipByCityId(selectedCity.id)}
                                        id="Township"
                                        getOptionLabel={(option:townshipProps)=>option.name.slice(3)}
                                        color="secondary"
                                        defaultValue={auth.getUserTownshipObj()}
                                        onChange={(event:any, newValue:any) => {
                                            setSelectedTownship(newValue);
                                        }}
                                        renderInput={(params:any) => {
                                            return (
                                                <TextField 
                                                    {...params} 
                                                    color="secondary"
                                                    style={{width:"200px"}}
                                                    autoComplete={false} 
                                                    label="Township"/>
                                            )
                                        }}
                                    />
                                }
                            </Box>

                        </Box>

                    </CustomizedPaper>



                    <CustomizedPaper title="Receiver" >
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 30,paddingRight:30}}>
                            <Box flexGrow={1}   style={{padding: 20}}>
                                <CustomizedInputs
                                    type="text"
                                    value={selectReceiverName}
                                    onChange={e=>setReceiverName(e.target.value)}
                                    inputId="name" 
                                    label="Name" 
                                    containerStyle={{width:"280px",marginBottom:10}}
                                    icon={IconKeys.username} />
                            </Box>

                            <Box flexGrow={1} style={{padding: 20}} >
                                <CustomizedPhoneInputs
                                    type="number"
                                    onChange={e=>handleReceiverPhone(e.target.value)}
                                    inputId="Mobile" 
                                    label="Mobile (09xxxxxxxxx)" 
                                    containerStyle={{width:"280px",marginBottom:10}}
                                    icon={IconKeys.phone} />
                            </Box>
                        </Box>

                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding: 10}}>
                            
                            <Box flexGrow={1}  style={{paddingLeft: 40,paddingRight:30}} >
                                <Autocomplete
                                    {...CityProps}
                                    id="receiver_City"
                                    value={selectReceiverCity}
                                    color="secondary"
                                    autoComplete={false}
                                    onChange={(event:any, newValue:any) => {
                                        setSelectReceiverCity(newValue);
                                    }}
                                    renderInput={(params:any) => {
                                        return (
                                            <TextField 
                                                {...params} 
                                                color="secondary"
                                                style={{width:"250px"}} 
                                                autoComplete="off"
                                                label="City"/>
                                        )
                                    }}
                                />
                            </Box>

                            <Box flexGrow={1}  style={{paddingLeft: 30,paddingRight:30}} >
                                { selectReceiverCity &&
                                    <Autocomplete
                                        options={getTownshipByCityId(selectReceiverCity.id)}
                                        id="receiver_Township"
                                        color="secondary"
                                        value={selectReceiverTownship}
                                        autoComplete={false}
                                        getOptionLabel={(option:townshipProps)=>option.name.slice(3)}
                                        onChange={(event:any, newValue:any) => {
                                            setSelectReceiverTownship(newValue);
                                        }}
                                        renderInput={(params:any) => {
                                            return (
                                                <TextField 
                                                    {...params} 
                                                    color="secondary"
                                                    style={{width:"250px"}} 
                                                    label="Township"/>
                                            )
                                        }}
                                    />
                                }
                            </Box>

                        </Box>

                        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 30,paddingRight:30}}>
                            <Box flexGrow={2}   style={{padding: 20}}>
                                <CustomizedInputs
                                    type="text"
                                    value={receiverFullAddress}
                                    onChange={e=>setReceiverFullAddress(e.target.value)}
                                    inputId="address" 
                                    label="Full Address" 
                                    containerStyle={{width:"500px",marginBottom:10}}
                                    icon={IconKeys.address} />
                            </Box>
                        </Box>    

                    </CustomizedPaper>

                    <CustomizedPaper title="Shipment"  containerStyle={{padding: 40}}>
                        <Box display="flex"  alignItems="center" flexDirection="row" >
                            <Box flexGrow={1} >
                                <CustomizedInputs
                                    type="text"
                                    onChange={e=>setCustomerReference(e.target.value)}
                                    inputId="your ref" 
                                    label="Your Reference" 
                                    containerStyle={{width:"280px"}}
                                    icon={IconKeys.reference} />
                            </Box>
                        </Box>

                        <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:10}}>
                            <Box flexGrow={1}>
                                <FormControlLabel value="parcel" control={
                                    <Radio
                                        checked={selectedValue === 'parcel'}
                                        onChange={handleChangeShipment}
                                        value="parcel"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Parcel' }}
                                    />
                                } label="Parcel" />

                            </Box>
                            <Box flexGrow={1}>
                                <FormControlLabel value="document" control={
                                    <Radio
                                        checked={selectedValue === 'document'}
                                        onChange={handleChangeShipment}
                                        value="document"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Document' }}
                                    />
                                } label="Document" />
                                </Box>
                        </Box>

                        <Box display="flex"  alignItems="center" flexDirection="row" >
                            <Box flexGrow={1} >
                                <CustomizedInputs
                                    type="number"
                                    onChange={e=>setWegiht(parseFloat(String(e.target.value)))}
                                    inputId="your ref" 
                                    label="Weight" 
                                    containerStyle={{width:"280px"}}
                                    endAdornment="Kg"
                                    icon={IconKeys.weight} />
                            </Box>
                            <Box flexGrow={1} >
                                <CustomizedInputs
                                    type="text"
                                    onChange={e=>setDescription(e.target.value)}
                                    inputId="your ref" 
                                    label="Description of goods" 
                                    containerStyle={{width:"280px"}}
                                    icon={IconKeys.description} />
                            </Box>
                        </Box>

                    </CustomizedPaper>

                    <CustomizedPaper title="Service & Payment"  containerStyle={{padding: 40}}>
                        <div><Typography  color="primary"> Service and Payment method is to refer for delivery charges only. </Typography></div>
                        <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:10,borderBottomColor:Colors.WHITE}} borderBottom={1}>
                            <Box flexGrow={1}>
                                <FormControlLabel value="regular" control={
                                    <Radio
                                        checked={priority === 'regular'}
                                        onChange={handleChangePriority}
                                        value="regular"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Regular' }}
                                    />
                                } label="Regular" />

                            </Box>
                            <Box flexGrow={1}>
                                <FormControlLabel value="priority" control={
                                    <Radio
                                        checked={priority === 'priority'}
                                        onChange={handleChangePriority}
                                        value="priority"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Priority' }}
                                    />
                                } label="Priority" />
                                </Box>
                        </Box>


                        <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:20,borderBottomColor:Colors.WHITE}} borderBottom={1}>
                            <Box flexGrow={1}>
                                <FormControlLabel value="Sender Pay" control={
                                    <Radio
                                        checked={selectedServicePay === "Sender Pay"}
                                        onChange={handleChangeServicePay}
                                        value="Sender Pay"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Sender Pay' }}
                                    />
                                } label="Sender Pay" />

                            </Box>
                            <Box flexGrow={1}>
                                <FormControlLabel value="Receiver Pay"control={
                                    <Radio
                                        checked={selectedServicePay === "Receiver Pay"}
                                        onChange={handleChangeServicePay}
                                        value="Receiver Pay"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Receiver Pay' }}
                                    />
                                } label="Receiver Pay" />
                            </Box>
                            { auth.isCreditTermCustomer() && <Box flexGrow={1}>
                                <FormControlLabel value="Special Service"control={
                                    <Radio
                                        checked={selectedServicePay === "Special Service"}
                                        onChange={handleChangeServicePay}
                                        value="Special Service"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Special Service' }}
                                    />
                                } label="Special Service" />
                            </Box>}
                        </Box>

                        <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:20}}>
                            <Box flexGrow={1}>
                                <FormControlLabel value="parcel" control={
                                    <Radio
                                        checked={selectedServiceTypes === "Door to Door"}
                                        onChange={handleChangeServiceTypes}
                                        value="Door to Door"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Door To Door' }}
                                    />
                                } label="Door to Door" />

                            </Box>
                            <Box flexGrow={1}>
                                <FormControlLabel value="Door to Point" control={
                                    <Radio
                                        checked={selectedServiceTypes === "Door to Point"}
                                        onChange={handleChangeServiceTypes}
                                        value="Door to Point"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Door to Point' }}
                                    />
                                } label="Door to Point" />
                            </Box>
                            <Box flexGrow={1}>
                                <FormControlLabel value="Door to Car Gate" control={
                                    <Radio
                                        checked={selectedServiceTypes === "Door to Car Gate"}
                                        onChange={handleChangeServiceTypes}
                                        value="Door to Car Gate"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'Door to Car Gate' }}
                                    />
                                } label="Door to Car Gate" />
                            </Box>
                        </Box>

                    </CustomizedPaper>


                    <CustomizedPaper title="Other" >
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 30,paddingRight:30}}>
                            <Box flexGrow={1}>
                                <CustomizedInputs
                                    type="number"
                                    onChange={e=>setCodAmount(parseInt(e.target.value))}
                                    inputId="name" 
                                    label="Nominal COD" 
                                    containerStyle={{width:"280px"}}
                                    endAdornment="MMK"
                                    icon={IconKeys.nominal} />
                            </Box>

                            <Box flexGrow={1} >
                                <CustomizedInputs
                                    type="text"
                                    onChange={e=>setRemark(e.target.value)}
                                    inputId="name" 
                                    label="Remark" 
                                    containerStyle={{width:"280px"}}
                                    icon={IconKeys.remark} />
                            </Box>
                        </Box>

                    </CustomizedPaper>


                    {/* <CustomizedPaper title="Delievery Charge" >
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 30,paddingRight:30}}>
                            <Box flexGrow={1}>
                                <Typography><b>{deliCharge}</b> MMK</Typography>
                            </Box>

                            <Box flexGrow={1} >
                                <CustomizedButton label="Calculate" onClick={()=>getCalculateAmout()} icon={IconKeys.quote}  />
                            </Box>
                        </Box>

                        { deliCharge > 0 && <Typography> To Receive</Typography> }

                        { deliCharge > 0 && <Typography> 1000 MMK</Typography> }

                        {<Typography style={{fontWeight:"bold", fontSize: 16}} color="primary"> To Receive</Typography> }

                        { <Typography> 1000 MMK</Typography> }

                    </CustomizedPaper> */}

                    <CustomizedPaper>
                        <Box display="flex" flexDirection="row" style={{padding:10}}>
                            <Box style={{width:180}}><Typography><b>Delivery Charges</b></Typography></Box>
                            <Box><Typography align="left"><b>{deliCharge}</b> MMK</Typography></Box>
                        </Box>
                        <Box display="flex" flexDirection="row" style={{padding:10}}>
                            <Box style={{width:180}}><Typography><b>To Receive</b></Typography></Box>
                            <Box><Typography align="left"><b>{receiveAmount}</b> MMK</Typography></Box>
                        </Box>
                        <Box display="flex" flexDirection="row"  style={{padding:10}}>
                            <CustomizedButton label="Calculate" onClick={()=>getCalculateAmout()} icon={IconKeys.quote}  />
                        </Box>
                    </CustomizedPaper>

                    <Box display="flex"  alignItems="center" flexDirection="row" style={{marginTop: 30,marginBottom: 50}}>
                        <Box>
                            <CustomizedButton label="Submit & Close" loading={loadingClose} onClick={()=>addOrderAwb("close")} icon={IconKeys.send}  buttonColor={Colors.THEME_PRIMARY} containerStyle={{width:250,padding:10}} />
                        </Box>
                        <Box>
                            <CustomizedButton label="Submit & Create New" loading={loadingNew} onClick={()=>addOrderAwb("new")} icon={IconKeys.send}  buttonColor={Colors.THEME_PRIMARY} containerStyle={{width:250,padding:10}} />
                        </Box>
                    </Box>
                </Box>
                <Box flexGrow={1} style={{paddingTop: "2%"}} />
            </Box>   
        </Container>
    )
}