
import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core"
import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { login, getCityTownship, checkRegisterPhone, sendVerificationCode } from '../../../lib/api'
import Auth from '../../../auth/auth'
import history from '../../history'
import { AuthContext } from '../../../context/Api.context'
import { LoginStyle } from "../login/login.style"
import VerifyCode from "../../../auth/verifyCode"

export function PhoneNumberConformation(){
    let [phone,setPhone] = React.useState("09")

    const getValidPhoneNumber = () => {
        return phone.replace("09","959")
    }

    const _onSubmit = async () =>{
    
        // var res = phone.substring(0, 2);
        // var mobile = "";
        // if(res == '09' && phone.length > 8 && phone.length < 12) { 
        //     mobile = "95" + phone.substring(1)
        // } else {
        //     alert("Invalid phone number")
        //     return
        // } 

        // try {
        //     const data = await checkRegisterPhone(phone)
        //     const verificationCode = VerifyCode.generateVerifyCode(phone)
        //     const message = "Your authentication code is : " + verificationCode
        //     if(!data.contact_data && !data.user_data) {
        //         await sendVerificationCode({mobile,message})
        //         history.push("/register/verification")
        //     }else{
        //         alert("Invalid Phone Number")
        //     }
        // } catch (error) {
        //     console.log("Error",error)
        // }

        var res = phone.substring(0, 2);

        if(res == '09' && phone.length > 8 && phone.length < 12) { 
            const data = await checkRegisterPhone(phone)
            if(data.contact_data && data.user_data){
                alert("This number has already registered. Please LogIn.")
            } else {
                //let code = Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" +Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10);
                var res = phone.substring(0, 2);
                const code = VerifyCode.generateVerifyCode(phone)
            
                if(res == '09' && phone.length > 8 && phone.length < 12) { 
                    let mobile = "95" + phone.substring(1)
                    let message = "Your authentication code is : " + code
                    const data = await sendVerificationCode({mobile, message})
                    if(data){
                        history.push("/register/verification")
                    }else{
                        alert("Invalid mobile number")
                    }
                } else {
                alert("Please enter the valid format")
                }  
            }
        } else {
        alert("Please enter the valid format")
        } 
    }
    
    function getVerificationCode(){
        
      }

    return(
        <Container maxWidth={false} style={{height:"100%",backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "3%",}}>
                <Paper elevation={2} style={{margin:"10%",paddingBottom:"30px"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>

                    <Box flexDirection="column" justifyContent="center" style={{padding:"10%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={"myanmar"}
                                    fullWidth
                                >
                                    <MenuItem value={"myanmar"}>Myanmar</MenuItem>
                                </Select>
                        </FormControl>
                    </Box>
                    <CustomizedInputs 
                        type="text"
                        value={phone}
                        inputId="regPhone"
                        label="Phone Number"
                        onChange={e=>setPhone(e.target.value)}
                        // startAdornment="+95"
                        onEnter={()=>_onSubmit()}
                    />
                    
                    <Box display="flex" justifyContent="center">
                            <CustomizedButton 
                                onClick={()=>_onSubmit()}
                                containerStyle={{paddingLeft:"40px",paddingRight:"40px"}}
                                color={IconColor.DARK_GREY}
                                label="Continue" 
                                icon={IconKeys.send}
                                buttonColor={Colors.THEME_PRIMARY}  
                            /> 
                    </Box>
                </Paper>
            </Container>
        </Container>
    )
    
}
// export function PhoneNumberConformation(){
//     return(
//         <FormContainer>
//             <Typography variant="h6" component="h6">Sign Up With Mobile</Typography>
//             <Typography variant="subtitle2" component="span">
//                 Make sure you enter the valid phone number so that we can send a verification  code via SMS.
//             </Typography>
//             <FormControl>
//                 <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-autowidth-label"
//                         id="demo-simple-select-autowidth"
//                         value={0}
//                         autoWidth
//                         >
//                         <MenuItem value="">
//                             <em>None</em>
//                         </MenuItem>
//                         <MenuItem value={10}>Ten</MenuItem>
//                         <MenuItem value={20}>Twenty</MenuItem>
//                         <MenuItem value={30}>Thirty</MenuItem>
//                     </Select>
//                 <FormHelperText>Auto width</FormHelperText>
//             </FormControl>
//         </FormContainer>
//     )
// }