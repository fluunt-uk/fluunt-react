import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {register} from "../../actions"
import Spinner from "../shared/Spinner";
import ReCAPTCHA from "react-google-recaptcha/lib/esm/recaptcha-wrapper";
import {RECAPTCHA_KEY} from "../../constants";


class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'Register',
            user: {
                firstname: '',
                surname: '',
                email: '',
                password: '',
                c_password: '',
            }
        }

        this.register = this.register.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        })

    }

    register(e) {
        e.preventDefault()
        const recaptchaValue = recaptchaRef.current.getValue();

        const { firstname, surname, email, password } = this.state.user;

        if(this.validateFields(recaptchaValue)){
            this.props.register({firstname: firstname, surname: surname, email: email, password: password}, this.props)
        }
    }

    validateFields(value) {

        // let alert = document.querySelector(".alert-custom");
        // alert.style.display = "block";
        // alert.textContent = "Missing information"

        console.log("Captcha value:", value);

        const { firstname, surname, email, password, c_password } = this.state.user;

        if( value !== "" && firstname !== "" && surname !== "" && email !== "" && password !== "" && c_password !== "") {
            if (password === c_password){
                return true
            }
            console.log("Mismatching passwords")
            return false
        }
        console.log("Missing Information")
        return false
    }

    render() {

        if (this.props.loading) {
            return <Spinner/>
        }


        return (
            <div>

                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    {this.state.pagetitle}
                                </div>
                                <div className="card-body col-10 mx-auto">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="firstname">Firstname</label>
                                            <input name="firstname" value={this.state.user.name} type="text"
                                                   className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="firstname" placeholder="Enter Firstname"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="surname">Surname</label>
                                            <input name="surname" value={this.state.user.name} type="text"
                                                   className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="surname" placeholder="Enter Surname"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">email</label>
                                            <input name="email" value={this.state.user.email} type="email"
                                                   className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="email" placeholder="Enter email"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password </label>
                                            <input name="password" value={this.state.user.password}
                                                   type="password" className="form-control"
                                                   id="password" placeholder="password"
                                                   onChange={this.changeHandler}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="c_password">Confirm Password </label>
                                            <input name="c_password" value={this.state.user.c_password}
                                                   type="password" className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="c_password" placeholder="Confirm Password"/>
                                        </div>

                                        <button type="submit" className="btn btn-primary"
                                                onClick={this.register}>
                                            Submit
                                        </button>

                                        <div className="g-recaptcha">
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={RECAPTCHA_KEY}
                                                onChange={this.validateFields}
                                            />
                                        </div>
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
        register: (user, ownProps) => dispatch(register(user, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
