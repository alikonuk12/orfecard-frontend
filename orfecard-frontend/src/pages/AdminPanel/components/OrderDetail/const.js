export const COLUMNS = [
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>ID</div>,
        accessor: '_id',
        Cell: ({ value }) =>
            <a
                id={value}
                href={`/adminpanel/dashboard/orderdetail/${value}`}
                style={{ display: 'block', width: 225, wordBreak: "break-all", textDecoration: 'none', color: 'blueviolet' }}
                onMouseOver={() => document.getElementById(value).style.textDecoration = 'underline'}
                onMouseLeave={() => document.getElementById(value).style.textDecoration = 'none'}
            >
                {value}
            </a>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Card</div>,
        accessor: 'card',
        Cell: ({ value }) => <div style={{ width: 120, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ürün</div>,
        accessor: 'product',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ad Soyad</div>,
        accessor: 'fullname',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Renk</div>,
        accessor: 'color',
        Cell: ({ value }) => <div style={{ width: 200, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yön</div>,
        accessor: 'direction',
        Cell: ({ value }) => <div style={{ width: 225, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yaratılma Tarihi</div>,
        accessor: 'createdAt',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    }
];