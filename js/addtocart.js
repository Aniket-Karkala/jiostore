document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });

    function addToCart(productId) {
        const products = [
            { id: 1, name: 'JioDive', price: 1400 },
            { id: 2, name: 'JioPhone Prima', price: 2599 },
            { id: 3, name: 'JioBook', price: 15499 },
            { id: 4, name: 'JioTag Air', price: 1200 },
            { id: 5, name: 'JioMotive', price: 5499 }
        ];

        const product = products.find(p => p.id == productId);
        if (product) {
            const cartItem = cart.find(item => item.id == productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            alert(`${product.name} has been added to your cart.`);
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            alert('Product not found.');
        }
    }
});
