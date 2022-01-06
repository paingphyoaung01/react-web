import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab, makeStyles} from "@material-ui/core"
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {HistoryItem} from './history.ui'
import { toMe } from '../../../lib/api'
import { ToMeList } from '../../../lib/types/tome.types'
import { ScrollListener } from '../../listener/ScrollListen'



export function ToMeHistoryList(){

    const [oneTimeCall,setOneTimeCall] = React.useState(false)
    const [items,setItems] = React.useState<Array<ToMeList>>([])


    const apiCall = async (page = 0) =>{
        try {
            const results = await toMe(page)
            if(results){
                setItems([...items,...results])
                setOneTimeCall(true)
            }
            return Promise.resolve(results.length)
        } catch (error) {
            console.error(error)
            alert(error.messge)
            setOneTimeCall(true)
            return Promise.reject()
        }
    }

    const createText = (item:ToMeList):string => {
        var amount = 0
        switch(item.payment_type_id.name) { 
            case "Sender Pay": { 
                amount = item.cod_amount
               break; 
            } 
            case "Receiver Pay": { 
                amount = item.cod_amount + item.delivery_charges + item.other_cost
               break; 
            } 
            case "Special Service": { 
                amount = item.cod_amount
                break; 
             } 
            default: { 
                amount = item.cod_amount
               break; 
            } 
         } 
        return item.current_status.name.split('] ')[1] == "Delivered" ? "Paid " + amount +" MMK for "+item.name+"." : "To pay " + amount+" MMK for "+item.name+"."
    }

    const RenderItemList = () =>{
        let list:Array<JSX.Element> =[]
        items.map((row,index)=>{
            list.push(
                <HistoryItem 
                    key={index}
                    create={row.log[0].updated_on}
                    status={row.current_status.name.split(']')[1]}
                    text={createText(row)}
                    colorCode={row.current_status.name.split("]")[0].replace("[","").trim()}
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