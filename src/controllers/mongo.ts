import 'dotenv/config'
import {Response, Request} from 'express'
import {Collection, Db, MongoClient, ObjectId} from 'mongodb'

type Doc = {_id: ObjectId, entities: any, polygon: any, detections: any, heatmap: any} 
const client: MongoClient = new MongoClient(`${process.env.MONGO_URL}`)
const db: Db = client.db(`${process.env.MONGO_DB}`)
const col: Collection<Doc> = db.collection(`${process.env.MONGO_COL}`) 
async() =>{client.connect()}

const insert = async (req: Request, res: Response) => {
  col.insertOne(docBuilder(req.body))
  .then(response=>{res.send(response).status(200)})
  .catch(err=>res.send(err).status(500))
}

const update = async (req: Request, res: Response) => {
  let doc = docBuilder(req.body)
  let _id = doc._id
  delete doc._id
  col.updateOne(
    {_id: _id},
    {$set: doc},
    {upsert: true})
    .then(response=>{res.send(response).status(200)}).catch(err=>res.send(err).status(500))
}

const find = async (req: Request, res: Response) => {
  let query = req.body._id? {_id: docBuilder(req.body)._id} : {}
  const docs: Doc[] = await col.find(query).toArray()
  res.send(docs).status(200)
}

const docBuilder = (doc: any): Doc => {
  doc._id = ObjectId.createFromTime(doc._id)
  return doc
}

export {insert, update, find}