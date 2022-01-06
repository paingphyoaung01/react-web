import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab, makeStyles, InputBase, createStyles} from "@material-ui/core"
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import { toMe, searchByName, fromMe } from '../../../lib/api'
import { ToMeList } from '../../../lib/types/tome.types'
import { IconButton,Theme } from "@material-ui/core"
import { ShowTracking } from './tracking.ui'
import { MagicSpinner } from 'react-spinners-kit'
import { FromMeList } from '../../../lib/types/fromme.types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 30,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      borderBottomColor: Colors.THEME_PRIMARY
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);



export function Tracking(){

    const classes = useStyles();
    const [awbNumber,setAwbNumber] = React.useState("")
    const [info,setInfo] = React.useState<FromMeList|null>(null)
    let [loadingStatus,setLoadingStatus] = React.useState(false)

    const apiCall = async () =>{
        try {
            setLoadingStatus(true)
            const results = await searchByName(awbNumber)
            setInfo(results)
        } catch (error) {
            alert(error.message||error||"Invalid Id")
        }
        finally{
            setLoadingStatus(false)
        }
    }


    return(
        <Container maxWidth={false}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={3} style={{paddingTop: "2%"}}>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Type your order/awb number"
                            inputProps={{ 'aria-label': "Type your order/awb number" }}
                            onChange={e=>setAwbNumber(e.target.value)}
                            onKeyDown={e=>{if(e.key == "Enter"){
                                apiCall()
                            }}}
                        />
                        <IconButton 
                            type="button" 
                            className={classes.iconButton} 
                            aria-label="search" 
                            onClick={()=>apiCall()}
                        >
                            <Icons name={IconKeys.search} />
                        </IconButton>

                    </Paper>
                    {
                        loadingStatus && 
                            <Box display="flex" justifyContent="center" alignItems="center" height="500px">
                                <MagicSpinner  size={100} color={Colors.THEME_SECONDARY} loading={true} />
                            </Box>
                    }

                    {
                        !loadingStatus && 
                            <Paper>
                                {info && info.id ? ShowTracking(info) : <div />}
                            </Paper>
                    }
                </Box>
                <Box flexGrow={1} style={{paddingTop: "2%"}} />
            </Box>
        </Container>
    )
    
}