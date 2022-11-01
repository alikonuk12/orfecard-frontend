import React from 'react';
import { Table } from '../../../../components';
import { COLUMNS } from './const';

const Card = ({ list }) => {
    return (
        <Table data={list} columns={COLUMNS} />
    );
}

export default Card;