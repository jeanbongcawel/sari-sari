let products = JSON.parse(localStorage.getItem("products")) || [];
if (products.length === 0) {
     products = [
    { name: "Rice (5kg)", quantity: 10, price: 280, level: 3 },
    { name: "Instant Noodles", quantity: 25, price: 12, level: 10 },
    { name: "Sardines", quantity: 15, price: 25, level: 5 },
    { name: "Coffee 3-in-1", quantity: 30, price: 8, level: 10 },
    { name: "Sugar (1kg)", quantity: 12, price: 60, level: 4 },
    { name: "Milk (Powdered)", quantity: 8, price: 95, level: 3 },
    { name: "Cooking Oil", quantity: 6, price: 120, level: 2 },
    { name: "Bread", quantity: 20, price: 10, level: 5 },
    { name: "Eggs (dozen)", quantity: 5, price: 90, level: 2 },
    { name: "Soap", quantity: 18, price: 35, level: 6 }
];
    localStorage.setItem("products", JSON.stringify(products));
}
function addProduct() {
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const level = document.getElementById("level").value;

    if (!name || !quantity || !price || !level) {
        alert("Fill all fields!");
        return;
    }

    products.push({
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        level: parseInt(level)
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
    let rowClass = p.quantity <= p.level ? "low-row" : "";

    if (newName && newQty && newPrice && newLevel) {
        products[index] = {
            name: newName,
            quantity: parseInt(newQty),
            price: parseFloat(newPrice),
            level: parseInt(newLevel)
        };
        saveAndDisplay();
    }
}

function displayProducts() {
    const list = document.getElementById("productList");
    const search = document.getElementById("search").value.toLowerCase();
    if (!p.name.toLowerCase().includes(search)) return;
    list.innerHTML = "";

    let total = 0;
    let lowCount = 0;

    products.forEach((p, i) => {
        if (!p.name.toLowerCase().includes(search)) return;

        let isLow = p.quantity <= p.level;
        let status = isLow ? "LOW STOCK" : "OK";
        let className = isLow ? "low" : "ok";

        if (isLow) lowCount++;
        total += p.quantity * p.price;

        list.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.quantity}</td>
            <td>₱${p.price}</td>
            <td>${p.level}</td>
            <td class="${className}">${status}</td>
            <td>
                <button onclick="updateStock(${i}, 1)">+</button>
                <button onclick="updateStock(${i}, -1)">-</button>
                <button class="editBtn" onclick="editProduct(${i})">Edit</button>
                <button class="deleteBtn" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalValue").innerText = total.toFixed(2);
    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("lowStock").innerText = lowCount;
}

function saveAndDisplay() {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

displayProducts();