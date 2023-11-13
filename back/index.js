require('dotenv').config();
const express = require('express')
const cors = require('cors');


//Banco de dados
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

const connectWithRetry = () => {
    return mongoose.connect(
        `mongodb://${process.env.USRBD}:${process.env.USRPSS}@${process.env.DOMINIOBD}:${process.env.PORTBD}/${process.env.DATABASE}?authSource=admin`
    ).catch((err) => {
        console.error('Falha ao conectar ao BD:', err.message);
        console.log('Tentando reconectar em 5 segundos...');
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();


app = express()
app.use(express.json());
app.use(cors());



// Adicionar categoria TESTADO
app.post('/api/categories', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Listar categorias TESTADO
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Listar todas os produtos de uma categoria TESTADO
app.get('/api/categories/:categoryId/products', async (req, res) => {
    try {
        const products = await Product.find({ categoryId: req.params.categoryId });
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Listar todas os produtos TESTADO
app.get('/api/categories/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Editar categoria existente TESTADO
app.put('/api/categories/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Excluir categoria TESTADO
app.delete('/api/categories/:categoryId', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);
        res.send("Categoria removida com sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Adicionar um novo produto a uma categoria TESTADO
app.post('/api/categories/:categoryId/products', async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, categoryId: req.params.categoryId });
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Editar um produto TESTADO
app.put('/api/products/:productId', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Excluir um produto
app.delete('/api/products/:productId', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.send('Produto removido com sucesso');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/', async (req, res) => {
    res.send('<h1>API ON</h1>')
});

app.listen(process.env.PORT, () => { console.log("---Servidor iniciado na porta " + process.env.PORT + '---') });
