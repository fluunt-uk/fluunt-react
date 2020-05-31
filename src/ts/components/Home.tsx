import { 
  Login, 
  Register, 
  mapDispatchToProps, 
  mapStateToProps, 
  StateTypes,
  PropItems,
  Logo
} from '.';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component<PropItems & StateTypes>{
  
  render(){
    let LState = this.props.Components.LoginPageState
    return(
      <div className="home_container">
        <img className="logo" src={Logo} alt="logo"/>
        {(LState) ? <Login/> : <Register/>}
        <div className='home_btn_container'>
          <button className={(LState)  ?"btn_active" :"btn_inactive"} onClick={()=>{this.props.Status({LoginPageState:true})}}>Login</button>
          <button className={(!LState) ?"btn_active" :"btn_inactive"} onClick={()=>{this.props.Status({LoginPageState:false})}}>Register</button> 
        </div>
      </div>
    )
  }
}
function Props(state:StateTypes){  
  return (mapStateToProps(state));
}
function Dispatch(dispatch:any){  
  return mapDispatchToProps(dispatch);
}

export default connect(Props, Dispatch)(Home)



