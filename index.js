const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const productsCollection = client.db('recycleBIN').collection('products');

    try {
        app.get('/categories', async (req, res) => {
            const query = {};
            const results = await categoriesCollection.find(query).toArray();
            res.send(results)
        })


        //get products
        app.get('/products', async (req, res) => {
            const query = {};
            const results = await productsCollection.find(query).toArray();
            res.send(results)
        })
        app.get('/addDate', async (req, res) => {
            const filter = {};
            const option = { upsert: true };
            const updateDoc = {
                $currentDate: {
                    postedAt: true
                }
            }
            const results = await productsCollection.updateMany(filter, updateDoc, option);
            res.send(results)
        })


        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categories_ID: id }
            const results = await productsCollection.find(query).toArray();
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