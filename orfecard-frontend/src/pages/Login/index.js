import React, { useState } from 'react';
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
    FORGOT_PASSWORD_TEXT,
    SIGN_UP_BUTTON_TEXT
} from './const';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        const body = { email: formik.values.email, password: formik.values.password };
        const { status, data } = await login(body);
        if (status === 'success') {
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            if (data.role === 'Client') navigate('/userpanel', { replace: true });
            else if (data.role === 'Admin') navigate('/adminpanel/dashboard', { replace: true });
            else navigate("/", { replace: true });
        } else {
            setErrorMessage(data)
        }
        return status;
    };

    const handleSubmit = async () => {
        const status = await handleLogin();
        status === 'success' && window.location.reload();  
    };

    const handleClickSignUp = () => navigate('/kayit-ol', { replace: true });

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
                    <div className={styles.errorMessage}>{errorMessage}</div>
                    <Link to='/forgotpassword'>{FORGOT_PASSWORD_TEXT}</Link>
                    <button type='submit' className={styles.button}>{LOGIN_BUTTON_TEXT}</button>
                </form>
                <button onClick={handleClickSignUp} className={styles.button}>{SIGN_UP_BUTTON_TEXT}</button>
            </div>
        </div>
    );
}

export default Login;