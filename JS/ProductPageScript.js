var products = [];
var currentPage = 1;
var productsPerPage = 4;

function loadProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            products = JSON.parse(xhr.responseText);
            displayProducts();
        }
    };
    xhr.send();
}

function displayProducts() {
    var container = document.getElementById("products");
    container.innerHTML = "";
    var start = (currentPage - 1) * productsPerPage;
    var end = start + productsPerPage;
    var paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        var div = document.createElement("div");
        div.className = "product";
        div.innerHTML =
            `<h3>${product.title}</h3>
            <img src="${product.image}" alt="Product Image">
            <p>Price: ${product.price} USD</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        container.appendChild(div);
    });
}

function changePage(step) {
    currentPage += step;
    displayProducts();
}

function addToCart(productId) {
    var cart = getCart();
    cart.push(productId);

    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); 
    var expires = "expires=" + date.toUTCString();

    document.cookie = "cart=" + JSON.stringify(cart) + "; " + expires + "; path=/"; 
    alert("Added to cart!");
}

function getCart() {
    var cookies = document.cookie.split(";");
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("cart=")) {
            return JSON.parse(cookie.substring(5));
        }
    }
    return [];
}
