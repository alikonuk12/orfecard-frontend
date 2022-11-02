import React from 'react';
import { usePagination, useTable } from 'react-table';

const Table = ({
    data,
    columns,
    showPagination,
    pageIndex = 1,
    nextPage,
    previousPage,
    pageSize = 10,
    setPageSize
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex },
        },
        usePagination);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {showPagination &&
                <div>
                    <button onClick={previousPage}>{'<'}</button>{' '}
                    <button onClick={nextPage}>{'>'}</button>{' '}
                    <span>Sayfa {pageIndex}</span>
                    <select
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </>
    );
}

export default Table;