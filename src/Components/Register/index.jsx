import React, { Component, Fragment } from 'react';
import img1 from "../../images/signup-image.jpg"
import { Link } from 'react-router-dom';
import axios from "axios";
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./style.module.css";




export default class Register extends Component {

    render() {

        return (
            <Fragment>
                <ToastContainer />

                <section className="mt-3">
                    <div className={Styles.container1}>
                        <div className={Styles.signup_content}>
                            <div className={Styles.signup_form}>
                                <h2 className={Styles.form_title}>Sign up</h2>

                                <Formik
                                    initialValues={{
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        password: "",
                                        age: ""
                                    }}
                                    validationSchema={yup.object().shape({
                                        first_name: yup.string().required(),
                                        last_name: yup.string().required(),
                                        email: yup.string().required().email(),
                                        password: yup
                                            .string()
                                            .required('Please Enter your password')
                                            .matches(
                                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                            ),
                                        age: yup.number().required().positive().integer(),
                                    })}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        setTimeout(async () => {
                                            // alert(JSON.stringify(values, null, 2));
                                            let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signup", values);
                                            if (data.message === "success") {
                                                this.props.history.replace("/login")
                                            } else {
                                                // this.props.history.replace("/register")
                                                toast.error("Email is already exist")
                                            }
                                            console.log(data.message);
                                            setSubmitting(false);
                                            // resetForm();
                                        }, 400);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className={Styles.register_form}>
                                            <div >
                                                <label ><i className="fas fa-user"></i></label>
                                                <Field type="text" name="first_name" placeholder="First Name" />
                                                <ErrorMessage name="first_name" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div >
                                                <label ><i className="fas fa-user"></i></label>
                                                <Field type="text" name="last_name" placeholder="Last Name" />
                                                <ErrorMessage name="last_name" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div >
                                                <label ><i className="fas fa-envelope"></i></label>
                                                <Field type="email" name="email" placeholder="Your Email" />
                                                <ErrorMessage name="email" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div>
                                                <label ><i className="fas fa-sort-numeric-up-alt"></i></label>
                                                <Field type="number" name="age" placeholder="Your Age" />
                                                <ErrorMessage name="age" component="div" className="alert-danger p-2 mt-1" />
                                            </div>
                                            <div>
                                                <label ><i className="fas fa-lock"></i></label>
                                                <Field type="password" name="password" placeholder="Password" />
                                                <ErrorMessage name="password" component="div" className="alert-danger p-2 mt-1" />
                                            </div>


                                            <div className={`${Styles.form_button} form-group`}>
                                                <button type="submit" disabled={isSubmitting} className={Styles.form_submit} >
                                                    Register
                                        </button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div>

                            <div className={Styles.signup_image}>
                                <figure><img src={img1} alt="sing up" /></figure>
                                <Link to="/login" className={Styles.linkSt}>I am already member</Link>
                            </div>
                        </div>
                    </div>
                </section>

            </Fragment>
        )
    }
}

