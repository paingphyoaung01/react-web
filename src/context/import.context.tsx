import * as React from 'react'
import { FromMeList } from '../lib/types/fromme.types'

const CONTEXT_DEAFULT:FromMeList[]|any = []

const reducer = (state:FromMeList[],action:string) =>{
    return state
}


const importOrderContext = React.createContext<[FromMeList[],React.Dispatch<FromMeList>]>
                                    ([CONTEXT_DEAFULT,()=>{}])

export function ImportOrderProvider(props:any) {
    const state = React.useState(CONTEXT_DEAFULT);
    return (
        <importOrderContext.Provider value={state}>
            {props.children}
        </importOrderContext.Provider>
    )
  }

export default importOrderContext

