document.addEventListener('DOMContentLoaded', function() {
    const products = [{
            id: 1,
            name: 'Product 1',
            price: 10
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20
        },
    ];

    const productsContainer = document.getElementById('product-list');
    const cartContainer = document.getElementById('cart');
    const cartLink = document.getElementById('cart-link');
    let cart = [];

    function displayProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function updateCart() {
        cartContainer.innerHTML = '';
        let cartTotal = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            const product = products.find(p => p.id === item.id);
            const itemTotal = product.price * item.quantity;
            cartTotal += itemTotal;
            cartItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${itemTotal}</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartLink.textContent = `Cart (${cart.length})`;
    }

    displayProducts();

    productsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const existingCartItem = cart.find(item => item.id === productId);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            updateCart();
        }
    });
});
