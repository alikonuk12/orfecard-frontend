import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Input } from '../../components';
import styles from './index.module.scss';
import { resetpassword } from '../../api/account';
import {
    RESET_PASSWORD_PANEL_HEADER,
    RESET_PASSWORD_INPUTS,
    PASSWORD_VALIDATION_TEXT,
    RESET_PASSWORD_BUTTON_TEXT
} from './const';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async () => {
        const { password } = formik.values;
        const { email, role } = await resetpassword({ password, token });
        if (email) {
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
            navigate("/login", { replace: true });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            password_again: ""
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            password: yup
                .string()
                .required(PASSWORD_VALIDATION_TEXT.REQUIRED)
                .min(8, PASSWORD_VALIDATION_TEXT.MIN)
                .max(20, PASSWORD_VALIDATION_TEXT.MAX),
            password_again: yup
                .string()
                .required(PASSWORD_VALIDATION_TEXT.REQUIRED)
                .min(8, PASSWORD_VALIDATION_TEXT.MIN)
                .max(20, PASSWORD_VALIDATION_TEXT.MAX)
                .oneOf([yup.ref('password'), null], PASSWORD_VALIDATION_TEXT.MATCH)
        })
    });

    return (
        <div className={styles.container}>
            <div className={styles.resetpasswordContainer}>
                <div className={styles.resetpasswordHeader}>{RESET_PASSWORD_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        title={RESET_PASSWORD_INPUTS.PASSWORD}
                        value={formik.values.password}
                        isError={formik.touched.password && formik.errors.password}
                        errorText={formik.errors.password}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="password_again"
                        name="password_again"
                        type="password"
                        title={RESET_PASSWORD_INPUTS.PASSWORD_AGAIN}
                        value={formik.values.password_again}
                        isError={formik.touched.password_again && formik.errors.password_again}
                        errorText={formik.errors.password_again}
                        onChange={formik.handleChange}
                    />
                    <button type='submit' className={styles.button}>{RESET_PASSWORD_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;