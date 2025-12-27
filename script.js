const menu = [
    { name: "Masala Chai", price: 20 },
    { name: "Adrak Chai", price: 25 },
    { name: "Elaichi Chai", price: 25 },
    { name: "Bun Maska", price: 30 },
    { name: "Samosa", price: 15 }
];

let cart = [];
const menuDiv = document.getElementById("menuItems");
const cartList = document.getElementById("cartList");
const totalSpan = document.getElementById("total");

menu.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    menuDiv.appendChild(div);
});

function addToCart(index) {
    cart.push(menu[index]);
    renderCart();
}

function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalSpan.textContent = total;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Cart empty ☕");
        return;
    }

    let msg = "Hello Chai Ki Chuski ☕%0AOrder:%0A";
    cart.forEach(i => {
        msg += `- ${i.name} ₹${i.price}%0A`;
    });
    msg += `%0ATotal: ₹${totalSpan.textContent}`;

    window.open(
        "https://wa.me/918318288563?text=" + msg,
        "_blank"
    );
}

function validateForm() {
    let n = document.getElementById("name").value;
    let e = document.getElementById("email").value;

    if (n === "" || e === "") {
        alert("Please fill required fields");
        return false;
    }
    alert("Message sent ☕");
    return true;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
