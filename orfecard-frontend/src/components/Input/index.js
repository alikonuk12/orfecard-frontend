import React from "react";
import styles from './index.module.scss';

const Input = ({ id, name, type, title, value, isError, errorText, onChange, rows, placeholder, disabled }) => {
    return (
        <div>
            <div className={styles.title}>{title}</div>
            {!!rows ?
                <textarea
                    id={id}
                    name={name}
                    type={type}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    className={styles.input}
                /> :
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={type === 'file' ? value.name : value}
                    onChange={onChange}
                    className={styles.input}
                />}
            {isError && <div className={styles.error}>{errorText}</div>}
        </div>
    );
}

export default Input;