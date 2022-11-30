import {Client} from 'pg'
import {Request, Response} from 'express'

const client = new Client({host: `${process.env.PG_HOST}`, port: parseInt(process.env.PG_PORT), 
                           password: `${process.env.PG_PASS}`, user: `${process.env.PG_USER}`})
client.connect()

const createDB = async (req: Request, res: Response) => {
    client.query(`DROP DATABASE IF EXISTS ${req.query.db};`)
    client.query(`CREATE DATABASE ${req.query.db};`)
    .then(response=>res.send(response).status(200))
    .catch(err=>res.send(err).status(500))
  }

const createTable = async (req: Request, res: Response) => {
  client.query(`CREATE TABLE IF NOT EXISTS ${req.body.table_name} ${req.body.query};`)
  .then(response=>res.send(response).status(200))
  .catch(err=>res.send(err).status(500))
}

const insertTable = async (req: Request, res: Response) => {
  client.query(`INSERT INTO ${req.body.table_name} ${req.body.query};`)
  .then(response=>res.send(response).status(200))
  .catch(err=>res.send(err).status(500))
}

export {createDB, createTable, insertTable}