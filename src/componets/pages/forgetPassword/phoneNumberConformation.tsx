
import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from "@material-ui/core"
import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { login, getCityTownship, checkRegisterPhone, sendVerificationCode, checkRegisterEmail } from '../../../lib/api'
import Auth from '../../../auth/auth'
import history from '../../history'
import { AuthContext } from '../../../context/Api.context'
import { LoginStyle } from "../login/login.style"
import VerifyCode from "../../../auth/verifyCode"

export function EmailConformation(){
    let [email,setEmail] = React.useState("")

    const getValidPhoneNumber = (phone) => {
        return phone.replace("09","959")
    }

    const _onSubmit = async () =>{
        if(!email) {
            alert("Invalid Phone Number")
            return
        }
        try {
            const data = await checkRegisterEmail(email)
            if(!data || !data.mobile){
                alert("This phone number has not account!")
                return
            }
            const verificationCode = VerifyCode.generateVerifyCode(data.mobile,email,data.id)
            const message = "Your authentication code is : " + verificationCode
            await sendVerificationCode({mobile:getValidPhoneNumber(data.mobile),message})
            history.push("/forgetpassword/verification")
        } catch (error) {
            console.log("Error",error)
        }
    }

    return(
        <Container maxWidth={false} style={{minHeight:"100%",backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "3%",}}>
                <Paper elevation={2} style={{margin:"10%",paddingBottom:"30px"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>

                    <CustomizedInputs 
                        type="text"
                        value={email}
                        label="09xxxxxxxxxxx"
                        onChange={e=>setEmail(e.target.value)}
                        onEnter={()=>_onSubmit()}
                        containerStyle={{marginBottom:10}}

                    />

                    <Grid container spacing={0} alignItems="flex-end" style={{marginBottom:20}}>
                        <Grid item xs={1}/>
                        <Grid>
                            <Typography variant="subtitle2"  color="secondary" style={{fontWeight:"lighter"}}>This verification code will send to you via SMS</Typography>
                        </Grid>
                    </Grid>
                   
                    
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
