const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const categories = require('./Data/categories.json')

app.get('/categories', (req, res) => {
    res.send(categories);

})

app.get('/', (req, res) => {
    res.send(`Recycle Bin server is running`)
});

app.listen(port, (req, res) => {
    console.log(`Recycle Bin is running on ${port}`);
})