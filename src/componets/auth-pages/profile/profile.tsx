import * as React from 'react'
import { FormContainer, AppContainer, LeftContainer, RightContainer } from '../../Standard UI/container/Container'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { Box, Typography, makeStyles, Divider } from '@material-ui/core'
import { IconKeys, Icons } from '../../Standard UI/Icon'
import authContext from '../../../context/Api.context'

const useStyles = makeStyles(() => ({
    itemsPadding:{
        padding:20
    },
    leftPadding:{
        paddingLeft:20
    },
    textStyle:{
        fontWeight:"lighter"
    }
}));

export function profile(){

    const [state] = React.useContext(authContext)
    const classes = useStyles()
   
    return(
        <AppContainer>
            <LeftContainer>
                <CustomizedPaper title="Profile">
                    
                    {/* <Box className={classes.itemsPadding}>
                        <Icons  name={IconKeys.username} size={50} />
                        <Typography>{state.user_data?.name}</Typography>
                    </Box> */}

                    <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                        <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                            <Icons name={IconKeys.username} size={30} />
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box style={{padding: 10}} >
                            <Typography>User Name</Typography>
                            <Typography className={classes.textStyle}>{state.user_data?.name}</Typography>
                        </Box>
                    </Box>

                    <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                        <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                            <Icons name={IconKeys.email} size={30} />
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box style={{padding: 10}} >
                            <Typography>Email</Typography>
                            <Typography className={classes.textStyle}>{state.login}</Typography>
                        </Box>
                    </Box>


                    <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                        <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                            <Icons name={IconKeys.phone} size={30} />
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box style={{padding: 10}} >
                            <Typography>Phone</Typography>
                            <Typography className={classes.textStyle}>{state.contact_data?.mobile}</Typography>
                        </Box>
                    </Box>


                    <Box display="flex"  alignItems="center" flexDirection="row" style={{padding:10}}>
                        <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                            <Icons name={IconKeys.address} size={30} />
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box style={{padding: 10}} >
                            <Typography>Address</Typography>
                            <Typography className={classes.textStyle}>{state.contact_data?.full_address}</Typography>
                        </Box>
                    </Box>

                </CustomizedPaper>
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
} 