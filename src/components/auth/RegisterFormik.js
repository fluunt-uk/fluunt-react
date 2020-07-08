import React, {Component} from 'react'
import { Formik, FormikProps, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha/lib/esm/recaptcha-wrapper";
import {RECAPTCHA_KEY} from "../../constants";
import {register} from "../../actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class RegisterFormik extends Component {

    validateCaptcha(val) {
        return val !== "";
    }

    render() {
        return(
            <Formik
                initialValues={{
                    firstname: '',
                    surname: '',
                    email: '',
                    password: '',
                    c_password: '',
                }}

                validationSchema={Yup.object({
                    firstname: Yup.string()
                        .min(3, 'Must be at least 3 characters.')
                        .max(15, 'Must be less than 15 characters or less')
                        .required('Required'),
                    surname: Yup.string()
                        .min(3, 'Must be at least 3 characters.')
                        .max(15, 'Must be less than 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .required('Required')
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                    c_password: Yup.string()
                        .required('Required')
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                })}

                onSubmit={(values, actions) => {
                    const recaptchaValue = recaptchaRef.current.getValue();

                    if(this.validateCaptcha(recaptchaValue)) {
                        console.log(values)
                        this.props.register({
                            firstname: values.firstname,
                            surname: values.surname,
                            email: values.email,
                            password: values.password,
                            recaptcha_token: recaptchaValue
                        }, this.props)
                    }
                }}

                render={({ errors, status, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstname">Firstname</label>
                            <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                        </div>
                        <div>
                            <label htmlFor="surname">Surname</label>
                            <Field name="surname" type="text" className={'form-control' + (errors.surname && touched.surname ? ' is-invalid' : '')} />
                            <ErrorMessage name="surname" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="c_password">Confirm Password</label>
                            <Field name="c_password" type="password" className={'form-control' + (errors.c_password && touched.c_password ? ' is-invalid' : '')} />
                            <ErrorMessage name="c_password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                        </div>

                        <div className="g-recaptcha">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={RECAPTCHA_KEY}
                                onChange={this.validateCaptcha}
                            />
                        </div>
                    </Form>
                )}
            />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterFormik))
