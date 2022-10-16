fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => addProducts(data))

function addProducts(produits) {

    const imageUrl = produits[0].imageUrl
    console.log("Url de l'image", imageUrl)
    
    const aremplacer = document.createElement("a")
    aremplacer.href = imageUrl
    aremplacer.text = "Un super Canap"
    
    const items = document.querySelector("#items")
    if (items != null) {
      items.appendChild(aremplacer) 
    }  
}