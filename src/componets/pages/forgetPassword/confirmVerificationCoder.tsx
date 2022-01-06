import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core"
import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { LoginStyle } from "../login/login.style"
import { RouteProps } from "react-router"
import history from "../../history"
import VerifyCode from "../../../auth/verifyCode"

export function forgetpasswordConfirmVerificationCode(props:RouteProps){
    const [actionClose,setActionClose] = React.useState(true)

    React.useEffect(()=>{
        if(!VerifyCode.checkVerifyCode()) history.push("/forgetpassword")
       
    },[])

    if(!VerifyCode.checkVerifyCode()) return <div />

    const verifingCode = (inputCode:string) => {
        if(VerifyCode.verify(parseInt(inputCode))) history.push("form")
    }

    return(
        <Container maxWidth={false} style={{height:"100%",backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "3%",}}>
                <Paper elevation={2} style={{margin:"10%",paddingBottom:"30px"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>

                    <CustomizedInputs 
                        type="text"
                        inputId="regPhone"
                        label="Enter Your Verification Code"
                        onChange={e=>verifingCode(e.target.value)}
                    />
                    
                    <Box display="flex" justifyContent="center">
                            <CustomizedButton 
                                disible={actionClose}
                                onClick={()=>alert("Invalid Code")}
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