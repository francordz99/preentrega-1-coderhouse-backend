const express = require('express');
const ProductManager = require('./js/ProductManager.js');

const app = express();
const port = 8080;

// Ruta '/products'
app.get('/products', async (req, res) => {
    try {
        const productManager = new ProductManager('./js/products.json');
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productManager = new ProductManager('./js/products.json');
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid));

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado o inexistente.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Arrancar el server
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
