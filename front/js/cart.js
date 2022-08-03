

// 1  Récupérer du panier [array] via LS
// 2  Parcourir l'array
// 3  Créer et insérer des élements dans la page panier (ne pas  dupliquer les éléments!!si même id et même couleur cela ne doit donner qu'1 ligne)

let articleLocalStorage = JSON.parse(localStorage.getItem("LSArticle"));
console.log (articleLocalStorage);//renvoi le tableau de l'objet ds la console

const cartItems = document.querySelector("#cart__items");//récupération de l'id cart__items encadrant toute les balises html 

//si le panier est vide
if( articleLocalStorage === null){
    alert ("Votre panier est vide");
    const cartEmpty = "0 Article!   Votre panier est vide";
    cartItems.textContent = cartEmpty;
}
//SINON (le panier contient un ou des articles)
else{



//Création d'une boucle For...in
    for (let article in articleLocalStorage){

    
    const articleCart = document.createElement ("article");//Créé un élément article (en exemple ds le html) 
    document.querySelector("#cart__items").appendChild(articleCart); 
    articleCart.className = "cart__items"; //créé la class de l'article
    articleCart.setAttribute('data-id', articleLocalStorage[article].idSelected);//modifie l'attribut, prend en compte data id et l'article selectionné 
    articleCart.setAttribute('data-color', articleLocalStorage[article].colorSelected);//modifie l'attribut, prend en compte data-color et l'article selectionné 

    const articleImg = document.createElement ("div");
    articleCart.appendChild(articleImg);
    articleImg.className = "cart__items__img";

    const articleImgSrc = document.createElement ("img");
    articleImg.appendChild(articleImgSrc);
    //src
    //alt

    const articleCartItemContent = document.createElement ("div");
    document.querySelector("#cart__items").appendChild(articleCartItemContent);
    articleCartItemContent.className = "cart__item__content";

    const articleCartItemContentDescription = document.createElement ("div");
    articleCartItemContent.appendChild(articleCartItemContentDescription);
    articleCartItemContentDescription.className = "cart__item__content__description";
    //description

    const articleH2 = document.createElement ("h2");
    articleCartItemContentDescription.appendChild(articleH2);
    articleH2.innerHTML = articleLocalStorage[article].nameSelected;
//console.log(articleH2);// retourne bien les noms des articles présents ds le LS ds la console

    const articleColor = document.createElement("p");
    articleCartItemContentDescription.appendChild(articleColor);
    articleColor.innerHTML = articleLocalStorage[article].colorSelected;

    const articlePrice = document.createElement("p");
    articleCartItemContentDescription.appendChild(articlePrice);
    articlePrice.innerHTML = "€";

    const articleCartItemContentSettings = document.createElement ("div");
    articleCartItemContent.appendChild(articleCartItemContentSettings);
    articleCartItemContentSettings.className = "cart__item__content__settings";

    const articleCartItemContentSettingsQuantity = document.createElement ("div");
    articleCartItemContentSettings.appendChild(articleCartItemContentSettingsQuantity);
    articleCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    const articleQuantity = document.createElement ("p");
    articleCartItemContentSettingsQuantity.appendChild(articleQuantity);
    articleQuantity.setAttribute ('Qté', articleLocalStorage[article].quantitySelected);

    const articleInput = document.createElement ("input");
    articleCartItemContentSettingsQuantity.appendChild(articleInput);
    articleInput.value = articleLocalStorage[article].quantitySelected;
    articleInput.className = "itemQuantity";
    articleInput.setAttribute("name","itemQuantity");
    articleInput.setAttribute("type", "number");
    articleInput.setAttribute("min","1");
    articleInput.setAttribute("max","100");
    
    const articleCartItemContentSettingsDelete = document.createElement ("div");
    articleCartItemContent.appendChild(articleCartItemContentSettingsDelete);
    articleCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    const articleDelete = document.createElement ("p");
    articleCartItemContentSettingsDelete.appendChild(articleDelete);
    articleDelete.className = "deleteItem";
    articleDelete.innerHTML = "Supprimer";

}


}
