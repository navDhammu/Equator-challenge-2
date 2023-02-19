import express from 'express'
import renderHtmlPage from './renderHtmlPage'
import redis from './redis'

const app = express()

app.use('/build', express.static('build'))

app.use(async (req, res) => {
    try {
        const redisData = await redis.get('scrapers')

        if (redisData !== null) return res.send(renderHtmlPage(redisData))

        // fetch scrapers from github if data is not in redis
        const response = await fetch(
            'https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers'
        )

        const githubData = (await response.json()).map((data) => ({
            name: data.name,
            url: data.html_url,
            download_url: data.download_url,
        }))

        const githubDataString = JSON.stringify(githubData)

        //save in redis
        redis.set('scrapers', githubDataString)

        res.send(renderHtmlPage(githubDataString, githubData))
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server listening`)
})
