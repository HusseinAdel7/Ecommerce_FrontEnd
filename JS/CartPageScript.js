function loadCart() {
    var cart = getCart();
    if (cart.length === 0) {
        document.getElementById("cart").innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total").innerHTML = "";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var products = JSON.parse(xhr.responseText);
            var cartProducts = [];

            for (var i = 0; i < cart.length; i++) {
                for (var j = 0; j < products.length; j++) {
                    if (products[j].id == cart[i]) {
                        cartProducts.push(products[j]);
                        break;
                    }
                }
            }

            var container = document.getElementById("cart");
            container.innerHTML = "";
            var total = 0;

            for (var i = 0; i < cartProducts.length; i++) {
                var product = cartProducts[i];
                total += product.price;

                var div = document.createElement("div");
                div.className = "cart-item";

                div.innerHTML =
                    `<h3>${product.title}</h3>
                    <img src="${product.image}" alt="Product Image">
                    <p>Price: ${product.price} USD</p>
                    <button onclick="removeFromCart(${product.id})">Remove</button>`;

                container.appendChild(div);
            }

            document.getElementById("total").innerHTML = "Total: " + total.toFixed(2) + " USD";
        }
    };
    xhr.send();
}

function removeFromCart(productId) {
    var cart = getCart();
    cart = cart.filter(id => id != productId);
    document.cookie = "cart=" + JSON.stringify(cart);
    location.reload();
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
