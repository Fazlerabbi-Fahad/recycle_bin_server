const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const categories = require('./Data/categories.json')

//connect mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/categories', (req, res) => {
    res.send(categories);

})

app.get('/', (req, res) => {
    res.send(`Recycle Bin server is running`)
});

app.listen(port, (req, res) => {
    console.log(`Recycle Bin is running on ${port}`);
})