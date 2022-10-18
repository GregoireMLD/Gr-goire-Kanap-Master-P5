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
      
      const aremplacer = makeAremplacer(_id)   
      const article = document.createElement("article")
      const image = makeImage(imageUrl, altTxt)
      const h3 = makeH3(name)
      const p = makeParagraph(description)
      
      appendElementsToArticle(article, [image, h3, p])
      appendArticleToAremplacer(aremplacer, article)
    })
  }
  
  function appendElementsToArticle(article, array)  {
    array.forEach((item) => {
      article.appendChild(item)
    })
  }

  
  function makeAremplacer(id) {
    const aremplacer = document.createElement("a")
    aremplacer.href = "./product.html?id=" + id
    return aremplacer
  }
  
  function appendArticleToAremplacer(aremplacer, article) {
    const items = document.querySelector("#items")
    if (items != null) {
      items.appendChild(aremplacer) 
      aremplacer.appendChild(article)
    }    
}

  function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
  }

  function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
  }

  function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p 
  }