const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// add new product

router.post('/add', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save()

        res.status(201).json(savedProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// get all products

router.get('/all', async (req, res) => {
    try{
     const products = await Product.find();
     res.status(200).json(products);
    }catch(error){
       res.status(500).json({message: error.message});
    }
});

module.exports = router;