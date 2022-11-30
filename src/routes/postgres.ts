import express from 'express'
import {createDB, createTable, insertTable} from '../controllers/postgres'

const router = express.Router()

router.get('/create_db', createDB)

router.post('/create_table', createTable)

router.post('/insert_table', insertTable)

export default router