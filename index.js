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
    if (e.target.classList.contains('complete-order-btn')) {
        document.getElementById('form-modal').style.display = 'flex'
        document.getElementById('overlay').style.display = 'block'; 
    }

    if (e.target.classList.contains('modal-close-btn')) {
        e.preventDefault();
        document.getElementById('form-modal').style.display = 'none'
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('order-form').reset();
    }

    if (e.target.classList.contains('submit-btn')) {
        e.preventDefault();

        const name = document.getElementById('clientName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cvv = document.getElementById('cardCvv').value;
    
        // Validare nume
        if (name === '') {
            alert('Please enter your name.');
            return;
        }
    
        // Validare card number
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            alert('Card number must be exactly 16 digits.');
            return;
        }
    
        // Validare CVV
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            alert('CVV must be exactly 3 digits.');
            return;
        }
    
        // Dacă totul e ok:
        document.getElementById('order').innerHTML = `
            <div class="thank-you" id="thank-you">
                <p style="text-align:center;">Thank you for your order! 🍔🍕</p>
                <p style="text-align:center;">Your food is on the way.</p>
            </div>
        `;
        document.getElementById('form-modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('order-form').reset();

    }

})

function addItem(itemId){
    const itemObj = menuArray.find(food => food.id === itemId)

    if(document.getElementById('thank-you')){
        document.getElementById('thank-you').remove();
    }
    
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

document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.substring(0, 16); 
  
    let formatted = value.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = formatted;
});


document.getElementById('cardCvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, ''); 

    if (e.target.value.length > 3) {
        e.target.value = e.target.value.substring(0, 3); 
    }
});


function render() {
    document.getElementById('food-menu').innerHTML = getMenuHtml();
    document.getElementById('item-list').innerHTML = getOrderHtml();
}

render(); 
