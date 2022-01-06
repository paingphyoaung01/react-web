import * as React from 'react'
import { LeftContainer, RightContainer, AppContainer } from '../../../../Standard UI/container/Container'
import { CustomizedPaper } from '../../../../Standard UI/paper/CustomizedPaper'
import { Box, Typography } from '@material-ui/core'
import frommeContext from '../../../../../context/awb.context'
import history from '../../../../history'
import * as moment from 'moment'

export function ProofOfDelievery(props:any){
    const [state,dispatch] = React.useContext(frommeContext)

    React.useEffect(()=>{
        if(!state||!state.FromMeList||!state.FromMeList.id) history.push("/home/fromme")
    },[])

    if(!state||!state.FromMeList||!state.FromMeList.id) return <div />
    const {FromMeList} = state

    return(
        <AppContainer>
            <LeftContainer>
                <CustomizedPaper title="Proof Of Delievery">
                    <Box display="flex" flexDirection="row" style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Receiver Name</b></Typography></Box>
                        <Box><Typography align="left">{FromMeList.recipient_name}</Typography></Box>
                    </Box>
                    <Box display="flex" flexDirection="row"  style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Receiver Type</b></Typography></Box>
                        <Box><Typography align="left">{FromMeList.recipient_type.name||""}</Typography></Box>
                    </Box>
                    <Box display="flex" flexDirection="row"  style={{padding:10}}>
                        <Box style={{width:200}}><Typography><b>Delievery Date</b></Typography></Box>
                        <Box><Typography align="left"> {moment(FromMeList.log[0].updated_on).format("YYYY-MM-DD")}  {FromMeList.delivered_time}</Typography></Box>
                    </Box>
                </CustomizedPaper>

                <CustomizedPaper title="Receiver's Signature">
                    {FromMeList.signature ? <img src={`data:image/png;base64,${FromMeList.signature}`} width={"50%"} height={"50%"}/>: ''}
                </CustomizedPaper>

                {/* <CustomizedPaper title="Delievery Address"> */}
                    {/* <a href={` https://www.google.com/maps/search/?api=1&query=${FromMeList.last_mile_lat},${FromMeList.last_mile_lon} `}> 
                        Click To See Delievry Address
                    </a> */}
                {/* </CustomizedPaper> */}
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
}
