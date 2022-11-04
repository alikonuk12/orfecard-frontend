export const COLUMNS = [
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>ID</div>,
        accessor: '_id',
        Cell: ({ value }) =>
            <a
                id={value}
                href={`/adminpanel/dashboard/orderhistory/${value}`}
                style={{ display: 'block', width: 225, wordBreak: "break-all", textDecoration: 'none', color: 'blueviolet' }}
                onMouseOver={() => document.getElementById(value).style.textDecoration = 'underline'}
                onMouseLeave={() => document.getElementById(value).style.textDecoration = 'none'}
            >
                {value}
            </a>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Hesap</div>,
        accessor: 'account',
        Cell: ({ value }) => <div style={{ width: 120, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Sipariş Detayı</div>,
        accessor: 'orderDetail',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value.join(', ')}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ücret</div>,
        accessor: 'price',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Durum</div>,
        accessor: 'status',
        Cell: ({ value }) => <div style={{ width: 200, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yaratılma Tarihi</div>,
        accessor: 'createdAt',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    }
];