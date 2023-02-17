import React, { useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import { Container, Link } from '@mui/material'

export default function App({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Scraper Name',
            },
            {
                accessorKey: 'url',
                header: 'Github Url',
                Cell: ({ cell }) => (
                    <Link target="_blank" href={`${cell.getValue()}`}>
                        {cell.getValue()}
                    </Link>
                ),
            },
            {
                accessorKey: 'download_url', //normal accessorKey
                header: 'Download Url',
                Cell: ({ cell }) => (
                    <Link target="_blank" href={`${cell.getValue()}`}>
                        {cell.getValue()}
                    </Link>
                ),
            },
        ],
        []
    )

    return (
        <Container maxWidth="lg" style={{ height: '100vh' }}>
            <MaterialReactTable
                data={data}
                columns={columns}
                enableStickyHeader
            />
        </Container>
    )
}
