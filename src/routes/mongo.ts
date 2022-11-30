import express from 'express'
import {find, insert, update} from '../controllers/mongo'

const router = express.Router()

router.post('/insert', insert)

router.post('/update', update)

router.post('/find', find)

export default router