const productsEspanha = [
    {   
        Id: 0,
        Nome: 'Camisa Barcelona',
        Ano: '2020/2021',
        Imagem: './imagens/barcelona.jpg',
        Preço: 20.9,
        Quantidade: 0
    },
    {
        Id: 1,
        Nome: 'Camisa Celta de Vigo',
        Ano: '2020/2021',
        Imagem: './imagens/celtadevigo.jpg',
        Preço: 10.2,
        Quantidade: 0
    },
    {   
        Id: 2,
        Nome: 'Camisa Real Madrid',
        Ano: '2020/2021',
        Imagem: './imagens/realmadrid.jpg',
        Preço: 14.9,
        Quantidade: 0
    },
    {   
        Id: 3,
        Nome: 'Camisa Atlético de Madrid',
        Ano: '2020/2021',
        Imagem: './imagens/atlmadrid.jpg',
        Preço: 229.9,
        Quantidade: 0
    }
]

function addEspanha() {
    const produtos = document.getElementById('products')

    produtos.innerHTML = ''

    for (let i = 0; i < productsEspanha.length; i++) {

    const imagem =  productsEspanha[i].Imagem
    const nome = productsEspanha[i].Nome
    const preço = productsEspanha[i].Preço
    const ano = productsEspanha[i].Ano
    const id = productsEspanha[i].Id
    const quantidade = productsEspanha[i].Quantidade

        produtos.innerHTML +=
            `
    <div class="box-product">
        <img src="${imagem}" alt="" class="img-product">
        <p class="text-box">${nome}</p>
        <p class="text-box">${ano}</p>
        <p class="price" id="price">R$ ${preço}0<p>
        <button class="btn-add-cart" onclick="addItemOnArrayCart('${id}','${imagem}', '${nome}', '${ano}', ${preço}, ${quantidade})">Adicione ao carrinho!</button>
        <div class="counter">
        <p class="text-box">Quantidade:</p>
        <input type="number" min="0" max="20" value="0" id="input-qtd-${id}">
        </div>
    </div>
`
    }
}

function addFrance() {
    const produtos = document.getElementById('products')

    produtos.innerHTML = ''

    for (let i = 0; i < productsFrance.length; i++) {

    const imagem =  productsFrance[i].Imagem
    const nome = productsFrance[i].Nome
    const preço = productsFrance[i].Preço
    const ano = productsFrance[i].Ano
    const id = productsFrance[i].Id
    const quantidade = productsFrance[i].Quantidade

        produtos.innerHTML +=
            `
    <div class="box-product">
        <img src="${imagem}" alt="" class="img-product">
        <p class="text-box">${nome}</p>
        <p class="text-box">${ano}</p>
        <p class="price" id="price">R$ ${preço}0<p>
        <button class="btn-add-cart" onclick="addItemOnArrayCart('${id}','${imagem}', '${nome}', '${ano}', ${preço}, ${quantidade})">Adicione ao carrinho!</button>
        <div class="counter">
        <p class="text-box">Quantidade:</p>
        <input type="number" min="0" max="20" value="0" id="input-qtd-${id}">
        </div>
    </div>
`
    }
}

addEspanha();
addButtonTotalPrice()


// ADD AO CARRINHO 

let arrayCart = []

function addItemOnArrayCart (id, imagem ,nome, ano, preço, quantidade) {
   let listCart = document.getElementById('list-cart')
   let quantidadeInput = document.getElementById(`input-qtd-${id}`).value

   quantidade = quantidadeInput

    let product = {
        Id: id,
        Nome: nome,
        Ano: ano,
        Imagem: imagem,
        Preço: preço,
        Quantidade: quantidade
    }
    
    if (quantidade > 0) {
        arrayCart.push(product)
    }
    else { alert('Você precisa selecionar a quantidade.')}

    calculateTotal()
    addItemOnCart()
}

function addItemOnCart () {
    let listCart = document.getElementById('list-cart')

    listCart.innerHTML = ''

    for (let i = 0; i < arrayCart.length; i++) {

        const imagemCart =  arrayCart[i].Imagem
        const nomeCart = arrayCart[i].Nome
        const preçoCart = arrayCart[i].Preço
        const anoCart = arrayCart[i].Ano
        const idCart = arrayCart[i].Id
        const quantidadeCart = arrayCart[i].Quantidade
    
        if (quantidadeCart > 0) {
            listCart.innerHTML += `
            <li class="item-cart">
            <img src="${imagemCart}" alt="" class="img-product">
                <div class="quantity-and-price">
                    <p class="cart-text-box">${quantidadeCart}x ${nomeCart}</p>
                    <p class="cart-text-box">${anoCart}</p>
                    <p class="price-cart" >R$ ${(quantidadeCart * preçoCart).toFixed(1)}0<p>
                    <button onclick="removeItemOnCart(${idCart})" id="cart-button-${idCart}">Remover</button>
                </div>
            </li> ` }
            else {
                alert('Você precisa selecionar a quantidade.')
            }
        }

        calculateTotal()

}

function removeItemOnCart(id) {

arrayCart.splice(_.findIndex(arrayCart, {id: id }), 1); 

addItemOnCart()

}
// CALCULATE TOTAL

function calculateTotal () {

    let setTotal = document.getElementById('cart-price');

    let total = 0 
    let discount = 0
    let qtd = 0

    arrayCart.forEach ( (product, index) => {
        total = total + product.Quantidade * (product.Preço)
    })

    arrayCart.forEach ( (product) => {
        qtd = qtd + product.Quantidade } )

    if (arrayCart.length > 2 || qtd > 2) {
        discount = total * 40/100
        total = total - discount
        
    }

    setTotal.innerHTML = `R$ ${total.toFixed(1)}0`

    let divTotalPrice = document.getElementById('total-price')

    divTotalPrice.innerHTML = `
    <p class="total-price-text">TOTAL: <span id="cart-price">R$ ${total.toFixed(1)}0</span></p>
    <p class="total-price-text">DESCONTO: <span id="cart-discount">R$ ${discount.toFixed(1)}0</span></p>
    <a href="https://picpay.me/joao.lima1522/${total.toFixed(1)}" target="_blank"><button class="btn btn-cart">PAGAR</button></a>
    `
} 

// ADD BUTTON TOTAL PRICE

function addButtonTotalPrice() {
    let divTotalPrice = document.getElementById('total-price')

    divTotalPrice.innerHTML = `
    <p class="total-price-text">TOTAL: <span id="cart-price">R$00,00</span></p>
    <p class="total-price-text">DESCONTO: <span id="cart-discount">R$00,00</span></p>
    <a href="https://picpay.me/joao.lima1522/20.0" target="_blank"><button class="btn btn-cart">PAGAR</button></a>
    `

}

// JAVASCRIPT + CSS
var icon = document.querySelector(".icon-cart-shopping"); 
var x = document.querySelector(".x");

icon.addEventListener("click", function(){
    document.querySelector(".sidebar").classList.toggle("show-menu");
    document.querySelector(".icon").classList.toggle("show-menu");
    document.querySelector(".sidebar-texts").classList.toggle("show-menu");
    document.querySelector(".text-cart").classList.toggle("show-menu");
}); 

x.addEventListener("click", function(){
    document.querySelector('.sidebar').classList.toggle('show-menu');
})

// ARRAYS 
const productsBrazil =   [
    {   
    Id: 8,
    Nome: 'Camisa Vasco White',
    Ano: '2019/2020',
    Imagem: './imagens/basco-white.jfif',
    Preço: 109.90,
    Quantidade: 0
},
]

const productsFrance =   [
    {
    Id: 4,
    Nome: 'Camisa Lyon',
    Ano: '2020/2021',
    Imagem: './imagens/lyon.jpg',
    Preço: 109.90,
    Quantidade: 0
},
{   
    Id: 5,
    Nome: 'Camisa Ollympique Marseille',
    Ano: '2020/2021',
    Imagem: './imagens/oll.jpg',
    Preço: 129.9,
    Quantidade: 0
},
{   
    Id: 6,
    Nome: 'Camisa PSG Black',
    Ano: '2020/2021',
    Imagem: './imagens/psg-black.jpg',
    Preço: 199.90,
    Quantidade: 0
},
{   
    Id: 7,
    Nome: 'Camisa PSG White',
    Ano: '2020/2021',
    Imagem: './imagens/psg-first.jpg',
    Preço: 299.90,
    Quantidade: 0
}
]
