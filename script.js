/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "Soft Box",
        desc: "3 classic cookies — perfect for a sweet moment.",
        price: 20,
        cookies: 3,
        style: "soft",
        category: "classic"
    },

    {
        id: 2,
        name: "Maison Box",
        desc: "6 classic cookies — our everyday favorite.",
        price: 40,
        cookies: 6,
        style: "maison",
        category: "classic"
    },

    {
        id: 3,
        name: "Gathering Box",
        desc: "12 classic cookies — made for sharing.",
        price: 80,
        cookies: 12,
        style: "gathering",
        category: "classic"
    },

    {
        id: 4,
        name: "Terra Box",
        desc: "18 cookies — The Grand Maison selection.",
        price: 135,
        cookies: 18,
        style: "terra",
        category: "grand"
    },

    {
        id: 5,
        name: "Lumen Box",
        desc: "24 cookies — our most generous box.",
        price: 175,
        cookies: 24,
        style: "lumen",
        category: "grand"
    }

];



const WHATSAPP_NUMBER = "212650527938";



const shopCategories = [

    {
        key: "classic",
        title: "Classic Box Selection",
        subtitle: "Soft, golden, generously chipped"
    },

    {
        key: "grand",
        title: "The Grand Maison Box",
        subtitle: "For gatherings & celebrations"
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

function productCardHTML(product) {

    return `

        <article class="product-card">

            <div class="product-photo ${product.style}">

                <span class="product-badge">

                    ${product.cookies} cookies

                </span>

            </div>


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

    `;

}



function renderProducts() {

    productGrid.innerHTML =

        shopCategories.map(category => `

            <div class="shop-category">

                <div class="category-header">

                    <h3>
                        ${category.title}
                    </h3>

                    <p>
                        ${category.subtitle}
                    </p>

                </div>


                <div class="category-grid">

                    ${products
                        .filter(
                            product =>
                                product.category === category.key
                        )
                        .map(productCardHTML)
                        .join("")}

                </div>

            </div>

        `).join("") + `

            <p class="shop-note" dir="rtl">

                تتوفر كميات إضافية وصناديق مخصصة حسب الطلب

            </p>

        `;

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

function checkoutViaWhatsApp() {

    if (!cart.length) {

        alert(
            "Votre panier est vide 🍪"
        );

        return;

    }


    const lines =
        cart.map(item =>

            `${item.qty}× ${item.name} — ${item.price * item.qty} MAD`

        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.qty,
            0
        );


    const message =
        encodeURIComponent(

            `Bonjour LA MAISON SAURUS! 🍪\n\n` +
            `Je souhaite commander:\n\n` +
            lines.join("\n") +
            `\n\nTotal: ${total} MAD\n\nMerci!`

        );


    window.open(

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,

        "_blank"

    );

}



document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        checkoutViaWhatsApp
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
