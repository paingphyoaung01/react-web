import * as React from 'react'
import { PickUpItem} from './fromMe.ui'
import {  getPickUps } from '../../../lib/api'
import {  PickupProps } from '../../../lib/types/fromme.types'
import frommeContext from '../../../context/awb.context'
import history from '../../history'
import { ScrollListener } from '../../listener/ScrollListen'



export function PickupList(){

    const [items,setItems] = React.useState<Array<PickupProps>>([])
    const [state,dispatch] = React.useContext(frommeContext)
    const [oneTimeCall,setOneTimeCall] = React.useState(false)

    const apiCall = async (page = 0) =>{
        try {
            const results = await getPickUps(page)
            if(results){
                setItems([...items,...results])
            }
            return Promise.resolve(results.length)
        } catch (error) {
            console.error(error)
            alert(error.messge)
            return Promise.reject()
        }finally{
            setOneTimeCall(true)
        }
    }

    const _onClick = (param:PickupProps) => {
        dispatch({Pickup:param})
        history.push("/home/fromme/PickUpDetails")
    }

    const RenderItemList = () =>{
        let list:Array<JSX.Element> =[]
        items.map((row,index)=>{
            list.push(
                <PickUpItem 
                    estPickup={row.time_to_pick}
                    key={index}
                    id={row.name} 
                    create={row.create_date}
                    no={index+1}
                    status={row.state}
                    items={row.items}
                    onCLick={()=>_onClick(row)}
                    colorCode={row.state.split("]")[0].replace("[","").trim()}
                />
            )
        })
        if(items.length == 0 && oneTimeCall){
            return [<span />]
        }
        return list
    }

    React.useEffect(()=>{
        apiCall()
    },[])

    return(
        <ScrollListener cb={page=>apiCall(page)}>
            {RenderItemList()}
        </ScrollListener>
    )
    
}