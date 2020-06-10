import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../actions"
import Spinner from "../shared/Spinner";
import ReCAPTCHA from "react-google-recaptcha/lib/esm/recaptcha-wrapper";
import {RECAPTCHA_KEY} from "../../constants/index";
import "./login.css"

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }

        this.login = this.login.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value,
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.currentUser) {
    //         this.props.history.push('/')
    //     }
    // }

    login(e) {
        e.preventDefault()
        const recaptchaValue = recaptchaRef.current.getValue();

        if (this.validateFields(recaptchaValue)) {
            this.props.login({email: this.state.email, password: this.state.password, token: recaptchaValue}, this.props)
        }
    }

    validateFields(value) {
        console.log("Captcha vaslue:", value);

        if( value === "" || this.state.email === "" || this.state.password === "" ) {
            let alert = document.querySelector(".alert-custom");
            alert.style.display = "block";
            alert.textContent = "Missing information"
            return false
        }

        return true
    }

    render() {

        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <div>
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    Please sign in
                                </div>
                                <div className="card-body col-8 mx-auto">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="inputEmail">Email address</label>
                                            <input required name="email" value={this.state.email}
                                                   type="email" className="form-control"
                                                   id="inputEmail"
                                                   onChange={this.changeHandler}
                                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword">Password</label>
                                            <input required name="password" value={this.state.password}
                                                   type="password" className="form-control"
                                                   id="inputPassword" placeholder="Password"
                                                   onChange={this.changeHandler}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary"
                                                onClick={this.login}>
                                            Submit
                                        </button>
                                        <Link className="btn btn-success ml-1" to="/register">
                                            Register
                                        </Link>
                                        <br></br>
                                        <br></br>

                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey= {RECAPTCHA_KEY}
                                            onChange={this.validateFields}

                                        />
                                        <p id="error" className="alert-custom"></p>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
const recaptchaRef = React.createRef();

const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user, ownProps) => dispatch(login(user,ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
