import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab} from "@material-ui/core"
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import {FroMeHistoryList} from './fromme.history'
import { ToMeHistoryList } from './tome.history';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 2,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tab:{
        width:"100%"
    }
  }));

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>{children}
          </Box>
        )}
      </div>
    );
  }

export function History(){

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    return(
        <Container maxWidth={false}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1} style={{paddingTop: "2%"}}>
                    <TabPanel value={value} index={0}>
                      {ToMeHistoryList()}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {FroMeHistoryList()}  
                    </TabPanel>
                </Box>
                <Box style={{paddingTop: "2%"}} >
                    <Typography 
                        align="center"
                        style={{fontWeight:"bold"}}>
                            {/* <Icons name={IconKeys.fromMe} /> */}
                            Menu</Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="secondary"
                        orientation="vertical"
                        TabIndicatorProps={{style: {width:"8px",}}}>
                            <Tab label="To Me" icon={<Icons name={IconKeys.toMe} />}  {...a11yProps(0)}  />
                            <Tab label="From Me"  icon={<Icons name={IconKeys.fromMe} />}  {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Box>
        </Container>
    )
    
}