// Populate categories dynamically
const categories = ["Kurti & Dress","Kids & Toys","Westernwear","Home"];
const categoryScroll = document.getElementById("categoryScroll");
categories.forEach(cat => {
  const div = document.createElement("div");
  div.className = "category-card";
  div.innerText = cat;
  div.onclick = ()=>filterByCategory(cat);
  categoryScroll.appendChild(div);
});

// Render products
const productGrid = document.getElementById("productGrid");

function renderProducts(prodList){
  productGrid.innerHTML = "";
  prodList.forEach(p=>{
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price} - <span>${p.offer}</span></p>
      <div class="wishlist-btn" onclick="toggleWishlist(${p.id})">&#10084;</div>
    `;
    productGrid.appendChild(card);
  });
}

// Filter by category
function filterByCategory(cat){
  const filtered = products.filter(p=>p.category===cat);
  renderProducts(filtered);
}

// Initialize all products
renderProducts(products);

// Wishlist logic
let wishlist = [];
function toggleWishlist(id){
  if(!wishlist.includes(id)) wishlist.push(id); 
  else wishlist = wishlist.filter(i=>i!==id);
  alert("Wishlist Updated!");
}
