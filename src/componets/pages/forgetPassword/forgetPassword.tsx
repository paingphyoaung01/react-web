
import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextareaAutosize, Grid } from "@material-ui/core"
import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs, CustomizedAutoCompleteBox} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { resetPassword, login } from '../../../lib/api'
import Auth from '../../../auth/auth'
import history from '../../history'
import { AuthContext } from '../../../context/Api.context'
import { LoginStyle } from "../login/login.style"
import VerifyCode from "../../../auth/verifyCode"

export function forgetPassword(){

    React.useEffect(()=>{
        if(!VerifyCode.getVerifyPhoneNumber()) history.push("/forgetpassword")
    },[])

    if(!VerifyCode.getVerifyPhoneNumber()) return <div />


    let [phone,setPhone] = React.useState(VerifyCode.getVerifyPhoneNumber())
    let [email,setEmail] = React.useState(VerifyCode.getVerifyEmail())
    let [password,setPassword] = React.useState("")
    let [confirmPassword,setConfirmPassword] = React.useState("")


    const apiCall = async () =>{
        if(!password) {
            alert("Password is empty")
            return
        }
        if(confirmPassword != password) {
            alert("Password do not match")
            return 
        }

        try {
            const data = await resetPassword({
                id:VerifyCode.getVerifyId(),
                new_password:password
            })
            alert("Success, Please Login!")
            history.push("/login")
        } catch (error) {
            alert(error.message)
        }
    }


    return(
        <Container maxWidth={false} style={{minHeight:"100%",backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "1%",paddingBottom: "1%"}}>
                <Paper elevation={2} style={{margin:"5% 10% 5% 10%",paddingBottom:"30px"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>

                    {/* <CustomizedInputs 
                        type="text"
                        label="Email"
                        value={email}
                        disable={true}
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setEmail(e.target.value)}
                    /> */}
                    <CustomizedInputs 
                        type="text"
                        value={phone}
                        label="Phone Number"
                        disable={true}
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setPhone(e.target.value)}
                    />
                    <CustomizedInputs 
                        type="password"
                        label="New Password"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setPassword(e.target.value)}
                    />

                    <CustomizedInputs 
                        type="password"
                        label="Confirm New Password"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    />
                    
                    
                    <Box display="flex" justifyContent="center">
                            <CustomizedButton 
                                onClick={()=>apiCall()}
                                containerStyle={{paddingLeft:"40px",paddingRight:"40px"}}
                                color={IconColor.DARK_GREY}
                                label="Set Password" 
                                icon={IconKeys.send}
                                buttonColor={Colors.THEME_PRIMARY}  
                            /> 
                    </Box>
                </Paper>
            </Container>
        </Container>
    )
    
}