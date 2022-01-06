import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'

import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { login, getCityTownship } from '../../../lib/api'
import Auth from '../../../auth/auth'
import history from '../../history'
import { AuthContext } from '../../../context/Api.context'
import { LoginStyle } from './login.style'

export function Login(){
    let [username,setUsername] = React.useState("")
    let [password,setPassword] = React.useState("")

    const _usernameOnChange = (text:string|null):any =>{
        setUsername(text||"")
    }
    const _passwordOnChange = (text:string|null):any =>{
        setPassword(text||"")
    }

    const _onSubmit = () =>{

        if(username == "") {
            alert("Invalid username")
            return
        }
        if(password == "") {
            alert("Invalid password")
            return
        }
        
        login(username,password)
        .then(data =>{
            const userData:AuthContext = {...data,...{login:username,password}}
            Auth.login(userData,()=>{
                history.push("/home/dashboard")
            })
        })
        .catch(error=>{
            alert("Invalid Username Or Password")
        })
    }

    return(
        <Container maxWidth={false} style={{height:"100%",backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "3%",}}>
                <Paper elevation={2} style={{margin:"10%"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>
                    <Box flexDirection="column" justifyContent="center" style={{padding:"10%"}}>
                        <CustomizedInputs 
                            icon={IconKeys.phone} 
                            iconColor={IconColor.THEME_PRIMARY} 
                            label="09xxxxxxxxx"
                            inputId="userid"
                            type="text"
                            onChange={e=>_usernameOnChange(e.target.value)}
                            onEnter={()=>_onSubmit()}
                        />
                        <CustomizedInputs 
                            icon={IconKeys.password} 
                            iconColor={IconColor.THEME_PRIMARY} 
                            label="Password"
                            inputId="password"
                            type="password"
                            onChange={e=>_passwordOnChange(e.target.value)}
                            onEnter={()=>_onSubmit()}
                        />

                        <Box display="flex" justifyContent="center">
                            <CustomizedButton 
                                onClick={_onSubmit}
                                containerStyle={{paddingLeft:"40px",paddingRight:"40px"}}
                                color={IconColor.DARK_GREY}
                                label="Login" 
                                icon={IconKeys.login}
                                buttonColor={Colors.THEME_PRIMARY}  
                            /> 
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <CustomizedLinkButton label="Register" onClick={()=>history.push("register")}/>
                            <CustomizedLinkButton label="Forget Password" onClick={()=>history.push("forgetpassword")}/>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Container>
    )
    
}