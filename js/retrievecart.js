document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.getElementById('cart-total');

    function updateCart() {
        cartTableBody.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger decrease-qty" data-id="${item.id}">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-outline-success increase-qty" data-id="${item.id}">+</button>
                </td>
                <td>&#8377;${item.price.toFixed(2)}</td>
                <td>&#8377;${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartTableBody.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        if (e.target.classList.contains('remove-btn')) {
            const productIndex = cart.findIndex(item => item.id == productId);
            if (productIndex > -1) {
                cart.splice(productIndex, 1);
                updateCart();
            }
        } else if (e.target.classList.contains('increase-qty')) {
            const product = cart.find(item => item.id == productId);
            if (product) {
                product.quantity++;
                updateCart();
            }
        } else if (e.target.classList.contains('decrease-qty')) {
            const product = cart.find(item => item.id == productId);
            if (product && product.quantity > 1) {
                product.quantity--;
                updateCart();
            }
        }
    });

    updateCart();
});
