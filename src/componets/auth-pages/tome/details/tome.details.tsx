import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab, makeStyles} from "@material-ui/core"
import { ToMeList } from '../../../../lib/types/tome.types';
import {QrCodeContainer, SenderContainer, ReceiverContainer, TypesContainer,CostContainer, DescriptionContainer, timeSeriesList, CourierContainer} from './tome.details.ui'
import tomeContext from '../../../../context/tome.context';
import history from '../../../history';

const useStyles = makeStyles({
    root: {
      marginTop:"10px",
      flexGrow: 1,
      padding:0
    },
  });



export function TomeDetails(){

    const [contextState,dispatch] = React.useContext(tomeContext)
    const state:ToMeList = contextState

    React.useEffect(()=>{
        if(state&&!state.id) history.push("/home/tome")
    }, [])

    if(!state || !state.id) return <div />

    return(
        <Container maxWidth={false} style={{marginBottom:50}}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={3} style={{paddingTop: "2%"}}>
                    {QrCodeContainer(state)}
                    {SenderContainer(state)}
                    {ReceiverContainer(state)}
                    {state.current_status.name.split('] ')[1] == "Out of Delivery" && CourierContainer(state)}
                    {TypesContainer(state)}
                    {CostContainer(state)}
                    {DescriptionContainer(state)}
                    {timeSeriesList(state.log)}
                </Box>
                <Box flexGrow={1} style={{paddingTop: "2%"}} />
            </Box>
            
        </Container>
    )
    
}