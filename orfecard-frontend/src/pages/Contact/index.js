import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './index.module.scss';
import {
    CONTACT_INPUTS,
    NAME_VALIDATION_TEXT,
    EMAIL_VALIDATION_TEXT,
    MESSAGE_VALIDATION_TEXT,
    CONTACT_BUTTON_TEXT,
    INFOS,
    MESSAGE
} from './const';
import { sendcontactmail } from '../../api/account';

const Contact = () => {
    const { mode } = useSelector(state => state.view);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const isSuccess = await sendcontactmail(formik.values);
        isSuccess && setMessage(MESSAGE);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            name: yup
                .string()
                .required(NAME_VALIDATION_TEXT.REQUIRED),
            email: yup
                .string()
                .email(EMAIL_VALIDATION_TEXT.EMAIL)
                .required(EMAIL_VALIDATION_TEXT.REQUIRED),
            message: yup
                .string()
                .required(MESSAGE_VALIDATION_TEXT.REQUIRED)

        })
    });

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <form className={styles.leftSide} onSubmit={formik.handleSubmit}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputHeader}>{CONTACT_INPUTS.NAME}</div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={styles.input}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <div className={styles.inputError}>{formik.errors.name}</div>
                    }
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputHeader}>{CONTACT_INPUTS.EMAIL}</div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={styles.input}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div className={styles.inputError}>{formik.errors.email}</div>
                    }
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputHeader}>{CONTACT_INPUTS.MESSAGE}</div>
                    <textarea
                        id="message"
                        name="message"
                        type="text"
                        className={styles.textarea}
                        rows={6}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.message && formik.errors.message &&
                        <div className={styles.inputError}>{formik.errors.message}</div>
                    }
                </div>
                <div className={styles.message}>{message}</div>
                <button type='submit' className={styles.button}>{CONTACT_BUTTON_TEXT}</button>
            </form>
            <div className={styles.rightSide}>
                {Object.keys(INFOS).map((el, i) =>
                    <div className={styles.infosContainer}>
                        <div className={styles.rowContainer}>
                            <img
                                className={styles.image}
                                src={`/images/icons/profile_icons/${el}.svg`}
                                alt='icon'
                            />
                            <div>{INFOS[el]}</div>
                        </div>
                        <div className={styles.line} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Contact;