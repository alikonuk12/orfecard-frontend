import React from 'react';
import { Table } from '../../../../components';
import { COLUMNS } from './const';

const Account = ({ list }) => {
    return (
        <Table data={list} columns={COLUMNS} />
    );
}

export default Account;