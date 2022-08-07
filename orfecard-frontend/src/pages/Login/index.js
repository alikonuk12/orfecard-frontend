import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Input } from '../../components';
import styles from './index.module.scss';
import { login } from "../../api/account";
import {
    LOGIN_PANEL_HEADER,
    LOGIN_INPUTS,
    EMAIL_VALIDATION_TEXT,
    PASSWORD_VALIDATION_TEXT,
    LOGIN_BUTTON_TEXT,
    FORGOT_PASSWORD_TEXT
} from './const';

const Login = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        const body = { email: formik.values.email, password: formik.values.password };
        const response = await login(body);
        if (response.email) {
            localStorage.setItem('email', response.email);
            localStorage.setItem('role', response.role);
            navigate("/userpanel", { replace: true });
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            email: yup
                .string()
                .email(EMAIL_VALIDATION_TEXT.EMAIL)
                .required(EMAIL_VALIDATION_TEXT.REQUIRED),
            password: yup
                .string()
                .required(PASSWORD_VALIDATION_TEXT.REQUIRED)
                .min(8, PASSWORD_VALIDATION_TEXT.MIN)
                .max(20, PASSWORD_VALIDATION_TEXT.MAX)
        })
    });

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>{LOGIN_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        title={LOGIN_INPUTS.EMAIL}
                        value={formik.values.email}
                        isError={formik.touched.email && formik.errors.email}
                        errorText={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        title={LOGIN_INPUTS.PASSWORD}
                        value={formik.values.password}
                        isError={formik.touched.password && formik.errors.password}
                        errorText={formik.errors.password}
                        onChange={formik.handleChange}
                    />
                    <Link to='/forgotpassword'>{FORGOT_PASSWORD_TEXT}</Link>
                    <button type='submit' className={styles.button}>{LOGIN_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;