const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));


const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/midterm', {
  useNewUrlParser: true
});
// Create schema for mongoose
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  count: Number,
});
const Product = mongoose.model('Product', productSchema);


app.get ('/', async(req, res) => {
  res.sendFile('index.html', { root: 'public' });
})

app.get('/shopping', async(req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.get('/admin', async(req, res) => {
  res.sendFile('admin.html', {root: 'public' });
})

app.get('/api/products', async(req, res) => {
  try {
    let products = await Product.find();
    res.send(products);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/products', async(req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    count: req.body.count
  });
  try {
    await product.save();
    res.send(product);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/products/:id', async(req, res) => {
  const productToFind = new Product({
    _id: req.params.id,
  });
  try {
    let product = await Product.findOne(productToFind);
    product.count += 1;
    await product.save();
    res.send(product);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/products/:id', async(req, res) => {
  const product = new Product({
    _id: req.params.id
  });
  try {
    await Product.deleteOne(product);
    res.send(product);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(4200, () => console.log('Server listening on port 4200!'));
