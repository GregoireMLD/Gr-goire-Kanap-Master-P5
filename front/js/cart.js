const cart = []

    retrieveItemsFromCache()
    console.log(cart)
    cart.forEach((item) => displayItem(item))

    const orderButton = document.querySelector("#order")
    orderButton.addEventListener("click", (e) => submitForm(e))

    function retrieveItemsFromCache() {
        const numberOfItems = localStorage.length
        for (let i = 0; i < numberOfItems; i++) {
            const item = localStorage.getItem(localStorage.key(i)) || ""
            const itemObject = JSON.parse(item)
            cart.push(itemObject)
    }
    }

    
    //création de <article></article> et de l'image du/des produit(s)
    function displayItem(item) {
        const article = AddArticle(item)
        const imageDiv = AddImageDiv(item)
        article.appendChild(imageDiv)
        const cardItemContent = AddCartContent(item)
        article.appendChild(cardItemContent)
        displayArticle(article)
        displayTotalQuantity()
        displayTotalPrice()
    }
    
    
    function AddCartContent(item) {
        const cardItemContent = document.createElement("div")
        cardItemContent.classList.add("cart__item__content")
        
        const description = AddDescription(item)
        const settings = AddSettings(item)
        
        cardItemContent.appendChild(description)
        cardItemContent.appendChild(settings)
        return cardItemContent
    }
    
    function AddSettings(item) {
        const settings = document.createElement("div")
        settings.classList.add("cart__item__content__settings")
        
        addQuantityToSettings(settings, item)
        addDeleteToSettings(settings, item)
        return settings
    }
    
    //L'ajout du button Supprimer 
    function addDeleteToSettings(settings, item) {
        const div = document.createElement("div")
        div.classList.add("cart__item__content__settings__delete")
        div.addEventListener("click", () => deleteItem(item))
        
        const p = document.createElement("p")
        p.textContent = "Supprimer"
        div.appendChild(p)
        settings.appendChild(div)
    }
    
    function deleteItem(item) {
        const itemToDelete = cart.findIndex(
            (product) => product.id === item.id && product.color === item.color
            )
            cart.splice(itemToDelete, 1)
            displayTotalPrice()
            displayTotalQuantity()
            deleteDataFromCache(item)
            deleteArticleFromPage(item)
        }
        
        function deleteArticleFromPage(item) {
            const articleToDelete = document.querySelector(
                `article[data-id="${item.id}"][data-color="${item.color}"]`
                )
                articleToDelete.remove()
            }
            
            //L'ajout du button "Qté" 
            function addQuantityToSettings(settings, item) {
                const quantity = document.createElement("div")
                quantity.classList.add("cart__item__content__settings__quantity")
                const p = document.createElement("p")
                p.textContent = "Qté : "
                quantity.appendChild(p)
                const input = document.createElement("input")
                input.type = "number"
                input.classList.add("itemQuantity")
                input.name = "itemQuantity"
                input.min = "1"
                input.max = "100"
                input.value = item.quantity
                input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
                
                quantity.appendChild(input)
                settings.appendChild(quantity)
            }
            
            function updatePriceAndQuantity(id, newValue, item) {
                const itemToUpdate = cart.find((item) => item.id === id)
                itemToUpdate.quantity = Number(newValue)
                item.quantity = itemToUpdate.quantity
                displayTotalQuantity()
                displayTotalPrice()
                saveNewDataToCache(item)
            }
            
            function deleteDataFromCache(item) {
                const key = `${item.id}-${item.color}`
                localStorage.removeItem(key)
            }
            
            function saveNewDataToCache(item) {
                const dataToSave = JSON.stringify(item)
                const key = `${item.id}-${item.color}`
                localStorage.setItem(key, dataToSave)
            }
            
            
            function displayArticle(article) {
                document.querySelector("#cart__items").appendChild(article)
            }
            
            function AddArticle(item) {
                const article = document.createElement("article")
                article.classList.add("card__item")
                article.dataset.id = item.id
                article.dataset.color = item.color
                return article
            }

            // La description de l'objet dans l'ordre : nom, couleur, prix
            function AddDescription(item) {
                const description = document.createElement("div")
                description.classList.add("cart__item__content__description")
                
                const h2 = document.createElement("h2")
                h2.textContent = item.name
                const p = document.createElement("p")
                p.textContent = item.color
                const p2 = document.createElement("p")
                p2.textContent = item.price + " €"
                
                description.appendChild(h2)
                description.appendChild(p)
                description.appendChild(p2)
                return description
            }
            
            // Prix total avec le nombre d'articles et le prix qui change
            function displayTotalQuantity() {
                const totalQuantity = document.querySelector("#totalQuantity")
                const total = cart.reduce((total, item) => total + item.quantity, 0)
                totalQuantity.textContent = total
            }
        
            function displayTotalPrice() {
                const totalPrice = document.querySelector("#totalPrice")
                const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
                totalPrice.textContent = total
        
            // let total = 0
            // cart.forEach((item) => {
            //     const totalUnitPrice = item.price * item.quantity
            //     total += totalUnitPrice
            // }) 
            }
            
            function AddImageDiv(item) {
                const div = document.createElement("div")
                div.classList.add("cart__item__img")
                
                const image = document.createElement("img")
                image.src = item.imageUrl
                image.alt = item.altTxt
                div.appendChild(image)
                return div
            }
            
            // Lorsque qu'on clique sur le bouton, le panier s'envoie dans la page confirmation 
            function submitForm(e) {
                e.preventDefault()
                if (cart.length === 0) {
                    alert("Please select items to buy")
                    return
                }
                
                if (isFormInvalid()) return 
                if (isEmailInvalid()) return 
                
                const body = AddRequestBody()
                
                // -------  Envoi de la requête POST au back-end --------
                // Création de l'entête de la requête
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                    // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
                })
                .then((res) => res.json())
                .then((data) => {
                    const orderId = data.orderId
                    window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
                })
                .catch((err) => console.error(err))
            }
            
            function isEmailInvalid() {
                const email = document.querySelector("#email").value
                const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
                if (regex.test(email) === false) {
                    alert("Please enter valid email")
                    return true
                }
                return false
            }
            
            function isFormInvalid() {
                const form = document.querySelector(".cart__order__form")
                const inputs = form.querySelectorAll("input")
                inputs.forEach((input) => {
                    if (input.value === "") {
                        alert("Please fill all the fields")
                        return true
                    }
                    return false
                })
            }
            
            function AddRequestBody() {
                const form = document.querySelector(".cart__order__form")
                const firstName = form.elements.firstName.value
                const lastName = form.elements.lastName.value
                const address = form.elements.address.value
                const city = form.elements.city.value
                const email = form.elements.email.value
                const body = {
                    contact: {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        city: city,
                        email: email
                    },
                    products: getIdsFromCache()
                }
                return body
            }
            
            function getIdsFromCache() {
                const numberOfProducts = localStorage.length
        const ids = []
        for (let i = 0; i < numberOfProducts; i++) {
            const key = localStorage.key(i)
            const id = key.split("-")[0]
            ids.push(id)
        }
        return ids
    }
    