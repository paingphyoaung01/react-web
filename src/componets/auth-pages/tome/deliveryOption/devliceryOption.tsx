import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab, makeStyles, Radio, FormControlLabel, TextareaAutosize} from "@material-ui/core"
import { ToMeList } from '../../../../lib/types/tome.types';
import MomentUtils from '@date-io/moment';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import tomeContext from '../../../../context/tome.context';
import history from '../../../history';
import { Colors, IconColor } from '../../../res/color';
import { CustomizedButton } from '../../../Standard UI/button/CustomizedButton';
import { IconKeys, Icons } from '../../../Standard UI/Icon';
import * as moment from 'moment'

import { changeDeliveryInfo,changeDeliveryInfoParam } from '../../../../lib/api';
const useStyles = makeStyles({
    root: {
      marginTop:"10px",
      flexGrow: 1,
      padding:0
    },
  });



export function DeliveryOption(){

    const [state,dispatch] = React.useContext(tomeContext)
    const [loader,setLoader] = React.useState(false)
    const currentDate = new Date()
    const [selectedDate, setDate] = React.useState<string|Date>(currentDate);
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [newAddress,setNewAddress] = React.useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };


      const handleDateAndTime = (date: Date | string|null|any) => {
       setDate( moment(date).toDate())
      };

    React.useEffect(()=>{
        if(state&&!state.id) history.push("/home/tome")
    },[])


    const _onSubmit = async () => {
    
        let dateTime = moment(selectedDate).subtract(6.5, 'hours').format('YYYY-MM-DD HH:mm:ss')
        const param:changeDeliveryInfoParam = {awb_id:state.id}
        if(currentDate != selectedDate) param.new_date = dateTime
        if(newAddress != "") param.receiver_full_address = newAddress

        try {
            setLoader(true)
            const data = await changeDeliveryInfo(param)
            history.push("/home/tome")
        } catch (error) {
            alert(error.message)
        }finally{
            setLoader(false)
        }
    }


    return(
        <Container maxWidth={false} style={{marginBottom:50}}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={3} style={{paddingTop: "2%"}}>
                   
                        <Typography component="h4" variant="h4">
                            AWB No. {state.name||""}
                        </Typography>

                        <Paper style={{padding:30,marginTop:30,backgroundColor:Colors.THEME_PRIMARY}} >
                            <Typography component="h6" variant="h6">
                                {"New delivery date"}
                            </Typography>

                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:10}}>
                                        <Box flexGrow={1} flexDirection="row">
                                            <DatePicker value={selectedDate} onChange={date => handleDateAndTime(date?date:moment())} />                      
                                        </Box>
                                        <Box flexGrow={1}>
                                            <TimePicker value={selectedDate} onChange={date => handleDateAndTime(date?date:moment())} />
                                        </Box>
                                    </Box>
                            </MuiPickersUtilsProvider>
                        </Paper>


                        <Paper style={{padding:30,marginTop:30,backgroundColor:Colors.THEME_PRIMARY}} >
                            <Typography component="h6" variant="h6">
                                {"Delivery option"}
                            </Typography>

                            <Box display="flex" flexDirection="row" alignItems="center" style={{marginTop:10}}>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="best" control={
                                                <Radio
                                                    checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                />
                                            } label="Old Address" />
                                </Box>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="best" control={
                                                <Radio
                                                    checked={selectedValue === 'b'}
                                                    onChange={handleChange}
                                                    value="b"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                />
                                            } label="New Address" />
                                </Box>
                            </Box>
                        </Paper>

                        {
                            selectedValue === "b" &&
                            <Paper style={{padding:30,marginTop:30,backgroundColor:Colors.THEME_PRIMARY}} >
                                <Typography component="h6" variant="h6">
                                    {"New Address"}
                                </Typography>
                                <TextareaAutosize 
                                    style={{width:"100%"}} 
                                    aria-label="minimum height" 
                                    rowsMin={5} 
                                    placeholder="New Address" 
                                    onChange={e=>setNewAddress(e.target.value)}
                                />
                            </Paper>
                        }


                        <Box display="flex" justifyContent="flex-start" style={{marginTop:10}}>
                            <CustomizedButton 
                                loading={loader}
                                onClick={()=>_onSubmit()} 
                                label="Submit" 
                                icon={IconKeys.send}  
                                buttonColor={Colors.THEME_PRIMARY} 
                                color={IconColor.THEME_SECONDARY}
                                containerStyle={{
                                    width:"24%"
                                }}
                            />
                        </Box>
                        

                </Box>

                <Box flexGrow={1} style={{paddingTop: "2%"}} />
            </Box>
            
        </Container>
    )
    
}