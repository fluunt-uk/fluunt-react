import React, {Component} from 'react'
import "./homepage.scss"
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Homepage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'My Profil',
        }

        localStorage.setItem('currentUser', JSON.stringify(""));
    }

    render() {

        return (
            <div>
                <div className="banner">
                    <div className="slogan">
                        <span>Do the Most Meaningful Work</span>
                        <p>of Your Career</p>
                    </div>
                </div>

                <div className="search-bar">
                    <button type="button" className="btn btn-primary"><p>Search</p></button>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="filter">
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="col-sm-4 ">
                                    <div className="job-card">
                                        <div className="job-spec">Software Engineer</div>
                                    </div>
                                </div>
                                <div className="col-sm-4 ">
                                    <div className="job-card">
                                        <div className="job-spec">Software Engineer</div>
                                    </div>
                                </div>
                                <div className="col-sm-4 ">
                                    <div className="job-card">
                                        <div className="job-spec">Software Engineer</div>
                                    </div>
                                </div>
                            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage))