const express = require('express');
const cors = require("cors");
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.mongodb.net/test";
 
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const client = new MongoClient(uri);
  async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Connect to collection "test", retrieve all data
        let data = await client.db("db").collection("test").find().toArray();
        res.json(data);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }
  run().catch(console.dir);
});

app.listen(process.env.PORT || 4000);