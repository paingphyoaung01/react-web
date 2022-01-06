import * as React from 'react'
import { Paper, Box, Typography, colors } from '@material-ui/core'
import { cricleShapeStyle,cricleShapeProps } from './shape.style'
import { Colors } from '../../res/color'

type CircleShapeProps = {
    text:string|number,
    stylesProps:cricleShapeProps
}
export function CircleShape(props:CircleShapeProps) {


    const styles  = cricleShapeStyle({
        circleColor:  props.stylesProps.circleColor||Colors.THEME_SECONDARY,
        size: props.stylesProps.size||"100px",
        textAlign: props.stylesProps.textAlign||"center",
        textColor: props.stylesProps.textColor||Colors.THEME_PRIMARY,
        textSize:  props.stylesProps.textSize||"18px",
    })()
    return (
        <div className={styles.circle}>{props.text}</div>
    )
}