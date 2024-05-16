// Function to get cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to clear the cart from local storage
function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = getCart();

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>₱${item.price}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice;
}

// Function to add item to the cart
function addToCart(name, price) {
    const cart = getCart();
    cart.push({ name, price });
    saveCart(cart);
    updateCartDisplay();
}

// Function to handle Buy Now button click
function handleBuyNow(event) {
    const button = event.target.closest('.buy-now');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addToCart(name, price);
    window.location.href = 'cart.html';
}

// Add event listeners to Buy Now buttons in index.html
if (document.querySelectorAll('.buy-now')) {
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', handleBuyNow);
    });
}

// Add event listener to Clear Cart button in cart.html
if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', clearCart);
}

// Update cart display on cart.html load
if (document.getElementById('cart-items')) {
    updateCartDisplay();
}

document.getElementById('btn').addEventListener('click', function() {
    // Smooth scroll to the menu section
    document.getElementById('menu').scrollIntoView({ 
        behavior: 'smooth' 
    });
});
