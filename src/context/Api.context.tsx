import * as React from 'react'
import { payment_type, contact_data, user_data, service_type } from '../lib/types/login.types'


export interface AuthContext{
    login:string
    password:string
    service_type?:Array<service_type>,
    contact_data?:contact_data,
    payment_type?:Array<payment_type>,
    user_data?:user_data
}

const AUTH_CONTEXT_DEAFULT:AuthContext = {
    login:"",
    password:"",
}

const reducer = (state:AuthContext,action:string) =>{
    return state
}


const authContext = React.createContext<[AuthContext,React.Dispatch<AuthContext>]>
                                    ([AUTH_CONTEXT_DEAFULT,()=>{}])

export function AuthProvider(props:any) {
    const state = React.useState(AUTH_CONTEXT_DEAFULT);
    return (
        <authContext.Provider value={state}>
            {props.children}
        </authContext.Provider>
    )
  }

export default authContext

