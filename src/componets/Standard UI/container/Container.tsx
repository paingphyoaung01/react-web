import * as React from 'react'
import { Container, Box } from '@material-ui/core'

export function AppContainer(props:any){
    return (
        <Container maxWidth={false} style={{marginBottom:50}}>
            <Box display="flex" flexDirection="row" style={{paddingTop: "2%"}}>
                {props.children}
            </Box>   
        </Container>
    )
}

export function LeftContainer(props:any){
    return (
            <Box flexGrow={3}>{props.children}</Box>
        )
}

export function RightContainer(props:any){
    return (
            <Box flexGrow={1} maxWidth="25%"> {props.children}</Box>
        )
}

export type FormContainerProps = {
    children?:never[]|JSX.Element|any,
    containerStyle ?: React.CSSProperties,
    paddingTop ?: number|string
}

export function FormContainer(props:FormContainerProps){
    return (
        <Container maxWidth={false} style={{...{marginBottom:50},...props.containerStyle}}>
            <Box display="flex" flexDirection="row" justifyContent="center" style={{paddingTop:props.paddingTop||"2%"}}>
                <Box flexGrow={2} />
                <Box flexGrow={4}>{props.children}</Box>
                <Box flexGrow={2}/>
            </Box>   
        </Container>
    )
}

export function HomeContainer(props:FormContainerProps){
    return (
        <Container maxWidth={false} style={{...{marginBottom:50},...props.containerStyle}}>
            <Box display="flex" flexDirection="row" justifyContent="center" style={{paddingTop:props.paddingTop||"2%"}}>
                <Box flexGrow={2} />
                <Box flexGrow={1}>{props.children}</Box>
                <Box flexGrow={2}/>
            </Box>   
        </Container>
    )
}

// export function FlexBoxRowContainer(props:any){
//     return(
//         <Box display="flex" flexDirection="row">
//             {props.children}
//         </Box>
//     )   
// }

// export function FlexBoxItem(props:any){
//     return <Box flexGrow={1}> {props.children}</Box>   
// }