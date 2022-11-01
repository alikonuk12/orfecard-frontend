export const COLUMNS = [
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>ID</div>,
        accessor: '_id',
        Cell: ({ value }) => <div style={{ width: 225, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Email</div>,
        accessor: 'email',
        Cell: ({ value }) => <div style={{ width: 225, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Telefon Numarası</div>,
        accessor: 'phoneNumber',
        Cell: ({ value }) => <div style={{ width: 150, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Rol</div>,
        accessor: 'role',
        Cell: ({ value }) => <div style={{ width: 75, wordBreak: "break-all" }}>{value}</div>
    },
    {
        Header: () => <div style={{ textAlign: 'start', marginBottom: 10 }}>Yaratılma Tarihi</div>,
        accessor: 'createdAt',
        Cell: ({ value }) => <div style={{ width: 250, wordBreak: "break-all" }}>{value}</div>
    }
];