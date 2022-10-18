fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => addProducts(data))


function addProducts(data) {

    // for (let i = 0; i < data.length;i++) {
    // }

    data.forEach((kanap) => {
      
      const _id = kanap._id
      const imageUrl = kanap.imageUrl
      const altTxt = kanap.altTxt
      const name = kanap.name
      const description = kanap.description
      
      const remp = AddRemp(_id)   
      const article = document.createElement("article")
      const image = AddImage(imageUrl, altTxt)
      const h3 = AddH3(name)
      const p = AddParagraph(description)
      
      appendElementsToArticle(article, [image, h3, p])
      appendArticleToRemp(remp, article)
    })
  }
  
  function appendElementsToArticle(article, array)  {
    array.forEach((item) => {
      article.appendChild(item)
    })
  }

  
  function AddRemp(id) {
    const remp = document.createElement("a")
    remp.href = "./product.html?id=" + id
    return remp
  }
  
  function appendArticleToRemp(remp, article) {
    const items = document.querySelector("#items")
    if (items != null) {
      items.appendChild(remp) 
      remp.appendChild(article)
    }    
}

  function AddImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
  }

  function AddH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
  }

  function AddParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p 
  }