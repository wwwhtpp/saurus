/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "The Classic",
        desc: "Brown butter, sea salt & dark chocolate.",
        price: 28,
        style: "classic"
    },

    {
        id: 2,
        name: "Double Choco",
        desc: "Deep cocoa dough, milk & dark chocolate.",
        price: 30,
        style: "double"
    },

    {
        id: 3,
        name: "Pistachio Dream",
        desc: "Roasted pistachio, white chocolate & salt.",
        price: 34,
        style: "pistachio"
    },

    {
        id: 4,
        name: "Lotus Melt",
        desc: "Caramelized biscuit, vanilla & creamy center.",
        price: 32,
        style: "lotus"
    }

];



/* =========================================
   CART
========================================= */

let cart = [];



const productGrid =
    document.getElementById("productGrid");


const cartDrawer =
    document.getElementById("cartDrawer");


const overlay =
    document.getElementById("overlay");


const cartItems =
    document.getElementById("cartItems");


const cartCount =
    document.getElementById("cartCount");


const cartTotal =
    document.getElementById("cartTotal");



/* =========================================
   DISPLAY PRODUCTS
========================================= */

function renderProducts() {

    productGrid.innerHTML =
        products.map(product => `

        <article class="product-card">

            <div
                class="product-photo ${product.style}"
            ></div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.desc}
                </p>


                <div class="product-bottom">

                    <span class="price">

                        ${product.price} MAD

                    </span>


                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                        aria-label="Add ${product.name}"
                    >

                        +

                    </button>

                </div>

            </div>

        </article>

    `).join("");

}



/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.qty++;

    }

    else {

        cart.push({

            ...product,

            qty: 1

        });

    }


    renderCart();

    openCart();

}



/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQty(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.qty += amount;


    if (item.qty <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    renderCart();

}



/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.qty,
            0
        );


    cartCount.textContent =
        count;


    cartTotal.textContent =
        `${total} MAD`;


    if (!cart.length) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your box is waiting
                for something sweet.

            </p>

        `;

        return;

    }



    cartItems.innerHTML =

        cart.map(item => `

            <div class="cart-item">

                <div class="cart-thumb">

                    🍪

                </div>


                <div>

                    <h4>

                        ${item.name}

                    </h4>


                    <small>

                        ${item.price} MAD each

                    </small>


                    <div class="qty">

                        <button
                            onclick="changeQty(
                                ${item.id},
                                -1
                            )"
                        >

                            −

                        </button>


                        <span>

                            ${item.qty}

                        </span>


                        <button
                            onclick="changeQty(
                                ${item.id},
                                1
                            )"
                        >

                            +

                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}



/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartDrawer.classList.add("open");

    overlay.classList.add("active");

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

}



/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    cartDrawer.classList.remove("open");

    overlay.classList.remove("active");

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

}



/* =========================================
   CART BUTTONS
========================================= */

document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);



/* =========================================
   CHECKOUT
========================================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                alert(
                    "Your box is empty 🍪"
                );

                return;

            }


            alert(
                "Demo checkout 🍪\n\n" +
                "Connect this button " +
                "to your payment or " +
                "WhatsApp ordering system."
            );

        }
    );



/* =========================================
   NEWSLETTER
========================================= */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document
                .getElementById("email")
                .value
                .trim();


            const message =
                document
                .getElementById(
                    "formMessage"
                );


            if (!email) return;


            message.textContent =
                "You're on the list ✦";


            document
                .getElementById(
                    "newsletterForm"
                )
                .reset();

        }
    );



/* =========================================
   INITIALIZE
========================================= */

renderProducts();

renderCart();
