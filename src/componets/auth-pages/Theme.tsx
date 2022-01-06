import * as React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icons, IconKeys } from '../Standard UI/Icon';
import { Colors, IconColor } from '../res/color';
import { Switch, Route, Router } from 'react-router';
import { Login } from '../pages/login/login';
import { BrowserRouter } from 'react-router-dom';
import { Tome } from './tome/tome';
import history from '../history';
import { Box } from '@material-ui/core';
import AuthContext from '../../context/Api.context';
import auth from '../../auth/auth';
import authContext from '../../context/Api.context';
import { FromMe } from './frome/fromMe';
import LogoutDialog from './logout/LogoutDialog';
import { History } from './history/history';
import { Tracking } from './tracking/tracking';
import { TomeDetails } from './tome/details/tome.details';
import { DeliveryOption } from './tome/deliveryOption/devliceryOption';
import tomeContext, { ToMeProvider } from '../../context/tome.context';
import { ToMeListProvider } from '../../context/tomelist.context';
import { FromMeAdd } from './frome/Add/Add.fromme';
import { PickupRequestForm } from './frome/pickupRequestForm/PickupRequest';
import { FromMeProvider } from '../../context/awb.context';
import { OrderDetails } from './frome/orderDetails/order.details';
import { PrintOrder } from './frome/printOrder'
import { ImportOrder } from './frome/importOrder'
import { AWBDetails } from './frome/awbDetails/awb.details';
import { PickUpDetails } from './frome/pickupDetails/pickup.details';
import { CheckPrice } from './frome/Check_Price/checkPrice';
import { ProofOfDelievery } from './frome/awbDetails/proofOfDelievery/proofOfDelievery';
import { AboutUs } from './aboutUs.tsx/aboutUs';
import { TermsAndConditions } from './termsAndConditions/termsAndConditions';
import { profile } from './profile/profile';
import { Home } from './home/home';
import { Statement, statementDetails, creditNoteDetails } from './statement /statement';
import { ImportOrderProvider } from '../../context/import.context';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: Colors.THEME_PRIMARY,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolbarRight: {
      marginLeft: "auto"
    },
    content: {
      flexGrow: 1,
      marginTop: "64px"
    },
  }),
);

const MenuButton = ({ icon, name, onClick }: { icon: IconKeys, name: string, onClick: Function }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" style={{ paddingLeft: 30, paddingRight: 30 }}>
      <IconButton
        style={{ padding: 0 }}
        color="inherit"
        onClick={() => onClick()}
        edge="start">
        <Icons name={icon} style={{ marginRight: 4 }} />
        <Typography variant="subtitle2" align="center" style={{ color: Colors.DARK_GREY }}>{name}</Typography>
      </IconButton>
    </Box>
  )
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = React.useContext(AuthContext)
  const [openLogout, setOpenLogout] = React.useState(false)

  React.useEffect(() => {
    auth.getUserData()
    if (JSON.stringify(auth.getUserData()) != JSON.stringify(state)) {
      dispatch(auth.getUserData())
    }
  }, [])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon htmlColor={Colors.THEME_SECONDARY} />
          </IconButton>
          <Typography variant="h6" noWrap style={{ color: Colors.THEME_SECONDARY }}>
            <authContext.Consumer>
              {
                ([state]) => <span>{state.user_data ? state.user_data.name : ""}</span>
              }
            </authContext.Consumer>
          </Typography>

          <Box className={classes.toolbarRight}>
            {
              window.location.pathname == "/home/tome/details" &&
              <Box display="flex" flexDirection="row">
                <MenuButton icon={IconKeys.calender} name="Change Request" onClick={() => history.push("/home/tome/details/deliveryoption")} />
              </Box>
              // <IconButton
              //   color="inherit"
              //   onClick={()=>history.push("/home/tome/details/deliveryoption")}
              //   edge="start">
              //   <Icons name={IconKeys.calender} />
              // </IconButton>
            }
            {
              window.location.pathname == "/home/fromme" &&
              <Box display="flex" flexDirection="row">
                <MenuButton icon={IconKeys.quote} name="Check Price" onClick={() => history.push("/home/fromme/quote")} />
                <MenuButton icon={IconKeys.add} name="Create Draft AWB" onClick={() => history.push("/home/fromme/add")} />
                <MenuButton icon={IconKeys.pickup} name="Request Pickup" onClick={() => history.push("/home/fromme/pickup")} />
              </Box>
            }
            {
              window.location.pathname == "/home/fromme/AWBDetails" &&

              <Box display="flex" flexDirection="row">
                <MenuButton icon={IconKeys.proofOfDelivery} name="POD" onClick={() => {
                  if (localStorage.getItem("@receiver_type") == "false") alert("This AWB is not deliverd yet")
                  if (localStorage.getItem("@receiver_type") == "true") history.push("/home/fromme/AWBDetails/proofOfDelievery")
                }} />
              </Box>
              // <IconButton
              //     color="inherit"
              //     onClick={()=>{
              //       if(localStorage.getItem("@receiver_type") == "false") alert("This AWB is not deliverd yet")
              //       if(localStorage.getItem("@receiver_type") == "true") history.push("/home/fromme/AWBDetails/proofOfDelievery")
              //     }}
              //     edge="start">
              //     <Icons name={IconKeys.proofOfDelivery} />
              //   </IconButton>
            }
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon htmlColor={Colors.THEME_SECONDARY} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button
            key={"home"}
            onClick={() => history.push("/home/dashboard")}
            selected={window.location.href.search("dashboard") >= 0 ? true : false}>
            <ListItemIcon><Icons name={IconKeys.home} /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button
            key={"To Me"}
            onClick={() => history.push("/home/tome")}
            selected={window.location.href.search("tome") >= 0 ? true : false}>
            <ListItemIcon><Icons name={IconKeys.toMe} /></ListItemIcon>
            <ListItemText primary={"To Me"} />
          </ListItem>
          <ListItem button
            onClick={() => history.push("/home/fromme")}
            selected={window.location.href.search("fromme") >= 0 ? true : false}
            key={"From Me"}>
            <ListItemIcon><Icons name={IconKeys.fromMe} /></ListItemIcon>
            <ListItemText primary={"From Me"} />
          </ListItem>
          <ListItem button key={"History"}
            onClick={() => history.push("/home/history")}
            selected={window.location.href.search("history") >= 0 ? true : false}>
            <ListItemIcon><Icons name={IconKeys.history} /></ListItemIcon>
            <ListItemText primary={"History"} />
          </ListItem>
          <ListItem button key={"Tracking"}
            onClick={() => history.push("/home/tracking")}
            selected={window.location.href.search("tracking") >= 0 ? true : false}>
            <ListItemIcon><Icons name={IconKeys.tracking} /></ListItemIcon>
            <ListItemText primary={"Tracking"} />
          </ListItem>

          <ListItem button key={"customerstatement"}
            onClick={() => history.push("/home/statement")}
            selected={window.location.href.search("statement") >= 0 ? true : false}>
            <ListItemIcon><Icons name={IconKeys.statement} /></ListItemIcon>
            <ListItemText primary={"Statement"} />
          </ListItem>

        </List>
        <Divider />
        <List>
          <List>
            <ListItem button key={"Profile"}
              onClick={() => history.push("/home/profile")}
              selected={window.location.href.search("profile") >= 0 ? true : false}>
              <ListItemIcon><Icons name={IconKeys.username} /></ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button key={"Terms & Conditions"}
              onClick={() => history.push("/home/t&c")}
              selected={window.location.href.search("t&c") >= 0 ? true : false}>
              <ListItemIcon><Icons name={IconKeys.terms} /></ListItemIcon>
              <ListItemText primary={"Terms & Conditions"} />
            </ListItem>
            <ListItem button key={"About Us"}
              onClick={() => history.push("/home/aboutus")}
              selected={window.location.href.search("aboutus") >= 0 ? true : false}>
              <ListItemIcon><Icons name={IconKeys.about} /></ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItem>
            <ListItem button key={"Logout"} onClick={() => {
              setOpenLogout(true)
            }}>
              <ListItemIcon><Icons name={IconKeys.logout} /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </List>
      </Drawer>
      <main className={classes.content}>
        <LogoutDialog state={openLogout} cb={staus => {

          if (staus) {
            auth.logout(() => {
              history.push("/")
            })
          }
          setOpenLogout(false)
          return {}
        }} />
        <Router history={history}>
          <Switch>
            <Route path="/home/dashboard" exact component={Home} />

            <Route path="/home/tome" exact>
              <ToMeProvider> <Tome />  </ToMeProvider>
            </Route>

            <Route path="/home/tome/details" exact>
              <ToMeProvider> <TomeDetails /> </ToMeProvider>
            </Route>

            {/* <Route path="/home/tome/excel" component={ToMeExcel} exact/>  */}
            {/* <Route path="/home/tome/excel" exact> 
                    <ToMeListProvider> <ToMeExcel /> </ToMeListProvider>
                  </Route> */}


            <Route path="/home/tome/details/deliveryoption" exact>
              <ToMeProvider> <DeliveryOption /> </ToMeProvider>
            </Route>

            <Route path="/home/fromme" exact render={(props) => (
              <FromMeProvider>
                <FromMe {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/OrderDetails" exact render={(props) => (
              <FromMeProvider>
                <OrderDetails {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/PrintOrder" exact render={(props) => (
              <FromMeProvider>
                <PrintOrder {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/AWBDetails" exact render={(props) => (
              <FromMeProvider>
                <AWBDetails {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/PickUpDetails" exact render={(props) => (
              <FromMeProvider>
                <PickUpDetails {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/ImportOrder" exact render={(props) => (
              <FromMeProvider>
                <ImportOrder {...props} />
              </FromMeProvider>
            )} />

            <Route path="/home/fromme/AWBDetails/proofOfDelievery" exact render={(props) => (
              <FromMeProvider>
                <ProofOfDelievery {...props} />
              </FromMeProvider>
            )} />



            <Route path="/home/statement" component={Statement} exact />
            <Route path="/home/statement/details" component={statementDetails} exact />
            <Route path="/home/statement/credit_notes" component={creditNoteDetails} exact />


            <Route path="/home/fromme/quote" component={CheckPrice} exact />
            <Route path="/home/fromme/pickup" component={PickupRequestForm} exact />
            <Route path="/home/fromme/add" component={FromMeAdd} exact />

            <Route path="/home/history" component={History} />
            <Route path="/home/tracking" component={Tracking} />

            <Route path="/home/profile" component={profile} />
            <Route path="/home/t&c" component={TermsAndConditions} />
            <Route path="/home/aboutus" component={AboutUs} />

          </Switch>
        </Router>
      </main>
    </div>
  );
}
