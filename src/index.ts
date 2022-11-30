import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import redis from './routes/redis'
import mongo from './routes/mongo'
import postgres from './routes/postgres'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/redis', redis)
app.use('/mongo', mongo)
app.use('/postgres', postgres)
app.listen(process.env.PORT)