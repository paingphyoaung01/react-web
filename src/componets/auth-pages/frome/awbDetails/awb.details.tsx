import * as React from 'react'
import { AppContainer, LeftContainer, RightContainer } from '../../../Standard UI/container/Container'
import { Typography, Box, Divider } from '@material-ui/core'
import { CustomizedPaper } from '../../../Standard UI/paper/CustomizedPaper'
import { Icons, IconKeys } from '../../../Standard UI/Icon'
import { UserDetailsBox, TypesContainer, ChargesAndCODContainer, GoodsContainer, QrCodeContainer, TimeSeriesList } from '../fromMe.ui'
import history from '../../../history'
import frommeContext from '../../../../context/awb.context'

export function AWBDetails(props:any){
    const [state,dispatch] = React.useContext(frommeContext)

    React.useEffect(()=>{
        if(!state||!state.FromMeList||!state.FromMeList.id) history.push("/home/fromme")
    },[])

    if(!state||!state.FromMeList||!state.FromMeList.id) return <div />
    localStorage.setItem("@receiver_type",state.FromMeList.current_status.name == "[DLVD] Delivered" ? "true" : "false"  )
    const {FromMeList} = state

    return(
        <AppContainer>
            <LeftContainer>
                <QrCodeContainer {...FromMeList} />
                <UserDetailsBox 
                    userLabel="Sender"
                    text1={FromMeList.sender_id.name}
                    text2={FromMeList.sender_mobile}
                    text3={FromMeList.sender_full_address}   />
                <UserDetailsBox 
                    userLabel="Receiver"
                    text1={FromMeList.receiver_id.name}
                    text2={FromMeList.receiver_mobile}
                    text3={FromMeList.receiver_full_address}   />
                { FromMeList.current_status.name.split("] ")[1] == "Out of Delivery" && <UserDetailsBox 
                    userLabel="Courier"
                    text1={FromMeList.last_mile_pic_id[1]}
                    text2={FromMeList.last_mile_pic_id[2]} />}
                <TypesContainer {...FromMeList} />
                <ChargesAndCODContainer 
                    cod_amount={FromMeList.cod_amount} 
                    delivery_charges={FromMeList.delivery_charges}
                    other_cost={FromMeList.other_cost}
                    to_pay={FromMeList.cash_by_last_mile} 
                    payment_type_id={FromMeList.payment_type_id}
                    extra={true}
                />
                <GoodsContainer description={FromMeList.description} remark={FromMeList.remark} weight={FromMeList.weight} />
                <TimeSeriesList log={FromMeList.log} />
            </LeftContainer>
            <RightContainer />
        </AppContainer>
    )
}