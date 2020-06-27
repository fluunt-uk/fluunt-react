import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {login} from "../../actions"
import Spinner from "../shared/Spinner";
import ReCAPTCHA from "react-google-recaptcha/lib/esm/recaptcha-wrapper";
import {RECAPTCHA_KEY} from "../../constants/index";
import "./login.scss"
import logo from "../../assets/logo.png"

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

    isEmpty(event) {
        const name = event.target.name
        const value = event.target.value

        let alert = document.querySelector(".alert-custom");

        if (value === "") {
            alert.style.display = "block";
            alert.textContent = "Field " + name + "  cannot be empty"
        }else {
            alert.style.display = "none";
        }
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
            this.props.login({
                email: this.state.email,
                password: this.state.password,
                recaptcha_token: recaptchaValue
            }, this.props)
        }
    }

    validateFields(value) {
        console.log("Captcha value:", value);

        if (value === "" || this.state.email === "" || this.state.password === "") {
            let alert = document.querySelector(".alert-custom");
            alert.style.display = "block";
            alert.textContent = "Missing information"
            return false
        }

        return true
    }

    render() {

        if (this.props.loading) {
            return <Spinner/>
        }

        return (
            <div className="container">
                <img className="logo" src={logo}/>
                <div className="row">
                    <div className="col-12">
                        <form>
                            <h1 className="sign-in">
                                Log in to Fluunt
                            </h1>
                            <div className="form-content">
                                <input required name="email" value={this.state.email}
                                       type="email"
                                       id="email"
                                       onChange={this.changeHandler}
                                       onBlur={this.isEmpty}
                                       aria-describedby="emailHelp" placeholder="email"/>
                                <input required name="password" value={this.state.password}
                                       type="password"
                                       id="password" placeholder="password"
                                       onChange={this.changeHandler}
                                       onBlur={this.isEmpty}
                                />
                                <p id="error" className="alert-custom"></p>

                                <div id="primary" className="button" onClick={this.login}>
                                    Log in
                                </div>

                                <div id="secondary" className="button">
                                    <Link to="/login">
                                        Register
                                    </Link>
                                </div>

                                <div className="g-recaptcha">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={RECAPTCHA_KEY}
                                    />
                                </div>
                                <br></br>
                                <div className="forgot-password">
                                    <a href="#">Forgot your password?</a>
                                </div>

                            </div>
                        </form>
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
        login: (user, ownProps) => dispatch(login(user, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
