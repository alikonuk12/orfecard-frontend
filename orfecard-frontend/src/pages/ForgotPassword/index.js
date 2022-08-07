import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Input } from '../../components';
import styles from './index.module.scss';
import { forgotpassword } from "../../api/account";
import {
    FORGOT_PASSWORD_PANEL_HEADER,
    FORGOT_PASSWORD_INPUTS,
    EMAIL_VALIDATION_TEXT,
    FORGOT_PASSWORD_BUTTON_TEXT
} from './const';

const ForgotPassword = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        const body = { email: formik.values.email };
        const result = await forgotpassword(body);
        result && navigate("/", { replace: true });
    }

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            email: yup
                .string()
                .email(EMAIL_VALIDATION_TEXT.EMAIL)
                .required(EMAIL_VALIDATION_TEXT.REQUIRED),
        })
    });

    return (
        <div className={styles.container}>
            <div className={styles.forgotpasswordContainer}>
                <div className={styles.forgotpasswordHeader}>{FORGOT_PASSWORD_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        title={FORGOT_PASSWORD_INPUTS.EMAIL}
                        value={formik.values.email}
                        isError={formik.touched.email && formik.errors.email}
                        errorText={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <button type='submit' className={styles.button}>{FORGOT_PASSWORD_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;