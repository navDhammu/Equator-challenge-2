import React, { useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table'
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Link,
    ThemeProvider,
    Typography,
} from '@mui/material'
import createEmotionCache from './createEmotionCache.js'
import { CacheProvider } from '@emotion/react'
import Switch from './Switch'

const MODES = ['light', 'dark']

export default function App({ data }) {
    const [modeIndex, setModeIndex] = useState(0)

    const toggleMode = () => setModeIndex((modeIndex + 1) % 2)

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: MODES[modeIndex],
                },
            }),
        [modeIndex]
    )

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
                <Box
                    component="header"
                    mb={4}
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    boxShadow={3}
                >
                    <Typography variant="h4" fontWeight="500">
                        Equator Challenge 2
                    </Typography>
                    <Switch
                        sx={{ ml: 1 }}
                        theme={theme}
                        onChange={toggleMode}
                    />
                </Box>
                <Container maxWidth="lg">
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
