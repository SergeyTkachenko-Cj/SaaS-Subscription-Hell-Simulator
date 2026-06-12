"use strict";
// Pseudocode
// ON PAGE LOAD:
//     cart = []
//     overall = 0
//     render menu = [item1, item2, ...] 
//     all add buttons enabled
//     all delete buttons disabled
// ON CLICK add menu item (item): 
//     cart.push(item)
//     if (item not in cart) return
//     overall += item.price
//     item add button disabled
//     item delete button enabled
// ON CLICK delete menu item (item): 
//     cart.removeById(item.id)
//     overall -= item.price
//     item add button enabled
//     item delete button disabled
// -----------------------------------------------------------------
(() => {
    const menu = [
        { id: 0, name: "NOTION PRO MAX ULTRA", sub: "Organize your chaos in 12,748 different ways. Will you actually use it? LOL.", image: "./img/notion_logo.png", badge: "FOUNDER<br>FAVORITE", badgeClass: "badge-green", price: 5.5 },
        { id: 1, name: "CURSOR PRO", sub: "AI pair programmer that writes beautiful bugs. 10x your vibe, 0x your revenue.", image: "./img/cursor_logo.png", badge: "HOT!", badgeClass: "badge-red", price: 18 },
        { id: 2, name: "CLAUDE MAX", sub: "It's all the hype recently, sooo...", image: "./img/claude_logo.png", badge: "BEST<br>PRICE", badgeClass: "badge-purple", price: 10 },
        { id: 3, name: "RANDOM AI SEO TOOL", sub: "Bacause why not, you know", image: "./img/seo_logo.png", badge: "BUY<br>NOW!", badgeClass: "badge-blue", price: 2.8 },
        { id: 4, name: "FIGMA", sub: "Where buttons become political debates.", image: "./img/figma_logo.png", badge: "ALMOST<br>FREE", badgeClass: "badge-green", price: 15 },
        { id: 5, name: "SOME RUBBISH FROM PRODUCT HUNT", sub: "Got to have it cause the founder is your X mate", image: "./img/product_hunt_logo.png", badge: "WOW!!!", badgeClass: "badge-red", price: 30 },
        { id: 6, name: "CHATGPT PLUS", sub: "Ask it questions. Get answers. Avoid real problems.", image: "./img/cursor_logo.png", badge: "DISCOUNT", badgeClass: "badge-purple", price: 25 },
        { id: 7, name: "BEEHIIV", sub: "2,000 subscribers. 17 readers.", image: "./img/claude_logo.png", badge: "SHOCKING", badgeClass: "badge-blue", price: 49 },
        { id: 8, name: "SUPABASE BACKEND SHIT", sub: "Backend in 5 minutes. Debugging in 5 days.", image: "./img/seo_logo.png", badge: "SUPA<br>PRICE", badgeClass: "badge-green", price: 25 },
        { id: 9, name: "ZOOM SOUL DRAIN PREMIUM", sub: "This meeting could’ve been an email.", image: "./img/figma_logo.png", badge: "ZOOM!<br>ZOOM!", badgeClass: "badge-red", price: 17 }
    ];
    let cart = [];
    let overall = 0;
    const menuList = document.querySelector("#menuList");
    (function renderMenu() {
        if (!menuList)
            return;
        menuList.innerHTML = menu.map(item => `
        <article class="tool-row">
         <div class="tool-logo">
            <img src="${item.image}" alt="${item.name}" /> 
         </div>        
         <div class="tool-copy">
           <h3>${item.name}</h3>
           <p>${item.sub}</p>
         </div>       
         <div class="badge ${item.badgeClass}">${item.badge}</div>     
         <div class="price">
            <span>$${item.price.toFixed(2)}</span>
            <small>/mo</small>
         </div>     
         <div class="actions" data-id="${item.id}">
            <button class="buy-btn" data-action="add">BUY NOW! 🛒</button>
            <button class="delete-btn mute-btn" data-action="delete" disabled>DELETE</button>
         </div>
        </article>
      `).join("");
    })();
    const addBtn = document.querySelectorAll(".buy-btn");
    const delBtn = document.querySelectorAll(".delete-btn");
    function addCart(item) {
        const gotcha = getElId(item);
        if (!item.parentElement)
            return;
        if (!gotcha || indexInCart(gotcha) !== -1)
            return;
        cart.push(gotcha);
        overall = Math.round((overall + gotcha.price) * 100) / 100;
        addDelCartUpdates(item.parentElement);
    }
    function delCart(item) {
        const gotcha = getElId(item);
        if (!item.parentElement)
            return;
        if (!gotcha || indexInCart(gotcha) === -1)
            return;
        cart.splice(indexInCart(gotcha), 1);
        overall = Math.round((overall - gotcha.price) * 100) / 100;
        addDelCartUpdates(item.parentElement);
    }
    function indexInCart(el) {
        return cart.findIndex(i => i.id === el.id);
    }
    function addDelCartUpdates(item) {
        findAllBtnPairs(item);
        showSum(overall);
        showCart();
    }
    function getElId(item) {
        const elem = Number(item.parentElement?.getAttribute("data-id"));
        return !Number.isNaN(elem) ? menu.find(e => e.id === elem) : undefined;
    }
    function findAllBtnPairs(item) {
        const allBtns = item.querySelectorAll("button[data-action='add'], button[data-action='delete']");
        allBtns.forEach(btn => btnPairsOnOff(btn));
    }
    function btnPairsOnOff(btn) {
        if (!btn.disabled) {
            btn.disabled = true;
            btn.classList.add("mute-btn");
        }
        else {
            btn.disabled = false;
            btn.classList.remove("mute-btn");
        }
    }
    function showSum(sum) {
        const expenses = document.querySelector(".total");
        if (!expenses)
            return;
        expenses.textContent = `${sum ? '- $' + sum.toFixed(2) : '$0'}`;
    }
    function showCart() {
        const cartList = document.querySelector("#cartItems");
        if (!cartList)
            return;
        const cartMap = cart.map(i => `
        <article class="cart-item" data-id="${i.id}">
          <div class="cart-logo">
           <img src="${i.image}" alt="${i.name}" />
          </div>
          <p>${i.name}</p>
          <strong>$${i.price.toFixed(2)}</strong>
          <button class="remove-btn cart-cross">×</button>
        </article> 
        `).join("");
        cartMap ? cartList.innerHTML = cartMap : cartList.innerHTML = `<p class="empty-cart">No tools yet. Suspiciously healthy.</p>`;
        evnts(cartList.querySelectorAll(".cart-cross"), xBtnCart);
    }
    function xBtnCart(item) {
        if (!item.parentElement)
            return;
        const getDelCartBtn = menuList?.querySelector(`[data-id="${item.parentElement.getAttribute('data-id')}"]`);
        const delBtn = getDelCartBtn?.querySelector(".delete-btn");
        if (!(delBtn instanceof HTMLButtonElement))
            return;
        delCart(delBtn);
    }
    function evnts(item, func) {
        item.forEach(el => el.addEventListener("click", () => func(el)));
    }
    showSum(overall);
    evnts(addBtn, addCart);
    evnts(delBtn, delCart);
})();
//# sourceMappingURL=scriptII.js.map