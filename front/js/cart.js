//Récupération du ls
let articleLocalStorage = JSON.parse(localStorage.getItem("LSArticle"));
console.log(articleLocalStorage);//renvoi bien le contenu du LS ds la console

const cartItems = document.querySelector("#cart__items");//récupération de l'id cart__item emplacement des produits à afficher sur la page cart



//Si le panier est vide 
if(articleLocalStorage === null){
    const cartEmpty ="  0 Article, votre panier est vide!"
    cartItems.textContent = cartEmpty;
}
//SINON (la panier contient un ou des articles)
else{

//Création d'une boucle afin d'insérer dynamiquement les élements   
for (let article in articleLocalStorage){
    fetch (`http://localhost:3000/api/products/${articleLocalStorage[article].idSelected}`)
        .then (function (response){
            return response.json();
        })
        .then (function (cartArticle){
            
            console.log(articleLocalStorage[article].idSelected);//Retourne l'id des articles sélectionnés en page produit

//Recherche des besoin img, description,prix ds l'api            
            articleLocalStorage[article].imgCartArticle = cartArticle.imageUrl
            articleLocalStorage[article].altImgcartArticle = cartArticle.altTxt
            articleLocalStorage[article].priceCartArticle = cartArticle.price
 
//test de calcul des prix            
           /* totalPrice += cartArticle.price * articleLocalStorage[article].quantitySelected*/
        

//Création de la balise article dans le dom
    const articleCart = document.createElement ("article");//Créé un élément article (en exemple ds le html) 
    document.querySelector("#cart__items").appendChild(articleCart); 
    articleCart.className = "cart__item"; //créé la class de l'article
    articleCart.setAttribute('data-id', articleLocalStorage[article].idSelected);//modifie l'attribut, prend en compte data id et l'article selectionné 
    articleCart.setAttribute('data-color', articleLocalStorage[article].colorSelected);//modifie l'attribut, prend en compte data-color et l'article selectionné 

//Création de la balise div (enfant de article)ds le dom   
    const articleImg = document.createElement ("div");
    articleCart.appendChild(articleImg);
    articleImg.className = "cart__item__img";

//Création de la balise img    
    const articleImgSrc = document.createElement ("img");
    articleImg.appendChild(articleImgSrc);
    articleImgSrc.src = articleLocalStorage[article].imgCartArticle;//récupération de l'imageUrl ds l'api
    articleImgSrc.alt = articleLocalStorage[article].altImgcartArticle;//récupération du altText ds l'api

//Création de la balise div 
    const articleCartItemContent = document.createElement ("div");
    articleCart.appendChild(articleCartItemContent);
    articleCartItemContent.className = "cart__item__content";

//Création de la balise div apparaissant ds le css 
    const articleCartItemContentDescription = document.createElement ("div");
    articleCartItemContent.appendChild(articleCartItemContentDescription);
    articleCartItemContentDescription.className = "cart__item__content__titlePrice";

//Création de la balise titre 
    const articleH2 = document.createElement ("h2");
    articleCartItemContentDescription.appendChild(articleH2);
    articleH2.textContent = articleLocalStorage[article].nameSelected;//récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
console.log(articleH2);// retourne bien les noms des articles présents ds le LS ds la console

//Création de la balise p contenant la couleur 
    const articleColor = document.createElement("p");
    articleCartItemContentDescription.appendChild(articleColor);
    articleColor.textContent = articleLocalStorage[article].colorSelected;//récupération de la couleur ds le LS

//Création de la balise p contenant le prix unitaire des articles   
    const articlePrice = document.createElement("p");
    articleCartItemContentDescription.appendChild(articlePrice);
    articlePrice.textContent = articleLocalStorage[article].priceCartArticle + " € (prix à l'unité)";

//Création de la balise div     
    const articleCartItemContentSettings = document.createElement ("div");
    articleCartItemContent.appendChild(articleCartItemContentSettings);
    articleCartItemContentSettings.className = "cart__item__content__settings";

//Création de la balise div encadrant la quantité    
    const articleCartItemContentSettingsQuantity = document.createElement ("div");
    articleCartItemContentSettings.appendChild(articleCartItemContentSettingsQuantity);
    articleCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

//Création de la balise p contenant la quantité du LS
    const articleQuantity = document.createElement ("p");
    articleCartItemContentSettingsQuantity.appendChild(articleQuantity);
    articleQuantity.setAttribute ('Qté', totalPrice);
    articleQuantity.textContent = "Qté :"

//Création de la balise input permettant la modification de la quantité ds le p anier    
    const articleInput = document.createElement ("input");
    articleCartItemContentSettingsQuantity.appendChild(articleInput);
    articleInput.value = articleLocalStorage[article].quantitySelected;
    articleInput.className = "itemQuantity";
    articleInput.setAttribute("name","itemQuantity");
    articleInput.setAttribute("type", "number");
    articleInput.setAttribute("min","1");
    articleInput.setAttribute("max","100");
    
//Création de la balise div encadrant la possibilité d'effacer l'article du panier    
    const articleCartItemContentSettingsDelete = document.createElement ("div");
    articleCartItemContentSettings.appendChild(articleCartItemContentSettingsDelete);
    articleCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

//Création de la balise p permettant la suppression des articles selectionnés     
    const articleDelete = document.createElement ("p");
    articleCartItemContentSettingsDelete.appendChild(articleDelete);
    articleDelete.className = "deleteItem";
    articleDelete.innerHTML = "Supprimer";

        });
        
}

}