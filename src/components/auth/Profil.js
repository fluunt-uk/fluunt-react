import React, {Component} from 'react'
import {Redirect, withRouter} from "react-router-dom"
import connect from "react-redux/es/connect/connect";
import "./profile.css"


class Profil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'My Profil',
        }

    }

    render() {

        if (!this.props.currentUser) {
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="card bg-light " v-if="user">
                    <div className="card-body">

                        <div className="">
                            <h6 className=""> { " First Name   " + this.props.currentUser.user_data.firstname}</h6>
                        </div>

                        <div className="">
                            <h6 className=""> { " Email :  " + this.props.currentUser.user_data.email}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profil))
