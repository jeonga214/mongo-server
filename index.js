const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const url = "mongodb+srv://jeonga020214:MkADhiCcp9TuUCGQ@cluster0.pucder0.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

let collection;

const dbConnect = async() => {
    await client.connect();
    const db = client.db('test_project');
    console.log('접속');
    collection = db.collection('count_collection');
}

app.get('/api', async function (req, res) {
    const result = await collection.find().toArray();
  res.send(result)
})

app.post('/api/insert', async function (req, res) {
    await collection.insertOne(req.body);
    const result = await collection.find().toArray();
  res.send(result)
})

app.delete('/api/delete', async function (req, res) {
    const {date} = req.query
    await collection.deleteOne({date:Number(date)});
    const result = await collection.find().toArray();
  res.send(result)
})

app.put('/api/update', async function (req, res) {
  const {date} = req.query
  const {count} =req.body;
  await collection.updateOne({date:Number(date)},{$set:{count}});
  const result = await collection.find().toArray();
res.send(result)
})

app.listen( 3000, dbConnect )