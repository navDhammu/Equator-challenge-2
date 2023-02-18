import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from './shared/createEmotionCache.js'
import App from './shared/App'

function renderFullPage(html, css, data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Equator Challenge 2</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta name="emotion-insertion-point" content="" />
        ${css}
        <script>window.__initialData__ = ${JSON.stringify(data)} </script>
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `
}

const app = express()

app.use('/build', express.static('build'))

app.use(async (req, res) => {
    try {
        const response = await fetch(
            'https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers'
        )
        const data = (await response.json()).map((scraper) => ({
            name: scraper.name,
            url: scraper.html_url,
            download_url: scraper.download_url,
        }))

        const cache = createEmotionCache()
        const { extractCriticalToChunks, constructStyleTagsFromChunks } =
            createEmotionServer(cache)

        const html = ReactDOMServer.renderToString(<App data={data} />)

        const emotionChunks = extractCriticalToChunks(html)
        const emotionCss = constructStyleTagsFromChunks(emotionChunks)

        res.send(renderFullPage(html, emotionCss, data))
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
