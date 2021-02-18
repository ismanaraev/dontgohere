

let carts = document.querySelectorAll('.add');

let products = [
    {
        name: 'CHEESBURGER',
        tag: 'cheesburger',
        price: 3,
        inCart: 0
    },
    {
        name: 'DOUBLE HAMBURGER',
        tag: 'doublehamburger',
        price: 5,
        inCart: 0
    },
    {
        name: 'HAMBURGER',
        tag: 'hamburger',
        price: 4,
        inCart: 0
    },
]

for(let i=0;  i < carts.length; i++) {
    carts[i].addEventListener('click', function() {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function cartNumbers(product) {
    // console.log(product)
    let productNumbers = localStorage.getItem('cartNumbers');
    // console.log(productNumbers);
    productNumbers = parseInt(productNumbers);
    if( productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function setItems (product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    if (cartItems !=null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems) )
}

function totalCost(product) {
    // console.log('The product prise is ', product.price)
    let cartCost = localStorage.getItem('totalCost')
    

    if(cartCost !=null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem('totalCost', product.price);
    }

}
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost')


    // console.log(cartItems)
    if(cartItems && productContainer ) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <i class="fa fa-trash" aria-hidden="true"></i>
                <img src="./img/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <span>${item.inCart}</span>

            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
        `
    }

    deleteButtons()
    // manageQuantity()
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product i.fa.fa-trash')
    let productName
    let productNumbers = localStorage.getItem('cartNumbers')
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    // console.log(cartItems)
    let cartCost = localStorage.getItem('totalCost')

    for(let i=0; i<deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', function(){
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '')
            // console.log(productName)
            // console.log(cartItems[productName].name + " " + cartItems[productName].inCart)

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart)

            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart))

            delete cartItems[productName]
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))

            displayCart()
            onLoadCartNumbers()
        })
    }
}


onLoadCartNumbers ()
displayCart()