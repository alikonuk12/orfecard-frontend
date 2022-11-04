export const COLUMNS = [
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>ID</div>,
        accessor: '_id',
        Cell: ({ value }) =>
            <a
                id={value}
                href={`/adminpanel/dashboard/card/${value}`}
                style={{ display: 'block', width: 225, wordBreak: "break-all", textDecoration: 'none', color: 'blueviolet' }}
                onMouseOver={() => document.getElementById(value).style.textDecoration = 'underline'}
                onMouseLeave={() => document.getElementById(value).style.textDecoration = 'none'}
            >
                {value}
            </a>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Ad</div>,
        accessor: 'name',
        Cell: ({ value }) => <div style={{ width: 120, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Soyad</div>,
        accessor: 'lastname',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Telefon Numarası</div>,
        accessor: 'phoneNumber',
        Cell: ({ value }) => <div style={{ width: 160, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Email</div>,
        accessor: 'email',
        Cell: ({ value }) => <div style={{ width: 200, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Hesap</div>,
        accessor: 'account',
        Cell: ({ value }) => <div style={{ width: 225, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Seri No</div>,
        accessor: 'serialNumber',
        Cell: ({ value }) => <div style={{ width: 120, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yaratılma Tarihi</div>,
        accessor: 'createdAt',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    }
];