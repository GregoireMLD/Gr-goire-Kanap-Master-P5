const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText
}

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then((res) => Datas(res))

function Datas(data) {
    const altTxt = data.altTxt
    const colors = data.colors
    const description = data.description
    const imageUrl = data.imageUrl
    const name = data.name
    const price = data.price
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    AddImage(imageUrl, altTxt)
    Addcolors(colors)
    AddDescription(description)
    AddTitle(name)
    AddPrice(price)
}

function AddImage(imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function AddTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function AddPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function AddDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function Addcolors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)          
        })
    }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid(color, quantity)) return
    saveCart(color, quantity)
    redirectToCart()
}

function saveCart(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price : itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
    }
    localStorage.setItem(id, JSON.stringify(data))   
}

function isOrderInvalid(color, quantity) {
if (color == null || color === "") {
    alert("Veuillez choisir une couleur.")
}
 if (quantity == null || quantity == 0) {
    alert("Veuillez choisir le nombre de canapé shouaitez.")    
    return true
 }
}

function redirectToCart() {
    window.location.href = "cart.html"
}