import { BrowserRouter as Router, Route , NavLink } from "react-router-dom"
import { Home, Ads, mapStateToProps, StateTypes, ComingSoon} from '../'
import React, { Component } from "react";
import { connect } from "react-redux";
import { Logo_2} from "../../resources"
import '../../css/App.css';

class NavBar extends Component<StateTypes>{
    render(){
       return ( 
            <Router >
                <div >
                <ComingSoon/>
                    <nav>
                        <div className='nav_global'>
                            <img className="logo2" src={Logo_2} alt="logo"/> 
                            <div id='navbar_i'><NavLink  to='/' exact activeClassName='active' > Home       </NavLink ></div>
                            <div id='navbar_i'><NavLink  to='/ads'  exact activeClassName='active' > Applicants </NavLink ></div>
                            <div id='navbar_i'><NavLink  to='/refs' exact activeClassName='active'>  Referrers  </NavLink ></div>
                            <div id='navbar_i'><NavLink  to='/aus'  exact activeClassName='active'>  About Us   </NavLink ></div>
                        </div>
                    </nav>
                    <Route path ='/'       exact component={Home} /> 
                    <Route path='/ads'     exact  component={Ads} />
                    <Route path ='/refs'   exact component={Ads} /> 
                    <Route path='/aus'     exact  component={Ads} />
                </div>
            </Router>
        )   
    }
}

export default connect(mapStateToProps)(NavBar)