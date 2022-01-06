import * as React from 'react';

import '../styles/index.css';
import auth from '../auth/auth';
import { Login } from './pages/login/login';
import "./res/color.css"
import MiniDrawer from './auth-pages/Theme';
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from './history';
import { PrivateRoute, WelcomeRoute,LoginRoute } from './authRoute';
import {AuthProvider} from '../context/Api.context'
import { getCityTownship } from '../lib/api';
import { PhoneNumberConformation } from './pages/register/phoneNumberConformation';
import { confirmVerificationCode } from './pages/register/confirmVerificationCoder';
import { registerForm } from './pages/register/register';
import { EmailConformation } from './pages/forgetPassword/phoneNumberConformation';
import { forgetpasswordConfirmVerificationCode } from './pages/forgetPassword/confirmVerificationCoder';
import { forgetPassword } from './pages/forgetPassword/forgetPassword';


class App extends React.Component<any,any>{

	UNSAFE_componentWillMount(){
		getCityTownship().then(
			data=>localStorage.setItem("@App",JSON.stringify(data))
		).catch(error=>{
			alert(error.message)
		})
	}
 
	render() {
		return (
			<AuthProvider>
				<Router history={history}>
					<Switch>
						<WelcomeRoute path="/" exact />
						<Route path="/register" component={PhoneNumberConformation} exact={true}/>
						<Route path="/register/verification" component={confirmVerificationCode} exact={true} />
						<Route path="/register/form" component={registerForm} exact={true} />

						<Route path="/forgetpassword" component={EmailConformation} exact={true} />
						<Route path="/forgetpassword/verification" component={forgetpasswordConfirmVerificationCode} exact={true} />
						<Route path="/forgetpassword/form" component={forgetPassword} exact={true} />

						<WelcomeRoute path="/home" exact />
						<LoginRoute path="/login" Componet={Login} exact={true}/>
						<PrivateRoute path="/home/*" Componet={MiniDrawer} exact={true}/>
					</Switch>
				</Router>
			</AuthProvider>
		)
	}
}

export default App;