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
        { id: 5, name: "Some rubbish tool from Product Hunt", sub: "Got to have it cause the founder is your X mate", image: "./img/product_hunt_logo.png", price: 30 }
    ];
    let cart = [];
    let overall = 0;
    (function renderMenu() {
        const menuList = document.querySelector("#menuList");
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
        <button class="delete-btn" data-action="delete" disabled>Delete</button>
      </div>
    `).join("");
    })();
})();
//# sourceMappingURL=script.js.map