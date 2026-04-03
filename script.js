const allProducts = [
    {id:1,name:"Product 1",price:100,img:"https://via.placeholder.com/150"},
    {id:2,name:"Product 2",price:200,img:"https://via.placeholder.com/150"},
    {id:3,name:"Product 3",price:300,img:"https://via.placeholder.com/150"},
    {id:4,name:"Product 4",price:400,img:"https://via.placeholder.com/150"}
];

let wishlist = [];
let cart = [];

function renderProducts(products) {
    document.getElementById("products").innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div>${p.name}</div>
            <div>₹${p.price}</div>
            <button class="add-btn" 
                style="margin-top:8px; background:${wishlist.find(x=>x.id===p.id)?'#fecaca':'#fee2e2'}; color:#b91c1c;" 
                onclick="toggleWishlist(${p.id})">
                <i class="fa ${wishlist.find(x=>x.id===p.id)?'fa-heart':'fa-heart-o'}"></i> Wishlist
            </button>
        </div>
    `).join('');
}

function updateWishlistUI() {
    document.getElementById("wishlistItems").innerHTML = wishlist.map((w, i) => `
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:15px; background:#f8fafc; padding:10px; border-radius:12px;">
            <div style="display:flex; gap:12px;">
                <img src="${w.img}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
                <div style="flex:1">
                    <div style="font-size:0.8rem; font-weight:600;">${w.name}</div>
                    <div style="font-size:0.75rem; color:#64748b;">₹${w.price}</div>
                </div>
                <i class="fa fa-trash" style="cursor:pointer; color:red;" onclick="removeWish(${i})"></i>
            </div>
            <button class="add-btn" style="background:#0f172a; color:white;" onclick="moveToCart(${w.id}, ${i})">
                Move to Bag 👜
            </button>
        </div>
    `).join('');
}

function updateCartUI() {
    document.getElementById("cartItems").innerHTML = cart.map(c => `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <img src="${c.img}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
            <div>${c.name} - ₹${c.price}</div>
        </div>
    `).join('');
}

function toggleWishlist(id) {
    const p = allProducts.find(x => x.id === id);
    const index = wishlist.findIndex(x => x.id === id);

    if(index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(p);
        alert("Added to Wishlist ❤️");
    }

    renderProducts(allProducts);
    updateWishlistUI();
}

function removeWish(index) {
    wishlist.splice(index, 1);
    updateWishlistUI();
    renderProducts(allProducts);
}

function addToCart(id) {
    const p = allProducts.find(x => x.id === id);
    cart.push(p);
    updateCartUI();
}

function moveToCart(id, index) {
    const payment = document.getElementById("paymentMethod").value;
    if(!payment) {
        alert("Please select a payment method before adding to cart!");
        return;
    }
    addToCart(id);
    wishlist.splice(index, 1);
    updateWishlistUI();
    renderProducts(allProducts);
}

renderProducts(allProducts);
updateWishlistUI();
updateCartUI();
