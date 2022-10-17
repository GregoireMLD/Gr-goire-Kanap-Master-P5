fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => {
  console.log(data)
  return addProducts(data)
})

function addProducts(produits) {
    const id = produits[0]._id
    const aremplacer = makeAremplancer(id)
    appendChildren(aremplacer)
  }
  
  function makeAremplancer(id) {
    const aremplacer = document.createElement("a")
    aremplacer.href = "./product.html?id=" + id
    return aremplacer
  }
  
  function appendChildren(aremplacer) {
    const items = document.querySelector("#items")
    if (items != null) {
      items.appendChild(aremplacer) 
    }    
}