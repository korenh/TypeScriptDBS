import {createClient} from 'redis';
import {Request, Response} from 'express'

const client = createClient({url:`${process.env.REDIS_URL}`})
client.connect()

const set = (req: Request, res: Response) =>{
  client.set(String(req.body.key), req.body.value)
  .then(()=>res.sendStatus(200))
  .catch(err=>res.send(err).status(500))
}

const get = (req: Request, res: Response) =>{
  client.get(String(req.query.key))
  .then(value=>res.send(value).status(200))
  .catch(err=>res.send(err).status(500))
}

const exist = (req: Request, res: Response) =>{
  client.exists(String(req.query.key))
  .then(value=>res.send(JSON.stringify(value)).status(200))
  .catch(err=>res.send(JSON.stringify(err)).status(500))
}

const del = (req: Request, res: Response) =>{
  client.del(String(req.query.key))
  .then(value=>res.send(JSON.stringify(value)).status(200))
  .catch(err=>res.send(JSON.stringify(err)).status(500))
}

export {set, get, exist, del}