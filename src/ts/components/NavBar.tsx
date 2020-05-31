import { 
    BrowserRouter as Router, 
    Route , 
    NavLink  
} from "react-router-dom"
import { 
    Home, 
    Ads, 
    mapStateToProps,
    StateTypes,
    Logo2 
} from '.'
import { connect } from "react-redux";
import React, { Component } from "react";
import '../../css/App.css';

class NavBar extends Component<StateTypes>{
    render(){
       return ( 
            <Router>
                <div>
                    <nav>
                        <div className='nav_global'>
                            <img className="logo2" src={Logo2} alt="logo"/>
                            <div id='navbar_i'><NavLink  to='/' exact activeClassName='active' > Home </NavLink ></div>
                            <div id='navbar_i'><NavLink  to='/ads' exact activeClassName='active' > Page 2  </NavLink ></div>
                        </div>
                    </nav>
                    <Route path ='/'   exact component={Home} /> 
                    <Route path='/ads' exact  component={Ads} />
                </div>
            </Router>
        )   
    }
}

export default connect(mapStateToProps)(NavBar)