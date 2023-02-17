import * as React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import App from './App'
import theme from './theme.mjs'
import createEmotionCache from './createEmotionCache.js'

const cache = createEmotionCache()

ReactDOM.hydrateRoot(
    document.querySelector('#root'),
    <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App data={window.__initialData__} />
        </ThemeProvider>
    </CacheProvider>
)
