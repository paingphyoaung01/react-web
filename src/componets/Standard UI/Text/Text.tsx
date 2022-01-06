import * as React from 'react'
import { Typography } from '@material-ui/core'

export type  textPoprs = {
    children?:string | JSX.Element | JSX.Element[] | (string | JSX.Element)[] | never[]
    style?:React.CSSProperties
}
export function Text(props:textPoprs){
   return(
    <Typography style={props.style} >{props.children}</Typography>
   )
}