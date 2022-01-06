import * as  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../res/color';

export type cricleShapeProps = {
    size?: string | number,
    circleColor?: Colors,
    textColor?: Colors,
    textAlign?: "left" | "right" | "center",
    textSize?: string | number,
    fontWeight?: number | "bold",
}
export const cricleShapeStyle = (props:cricleShapeProps) =>{
    return makeStyles({
        circle: {
          height: props.size,
          width: props.size,
          backgroundColor: props.circleColor,
          borderRadius: "50%",
          lineHeight: props.size,
          textAlign:props.textAlign,
          color:props.textColor,
          fontSize:props.textSize,
          fontWeight:props.fontWeight || "normal"
        }
    });
}
