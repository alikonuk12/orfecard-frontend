import React from "react";
import styles from './index.module.scss';

const Input = ({ id, name, type, title, value, isError, errorText, onChange }) => {
    return (
        <div>
            <div className={styles.title}>{title}</div>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
            {isError && <div className={styles.error}>{errorText}</div>}
        </div>
    );
}

export default Input;