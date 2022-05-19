const express = require("express");
const cors = require('cors')
const app = express()
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.44ax5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const collection = client.db("todolist").collection("mytodo")
        app.post("/addtodo", async (req, res) => {
            const data = req.body
            console.log(data)
            const result = await collection.insertOne(data)
            console.log(data)
            res.send(result)
        })

        app.get("/addtodo", async (req, res) => {
            const query = {};
            const cours =  collection.find(query)
            const result = await cours.toArray()
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`port is running ${port}`)
})