const qtyPlus = document.querySelector(".qty-increase");
const qtyMinus = document.querySelector(".qty-decrease");
const qty = document.getElementById("qty-value");
const placeOrder = document.querySelector(".place-order");

let amount = 0;

qtyPlus.addEventListener("click", function () {
  amount += 1;
  qty.innerText = amount;
});

qtyMinus.addEventListener("click", function () {
  if (amount > 0) {
    amount -= 1;
    qty.innerText = amount;
  }
});

placeOrder.addEventListener("click", function () {
  const count = document.querySelector(".cart-count");
  const checkout = document.querySelector(".checkout");
  const emptyCart = document.querySelector(".empty-cart");
  const cart = document.getElementById("cart-contents");
  const itemName = document.querySelector("h1");
  const itemPrice = document.querySelector(".product-price h2");
  const floatValue = parseFloat(itemPrice.innerText.replace(/[^0-9.-]/g, ""));

  if (amount !== 0) {
    const currentValue = parseInt(count.innerText.trim(), 10);
    count.innerText = (isNaN(currentValue) ? 0 : currentValue) + amount;
    count.style.visibility = "visible";
    emptyCart.style.display = "none";
    checkout.style.display = "flex";

    // Check if item already exists in cart
    const existingItem = Array.from(
      document.querySelectorAll(".item-name")
    ).find((el) => el.innerText === itemName.innerText);

    if (existingItem) {
      // Update existing item
      const itemPriceEl = existingItem.nextElementSibling;
      const currentAmount = parseInt(itemPriceEl.innerText.split(" x ")[1]);
      const newAmount = currentAmount + amount;

      itemPriceEl.innerText = `$${floatValue} x ${newAmount}`;
      itemPriceEl.nextElementSibling.innerText = `$${floatValue * newAmount}`;
    } else {
      // Create new item
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img
          src="./images/image-product-1-thumbnail.jpg"
          alt="Product thumbnail"
        />
        <p class="item-name">${itemName.innerText}</p>
        <p class="item-price">$${floatValue} x ${amount}</p>
        <p class="item-total">$${floatValue * amount}</p>
        <img
          class="delete-item"
          src="./images/icon-delete.svg"
          alt="remove item"
        />
      `;

      // Add event listener to the delete button
      const deleteBtn = cartItem.querySelector(".delete-item");
      deleteBtn.addEventListener("click", function () {
        // Get the quantity of the item being removed
        const quantity = parseInt(
          cartItem.querySelector(".item-price").innerText.split(" x ")[1]
        );

        // Update cart count
        const newCount = parseInt(count.innerText) - quantity;
        count.innerText = newCount;

        // Remove the item
        cartItem.remove();

        // Show empty cart if no items left
        if (newCount <= 0) {
          count.style.visibility = "hidden";
          emptyCart.style.display = "block";
          checkout.style.display = "none";
        }
      });

      // Remove existing checkout button before adding new items
      checkout.remove();
      cart.appendChild(cartItem);
      cart.appendChild(checkout);
    }
  }
});
