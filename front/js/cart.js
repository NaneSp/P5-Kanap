//Récupération du LocalStorage

const cartLS = JSON.parse(localStorage.getItem('LSArticle'));
console.log(cartLS);//renvoi bien le contenu du Local Storage

//Observation du panier
async function observeCart(){ 
//si le panier est vide

if (cartLS === null){
    document.querySelector("#cart__item").textContent = "O Article,  Votre panier est vide !"
}

//sinon 
else{
    for (let article in cartLS){

        const id = cartLS[article].idSelected;
        //console.log(id); retroune bien les id des produits du LS
        const urlArticle = `http://localhost:3000/api/products/${id}`;
        await fetch (urlArticle).then((response) => response.json().then(async(data) => {

        //Création de la balise article dans le dom
        const articleCart = document.createElement("article"); //Créé un élément article (en exemple ds le html)
        document.querySelector("#cart__items").appendChild(articleCart);
        articleCart.className = "cart__item"; //créé la class de l'article
        articleCart.setAttribute("data-id",cartLS[article].idSelected); //modifie l'attribut, prend en compte data id et l'article selectionné
        articleCart.setAttribute("data-color",cartLS[article].colorSelected); //modifie l'attribut, prend en compte data-color et l'article selectionné

        //Création de la balise div (enfant de article)ds le dom
        const articleImg = document.createElement("div");
        articleCart.appendChild(articleImg);
        articleImg.className = "cart__item__img";

        //Création de la balise img
        const articleImgSrc = document.createElement("img");
        articleImg.appendChild(articleImgSrc);
        articleImgSrc.src = data.imageUrl; //récupération de l'imageUrl ds l'api
        articleImgSrc.alt = data.altText; //récupération du altText ds l'api

        //Création de la balise div
        const articleCartItemContent = document.createElement("div");
        articleCart.appendChild(articleCartItemContent);
        articleCartItemContent.className = "cart__item__content";

        //Création de la balise div apparaissant ds le css
        const articleCartItemContentDescription = document.createElement("div");
        articleCartItemContent.appendChild(articleCartItemContentDescription);
        articleCartItemContentDescription.className ="cart__item__content__titlePrice";

        //Création de la balise titre
        const articleH2 = document.createElement("h2");
        articleCartItemContentDescription.appendChild(articleH2);
        articleH2.textContent = data.name; //récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
        //console.log(articleH2); // retourne bien les noms des articles présents ds le LS ds la console

        //Création de la balise p contenant la couleur
        const articleColor = document.createElement("p");
        articleCartItemContentDescription.appendChild(articleColor);
        articleColor.textContent = cartLS[article].colorSelected; //récupération de la couleur ds le LS

        //Création de la balise p contenant le prix unitaire des articles
        const articlePrice = document.createElement("p");
        articleCartItemContentDescription.appendChild(articlePrice);
        articlePrice.textContent = data.price + " € (prix à l'unité)";
        console.log(articlePrice);//retourne bien les prix des articles sélectionnés    

        //Création de la balise div
        const articleCartItemContentSettings = document.createElement("div");
        articleCartItemContent.appendChild(articleCartItemContentSettings);
        articleCartItemContentSettings.className ="cart__item__content__settings";

        //Création de la balise div encadrant la quantité
        const articleCartItemContentSettingsQuantity =
        document.createElement("div");
        articleCartItemContentSettings.appendChild(articleCartItemContentSettingsQuantity);
        articleCartItemContentSettingsQuantity.className ="cart__item__content__settings__quantity";

        //Création de la balise p contenant la quantité du LS
        const articleQuantity = document.createElement("p");
        articleCartItemContentSettingsQuantity.appendChild(articleQuantity);
        articleQuantity.setAttribute("Qté", totalPrice);
        articleQuantity.textContent = "Qté :";

        //Création de la balise input permettant la modification de la quantité ds le p anier
        const articleInput = document.createElement("input");
        articleCartItemContentSettingsQuantity.appendChild(articleInput);
        articleInput.value = cartLS[article].quantitySelected;
        articleInput.className = "itemQuantity";
        articleInput.setAttribute("name", "itemQuantity");
        articleInput.setAttribute("type", "number");
        articleInput.setAttribute("min", "1");
        articleInput.setAttribute("max", "100");

        //Création de la balise div encadrant la possibilité d'effacer l'article du panier
        const articleCartItemContentSettingsDelete =
        document.createElement("div");
        articleCartItemContentSettings.appendChild(articleCartItemContentSettingsDelete);
        articleCartItemContentSettingsDelete.className ="cart__item__content__settings__delete";

        //Création de la balise p permettant la suppression des articles selectionnés
        const articleDelete = document.createElement("p");
        articleCartItemContentSettingsDelete.appendChild(articleDelete);
        articleDelete.className = "deleteItem";
        articleDelete.innerHTML = "Supprimer";

        }))
};
//Création des fonctions à venir



}
}

/*******test*****/

function Quantity(){
    
    
    
    let quantityTotal = 0;
    
    for (let i = 0; i < cartLS.length; i++){
        quantityTotal += cartLS[i].quantitySelected;
    }
    //console.log(quantityTotal);//renvoi la quantité des articles sélectionnés du LS
    
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = quantityTotal;

}

Quantity();

observeCart();

