import * as React from 'react'
import { FormContainer } from '../../Standard UI/container/Container'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { Box, Typography, Divider, Link } from '@material-ui/core'
import { IconKeys, Icons } from '../../Standard UI/Icon'
import authContext from '../../../context/Api.context'
import {Text} from '../../Standard UI/Text/Text'
import logo from '../../res/images/ic_beexprss.jpeg'
import { LoginStyle } from '../../pages/login/login.style'
import { Colors } from '../../res/color'

export function AboutUs(){

    const [state] = React.useContext(authContext)
    return(
        <FormContainer containerStyle={{backgroundColor:Colors.THEME_PRIMARY,height:window.innerHeight,marginBottom:0}}>
            <CustomizedPaper containerStyle={{backgroundColor:"#fff"}}>
                    <Box display="flex" flexDirection="row">
                        <Box display="flex" flexGrow={2}></Box>
                        <Box display="flex" flexGrow={1}>
                            <img src={logo} style={{
                                width: "50%",
                                height: "100%",
                                margin: "0 auto"
                            }} />
                        </Box>
                        <Box display="flex" flexGrow={2}></Box>
                    </Box>
                    {/* <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}></Box>
                        <Box><Typography style={{fontWeight:"bold"}} variant="h6" color="primary">Customer App</Typography></Box>
                        <Box flexGrow={1}></Box>
                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}></Box>
                        <Box><Typography  color="secondary">Version 1.0</Typography></Box>
                        <Box flexGrow={1}></Box>
                    </Box> */}

                    <Text style={{ textAlign: "center"}}>Our BeeXprss Courier Service (UMG Logistics Co.,Ltd) is a nation wide courier services in Myanmar. </Text>
                    <Text style={{ textAlign: "center"}}>We offer you safe, speedy and quality services through over 200 cities in Myanmar.</Text>
                    <Text style={{ textAlign: "center"}}>We obtained legally the service licenced by Ministry of Transportation and communication in 2018.</Text>

                    <Divider orientation="horizontal" style={{marginTop:30}} />

                    <Box display="flex"  alignItems="center" flexDirection="row">

                        <Box flexGrow={1}></Box>
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                            <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                                <Icons name={IconKeys.web} size={30} />
                            </Box>
                            
                            <Box style={{padding: 10}} >
                                <a href="http://beexprss.com/">Our Website</a>
                            </Box>
                        </Box>

                        <Divider orientation="vertical" flexItem/>

                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                            <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                                <Icons name={IconKeys.facebook} size={30} />
                            </Box>
                            
                            <Box style={{padding: 10}} >
                                <a href='https://www.facebook.com/beexprssmyanmar'>Our Facebook Page</a>
                            </Box>
                        </Box>

                        <Divider orientation="vertical" flexItem/>
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                            <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                                <Icons name={IconKeys.phone} size={30} />
                            </Box>
                            
                            <Box style={{padding: 10}} >
                                <Typography>09977835553</Typography>
                            </Box>
                        </Box>

                        <Divider orientation="vertical" flexItem/>
                        <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                            <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                                <Icons name={IconKeys.phone} size={30} />
                            </Box>
                            
                            <Box style={{padding: 10}} >
                                <Typography>09977835922</Typography>
                            </Box>
                        </Box>
                        <Box flexGrow={1}></Box>
                    </Box>

            </CustomizedPaper>
        </FormContainer>
    )
} 