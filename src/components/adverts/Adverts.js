import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import Authorization from "../../router/Authorization";
import CreateAdvert from "./CreateAdvert";
import EditAdvert from "./EditAdvert";
import ShowAdvert from "./ShowAdvert";
import ListAdvert from "./ListAdvert";

class Adverts extends Component {

    render() {
        return (
            <div>
                <BreadcrumbsItem to='/adverts'>List Adverts</BreadcrumbsItem>
                <Switch>
                    <Authorization exact path='/adverts' component={ListAdvert}/>
                    <Authorization path="/adverts/add" component={CreateAdvert}/>
                    <Authorization path='/adverts/:id/edit' component={EditAdvert}/>
                    <Authorization path='/adverts/:id/show' component={ShowAdvert}/>
                </Switch>
            </div>
        );
    }


}

export default withRouter(Adverts);
