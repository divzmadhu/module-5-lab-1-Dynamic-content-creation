/*
===========================================================
PROJECT   : ShopEase - Dynamic Shopping Cart
Module 5  : The Document Object Model 
Lab 1     : Dynamic Content Creation
DATE: September 22, 2026

OBJECTIVES:

Dynamically create and manipulate DOM elements to build interactive features.
Update the DOM to reflect changes in user input, such as quantity updates and price calculations.
Use event handling to implement interactivity for adding, updating, and removing items.
Use efficient DOM manipulation techniques to minimize performance bottlenecks.

============================================================= */




const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const addProductButton = document.getElementById('add-product');
const updateProductButton = document.getElementById("update-product");

const totalPriceSpan = document.getElementById('total-price');
let productList = document.getElementById("product-list");
const billDate = document.getElementById("bill-date");
const thankYou = document.getElementById("thank-you");

let products = [];


addProductButton.addEventListener("click", function addProductButton() {
  let newProduct = {
    
    productName: productName.value.trim(),
    productPrice: productPrice.value,
    productQuantity: productQuantity.value,
  };

  if (productName.value.trim() === "" || productName.value === "") {
    alert("Please enter a Product Name ,Price and Quantity");
    return;
  }

  products.push(newProduct);
  
  console.log("Updated Products Array:", products);
  productName.value = "";
  productPrice.value = "";
  productQuantity.value = "";
  displayProducts();
});

function displayProducts() {

  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerText = "Your Cart is Empty!!";
    totalPriceSpan.textContent = "0.00";
    billDate.innerText = "";
    thankYou.innerText = "";
    return;
  }

  let total = 0;
  const currentDate = new Date();

  billDate.innerText = "Date: " + currentDate.toLocaleDateString();


  products.forEach(function (product, index) {

    let productCard = document.createElement("li");
    productCard.dataset.index = index;

    let price = parseFloat(product.productPrice);
    let quantity = parseInt(product.productQuantity);

    let itemTotal = price * quantity;

    total += itemTotal;


    let productNameElement = document.createElement("h3");
    productNameElement.innerText = product.productName;

    let productPriceElement = document.createElement("p");
    productPriceElement.innerText = "Price: $" + price.toFixed(2);

    let productQuantityElement = document.createElement("p");
    productQuantityElement.innerText = "Quantity: " + quantity;

    let productTotalElement = document.createElement("p");
    productTotalElement.innerText = "Item Total: $" + itemTotal.toFixed(2);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", removeItem);


    
    productCard.appendChild(productNameElement);
    productCard.appendChild(productPriceElement);
    productCard.appendChild(productQuantityElement);
    productCard.appendChild(productTotalElement);
    productCard.appendChild(deleteButton);
    productList.appendChild(productCard);
    console.log(productList)

  });

  totalPriceSpan.textContent = total.toFixed(2);
  thankYou.innerText = "Thank you for shopping with ShopEase!";

}


updateProductButton.addEventListener("click", updateProduct);

function updateProduct() {

    if (products.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Which product do you want to update?\n\n";

    products.forEach(function(product, index) {

        message += 
            (index + 1) + ". " +
            product.productName +
            " - Quantity: " +
            product.productQuantity +
            "\n";
    });

   
    let productNumber = prompt(message);

    if (productNumber === null) {
        return;
    }

    productNumber = parseInt(productNumber);

    
    if (isNaN(productNumber) || productNumber < 1 || productNumber > products.length)
    {
        alert("Please enter a valid product number.");
        return;
    }

    // Convert product number to array index
    const productIndex = productNumber - 1;

    // Get selected product
    const selectedProduct = products[productIndex];

    // Ask what the user wants to do
    let choice = prompt(
        "What would you like to do with " +
        selectedProduct.productName +
        "?\n\n" +
        "1. Delete the whole product\n" +
        "2. Update the quantity\n" +
        "3. Add quantity"
    );

    if (choice === null) {
        return;
    }


    if (choice === "1") {

        products.splice(productIndex, 1);

        alert(selectedProduct.productName + " was removed.");

    }

    else if (choice === "2") {

        let newQuantity = prompt(
            "Enter the new quantity for " +
            selectedProduct.productName
        );

        if (newQuantity === null) {
            return;
        }

        newQuantity = parseInt(newQuantity);

        if (isNaN(newQuantity) || newQuantity < 1) {

            alert("Please enter a valid quantity.");
            return;
        }

        selectedProduct.productQuantity = newQuantity;

    }



    else if (choice === "3") {

        let additionalQuantity = prompt(
            "How many more would you like to add?"
        );

        if (additionalQuantity === null) {
            return;
        }

        additionalQuantity = parseInt(additionalQuantity);

        if (
            isNaN(additionalQuantity) ||
            additionalQuantity < 1
        ) {
            alert("Please enter a valid quantity.");
            return;
        }

        selectedProduct.productQuantity =
            parseInt(selectedProduct.productQuantity) +
            additionalQuantity;
    }


    else {

        alert("Please choose 1, 2, or 3.");
        return;
    }


    // Rebuild the cart and calculate new bill
    displayProducts();

    console.log("Updated Products Array:", products);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  if(!item) return;
  const productIndex = parseInt(item.dataset.index);
  if (isNaN(productIndex)) return;
  products.splice(productIndex, 1);
  displayProducts();
  console.log("Updated Products Array:", products);
}