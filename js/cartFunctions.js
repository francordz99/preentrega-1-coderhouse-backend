const fs = require('fs');
const path = require('path');

function generateUniqueCartId() {
    const uniqueId = Date.now().toString();
    return uniqueId;
}

// FUNCION PARA AGREGAR AL CARRITO IRIA ACA

function addCartToStorage(cart) {
    try {
        const filePath = path.join(__dirname, 'carts.json');

        const existingCarts = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            : [];

        existingCarts.push(cart);

        fs.writeFileSync(filePath, JSON.stringify(existingCarts, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error al agregar el carrito al almacenamiento:", error);
    }
}

function getCartById(cartId) {
    try {
        const filePath = path.join(__dirname, 'carts.json');
        const carts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        console.log('Carts from file:', carts);

        const cart = carts.find((cart) => cart.id === cartId);

        console.log('Cart found:', cart);

        return cart || null;
    } catch (error) {
        console.error("Error al obtener el carrito por ID:", error);
        throw error;
    }
}

module.exports = {
    generateUniqueCartId,
    addCartToStorage,
    getCartById,
    addProductToCart
};

console.log(addProductToCart(1694394290308, 12));