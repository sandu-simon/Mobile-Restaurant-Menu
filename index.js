import  { menuArray } from './data.js'

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
                <p class="plus-btn">+</p>
            </div>
        </div>`
    })

    return menuHtml
}


function render(){
    document.getElementById('food-menu').innerHTML = getMenuHtml();
}

render();
