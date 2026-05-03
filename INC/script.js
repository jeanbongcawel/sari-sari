let products = JSON.parse(localStorage.getItem("products")) || [];

if (!products || products.length === 0) {
    products = [
        { name: "Rice (5kg)", quantity: 10, price: 280, level: 3 },
        { name: "Instant Noodles", quantity: 25, price: 12, level: 10 },
        { name: "Sardines", quantity: 15, price: 25, level: 5 },
        { name: "Coffee 3-in-1", quantity: 30, price: 8, level: 10 },
        { name: "Sugar (1kg)", quantity: 12, price: 60, level: 4 }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const level = document.getElementById("level").value;
    const expiry = document.getElementById("expiry")?.value || "";
    const category = document.getElementById("category").value;
    const expiryDate = expiry ? new Date(expiry) : null;
    
    if (!name || !quantity || !price || !level) {
        alert("Fill all required fields!");
        return;
    }

    products.push({
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        level: parseInt(level),
        expiry,
        category
    });

    saveAndDisplay();
}

function updateStock(index, change) {
    products[index].quantity += change;
    if (products[index].quantity < 0) products[index].quantity = 0;
    saveAndDisplay();
}

function deleteProduct(index) {
    if (confirm("Delete this product?")) {
        products.splice(index, 1);
        saveAndDisplay();
    }
}

function editProduct(index) {
    let p = products[index];

    let newName = prompt("Edit name:", p.name);
    let newQuantity = prompt("Edit quantity:", p.quantity);
    let newPrice = prompt("Edit price:", p.price);
    let newLevel = prompt("Edit level:", p.level);

    if (newName && newQuantity && newPrice && newLevel) {
        products[index] = {
            name: newName,
            quantity: parseInt(newQuantity),
            price: parseFloat(newPrice),
            level: parseInt(newLevel),
        };

        saveAndDisplay();
    }
}
function displayProducts() {
    const search = (document.getElementById("search")?.value || "").toLowerCase();

    const food = document.getElementById("foodList");
    const drinks = document.getElementById("drinksList");
    const household = document.getElementById("householdList");
    const instant = document.getElementById("instantList");

    food.innerHTML = "";
    drinks.innerHTML = "";
    household.innerHTML = "";
    instant.innerHTML = "";

    let total = 0;
    let lowCount = 0;

    products.forEach((p, i) => {

        if (!p.name.toLowerCase().includes(search)) return;

        let isLow = p.quantity <= p.level;
        if (isLow) lowCount++;

        total += p.quantity * p.price;

       let row = `
<tr>
    <td>${p.name}</td>
    <td>${p.quantity}</td>
    <td>₱${p.price}</td>
    <td>${p.level}</td>
    <td>${p.expiry || "-"}</td>
    <td>
        <button class="plusBtn" onclick="updateStock(${i}, 1)">➕</button>
        <button class="minusBtn" onclick="updateStock(${i}, -1)">➖</button>
        <button class="deleteBtn" onclick="deleteProduct(${i})">Delete</button>
    </td>
</tr>
`;
        if (p.category === "Food") food.innerHTML += row;
        else if (p.category === "Drinks") drinks.innerHTML += row;
        else if (p.category === "Household") household.innerHTML += row;
        else instant.innerHTML += row;
    });

    document.getElementById("totalValue").innerText = total.toFixed(2);
    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("lowStock").innerText = lowCount;
}

function saveAndDisplay() {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function goToCustomer() {
    document.getElementById("choiceScreen").style.display = "none";
    document.getElementById("customerScreen").style.display = "block";

    displayCustomerProducts(); // IMPORTANT
}

function goBack() {
    document.getElementById("customerScreen").style.display = "none";
    document.getElementById("choiceScreen").style.display = "block";
}

function displayCustomerProducts() {
   const expiryDate = expiry ? new Date(expiry) : null;
    let products = JSON.parse(localStorage.getItem("products")) || [];

    list.innerHTML = "";

    products.forEach((p, i) => {
        list.innerHTML += `
        <div style="background:white; margin:10px; padding:15px; border-radius:10px;">
            <h3>${p.name}</h3>
            <p>₱${p.price}</p>
            <p>Stock: ${p.quantity}</p>
            <button onclick="orderProduct(${i})">🛒 Buy</button>
        </div>
        `;
    });
}

function orderProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (products[index].quantity <= 0) {
        alert("Out of stock!");
        return;
    }

    products[index].quantity--;

    localStorage.setItem("products", JSON.stringify(products));

    alert("Order successful!");
    displayCustomerProducts();
    displayProducts();
}

function showStaffLogin() {
    document.getElementById("staffLoginForm").style.display = "block";
}

function hideStaffLogin() {
    document.getElementById("staffLoginForm").style.display = "none";
}

function staffLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("choiceScreen").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Wrong username or password");
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("choiceScreen").style.display = "block";
}

window.onload = function () {
    displayProducts();
};