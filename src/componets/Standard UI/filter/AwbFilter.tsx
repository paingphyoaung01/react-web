import * as React from 'react'
import { Button, Box, Grid, Select, MenuItem, TextField, Checkbox, FormControlLabel, Radio, makeStyles, InputBase, createStyles, Theme } from "@material-ui/core"
import { getCity, cityProps, getTownship, townshipProps } from '../../../lib/storage/CityAndTownship'
import { CustomizedAutoCompleteBox } from '../../Standard UI/Input/CustomizedInputs'
import IconButton from '@material-ui/core/IconButton';
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { Colors } from '../../res/color'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CustomizedButton } from '../../Standard UI/button/CustomizedButton'
import * as moment from 'moment'
import { Excel } from '../../../lib/excel/excel';

type params = {
    searchType : string,
    openFilter: boolean,
    title: string,
    information: string,
    filterFromDate: string | Date,
    onChangeFromDate: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    filterToDate: string | Date,
    onChangeToDate: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    filterReceiver: boolean,
    onChangefilterReceiver: Function,
    type: string, 
    onChangeType: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    onChangeTypeValue: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    valueType: string,
    onChangeCity: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: cityProps) => void,
    onChangeTownship: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,  value: townshipProps) => void,
    filterStatus: boolean,
    onChangefilterStatus: Function,
    filterDelivered: boolean,
    onChangefilterDelivered: Function,
    filterCod: boolean,
    onChangefilterCod: Function,
    filterCash: boolean,
    onChangefilterCash: (key : string, value : string) => void,
    onCloseDialog: Function,
    onFilter: Function,
  }
export function AwbsFilter(props:params) {
    return (
        <div>
            <Dialog open={props.openFilter} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> {props.title} </DialogTitle>
                <DialogContent>

                    <div style={{ backgroundColor: "#F4F3F3", height: 0.5, marginBottom: 10 }} />
                    <Box display="flex" flexDirection="row" alignItems="center" style={{ backgroundColor: "#F4F3F3", padding: 10 }}>
                        <Box flexGrow={1}>                            
                            <TextField
                                id="date"
                                label="From Date"
                                type="date"
                                defaultValue={props.filterFromDate}
                                InputLabelProps={{ shrink: true, }}
                                onChange={ (e) => props.onChangeFromDate(e)}
                            />
                        </Box>
                        <Box flexGrow={1} style={{ marginLeft: 12 }}>
                            <form noValidate>
                                <TextField
                                    id="date"
                                    label="To Date"
                                    type="date"
                                    defaultValue={props.filterToDate}
                                    InputLabelProps={{ shrink: true, }}
                                    onChange={ (e) => props.onChangeToDate(e)}
                                />
                            </form>
                        </Box>
                    </Box>

                    <div style={{ backgroundColor: "#F4F3F3", height: 0.5, marginTop: 10, marginBottom: 10 }} />

                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={props.filterReceiver} onChange={ () => props.onChangefilterReceiver() } name="checkedA" />}
                            label={props.information}
                        />
                    </div>
                    { props.filterReceiver &&
                        <div>
                            <Select labelId="demo-controlled-open-select-label" id="demo-controlled-open-select" value={props.type} onChange={ e => props.onChangeType(e) } style={{ width: '100%' }}>
                                <MenuItem value={"name"}> Name </MenuItem>
                                <MenuItem value={"awb"}> AWB Number </MenuItem>
                                <MenuItem value={"phone"}>Phone</MenuItem>
                                <MenuItem value={"city"}>City</MenuItem>
                                <MenuItem value={"township"}>Township</MenuItem>
                            </Select>
                            {props.type != 'city' && props.type != 'township' && <TextField onChange={(e) => props.onChangeTypeValue(e)} margin="dense" label="Enter here" fullWidth value={props.valueType} />}
                            {props.type == 'city' && <CustomizedAutoCompleteBox options={getCity()} getOptionLabel={(option: cityProps) => option.name} label="Select City" onChange={(e, value) => props.onChangeCity(e, value)} />}
                            {props.type == 'township' && <CustomizedAutoCompleteBox options={getTownship()} getOptionLabel={(option: townshipProps) => option.name} label="Select Township" onChange={(e, value) =>{console.log("value ", value) 
                            props.onChangeTownship(e, value)} } />}
                        </div>
                    }

                    <div style={{ backgroundColor: "#F4F3F3", height: 0.5, marginTop: 10, marginBottom: 10 }} />

                    <div style={{ flexDirection: 'row', display: "flex", marginTop: 8 }}>
                        <FormControlLabel
                            control={<Checkbox checked={props.filterStatus} onChange={ () => props.onChangefilterStatus()} name="checkedA" />}
                            label="Delivery Status &nbsp;&nbsp;&nbsp;  "
                        />
                        {props.filterStatus && <div>
                            <Box display="flex" flexDirection="row" alignItems="center" style={{ backgroundColor: "#F4F3F3", padding: 10 }}>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="parcel" control={
                                        <Radio
                                            checked={props.filterDelivered}
                                            onChange={() => props.onChangefilterDelivered("delivered", "Delivered")}
                                            value="delivered"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Delivered' }}
                                        />
                                    } label="Delivered" />
                                </Box>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="document" control={
                                        <Radio
                                            checked={!props.filterDelivered}
                                            onChange={() => props.onChangefilterDelivered("delivered", "Not Delivered")}
                                            value="notDelivered"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Not Delivered' }}
                                        />
                                    } label="Not Delivered" />
                                </Box>
                            </Box>
                        </div>}
                    </div>

                    <div style={{ backgroundColor: "#F4F3F3", height: 0.5, marginTop: 10, marginBottom: 10 }} />

                    { props.searchType == "fromme" && <div style={{ flexDirection: 'row', display: "flex", marginTop: 8 }}>
                        <FormControlLabel
                            control={<Checkbox checked={props.filterCod} onChange={() => props.onChangefilterCod()} name="checkedA" />}
                            label="Cash On Delivery"
                        />
                        {props.filterCod && <div>
                            <Box display="flex" flexDirection="row" alignItems="center" style={{ backgroundColor: "#F4F3F3", padding: 10 }}>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="parcel" control={
                                        <Radio
                                            checked={props.filterCash}
                                            onChange={() => props.onChangefilterCash("received", "Received")}
                                            value="received"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Received' }}
                                        />
                                    } label="Received &nbsp; &nbsp; &nbsp; &nbsp; " />
                                </Box>
                                <Box flexGrow={1}>
                                    <FormControlLabel value="document" control={
                                        <Radio
                                            checked={!props.filterCash}
                                            onChange={() => props.onChangefilterCash("received", "Not Received")}
                                            value="notReceived"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Not Received' }}
                                        />
                                    } label="Not Received &nbsp; &nbsp; &nbsp; &nbsp; " />
                                </Box>
                            </Box>
                        </div>}
                    </div> }

                    { props.searchType == "tome" && <div style={{ flexDirection: 'row', display: "flex", marginTop: 8 }}>
                            <FormControlLabel
                                control={<Checkbox checked={props.filterCod} onChange={props.onChangefilterCod} name="checkedA" />}
                                label="Cash On Delivery"
                            />
                            {props.filterCod && <div>
                                <Box display="flex" flexDirection="row" alignItems="center" style={{ backgroundColor: "#F4F3F3", padding: 10 }}>
                                    <Box flexGrow={1}>
                                        <FormControlLabel value="parcel" control={
                                            <Radio
                                                checked={props.filterCash}
                                                onChange={() => props.onChangefilterCash("paid", "Paid")}
                                                value="paid"
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'Paid' }}
                                            />
                                        } label="Paid &nbsp; &nbsp; &nbsp; &nbsp; " />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <FormControlLabel value="document" control={
                                            <Radio
                                                checked={!props.filterCash}
                                                onChange={() => props.onChangefilterCash("paid", "Not Paid")}
                                                value="notPaid"
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'Not Paid' }}
                                            />
                                        } label="Not Paid &nbsp; &nbsp; &nbsp; &nbsp; " />
                                    </Box>
                                </Box>
                            </div>}
                        </div> }

                    <div style={{ backgroundColor: "#F4F3F3", height: 0.5, marginTop: 10, marginBottom: 8 }} />

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={ () => props.onCloseDialog() } color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => props.onFilter() }>
                        Filter
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}

type filterBar = {
    sheetName: string,
    renderChipList: Function,
    filterMood: boolean,
    count : number,
    progress : boolean,
    progressPercent : number,
    totalCount : number,
    excelFormator : Function,
    getAllItems : Function,
    clearFilter: Function,
    onOpenDialog : Function,
    loading : boolean,
}
export function AwbsFilterBar(props: filterBar) {
    props.filterMood && props.progressPercent < 100 &&  props.totalCount
    
    return (
        <Grid container style={{ marginBottom: 10, padding: 4, backgroundColor: "white" }} spacing={0}>
            <Grid item xs={9} style={{ padding: 8 }}>
                {props.renderChipList()}
            </Grid>

            {/* <Grid item xs={2} style={{ padding: 8, justifyContent: "center", alignContent: "center", alignSelf: "center", alignItems: "center" }}>
                { props.filterMood && props.progressPercent == 100 && <Excel
                    dataSet={[{ sheetName: "Vendor Bills", data: props.excelFormator() }]}
                    name={'FromMeList' + moment().format('-DD/MM/YYYY')}
                >
                    <Button onClick={ () => {} } variant="contained" color="primary">
                        Download
                    </Button> 
                </Excel> }
                { props.filterMood && props.progressPercent < 100 &&  
                    <Button onClick={ () => props.getAllItems()} variant="contained" color="primary">
                        Export
                    </Button> }
            </Grid>  */}
            
            <Grid item xs={3} container justify="flex-end" style={{ alignSelf: "center", alignItems: "center"}}>
                { !props.filterMood && <CustomizedButton
                    label="Filter"
                    icon={IconKeys.filter}
                    containerStyle={{ justifyContent: "center", alignContent: "center", marginRight : 16 }}
                    onClick={() => props.onOpenDialog()}
                    buttonColor={Colors.THEME_PRIMARY}
                    loading={props.loading}
                /> }
                
                { props.filterMood && props.progressPercent == 100 && <Excel
                    dataSet={[{ sheetName: props.sheetName, data: props.excelFormator() }]}
                    name={props.sheetName + moment().format('-DD/MM/YYYY')}
                >
                    <Button onClick={ () => {} } style={{textTransform: 'none'}} variant="contained" color="primary">
                        Download
                    </Button> 
                </Excel> }

                { props.filterMood && props.progressPercent < 100 &&  props.totalCount > 0 &&
                    <Button disabled={props.progress} onClick={ () => props.getAllItems()} style={{textTransform: 'none'}} variant="contained" color="primary">
                        Export ({props.totalCount} records)
                    </Button> }

                { props.filterMood && <IconButton
                    style={{ padding: 0 }}
                    color="inherit"
                    onClick={() => props.clearFilter()}
                    edge="start">
                    <Icons name={IconKeys.cancel} style={{ marginLeft: 32, marginRight: 32 }} />
                </IconButton> }

            </Grid>
        </Grid>
    );
}


