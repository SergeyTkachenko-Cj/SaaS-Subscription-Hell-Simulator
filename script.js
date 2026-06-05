"use strict";
// Pseudocode
// ON PAGE LOAD:
//     cart = []
//     overall = 0
//     render menu = [item1, item2, ...] 
//     all add buttons enabled
//     all delete buttons disabled
//     MRR button disabled
// ON CLICK add menu item (item): 
//     cart.push(item)
//     if (item not in cart) return
//     overall += item.price
//     item add button disabled
//     item delete button enabled
//     if (overall > 0): MRR button enabled
// ON CLICK delete menu item (item): 
//     cart.removeById(item.id)
//     overall -= item.price
//     item add button enabled
//     item delete button disabled
//     if (overall === 0): MRR button disabled
// ON CLICK MRR button (if overall > 0):
//     show pop up with overall
//     disable all buttons until dismiss)
//     play animation once
//     on dismiss OR after animationend cleanup once (ignore second trigger):
//         hide pop up with overall
//         animation remove
// -----------------------------------------------------------------
(() => {
    const menu = [
        { id: 0, name: "Notion Pro Max Ultra", sub: "For organizing tasks you will ignore.", image: "./img/notion_logo.png", price: 5.5 },
        { id: 1, name: "Cursor Pro", sub: "Because typing code manually is medieval.", image: "./img/cursor_logo.png", price: 18 },
        { id: 2, name: "Claude Max", sub: "It's all the hype recently, sooo...", image: "./img/claude_logo.png", price: 10 },
        { id: 3, name: "Random AI SEO Tool", sub: "Bacause why not, you know", image: "./img/seo_logo.png", price: 2.8 },
        { id: 4, name: "Figma", sub: "Where buttons become political debates.", image: "./img/figma_logo.png", price: 15 },
        { id: 5, name: "Some rubbish tool from Product Hunt", sub: "Got to have it cause the founder is your X mate", image: "./img/product_hunt_logo.png", price: 30 },
        { id: 6, name: "Lovable MVP Hallucination Suite", sub: "Build SaaS products that almost work", image: "./img/cursor_logo.png", price: 25 },
        { id: 7, name: "Beehiiv Audience Mirage", sub: "2,000 subscribers. 17 readers.", image: "./img/claude_logo.png", price: 49 },
        { id: 8, name: "Supabase Backend Delusion", sub: "Backend in 5 minutes. Debugging in 5 days.", image: "./img/seo_logo.png", price: 25 },
        { id: 9, name: "Zoom Soul Drain Premium", sub: "This meeting could’ve been an email.", image: "./img/figma_logo.png", price: 17 }
    ];
    let cart = [];
    let overall = 0;
    let btnPairsState = [];
    const menuList = document.querySelector("#menuList");
    const mrrBtn = document.querySelectorAll("#mrrBtn");
    const popUpScreen = document.querySelectorAll(".show-popup");
    (function renderMenu() {
        if (!menuList)
            return;
        menuList.innerHTML = menu.map(item => `
    <div class="item-row" data-id="${item.id}">
      <div class="logo">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.sub}</p>
      </div>
      <strong>$${item.price.toFixed(2)}</strong>
      <button class="buy-btn" data-action="add">Buy</button>
      <button class="delete-btn mute-btn" data-action="delete" disabled>Delete</button>
    </div>
  `).join("");
    })();
    const addBtn = document.querySelectorAll(".buy-btn");
    const delBtn = document.querySelectorAll(".delete-btn");
    function addCart(item) {
        const gotcha = getElId(item);
        if (!gotcha || !duplicatesCheck(gotcha, item))
            return;
        cart.push(gotcha);
        overall = Math.round((overall + gotcha.price) * 100) / 100;
        if (!item.parentElement)
            return;
        addDelCartUpdates(item.parentElement);
    }
    function delCart(item) {
        const gotcha = getElId(item);
        if (!gotcha || !duplicatesCheck(gotcha, item))
            return;
        cart.splice(cart.findIndex(e => e === gotcha), 1);
        overall = Math.round((overall - gotcha.price) * 100) / 100;
        if (!item.parentElement)
            return;
        addDelCartUpdates(item.parentElement);
    }
    function duplicatesCheck(el, btn) {
        let count = 0;
        const addOrDel = btn.getAttribute("data-action");
        if (!addOrDel)
            return false;
        let condition = addOrDel === "add" ? 0 : 1;
        for (let i = 0; i < cart.length; i++) {
            if (el.id === cart[i]?.id) {
                count++;
            }
        }
        return !(count > condition);
    }
    function addDelCartUpdates(item) {
        findAllBtnPairs(item);
        showSum(overall);
        showHideMrr(mrrBtn[0]);
        showCart();
    }
    function getElId(item) {
        const elem = Number(item.parentElement?.getAttribute("data-id"));
        return menu.find(e => e.id === elem);
    }
    function findAllBtnPairs(item) {
        const allBtns = item.querySelectorAll("button");
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
        const expenses = document.querySelector("#totalExpenses");
        if (!expenses)
            return;
        expenses.textContent = sum.toFixed(2);
    }
    function showCart() {
        const cartList = document.querySelector(".empty-cart");
        if (!cartList)
            return;
        const cartMap = cart.map(i => `
    <div data-id="${i.id}">${i.name} - $${i.price}<button class="cart-cross" id="item-${i.id}">X</button></div>  
    `).join("<br/>");
        cartMap ? cartList.innerHTML = cartMap : cartList.innerHTML = "No tools yet. Suspiciously healthy.";
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
        item.parentElement.remove();
    }
    function showHideMrr(btn) {
        if (!(btn instanceof HTMLButtonElement))
            return;
        if (overall > 0) {
            btn.disabled = false;
            btn.classList.remove("mute-btn");
        }
        else {
            btn.disabled = true;
            btn.classList.add("mute-btn");
        }
    }
    function saveCurMenuBtns() {
        btnPairsState = [];
        const menuListBtns = menuList?.querySelectorAll("button");
        menuListBtns?.forEach(el => { btnPairsState.push(el.disabled); });
    }
    function restoreCurMenuBtns() {
        if (!menuList)
            return;
        const menuListBtns = menuList?.querySelectorAll("button");
        btnPairsState.forEach((el, item) => {
            if (!menuListBtns[item])
                return;
            if (!el) {
                menuListBtns[item].disabled = false;
            }
        });
    }
    function enablAllBtns() {
        restoreCurMenuBtns();
        if (!(mrrBtn[0] instanceof HTMLButtonElement))
            return;
        showHideMrr(mrrBtn[0]);
        const getCartList = document.querySelector("#cartList");
        const allBtns = getCartList?.querySelectorAll("button");
        allBtns?.forEach(el => { if (el.disabled) {
            el.disabled = false;
        } });
    }
    function disAllBtns() {
        saveCurMenuBtns();
        const dashboard = document.querySelectorAll(".dashboard");
        const allBtns = dashboard[0]?.querySelectorAll("button");
        allBtns?.forEach(el => { if (!el.disabled) {
            el.disabled = true;
        } });
    }
    function closePopUp(item) {
        if (!popUpScreen[0] || !item.children[0])
            return;
        if (item.children[0].classList.contains("pop-up")) {
            popUpScreen[0].innerHTML = "";
            enablAllBtns();
        }
        ;
    }
    function evnts(item, func) {
        item?.forEach(el => el.addEventListener("click", (e) => func(e.currentTarget)));
    }
    function popUp() {
        if (!popUpScreen[0])
            return;
        popUpScreen[0].innerHTML = `
  <div class="pop-up">
      <div class="popup-panel">
        <h2>Congratulations,</h2> 
        <h2 class="second-header">your MRR is now negative 👏</h2>
        <br>
        <h1 class="overall">- $ ${overall}</h1>
      </div>
    </div>
  `;
        disAllBtns();
    }
    evnts(addBtn, addCart);
    evnts(delBtn, delCart);
    evnts(mrrBtn, popUp);
    evnts(popUpScreen, closePopUp);
})();
//# sourceMappingURL=script.js.map