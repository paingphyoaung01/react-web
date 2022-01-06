import * as React from 'react'
import { ExportOrderList, FromMeList, OrdersProps, PickupProps } from '../lib/types/fromme.types'

export type FrommeContextProps = {
    FromMeList?: FromMeList,
    Order?: OrdersProps,
    Pickup?: PickupProps,
    OrderList?: Array<OrdersProps>,
    ImportOrder?: Array<ExportOrderList>,
}

const CONTEXT_DEAFULT: FrommeContextProps | any = {}

const reducer = (state: FrommeContextProps, action: string) => {
    return state
}


const frommeContext = React.createContext<[FrommeContextProps, React.Dispatch<FrommeContextProps>]>
    ([CONTEXT_DEAFULT, () => { }])

export function FromMeProvider(props: any) {
    const state = React.useState(CONTEXT_DEAFULT);
    return (
        <frommeContext.Provider value={state}>
            {props.children}
        </frommeContext.Provider>
    )
}

export default frommeContext

