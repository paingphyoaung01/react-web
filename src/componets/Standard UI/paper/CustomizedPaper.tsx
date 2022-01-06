import * as React from 'react'
import { Paper, Typography, Container, Box } from '@material-ui/core'
import { Colors } from '../../res/color'

export type CustomizedPaper = {
    children?:never[]|JSX.Element|any,
    title?:string|number,
    containerStyle ?: React.CSSProperties,
    className?:string,
    action?:never[]|JSX.Element,
    onCLick?:()=>any
}
export function CustomizedPaper(props:CustomizedPaper){
    let containerStyle:React.CSSProperties =  {padding:20,marginTop:20}
    if(props.containerStyle) containerStyle= {...containerStyle,...props.containerStyle}
    return(
        <Paper style={containerStyle} className={props.className} onClick={props.onCLick}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="h6">{props.title}</Typography>
                <Box display="flex" justifyContent="center">{props.action}</Box>
            </Box>
            <Container maxWidth="lg" style={{marginTop:10}}>{props.children}</Container>
        </Paper>
    )
}