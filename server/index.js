import express from 'express'
import renderHtmlPage from './renderHtmlPage'
import { Redis } from 'ioredis'
import * as dotenv from 'dotenv'

dotenv.config()

const redis = new Redis({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
    password: process.env.REDISPASSWORD,
})

const app = express()

app.use('/build', express.static('build'))

app.use(async (req, res) => {
    try {
        const redisData = await redis.get('scrapers')

        if (redisData !== null) {
            console.log('cached data')
            return res.send(renderHtmlPage(redisData))
        }

        console.log('uncached data')
        const response = await fetch(
            'https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers'
        )

        const githubData = (await response.json()).map((data) => ({
            name: data.name,
            url: data.html_url,
            download_url: data.download_url,
        }))

        const githubDataString = JSON.stringify(githubData)

        redis.set('scrapers', githubDataString)
        res.send(renderHtmlPage(githubDataString, githubData))
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server listening`)
})
