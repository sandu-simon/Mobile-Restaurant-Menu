import  { menuArray } from './data.js'

const orderArray=[]

function getMenuHtml(){
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item">
            <p class="item-emoji">${item.emoji}</p>
            <div>
                <p class="item-name">${item.name}</p>
                <p class="item-ingridiends">${item.ingredients.join(", ")}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <div class="order-btn">
                <p class="plus-btn" data-id="${item.id}">+</p>
            </div>
        </div>`
    })

    return menuHtml
}

document.addEventListener('click', function(e){
    if (e.target.classList.contains('plus-btn')) {
        const itemId = parseInt(e.target.dataset.id)
        addItem(itemId)
        render(); 
    }
    if (e.target.classList.contains('remove-btn')) {
        const itemId = parseInt(e.target.dataset.id)
        removeItem(itemId)
        render(); 
    }
})

function addItem(itemId){
    const itemObj = menuArray.find(food => food.id === itemId)
    
    if (itemObj) {
        if(!orderArray.includes(itemObj)){
            orderArray.push(itemObj)
            document.getElementById('order').style.display = "block";

        } 
    }
}

function removeItem(itemId){
    const index = orderArray.findIndex(item => item.id === itemId)

    if (index !== -1) {
        orderArray.splice(index, 1)
        if(!orderArray[0]){
            document.getElementById('order').style.display = "none";
        }
    }
}

function getOrderHtml(){
    let orderHtml = ''

    orderArray.forEach(function(item){
        orderHtml += `                      
            <div class="order-item">
                <p>${item.name}</p>
                <p class="remove-btn" data-id="${item.id}">remove</p>
                <p class="order-item-price">$${item.price}</p>
            </div>`
    })

    orderHtml += `                    
        <div class="order-item total-price">
            <p>Total price</p>
            <p class="order-item-price">$${
                orderArray.reduce(function(total,next){
                return total+next.price
            },0)}</p>
        </div>`
    

    return orderHtml
}



function render() {
    document.getElementById('food-menu').innerHTML = getMenuHtml();
    document.getElementById('item-list').innerHTML = getOrderHtml();
}

render(); 
