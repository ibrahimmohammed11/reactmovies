import React, { Component, Fragment } from 'react';
import img2 from "../../images/signin-image.jpg"
import { Link } from 'react-router-dom';
import axios from "axios";

import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./style.module.css";

export default class Login extends Component {
    render() {
        return (
            <Fragment>
                <ToastContainer />

                <section className="mt-3">
                    <div className={Styles.container1}>
                        <div className={Styles.signin_content}>
                            <div className={`${Styles.signin_image} text-center`}>
                                <img src={img2} alt="loginIn" className="ml-5" />
                                <div className="mt-3">
                                    <Link to="/register" className={Styles.linkSt}>Create an account</Link>

                                </div>
                            </div>

                            <div className={Styles.signin_form}>
                                <h2 className={Styles.form_title}>Login In</h2>
                                <h3 className="mainColor">
                                    <span className="text-muted">Please Enter :</span>
                                    <br /> <strong>Email:</strong> <span style={{ fontSize: "25px" }}>ibrahimmo9@gmail.com</span><br /><strong>Password:</strong> 123456$a<br />
                                    <span className="text-muted">to Enter The Website</span>
                                </h3>

                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: ""
                                    }}
                                    validationSchema={yup.object().shape({
                                        email: yup.string().required().email(),
                                        password: yup
                                            .string()
                                            .required('Please Enter your password')
                                            .matches(
                                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                            ),
                                    })}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        setTimeout(async () => {
                                            // alert(JSON.stringify(values, null, 2));
                                            let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", values);
                                            if (data.message === "success") {
                                                localStorage.setItem("token", data.token)
                                                this.props.history.replace("/home")
                                            } else {
                                                toast.error(data.message)
                                                localStorage.clear();
                                            }
                                            // console.log(data);
                                            setSubmitting(false);
                                            // resetForm();
                                        }, 400);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className={`${Styles.formIcon} form-group`}>
                                                <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                                                <Field type="email" name="email" placeholder="Your Email" />
                                                <ErrorMessage name="email" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div className={`${Styles.formIcon} form-group`}>
                                                <label ><i className="fas fa-lock"></i></label>
                                                <Field type="password" name="password" placeholder="Password" />
                                                <ErrorMessage name="password" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div className="mt-3">
                                                <button type="submit" disabled={isSubmitting} className={Styles.form_submit}  >
                                                    Log In
                                                </button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
