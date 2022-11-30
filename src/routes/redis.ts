import express from 'express'
import {set, get, exist, del} from '../controllers/redis'

const router = express.Router()

router.post('/set', set)

router.get('/get', get)

router.get('/del', del)

router.get('/exist', exist)

export default router