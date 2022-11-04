export const COLUMNS = [
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>ID</div>,
        accessor: '_id',
        Cell: ({ value }) =>
            <a
                id={value}
                href={`/adminpanel/dashboard/product/${value}`}
                style={{ display: 'block', width: 225, wordBreak: "break-all", textDecoration: 'none', color: 'blueviolet' }}
                onMouseOver={() => document.getElementById(value).style.textDecoration = 'underline'}
                onMouseLeave={() => document.getElementById(value).style.textDecoration = 'none'}
            >
                {value}
            </a>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ürün Adı</div>,
        accessor: 'productName',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ücret</div>,
        accessor: 'price',
        Cell: ({ value }) => <div style={{ width: 100, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yaratılma Tarihi</div>,
        accessor: 'createdAt',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    }
];