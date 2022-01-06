import * as React from 'react'
import { AppContainer, LeftContainer, RightContainer } from '../../../Standard UI/container/Container'
import { Typography, Box, Divider } from '@material-ui/core'
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper'
import { Icons, IconKeys } from '../../../Standard UI/Icon'
import { UserDetailsBox, TypesContainer, ChargesAndCODContainer, GoodsContainer, QrCodeContainer } from '../fromMe.ui'
import history from '../../../history'
import frommeContext from '../../../../context/awb.context'

export function OrderDetails(props:any){
    const [state,dispatch] = React.useContext(frommeContext)

    React.useEffect(()=>{
        if(!state||!state.Order||!state.Order.id) history.push("/home/fromme")
    },[])

    if(!state||!state.Order||!state.Order.id) return <div />
    const {Order} = state
    
    return(
        <AppContainer>
            <LeftContainer>
                <QrCodeContainer {...Order} />
                <UserDetailsBox 
                    userLabel="Receiver"
                    text1={Order.receiver_name}
                    text2={Order.receiver_mobile}
                    text3={Order.dest_twsp_id.name +" , "+ Order.dest_city.name}   
                    text4={Order.receiver_full_address}
                />
                <TypesContainer {...Order} />
                <ChargesAndCODContainer cod_amount={Order.cod_amount} delivery_charges={Order.delivery_charges} />
                <GoodsContainer description={Order.description} remark={Order.remark} weight={Order.weight} />
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
}