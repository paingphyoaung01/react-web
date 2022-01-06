import * as React from 'react'
import { OrdersProps } from '../lib/types/fromme.types'


const CONTEXT_DEAFULT:OrdersProps|any = {}

const reducer = (state:OrdersProps,action:string) =>{
    return state
}


const orderContext = React.createContext<[OrdersProps,React.Dispatch<OrdersProps>]>
                                    ([CONTEXT_DEAFULT,()=>{}])

export function OrderProvider(props:any) {
    const state = React.useState(CONTEXT_DEAFULT);
    return (
        <orderContext.Provider value={state}>
            {props.children}
        </orderContext.Provider>
    )
  }

export default orderContext

