import * as React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { Icons, IconKeys } from '../../Standard UI/Icon';
import { Colors,IconColor } from '../../res/color';

const useStyles = makeStyles(() => ({
    itemsPadding:{
        padding:5
    },
    leftPadding:{
        paddingLeft:20
    },
    textStyle:{
        fontWeight:"lighter"
    },
    valueTextStyle:{
        fontSize: 22
    }
}));

export type HomeItemsProps = {
    label:string,
    text:string|number|undefined|null,
    iconsName:IconKeys,
    color:IconColor.THEME_PRIMARY|IconColor.THEME_SECONDARY
}
export const HomeItems = (props:HomeItemsProps) =>{
    const classes = useStyles()
    return (
        <Box display="flex"  alignItems="center" flexDirection="row" style={{paddingLeft: 16, paddingBottom: 10}}>
            <Box display="flex" alignItems="center" flexDirection="column"  style={{padding: 10}}>
                <Icons name={props.iconsName} size={25} color={props.color} />
            </Box>
            <Box>
                <Typography className={classes.textStyle} style={{color:props.color}}>{props.label}</Typography>
                <Typography className={classes.valueTextStyle} style={{color:props.color}}>{props.text}</Typography>
            </Box>
        </Box>
    )
}