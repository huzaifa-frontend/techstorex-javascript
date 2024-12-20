let products = [
    { id: 1, name: "Product 1", price: "$20", description: "A great product." },
    { id: 2, name: "Product 2", price: "$30", description: "Another great product." },
    { id: 3, name: "Product 3", price: "$40", description: "The best product ever." },
  ];
  

  function renderProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    products.map((product) => {
      
      const card = document.createElement("div");
      card.className = "product-card";
  
      const title = document.createElement("h3");
      title.textContent = product.name;
  
      const price = document.createElement("p");
      price.textContent = `Price: ${product.price}`;
  
      const description = document.createElement("p");
      description.textContent = product.description;
  
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        
        products = products.filter((item) => item.id !== product.id);
        renderProducts();
      });
  
      
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(description);
      card.appendChild(deleteButton);
  
      
      container.appendChild(card);
    });
  }
  
  
  renderProducts();
  