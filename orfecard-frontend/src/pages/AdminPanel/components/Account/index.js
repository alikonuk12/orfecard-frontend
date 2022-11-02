import React from 'react';
import { Table } from '../../../../components';
import { COLUMNS } from './const';

const Account = ({
    list,
    limit,
    setLimit,
    page,
    setPage
}) => {
    return (
        <Table
            data={list}
            columns={COLUMNS}
            showPagination
            pageIndex={page}
            nextPage={() => setPage(page + 1)}
            previousPage={() => page > 1 && setPage(page - 1)}
            pageSize={limit}
            setPageSize={setLimit}
        />
    );
}

export default Account;