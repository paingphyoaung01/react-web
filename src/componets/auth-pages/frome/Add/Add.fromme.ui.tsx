// import * as React from 'react'
// import { Paper, Typography } from '@material-ui/core'
// import { Colors } from '../../../res/color'

// export type CustomizedPaper = {
//     children?:never[]|JSX.Element|any,
//     title?:string|number,
//     containerStyle ?: React.CSSProperties,
// }
// export function CustomizedPaper(props:CustomizedPaper){
//     let containerStyle:React.CSSProperties =  {backgroundColor:Colors.THEME_PRIMARY,padding:20,marginTop:20}
//     if(props.containerStyle) containerStyle= {...containerStyle,...props.containerStyle}
//     return(
//         <Paper style={containerStyle}>
//             <Typography variant="h6" component="h6">{props.title}</Typography>
//             {props.children}
//         </Paper>
//     )
// }