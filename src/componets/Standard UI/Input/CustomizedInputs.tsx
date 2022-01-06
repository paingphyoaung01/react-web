import * as React from "react";
// import "./CustomizedInputs.style.css"
import { IconKeys, Icons } from "../Icon";
import { IconColor } from "../../res/color";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

type parms = {
  icon? : IconKeys,
  inputId ?: string,
  label : string,
  containerStyle ?: React.CSSProperties,
  iconColor ?: IconColor,
  type : "text"|"password"|"number",
  value?:""|string|number,
  onChange: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
  endAdornment?:string,
  startAdornment?:string,
  onEnter?:()=>void,
  disable?:boolean
}
export function CustomizedInputs(props:parms) {
    let containerStyle:React.CSSProperties = {marginBottom:"30px"}
    if(props.containerStyle) containerStyle= {...containerStyle,...props.containerStyle}

    let InputProps:any = {}
    if( props.endAdornment) InputProps.endAdornment = <InputAdornment  position="end">{props.endAdornment}</InputAdornment>
    if( props.startAdornment) InputProps.startAdornment = <InputAdornment  position="start">{props.startAdornment}</InputAdornment>
    return (
      <Grid container spacing={0} alignItems="flex-end" style={containerStyle}>
          <Grid item xs={1}>
            {props.icon && <Icons size={20} color={props.iconColor} name={props.icon} style={{marginRight:10}} />}
          </Grid>
          <Grid item xs={11}>
            <TextField 
              disabled={props.disable}
              value={props.value}
              style={{width:"90%"}} 
              id={props.inputId} 
              type={props.type} 
              onChange={e=>props.onChange(e)} 
              label={props.label} 
              color="secondary"
              onKeyDown={e=>{if(e.key == "Enter"){
                props.onEnter ? props.onEnter() : ()=>{}
              }}}
              InputProps={InputProps}
            />
          </Grid>
        </Grid>
    );
}

export function CustomizedPhoneInputs(props:parms) {
  let containerStyle:React.CSSProperties = {marginBottom:"30px"}
  if(props.containerStyle) containerStyle= {...containerStyle,...props.containerStyle}

  let InputProps:any = {}
  if( props.endAdornment) InputProps.endAdornment = <InputAdornment  position="end">{props.endAdornment}</InputAdornment>
  if( props.startAdornment) InputProps.startAdornment = <InputAdornment  position="start">{props.startAdornment}</InputAdornment>
  return (
    <Grid container spacing={0} alignItems="flex-end" style={containerStyle}>
        <Grid item xs={1}>
          {props.icon && <Icons size={20} color={props.iconColor} name={props.icon} style={{marginRight:10}} />}
        </Grid>
        <Grid item xs={11}>
          <TextField 
            disabled={props.disable}
            value={props.value}
            style={{width:"90%"}} 
            id={props.inputId} 
            type={"text"} 
            onChange={e=>props.onChange(e)} 
            label={props.label} 
            color="secondary"
            onKeyDown={e=>{if(e.key == "Enter"){
              props.onEnter ? props.onEnter() : ()=>{}
            }}}
            inputProps={{
              maxLength: 11,
              minLength: 9
            }}
            onInput={(e) => { (e.target as HTMLTextAreaElement).value = (e.target as HTMLTextAreaElement).value.replace(/[^0-9]/g, '') }}
          />
        </Grid>
      </Grid>
  );
}

export type customizedAutoCompleteBoxProps={
  options:Array<any>,
  value?:string|null|any,
  getOptionLabel:(option:any)=>string,
  onChange:(event:any, newValue:any)=>any,
  label:string,
  style?:React.CSSProperties
}
export function CustomizedAutoCompleteBox(props:customizedAutoCompleteBoxProps){
  return(
    <Autocomplete
      style={{marginBottom:"30px",}}
      options={props.options}
      color="secondary"
      value={props.value}
      autoComplete={false}
      getOptionLabel={props.getOptionLabel}
      onChange={props.onChange}
      renderInput={(params:any) => {
          return (
              <TextField 
                  {...params} 
                  color="secondary"
                  style={props.style} 
                  autoComplete={false}
                  label={props.label}/>
          )
      }}
    />
  )
}


