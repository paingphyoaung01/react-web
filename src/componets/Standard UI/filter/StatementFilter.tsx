import * as React from 'react'
import { Button, Paper, Container, Box, Typography, Tabs, Tab, Chip, Avatar, Grid, Select, MenuItem, TextField, Checkbox, FormControlLabel, Radio, makeStyles, InputBase, createStyles, Theme } from "@material-ui/core"
import { getCity, cityProps, getTownship, townshipProps } from '../../../lib/storage/CityAndTownship'
import { CustomizedAutoCompleteBox } from '../Input/CustomizedInputs'
import IconButton from '@material-ui/core/IconButton';
import { Icons, IconKeys } from '../Icon'
import { IconColor, Colors } from '../../res/color'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CustomizedButton, CustomizedLinkButton } from '../button/CustomizedButton'
import * as moment from 'moment'
import { Excel } from '../../../lib/excel/excel';
import { LinearProgress } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';

type params = {
    openFilter: boolean,
    title: string,
    filterFromDate: string | Date,
    onChangeFromDate: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    filterToDate: string | Date,
    onChangeToDate: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    onCloseDialog: Function,
    onFilter: Function,
  }
export function StatementsFilter(props:params) {

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
    renderChipList: Function,
    filterMood: boolean,
    clearFilter: Function,
    onOpenDialog : Function,
    loading : boolean,
}
export function StatementsFilterBar(props: filterBar) {

    return (
        <Grid container style={{ marginBottom: 10, padding: 4 }} spacing={0}>
            <Grid item xs={3} style={{ padding: 8 }}>
                <Typography variant="h6" component="h6">Customer Statement</Typography> 
            </Grid>

            <Grid item xs={5} style={{ padding: 8, backgroundColor: "#F1F1F1"  }}>
                {props.renderChipList()}
            </Grid>

            <Grid item xs={3} container justify="flex-end" style={{ backgroundColor: "#F1F1F1" }}>
                { !props.filterMood && <CustomizedButton
                    label="Filter"
                    icon={IconKeys.filter}
                    containerStyle={{ justifyContent: "center", alignContent: "center", marginRight : 16 }}
                    onClick={() => props.onOpenDialog()}
                    buttonColor={Colors.THEME_PRIMARY}
                    loading={props.loading}
                /> }

                { props.filterMood && <IconButton
                    color="inherit"
                    onClick={() => props.clearFilter()}
                    edge="start">
                    <Icons name={IconKeys.cancel} style={{ marginLeft: 32, marginRight: 32 }} />
                </IconButton>}

            </Grid>
        </Grid>
    );
}


