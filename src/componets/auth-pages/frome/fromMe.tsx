import * as React from 'react'
import {Paper, Container, Box,Typography, Tabs, Tab} from "@material-ui/core"
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Icons, IconKeys} from '../../Standard UI/Icon'
import { IconColor, Colors } from '../../res/color'
import { FromMeItem } from './fromMe.ui';
import { AWBList } from './awb';
import { OrderList } from './order';
import { PickupList } from './pickup';

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
        key={index}
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

export function FromMe(props:any){
  
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    return(
        <Container maxWidth={false}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1} style={{paddingTop: "2%"}}>
                    <TabPanel key={1} value={value} index={0}>
                        {AWBList()}
                    </TabPanel>
                    <TabPanel key={2} value={value} index={1}>
                        {OrderList()}
                    </TabPanel>
                    <TabPanel key={3} value={value} index={2}>
                        {PickupList()}
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
                            <Tab key={1} label="AWB List"  icon={<Icons name={IconKeys.awbList} />}  {...a11yProps(0)} />     
                            <Tab key={2} label="Draft AWB List" icon={<Icons name={IconKeys.orderList} />}  {...a11yProps(1)}  />
                            <Tab key={3} label="Pickup List" icon={<Icons name={IconKeys.pickup} />}  {...a11yProps(2)} />
                    </Tabs>
                </Box>
            </Box>
        </Container>
    )
    
}