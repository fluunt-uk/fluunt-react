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
                <form >
                    <h1>
                        Sign in
                    </h1>
                    <div className="form-content">
                        <input required name="email" value={this.state.email}
                               type="email"
                               id="email"
                               onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="email"/>
                        <input required name="password" value={this.state.password}
                               type="password"
                               id="password" placeholder="password"
                               onChange={this.changeHandler}
                        />
                        <br></br>
                        <div className="button" onClick={this.login}>
                            Log in
                        </div>
                        <div className="g-recaptcha">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={RECAPTCHA_KEY}
                                onChange={this.validateFields}

                            />
                        </div>
                        <br></br>
                        <p id="error" className="alert-custom"></p>
                        <div className="signup-message">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>

                </form>
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
