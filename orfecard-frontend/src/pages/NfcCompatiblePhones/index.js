import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '../../components';
import { HEADER, LIST, COLUMNS } from './const';
import styles from './index.module.scss';

const NfcCompatiblePhones = () => {
    const { mode } = useSelector(state => state.view);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.header}>{HEADER}</div>
            <Table data={LIST} columns={COLUMNS} />
        </div>
    );
}

export default NfcCompatiblePhones;