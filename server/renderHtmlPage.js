import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../shared/createEmotionCache.js'
import App from '../shared/App'

export default function renderHtmlPage(initialData) {
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(createEmotionCache())

    const appHtml = ReactDOMServer.renderToString(<App data={initialData} />)

    const emotionChunks = extractCriticalToChunks(appHtml)
    const emotionCss = constructStyleTagsFromChunks(emotionChunks)

    return `
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <title>Equator Challenge 2</title>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                        <meta name="emotion-insertion-point" content="" />
                        ${emotionCss}
                        <script>window.__initialData__ = ${JSON.stringify(
                            initialData
                        )} </script>
                    </head>
                    <body>
                        <script async src="build/bundle.js"></script>
                        <div id="root">${appHtml}</div>
                    </body>
                </html>
            `
}
