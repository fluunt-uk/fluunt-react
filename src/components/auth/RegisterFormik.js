import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha/lib/esm/recaptcha-wrapper";
import {RECAPTCHA_KEY} from "../../constants";

export class RegisterFormik extends React.Component {

    validateCaptcha(val) {
        return val !== "";
    }

    render() {
        return(
            <Formik
                initialValues={{
                    first_name: '',
                    surname: '',
                    email: '',
                    password: '',
                    c_password: '',
                }}

                validationSchema={Yup.object({
                    first_name: Yup.string()
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

                onSubmit={fields => {
                    const recaptchaValue = recaptchaRef.current.getValue();
                    console.log(fields, recaptchaValue)
                    if(this.validateCaptcha(recaptchaValue)) {
                        // this.props.register(fields)
                        console.log("Success")
                        this.props.register({firstname: fields.first_name, surname: fields.surname, email: fields.email, password: fields.password}, this.props)
                    }
                    console.log("Failed")
                }}

                render={({ errors, status, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstname">Firstname</label>
                            <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
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
