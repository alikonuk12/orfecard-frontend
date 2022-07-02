import React from 'react';
import styles from './index.module.scss';

const Column = ({ data }) => {
    return (
        <div className={styles.container}>
            {data?.map(({ text, img, to }) => (
                <a className={styles.text} target='_blank' rel="noreferrer" href={to}>
                    {img && <img width={35} src={img} alt='icon' />}
                    {text}
                </a>
            ))}
        </div>
    )
}

export default Column;