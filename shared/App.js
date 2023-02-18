import React, { useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import { Container, CssBaseline, Link, ThemeProvider } from '@mui/material'
import theme from './theme.js'
import createEmotionCache from './createEmotionCache.js'
import { CacheProvider } from '@emotion/react'

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
        <CacheProvider value={createEmotionCache()}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" style={{ height: '100vh' }}>
                    <MaterialReactTable
                        data={data}
                        columns={columns}
                        enableStickyHeader
                    />
                </Container>
            </ThemeProvider>
        </CacheProvider>
    )
}
