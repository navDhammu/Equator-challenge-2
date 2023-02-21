import express from 'express'
import renderHtmlPage from './renderHtmlPage'
import redis from './redis'

const app = express()

app.use('/build', express.static('build'))

app.use(async (req, res) => {
    try {
        const redisPage = await redis.get('scrapers-page')

        //send cached html page from redis
        if (redisPage !== null) return res.send(redisPage)

        //get data from github if redis cache not available
        const response = await fetch(
            'https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers'
        )

        const githubData = (await response.json()).map((data) => ({
            name: data.name,
            url: data.html_url,
            download_url: data.download_url,
        }))

        const htmlPage = renderHtmlPage(githubData)

        //save full page in redis
        redis.set('scrapers-page', htmlPage)

        res.send(htmlPage)
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server listening`)
})
