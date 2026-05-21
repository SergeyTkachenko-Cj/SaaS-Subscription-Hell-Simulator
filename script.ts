// Pseudocode

ON PAGE LOAD:
    cart = []
    overall = 0
    render menu = [item1, item2, ...] // static
    all add buttons enabled
    all delete buttons disabled
    MRR button disabled

ON CLICK add menu item (item): 
    cart.push(item)
    if (item not in cart) return
    overall += item.price
    item add button disabled
    item delete button enabled
    if (overall > 0): MRR button enabled

ON CLICK delete menu item (item): 
    cart.removeById(item.id)
    overall -= item.price
    item add button enabled
    item delete button disabled
    if (overall === 0): MRR button disabled

ON CLICK MRR button (if overall > 0):
    show pop up with overall
    disable all buttons until dismiss)
    play animation once
    on dismiss OR after animationend cleanup once (ignore second trigger):
        hide pop up with overall
        animation remove

// -----------------------------------------------------------------

