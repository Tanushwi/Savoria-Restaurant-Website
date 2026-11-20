const DELIVERY_FEE = 40;
const FREE_DELIVERY_ABOVE = 499;
const GST_RATE = 0.05;

/* ============================================================ AUTH LOGIC ============================================================ */
const authScreen = document.getElementById('authScreen');
const userProfile = document.getElementById('userProfile');
const userNameTxt = document.getElementById('userNameTxt');
const userAvatar = document.getElementById('userAvatar');

function switchAuthTab(type) {
  document.getElementById('tabLogin').classList.toggle('active', type === 'login');
  document.getElementById('tabSignup').classList.toggle('active', type === 'signup');
  document.getElementById('loginForm').style.display = type === 'login' ? 'flex' : 'none';
  document.getElementById('signupForm').style.display = type === 'signup' ? 'flex' : 'none';
  document.getElementById('authSwitchTxt').innerHTML = type === 'login' 
    ? 'Don\'t have an account? <a onclick="switchAuthTab(\'signup\')">Sign up</a>'
    : 'Already have an account? <a onclick="switchAuthTab(\'login\')">Login</a>';
}

function handleAuth(e, type) {
  e.preventDefault();
  let name, email;
  
  if (type === 'login') {
    email = document.getElementById('loginEmail').value;
    name = email.split('@')[0]; // Fake name from email
  } else {
    name = document.getElementById('signupName').value;
    email = document.getElementById('signupEmail').value;
  }

  // Save user to localStorage to remember them
  const user = { name, email };
  localStorage.setItem('sav_user', JSON.stringify(user));
  
  // Show site
  checkAuth();
  toast(`Welcome ${type === 'login' ? 'back' : ''} ${name}! 🎉`);
}

function checkAuth() {
  const savedUser = localStorage.getItem('sav_user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    authScreen.classList.add('hidden');
    document.body.classList.remove('locked');
    
    // Update Navbar
    userProfile.style.display = 'flex';
    userNameTxt.textContent = user.name;
    userAvatar.textContent = user.name.charAt(0).toUpperCase();
  } else {
    authScreen.classList.remove('hidden');
    document.body.classList.add('locked');
    userProfile.style.display = 'none';
  }
}

function logout() {
  if(confirm("Do you want to logout?")) {
    localStorage.removeItem('sav_user');
    checkAuth();
    toast("Logged out successfully", "info");
  }
}

// Initialize Auth on Load
checkAuth();

/* ============================================================ MENU DATA ============================================================ */
const MENU = [
  {id:1, name:"Paneer Tikka", cat:"Starters", price:329, mrp:399, veg:true, rating:4.8, emoji:"🍢", desc:"Char-grilled cottage cheese cubes marinated in smoked spices & mint chutney.", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=70"},
  {id:2, name:"Peri Peri Chicken Wings", cat:"Starters", price:389, mrp:449, veg:false, rating:4.9, emoji:"🍗", desc:"Crispy wings tossed in fiery peri-peri glaze with a cooling dip.", img:"https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=600&q=70"},
  {id:3, name:"Crispy Corn Chaat", cat:"Starters", price:249, mrp:299, veg:true, rating:4.7, emoji:"🌽", desc:"Golden fried corn kernels with herbs, lemon and tangy chaat masala.", img:"https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=70"},
  {id:4, name:"Butter Chicken", cat:"Main Course", price:449, mrp:529, veg:false, rating:4.9, emoji:"🍛", desc:"Tandoori chicken simmered in a silky tomato-cashew gravy with cream.", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=70"},
  {id:5, name:"Dal Makhani", cat:"Main Course", price:329, mrp:389, veg:true, rating:4.8, emoji:"🥘", desc:"Black lentils slow-cooked overnight with butter and smoky spices.", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=70"},
  {id:6, name:"Hyderabadi Biryani", cat:"Main Course", price:499, mrp:599, veg:false, rating:5.0, emoji:"🍚", desc:"Fragrant basmati layered with marinated mutton and saffron. Served with raita.", img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=70"},
  {id:7, name:"Paneer Butter Masala", cat:"Main Course", price:379, mrp:449, veg:true, rating:4.7, emoji:"🍲", desc:"Soft paneer cubes in a rich, buttery tomato gravy finished with cream.", img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=70"},
  {id:8, name:"Margherita Pizza", cat:"Pizza", price:349, mrp:399, veg:true, rating:4.6, emoji:"🍕", desc:"Wood-fired sourdough base, San Marzano tomato, fresh basil & mozzarella.", img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=70"},
  {id:9, name:"Pepperoni Supreme", cat:"Pizza", price:499, mrp:579, veg:false, rating:4.9, emoji:"🍕", desc:"Loaded with spicy pepperoni, jalapeños and a double layer of cheese.", img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=70"},
  {id:10, name:"Farmhouse Veggie", cat:"Pizza", price:429, mrp:499, veg:true, rating:4.5, emoji:"🍕", desc:"Bell peppers, onions, sweet corn, olives and mushrooms on a cheesy base.", img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=70"},
  {id:11, name:"Classic Cheeseburger", cat:"Burgers", price:299, mrp:349, veg:false, rating:4.8, emoji:"🍔", desc:"Double smashed patty, cheddar, caramelised onions & house sauce.", img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=70"},
  {id:12, name:"Veg Crunch Burger", cat:"Burgers", price:249, mrp:289, veg:true, rating:4.6, emoji:"🍔", desc:"Crispy veggie patty, lettuce, pickles and creamy chipotle mayo.", img:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=70"},
  {id:13, name:"Peri Peri Loaded Fries", cat:"Burgers", price:179, mrp:219, veg:true, rating:4.7, emoji:"🍟", desc:"Crispy fries loaded with cheese sauce, jalapeños & peri-peri dust.", img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=70"},
  {id:14, name:"Chocolate Lava Cake", cat:"Desserts", price:229, mrp:279, veg:true, rating:4.9, emoji:"🍫", desc:"Warm molten chocolate cake with a gooey centre & vanilla bean ice cream.", img:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=70"},
  {id:15, name:"Classic Tiramisu", cat:"Desserts", price:279, mrp:329, veg:true, rating:4.8, emoji:"🍰", desc:"Espresso-soaked ladyfingers layered with mascarpone & cocoa dust.", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=70"},
  {id:16, name:"Gulab Jamun Cheesecake", cat:"Desserts", price:259, mrp:299, veg:true, rating:4.7, emoji:"🍮", desc:"A fusion dessert — creamy cheesecake topped with warm gulab jamun.", img:"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=70"},
  {id:17, name:"Mango Lassi", cat:"Beverages", price:149, mrp:179, veg:true, rating:4.8, emoji:"🥤", desc:"Thick Alphonso mango yoghurt shake, chilled & topped with pistachio.", img:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=70"},
  {id:18, name:"Cold Coffee Frappe", cat:"Beverages", price:179, mrp:219, veg:true, rating:4.7, emoji:"☕", desc:"Double-shot espresso blended with milk, ice & a swirl of chocolate.", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=70"},
  {id:19, name:"Virgin Mojito", cat:"Beverages", price:169, mrp:199, veg:true, rating:4.6, emoji:"🍹", desc:"Fresh mint, lime and soda — the perfect refreshing cooler.", img:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=70"},
];

const CATEGORIES = ["All","Starters","Main Course","Pizza","Burgers","Desserts","Beverages"];

/* ============================================================ STATE ============================================================ */
let cart = JSON.parse(localStorage.getItem("sav_cart") || "{}");
let wish = JSON.parse(localStorage.getItem("sav_wish") || "[]");
let activeCat = "All";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const byId = id => MENU.find(m => m.id === id);

function imgFallback(img, emoji){
  const parent = img.parentElement;
  img.remove();
  const d = document.createElement("div");
  d.className = "img-fallback";
  d.textContent = emoji;
  parent.appendChild(d);
}
window.imgFallback = imgFallback;

/* ============================================================ PRELOADER ============================================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#preloader").classList.add("done");
  }, 900);
});

/* ============================================================ TOASTS ============================================================ */
function toast(msg, type = "success"){
  const icons = { success:"✅", error:"⚠️", info:"ℹ️" };
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.innerHTML = `<span class="ti">${icons[type]}</span><span>${msg}</span>`;
  $("#toasts").appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 400);
  }, 2800);
}

/* ============================================================ MENU RENDER ============================================================ */
function renderFilters(){
  $("#filters").innerHTML = CATEGORIES.map(c =>
    `<button class="filter ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
}

function renderMenu(){
  const list = activeCat === "All" ? MENU : MENU.filter(m => m.cat === activeCat);
  $("#menuGrid").innerHTML = list.map((m, i) => `
    <article class="dish" data-id="${m.id}" style="animation-delay:${i * 55}ms">
      <div class="dish-img">
        <img src="${m.img}" alt="${m.name}" loading="lazy"
             onerror="imgFallback(this,'${m.emoji}')" />
        <div class="tag-veg ${m.veg ? "" : "nonveg"}"></div>
        <button class="wish-btn ${wish.includes(m.id) ? "active" : ""}"
                data-wish="${m.id}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="${wish.includes(m.id) ? "currentColor" : "none"}"
               stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </button>
      </div>
      <div class="dish-body">
        <div class="dish-top">
          <h3>${m.name}</h3>
          <span class="rating">★ ${m.rating}</span>
        </div>
        <p>${m.desc}</p>
        <div class="dish-foot">
          <div class="price">${money(m.price)}<small>${money(m.mrp)}</small></div>
          <button class="add-btn" data-add="${m.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            ${cart[m.id] ? `Add (${cart[m.id]})` : "Add"}
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* ============================================================ CART ============================================================ */
function saveState(){
  localStorage.setItem("sav_cart", JSON.stringify(cart));
  localStorage.setItem("sav_wish", JSON.stringify(wish));
}
function cartCount(){ return Object.values(cart).reduce((a, b) => a + b, 0); }

function cartTotals(){
  let sub = 0;
  for (const id in cart) sub += byId(+id).price * cart[id];
  const delivery = sub === 0 ? 0 : (sub >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE);
  const gst = Math.round(sub * GST_RATE);
  return { sub, delivery, gst, total: sub + delivery + gst };
}

function addToCart(id, evt){
  cart[id] = (cart[id] || 0) + 1;
  saveState();
  updateBadges();
  renderCart();
  renderMenu();
  const item = byId(id);
  if (evt) flyToCart(evt.clientX, evt.clientY, item.emoji);
  $("#cartBtn").classList.add("bump");
  setTimeout(() => $("#cartBtn").classList.remove("bump"), 450);
  toast(`${item.name} added to cart`);
}

function changeQty(id, delta){
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveState();
  updateBadges();
  renderCart();
  renderMenu();
}

function updateBadges(){
  const c = cartCount(), w = wish.length;
  const cb = $("#cartBadge"), wb = $("#wishBadge");
  cb.textContent = c; wb.textContent = w;
  cb.classList.toggle("show", c > 0);
  wb.classList.toggle("show", w > 0);
  $("#cartCountTxt").textContent = c + (c === 1 ? " item" : " items");
  $("#wishCountTxt").textContent = w + (w === 1 ? " item" : " items");
}

function renderCart(){
  const body = $("#cartBody"), foot = $("#cartFoot");
  const ids = Object.keys(cart);
  if (!ids.length){
    body.innerHTML = `<div class="empty">
      <div class="ico">🛒</div>
      <h4>Your cart is empty</h4>
      <p>Add some delicious dishes to get started!</p>
    </div>`;
    foot.style.display = "none";
    return;
  }
  body.innerHTML = ids.map((id, i) => {
    const m = byId(+id), q = cart[id];
    return `<div class="cart-item" style="animation-delay:${i * 45}ms">
      <div class="ci-img"><img src="${m.img}" alt="${m.name}" onerror="imgFallback(this,'${m.emoji}')" /></div>
      <div>
        <h5>${m.name}</h5>
        <div class="ci-price">${money(m.price * q)}</div>
      </div>
      <div class="qty">
        <button data-minus="${id}">−</button>
        <span>${q}</span>
        <button data-plus="${id}">+</button>
      </div>
    </div>`;
  }).join("");
  const t = cartTotals();
  $("#subTotal").textContent = money(t.sub);
  $("#delFee").textContent = t.delivery === 0 ? "FREE" : money(t.delivery);
  $("#gst").textContent = money(t.gst);
  $("#grandTotal").textContent = money(t.total);
  foot.style.display = "block";
}

/* ============================================================ WISHLIST ============================================================ */
function toggleWish(id){
  const i = wish.indexOf(id);
  if (i > -1){ wish.splice(i, 1); toast(byId(id).name + " removed from wishlist", "info"); }
  else { wish.push(id); toast(byId(id).name + " saved to wishlist ❤️"); }
  saveState();
  updateBadges();
  renderMenu();
  renderWish();
}

function renderWish(){
  const body = $("#wishBody");
  if (!wish.length){
    body.innerHTML = `<div class="empty">
      <div class="ico">💛</div>
      <h4>No favourites yet</h4>
      <p>Tap the heart icon on any dish to save it here.</p>
    </div>`;
    return;
  }
  body.innerHTML = wish.map((id, i) => {
    const m = byId(id);
    return `<div class="cart-item" style="animation-delay:${i * 45}ms">
      <div class="ci-img"><img src="${m.img}" alt="${m.name}" onerror="imgFallback(this,'${m.emoji}')" /></div>
      <div><h5>${m.name}</h5><div class="ci-price">${money(m.price)}</div></div>
      <button class="add-btn" data-add="${id}" style="padding:8px 14px">Add</button>
    </div>`;
  }).join("");
}

/* ============================================================ FLY TO CART ============================================================ */
function flyToCart(x, y, emoji){
  const el = document.createElement("div");
  el.className = "fly";
  el.textContent = emoji;
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  const target = $("#cartBtn").getBoundingClientRect();
  requestAnimationFrame(() => {
    el.style.transform = `translate(${target.left + target.width / 2 - x}px, ${target.top + target.height / 2 - y}px) scale(.25) rotate(360deg)`;
    el.style.opacity = "0.15";
  });
  setTimeout(() => el.remove(), 900);
}

/* ============================================================ DRAWERS / MODALS ============================================================ */
function openDrawer(which){
  $("#overlay").classList.add("open");
  document.body.classList.add("locked");
  $("#" + which).classList.add("open");
}
function closeAll(){
  $("#overlay").classList.remove("open");
  document.body.classList.remove("locked");
  $$(".drawer").forEach(d => d.classList.remove("open"));
  $$(".modal").forEach(m => m.classList.remove("open"));
}

/* ============================================================ CHECKOUT & MOCK PAYMENT ============================================================ */
function openCheckout(){
  if (!cartCount()){ toast("Your cart is empty!", "error"); return; }
  const t = cartTotals();
  $("#ckSub").textContent = money(t.sub);
  $("#ckTax").textContent = money(t.delivery + t.gst);
  $("#ckTotal").textContent = money(t.total);
  $("#payAmt").textContent = "· " + money(t.total);
  
  // Prefill user data if logged in
  const savedUser = localStorage.getItem('sav_user');
  if(savedUser) {
    const u = JSON.parse(savedUser);
    $("#ckName").value = u.name;
    $("#ckEmail").value = u.email;
  }

  closeAll();
  setTimeout(() => {
    $("#checkoutModal").classList.add("open");
    $("#overlay").classList.add("open");
    document.body.classList.add("locked");
  }, 250);
}

function switchPayTab(method) {
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pay-form').forEach(f => f.classList.remove('active'));
  
  if(method === 'card') {
    document.querySelectorAll('.pay-tab')[0].classList.add('active');
    document.getElementById('payFormCard').classList.add('active');
  } else {
    document.querySelectorAll('.pay-tab')[1].classList.add('active');
    document.getElementById('payFormUpi').classList.add('active');
  }
}

function processMockPayment(e) {
  e.preventDefault();
  const phone = $("#ckPhone").value.trim();
  if (phone.length !== 10) {
    toast("Please enter a valid 10-digit phone number", "error");
    return;
  }

  const payBtn = $("#payBtn");
  const originalHTML = payBtn.innerHTML;
  
  // Show processing state
  payBtn.innerHTML = `<span class="spin"></span> Processing Payment...`;
  payBtn.disabled = true;

  // Simulate a 2-second network delay
  setTimeout(() => {
    // Generate random transaction ID
    const trxId = "pay_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    showSuccess(trxId);
    
    // Reset button
    payBtn.innerHTML = originalHTML;
    payBtn.disabled = false;
  }, 2000);
}

/* ============================================================ SUCCESS ============================================================ */
function showSuccess(paymentId){
  const orderId = "SAV" + Math.floor(100000 + Math.random() * 900000);
  const t = cartTotals();

  // Save locally so you have a receipt trail
  try {
    const history = JSON.parse(localStorage.getItem("sav_orders") || "[]");
    history.push({
      orderId,
      paymentId,
      amount: t.total,
      items: cartCount(),
      date: new Date().toISOString(),
      customer: {
        name: $("#ckName").value,
        phone: $("#ckPhone").value,
        address: $("#ckAddress").value
      }
    });
    localStorage.setItem("sav_orders", JSON.stringify(history));
  } catch(e){ console.warn(e); }

  $("#orderIdTxt").textContent = "Transaction ID: " + paymentId;

  closeAll();
  setTimeout(() => {
    $("#successModal").classList.add("open");
    $("#overlay").classList.add("open");
    document.body.classList.add("locked");
  }, 260);

  cart = {};
  saveState();
  updateBadges();
  renderCart();
  renderMenu();
  toast("Payment successful! Order placed 🎉");
}

/* ============================================================ REVIEWS ============================================================ */
const REVIEWS = [
  {n:"Ananya Sharma", r:"Food Blogger", s:5, t:"The Hyderabadi Biryani here is genuinely the best I've had in Delhi. The aroma hits you before the plate even arrives. Absolute 10/10.", a:"A"},
  {n:"Rohit Verma", r:"Regular Guest", s:5, t:"Ordered online at 9 PM, food arrived in 26 minutes — piping hot. The lava cake alone is worth the order. Packaging was premium too.", a:"R"},
  {n:"Priya Nair", r:"Chef & Critic", s:5, t:"Beautiful ambiance, attentive staff, and a menu that actually surprises you. The truffle pizza is a masterclass in balance.", a:"P"},
  {n:"Arjun Mehta", r:"Foodie", s:4, t:"Been coming here for 3 years. Consistency is their superpower — same incredible taste every visit. Wishlist feature on the site is a nice touch!", a:"A"},
  {n:"Sneha Kapoor", r:"First Timer", s:5, t:"Reserved a table for my anniversary and they decorated it without being asked. The paneer butter masala made me emotional, not kidding.", a:"S"},
  {n:"Karan Singh", r:"Delivery Customer", s:5, t:"Checkout was smooth, order tracking clear, food phenomenal. This is how online food should work.", a:"K"},
];

function renderReviews(){
  const html = REVIEWS.map(r => `
    <div class="review">
      <div class="stars">${"★".repeat(r.s)}${"☆".repeat(5 - r.s)}</div>
      <p>“${r.t}”</p>
      <div class="reviewer">
        <div class="avatar">${r.a}</div>
        <div><b>${r.n}</b><small>${r.r}</small></div>
      </div>
    </div>`).join("");
  $("#reviewsTrack").innerHTML = html + html;
}

/* ============================================================ EVENTS ============================================================ */
document.addEventListener("click", e => {
  const f = e.target.closest("[data-cat]");
  if (f){ activeCat = f.dataset.cat; renderFilters(); renderMenu(); return; }

  const add = e.target.closest("[data-add]");
  if (add){ e.preventDefault(); addToCart(+add.dataset.add, e);
    add.classList.add("added"); setTimeout(() => add.classList.remove("added"), 700); return; }

  const w = e.target.closest("[data-wish]");
  if (w){ e.preventDefault(); toggleWish(+w.dataset.wish); return; }

  const plus = e.target.closest("[data-plus]");
  if (plus){ changeQty(+plus.dataset.plus, 1); return; }
  const minus = e.target.closest("[data-minus]");
  if (minus){ changeQty(+minus.dataset.minus, -1); return; }

  if (e.target.closest("[data-close]")){ closeAll(); return; }
  if (e.target.id === "overlay"){ closeAll(); return; }

  if (e.target.closest("#cartBtn")){ renderCart(); openDrawer("cartDrawer"); return; }
  if (e.target.closest("#wishBtn")){ renderWish(); openDrawer("wishDrawer"); return; }
  if (e.target.closest("#checkoutBtn")){ openCheckout(); return; }
});

document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });

$("#reserveForm").addEventListener("submit", e => {
  e.preventDefault();
  toast("Table reserved! We'll confirm on WhatsApp shortly 🎉");
  e.target.reset();
});

/* ============================================================ NAV / SCROLL / MOBILE ============================================================ */
const nav = $("#nav");
const mobileMenu = $("#mobileMenu");
const hamburger = $("#hamburger");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 60);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  $("#progress").style.width = (y / h) * 100 + "%";
}, { passive: true });

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.classList.toggle("locked", mobileMenu.classList.contains("open"));
});
$$("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.classList.remove("locked");
}));

/* ============================================================ REVEAL / COUNTERS ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); revealObs.unobserve(en.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

function observeReveals(){ $$(".reveal:not(.in)").forEach(el => revealObs.observe(el)); }

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = +el.dataset.count;
    const dur = 1600, start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (target === 98 ? "%" : "+");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

/* ============================================================ INIT ============================================================ */
function init(){
  $("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderMenu();
  renderReviews();
  renderCart();
  renderWish();
  updateBadges();
  observeReveals();
  $$("[data-count]").forEach(el => counterObs.observe(el));
  setTimeout(observeReveals, 400);
  console.log("%c🍽️ SAVORIA ready!", "color:#e9b949;font-size:16px;font-weight:bold");
}
init();
