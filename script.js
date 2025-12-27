// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

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

    db.collection("orders").add({
        items: cart,
        total: totalSpan.textContent,
        time: new Date()
    });

    alert("Order placed ☕");
    cart = [];
    renderCart();
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
function adminLogin() {
    const email = document.getElementById("adminEmail").value;
    const pass = document.getElementById("adminPass").value;

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            alert("Admin Logged In ☕");
            loadOrders();
        })
        .catch(err => alert(err.message));
}

function loadOrders() {
    db.collection("orders")
        .orderBy("time", "desc")
        .onSnapshot(snapshot => {
            let html = "";
            snapshot.forEach(doc => {
                let o = doc.data();
                html += `<p>₹${o.total} | ${o.items.length} items</p>`;
            });
            document.getElementById("orders").innerHTML = html;
        });
}

