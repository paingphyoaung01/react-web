
import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextareaAutosize, Grid } from "@material-ui/core"
import * as React from 'react'
import {Paper, Container, Box, TextField, Button, makeStyles, Theme, createStyles} from "@material-ui/core"
import logo from '../../res/images/ic_beexprss.jpeg'
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {CustomizedInputs, CustomizedAutoCompleteBox} from '../../Standard UI/Input/CustomizedInputs'
import { CustomizedButton, CustomizedLinkButton } from '../../Standard UI/button/CustomizedButton'
import { login, getCityTownship, checkRegisterPhone, sendVerificationCode, checkRegisterEmail, registerUser } from '../../../lib/api'
import Auth from '../../../auth/auth'
import history from '../../history'
import { AuthContext } from '../../../context/Api.context'
import { LoginStyle } from "../login/login.style"
import VerifyCode from "../../../auth/verifyCode"
import { cityProps, townshipProps, getCity, getTownship, getTownshipByCityId } from "../../../lib/storage/CityAndTownship"

export function registerForm(){

    React.useEffect(()=>{
        if(!VerifyCode.getVerifyPhoneNumber()) history.push("/register")
    },[])

    if(!VerifyCode.getVerifyPhoneNumber()) return <div />


    let [phone,setPhone] = React.useState(VerifyCode.getVerifyPhoneNumber())
    let [name,setName] = React.useState("")
    let [email,setEmail] = React.useState("")
    let [password,setPassword] = React.useState("")
    let [confirmPassword,setConfirmPassword] = React.useState("")
    const [city, setCity] = React.useState<cityProps|undefined|null>(null);
    const [township, setTownship] = React.useState<townshipProps|undefined|null>(null);
    const [address, setAddress] = React.useState<string|undefined>();

    const apiCall = async () =>{
        if(!name) {
            alert("User name is empty")
            return
        }
        if(!email) {
            alert("Email is empty")
            return
        }
        if(!password) {
            alert("Password is empty")
            return
        }
        if(!city) {
            alert("Please choose city")
            return
        }
        if(!township) {
            alert("Please choose Township")
            return
        }
        if(!address) {
            alert("Address is empty")
            return
        }
        if(confirmPassword != password) {
            alert("Password do not match")
            return 
        }

        try {
            const checkEmail =  await checkRegisterEmail(email)
            if(checkEmail && checkEmail.id ) {
                alert("Email is already exist")
                return
            }
            const data = await registerUser({
                mobile:phone,
                email,
                city_id:city.id,
                full_address:address,
                name,
                password,
                township_id:township.id
            })
            const userData:AuthContext = {...data,...{login:email,password}}
            Auth.login(userData,()=>{
                history.push("/home/dashboard")
            })
        } catch (error) {
            alert(error.message)
        }
    }


    return(
        <Container maxWidth={false} style={{backgroundColor:Colors.WHITE}}>
            <Container maxWidth="sm" style={{paddingTop: "1%",paddingBottom: "1%"}}>
                <Paper elevation={2} style={{margin:"5% 10% 5% 10%",paddingBottom:"30px"}}>
                    <Box display="flex" justifyContent="center">
                        <img src={logo} style={LoginStyle.responsive_img} />
                    </Box>

                    <CustomizedInputs 
                        type="text"
                        label="Name"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setName(e.target.value)}
                    />
                    <CustomizedInputs 
                        type="text"
                        label="Email(Optional)"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setEmail(e.target.value)}
                    />
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
                        label="Password"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setPassword(e.target.value)}
                    />

                    <CustomizedInputs 
                        type="password"
                        label="Confirm Password"
                        containerStyle={{marginBottom:"15px"}}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    />

                    <Grid container spacing={0} alignItems="flex-end">    
                        <Grid item xs={1}/>
                        <Grid item xs={11}>
                            <CustomizedAutoCompleteBox 
                                options={getCity()}
                                label="City" 
                                value={city}
                                getOptionLabel={(option:cityProps)=>option.name}
                                onChange={(e,value)=>{setCity(value)}} 
                                style={{width:"90%"}}
                            />
                        </Grid>
                     </Grid>


                     <Grid container spacing={0} alignItems="flex-end">    
                        <Grid item xs={1}/>
                        <Grid item xs={11}>
                            {city&&<CustomizedAutoCompleteBox 
                                options={getTownshipByCityId(city?.id)}
                                label="Township"
                                value={township} 
                                getOptionLabel={(option:townshipProps)=>option.name.slice(3)}
                                onChange={(e,value)=>setTownship(value)} 
                                style={{width:"90%"}}
                            />}
                        </Grid>
                     </Grid> 

                     <Grid container spacing={0} alignItems="flex-end">    
                        <Grid item xs={1}/>
                        <Grid item xs={11}>
                            <TextareaAutosize 
                                style={{width:"90%",fontSize:14}} 
                                aria-label="minimum height" 
                                rowsMin={3}
                                value={address} 
                                placeholder="Address" 
                                onChange={e=>setAddress(e.target.value)}
                            />
                        </Grid>
                     </Grid>  

                    
                    
                    <Box display="flex" justifyContent="center">
                            <CustomizedButton 
                                onClick={()=>apiCall()}
                                containerStyle={{paddingLeft:"40px",paddingRight:"40px"}}
                                color={IconColor.DARK_GREY}
                                label="Register" 
                                icon={IconKeys.send}
                                buttonColor={Colors.THEME_PRIMARY}  
                            /> 
                    </Box>
                </Paper>
            </Container>
        </Container>
    )
    
}