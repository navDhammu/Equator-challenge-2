import * as dotenv from 'dotenv'
import { Redis } from 'ioredis'

dotenv.config()

const redis = new Redis({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
    password: process.env.REDISPASSWORD,
})

export default redis
