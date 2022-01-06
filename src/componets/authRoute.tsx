import * as React from 'react';
import auth from '../auth/auth';
import { Route, Redirect } from 'react-router';

export function PrivateRoute({Componet,path,exact}:{Componet:any,path:string,exact:boolean}) {

    return <Route path={path} exact={exact} render={(props)=>(
        auth.isAuthenticate()? <Componet {...props} /> : <Redirect to='/login' />
    )}/>
    
}

export function LoginRoute({Componet,path,exact}:{Componet:any,path:string,exact:boolean}) {
    return <Route path={path} exact={exact} render={(props)=>(
        !auth.isAuthenticate()? <Componet {...props} /> : <Redirect to='/home/dashboard' />
    )}/>
}

export function WelcomeRoute({path,exact}:{path:string,exact:boolean}) {
    return <Route path={path} exact={exact} render={(props)=>(
        auth.isAuthenticate()? <Redirect to='/home/dashboard' /> : <Redirect to='/login' />
    )}/>
    
}