const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());

//connect mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    const categoriesCollection = client.db('recycleBIN').collection('categories');

    try {
        app.get('/categories', async (req, res) => {
            const query = {};
            const results = await categoriesCollection.find(query).toArray();
            res.send(results)
        })

    }
    finally {

    }

}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send(`Recycle Bin server is running`)
});

app.listen(port, () => {
    console.log(`Recycle Bin is running on ${port}`);
})