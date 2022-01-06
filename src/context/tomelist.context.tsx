import * as React from 'react'
import { ToMeList } from '../lib/types/tome.types'


const CONTEXT_DEAFULT:ToMeList[]|any = []

const reducer = (state:ToMeList[],action:string) =>{
    return state
}


const tomeContext = React.createContext<[ToMeList[],React.Dispatch<ToMeList>]>
                                    ([CONTEXT_DEAFULT,()=>{}])

export function ToMeListProvider(props:any) {
    const state = React.useState(CONTEXT_DEAFULT);
    return (
        <tomeContext.Provider value={state}>
            {props.children}
        </tomeContext.Provider>
    )
  }

export default tomeContext

