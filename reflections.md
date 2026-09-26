# Reflection: ShopEase Project

1. Initially used a `#display-container` that included a `<button id="display-product">` and an empty `<ol id="product-list">`.

2. Removed the manual display button and invoked `displayProducts()` whenever any action (adding, updating, or deleting items) occurred so the list updates in real time.

3. Used an ordered list (`<ol>`) instead of an unordered list to make it convenient to update items based on their index number.

4. Used the `splice()` function to handle deleting products accurately from the array.

5.  Learned about the built-in HTML `dataset` object (`data-index`) to cleanly read array positions from DOM elements.

6.  Addressed challenges around the update section's validation logic to cover various possibilities:
    * Handling when the user enters an invalid value.
    * Checking if quantity is `< 1`, not a number (using `isNaN`), or `null` when cancelling.

7. Added a `billDate` to display the current date, referring to MDN documentation for `toLocaleDateString()` to get it working as expected.

8. Ensured conditional elements (like the date and thank-you message) only populate when items exist in the cart.

9. Cleaned up unused elements, including an extra `<ul id="cart">` and redundant global variables (`totalPrice`).

10. Added minimal CSS properties and used the `box-shadow` property to enhance the 3D effect while the cart updates.

11. Planned future module where users can pick items from a catalog without manually entering prices or names, and associating unique IDs with products.

12. Overall enjoyed working on this project and satisfied with the end result!