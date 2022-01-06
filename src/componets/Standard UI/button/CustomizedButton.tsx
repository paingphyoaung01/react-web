import * as React from "react";
import { IconKeys, Icons } from "../Icon";
import { IconColor,Colors } from "../../res/color";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { MagicSpinner,JellyfishSpinner, RotateSpinner } from "react-spinners-kit";

type parms = {
  icon : IconKeys,
  label : string,
  containerStyle ?: React.CSSProperties,
  color ?: IconColor,
  buttonColor ?: Colors,
  onClick : Function,
  loading ?: boolean,
  disible ?: boolean
}

export function CustomizedButton(props:parms) {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                margin: theme.spacing(1),
                backgroundColor:props.buttonColor,
                color:props.color
            },
        }),
    );

    const classes = useStyles();

    let icon = <Icons name={props.icon} color={props.color} />
    if(props.loading) icon = <RotateSpinner size={25} color={Colors.THEME_SECONDARY} loading={true} />

    return (
        <Button
            disabled={props.disible||props.loading||false}
            onClick={()=>props.onClick()}
            variant="contained"
            style={props.containerStyle}
            className={classes.button}
            startIcon={icon}>
            {props.label}
        </Button>
    );
}


type linkButtonProps = {
    label : string|JSX.Element,
    containerStyle ?: React.CSSProperties,
    color ?: "primary"|"secondary"| "info",
    onClick : Function,
    underline ?: boolean,
    icon ?: IconKeys,
  }
export function CustomizedLinkButton(props:linkButtonProps) {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                marginTop:20,
                textTransform: 'none'
            },
        }),
    );

    const classes = useStyles();
    let color =  IconColor.THEME_SECONDARY
    if( props.color == "primary")  color = IconColor.THEME_PRIMARY_DARK
    if( props.color == "secondary")  color = IconColor.THEME_SECONDARY
    if( props.color == "info")  color = IconColor.BLACK

    let icon = props.icon ? <Icons name={props.icon} color={color} /> : <span />

    return (
        <Button
            autoCapitalize="none"
            onClick={()=>props.onClick()}
            style={{...props.containerStyle,...{color}}}
            startIcon={icon}
            className={classes.button}>
            {props.underline ? <span style={{padding:5,textDecoration:"underline",color:color}}> {props.label}</span> :  props.label}
           
        </Button>
    );
}


