import React from 'react';
import {Switch} from 'react-router-dom';

import asyncComponent from './AsyncComponent'
import NotAuthenticated from "./NotAuthenticated";
import Authorization from "./Authorization";
import {RegisterFormik} from '../components/auth/RegisterFormik'



const Homepage = asyncComponent(() =>
    import('../components/layout/Homepage').then(module => module.default)
)

// const Adverts = asyncComponent(() =>
//     import('../components/adverts/Adverts').then(module => module.default)
// )

const Page404 = asyncComponent(() =>
    import('../components/errors/Page404').then(module => module.default)
)

const Page403 = asyncComponent(() =>
    import('../components/errors/Page403').then(module => module.default)
)


const ListUser = asyncComponent(() =>
    import('../components/users/ListUser').then(module => module.default)
)

const CreateUser = asyncComponent(() =>
    import('../components/users/CreateUser').then(module => module.default)
)

const Login = asyncComponent(() =>
    import('../components/auth/Login').then(module => module.default)
)

const Register = asyncComponent(() =>
    import('../components/auth/Register').then(module => module.default)
)

const Profil = asyncComponent(() =>
    import('../components/auth/Profil').then(module => module.default)
)

const Datatable = asyncComponent(() =>
    import('../components/datatable/datatable').then(module => module.default)
)

const Router = () => {

    return (
        <Switch>
            {/*<Authorization  path='/adverts' component={Adverts}/>*/}

            <Authorization exact path='/users' component={ListUser} permission="crud"/>
            <Authorization path='/users/add' component={CreateUser} permission="crud"/>

            <NotAuthenticated path="/login" component={Login}/>
            <NotAuthenticated path="/" component={Homepage}/>
            <NotAuthenticated path="/register" component={Register}/>
            <NotAuthenticated path="/r" component={RegisterFormik}/>

            <Authorization path="/profil" component={Profil}/>

            <Authorization path="/datatable" component={Datatable}/>

            <Authorization exact path="/page-403" component={Page403}/>
            <Authorization exact path="*" component={Page404}/>
        </Switch>
    );
}

export default Router;
