/*But : récupérer les articles du LocalStorage , pouvoir modifier leur quantité directement depuis cette page ainsi qu'avoir la possibilité de supprimer les articles souhaités*/

//Récupération du LocalStorage
let cartLS = JSON.parse(localStorage.getItem("LSArticle"));
//console.log(cartLS); // renvoi vien les articles du LS ou null si pas d'article

let totalSumArray = []; //création d'un array vide qui récupérera les ss totaux pr calcul prix total (fait avant la boucle afin de n'avoir qu'un seul array)
//console.log(totalSumArray);//retourne bien array vide

let totalQuantityArray = []; //création d'un array vide qui récupérera la somme totale à afficher (fait avant la boucle afin de n'avoir qu'un seul array)
//console.log(totalQuantityArray);//retourne bien array vide

function insertFetch() {
  let showCart = []; //création d'un array vide pour récupérer les données

//si le panier est strictement différent de null
if(cartLS !== null){

  cartLS.forEach((cart) => {
    let id = cart.idSelected;
    //console.log(id);//retourne bien les id contenus ds le ls

    let url = `http://localhost:3000/api/products/${id}`;
    //console.log(url);//retourne bien l'url avec les id des articles du ls

    

    fetch(url)
      .then(function (response) {
        return response.json();
      }) //fin du 1er then

      .then(function (articleCart) {
        //création d'un objet qui récupère toutes les données LS et API
        const object = {
          id: cart.idSelected,
          name: cart.nameSelected,
          price: articleCart.price,
          color: cart.colorSelected,
          quantity: cart.quantitySelected,
          alt: articleCart.altTxt,
          img: articleCart.imageUrl,
        };

        //je push les données dans le array vide showCart
        showCart.push(object);
        //console.log(showCart); //retourne bien les tableaux avec les objets du LS contenant ttes les données (api +ls)
      }) //fin 2nd then

      .catch(function (error) {
        alert("Erreur! Avez-vous bien lancé le serveur local (port 3000)");
      });
  }); //fin de la boucle

  
}//fin du if
return showCart;
} //fin f° insertFetch


//création d'une fonction pour récupérer le dom
function insertDom() {
  let useFetch = insertFetch();
  console.log(useFetch);

  //si le panier est strictement différent de null
  if (cartLS !== null){

  useFetch.forEach((carts) => {
    //Création balise article
    const article = document.createElement("article"); //Créé un élément article (en exemple ds le html)
    document.querySelector("#cart__items").appendChild(article);
    article.className = "cart__item"; //créé la class de l'article
    article.setAttribute("data-id", carts.idSelected); //modifie l'attribut, prend en compte data id et l'article selectionné
    article.setAttribute("data-color", carts.colorSelected); //modifie l'attribut, prend en compte data-color et l'article selectionné

    //Création balise div pour l'image
    const articleImg = document.createElement("div");
    article.appendChild(articleImg);
    articleImg.className = "cart__item__img";

    //Création de la balise img
    const articleImgSrc = document.createElement("img");
    articleImg.appendChild(articleImgSrc);
    //articleImgSrc.src = articleCart.imageUrl; //récupération de l'imageUrl ds l'api
    // articleImgSrc.alt = articleCart.altText; //récupération du altText ds l'api

    //Création de la balise div pour la description
    const articleCartItemContent = document.createElement("div");
    article.appendChild(articleCartItemContent);
    articleCartItemContent.className = "cart__item__content";

    //Création de la balise div apparaissant ds le css pour le prix
    const articleCartItemContentDescription = document.createElement("div");
    articleCartItemContent.appendChild(articleCartItemContentDescription);
    articleCartItemContentDescription.className =
      "cart__item__content__titlePrice";

    //Création de la balise titre
    const articleH2 = document.createElement("h2");
    articleCartItemContentDescription.appendChild(articleH2);
    articleH2.textContent = carts.nameSelected; //récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
    //console.log(articleH2); // retourne bien les noms des articles présents ds le LS ds la console

    //Création de la balise p contenant la couleur
    const articleColor = document.createElement("p");
    articleCartItemContentDescription.appendChild(articleColor);
    articleColor.textContent = carts.colorSelected; //récupération de la couleur ds le LS

    //Création de la balise p contenant le prix unitaire des articles
    const articlePrice = document.createElement("p");
    articleH2.appendChild(articlePrice);
    //articlePrice.textContent =
    //  "prix à l'unité =   " + articleCart.price + " € ";
    articlePrice.style.fontSize = "15px";
    //console.log(articlePrice);//retourne bien les phrases contenant les prix des articles sélectionnés

    //Création de la balise p contenant un sous total par article sélectionné
    const sousTotal = document.createElement("p");
    articleCartItemContentDescription.appendChild(sousTotal);
    sousTotal.className = "sousTotal";
    //sousTotal.textContent =
    //  " Sous Total =  " +
    //  articleCart.price * cart.quantitySelected +
    //  " €";
    sousTotal.style.fontSize = "20px";
    sousTotal.style.borderBottom = "solid 1px";
    // sousTotal.setAttribute(
    //  "data-prix",
    //  articleCart.price * cart.quantitySelected
    //);

    //Création de la balise div
    const articleCartItemContentSettings = document.createElement("div");
    articleCartItemContent.appendChild(articleCartItemContentSettings);
    articleCartItemContentSettings.className = "cart__item__content__settings";

    //Création de la balise div encadrant la quantité
    const articleCartItemContentSettingsQuantity =
      document.createElement("div");
    articleCartItemContentSettings.appendChild(
      articleCartItemContentSettingsQuantity
    );
    articleCartItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    //Création de la balise p contenant la quantité du LS
    const articleQuantity = document.createElement("p");
    articleCartItemContentSettingsQuantity.appendChild(articleQuantity);
    articleQuantity.setAttribute("Qté", totalPrice);
    articleQuantity.textContent = "Qté :";

    //Création de la balise input permettant la modification de la quantité ds le panier
    const articleInput = document.createElement("input");
    articleCartItemContentSettingsQuantity.appendChild(articleInput);
    articleInput.value = carts.quantitySelected;
    articleInput.className = "itemQuantity";
    articleInput.setAttribute("name", carts.idSelected);
    articleInput.setAttribute("type", "number");
    articleInput.setAttribute("min", "1");
    articleInput.setAttribute("max", "100");

    //Création de la balise div encadrant la possibilité d'effacer l'article du panier
    const articleCartItemContentSettingsDelete = document.createElement("div");
    articleCartItemContentSettings.appendChild(
      articleCartItemContentSettingsDelete
    );
    articleCartItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    //Création de la balise p permettant la suppression des articles selectionnés
    const articleDelete = document.createElement("p");
    articleCartItemContentSettingsDelete.appendChild(articleDelete);
    articleDelete.className = "deleteItem";
    articleDelete.textContent = "Supprimer";
    //console.log(articleDelete);
  });
}else{
  //return emptyCart();
}
}

//création de la fonction de calcul de qté totale
/*function sumQuantity() {
  //console.log(cart.quantitySelected);//retourne bien la quanité par articles ds le panier
  //console.log(totalQuantityArray);//retourne bien le array vide du début

  //je push les qté du LS ds mon tableau vide du début (en parseInt afin de ne pas avoir d'erreur d'affichage des chiffres si 1 et 1 = 2  pas 11)
  //totalQuantityArray.push(parseInt(cart.quantitySelected));
  //console.log(totalQuantityArray);//retourne bien un tableau avec les qtés

  //utilisation du reduce() afin de réduire la liste des valeurs accumulées ds le array
  let total = 0;
  let totalQty = totalQuantityArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    total
  );
  //console.log(totalQty);//retourne bien la qté totale

  //affichage de ma quanité totale au bon endroit
  let itemTotalQuantity = document.querySelector("#totalQuantity");
  itemTotalQuantity.textContent = totalQty;
} //fin fonction calcul qté*/

//création de la fonction de calcul de somme totale
/*function sumPrice() {
    
    console.log (totalSumArray);//retourne bien le array vide du début
    

   // let ssTotal = articleCart.price * cart.quantitySelected;
    //console.log(ssTotal);//retourne bien les ss totaux

    //totalSumArray.push(ssTotal);
    //console.log(totalSumArray);//retourne bien le tableau des ss Totaux

    //utilisation du reduce() afin de réduire la liste des valeurs accumulées ds le array
    let sum = 0;
    let sumTotal = totalSumArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      sum
    );
    // console.log(sumTotal);// retourne bien la somme totale calculée

    //affichage de la somme totale au bon endroit
    let totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = sumTotal;
  }*/

/*function deleteTrash(){
//j'écoute le "btn" afin de prendre en compte les modifications du client (suppression de l'article)
articleDelete.addEventListener("click", (event) => {
  event.preventDefault();

  //console.log(articleDelete);//retourne la balise deleteItem

  let idDelete = articleDelete.closest(".cart__item").dataset.id;
  //console.log(idDelete);//retourne bien le bon id lors du click sur "supprimer"
  let colorDelete = articleDelete.closest(".cart__item").dataset.color;
  //console.log(colorDelete);//retourne bien la bonne couleur lors du click sur "supprimer"

  //création d'un constante qui va trouver l'article au click du "supprimer"
  const trashArticle = cartLS.find(
    (trash) =>
      trash.idSelected === idDelete && trash.colorSelected === colorDelete
  );
  console.log("article selectionné lors du delete=", trashArticle); //retourne bien un tableau du bon article au click sur "supprimer"
  
  //puis dans le ls je filtre 
  cartLS = cartLS.filter((trash) => trash != trashArticle);
  console.log(cartLS);

  localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //je mets à jour le localStorage

  //création d'un constante afin de supprimer du dom l'élément sélectionné
  const zoneDelete = document.querySelector("#cart__items");
  zoneDelete.removeChild(articleDelete.closest("article"));
  console.log(zoneDelete);

alert("Vous venez de supprimer cet article!");
  
    sumPrice();
    sumQuantity();
  
  //faire en sorte de clear le ls une fois vidé si tous les articles sont otés
  if (cartLS !== null && cartLS.length === 0) {
    localStorage.clear();
  }
}); //fin de l'écoute


}*/

/*function modifyQuantity(){
    //j'écoute le input afin de prendre en compte les modifications du client (ajout ou retrait de qté)
    articleInput.addEventListener("change", (event) => {
      event.preventDefault();

      console.log(articleInput.value); //retourne bien la valeur du input à chaque changement

      //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le input qté... ET la couleur...)

      let idChange = articleInput.closest(".cart__item").dataset.id;
      //console.log(idChange);//retourne bien l'id de l'article sélectionné par le chgt ds le input

      let colorChange = articleInput.closest(".cart__item").dataset.color;
      //console.log(colorChange);//retourne bien la couleur de l'article sélectionné par le chgt ds le input

      //console.log(cartLS);//retourne bien le LS

      const foundArticle = cartLS.filter(
        (kanap) =>
          kanap.idSelected === idChange && kanap.colorSelected === colorChange
      );

      console.log(foundArticle); //retourne bien le bon article au clic de l'input
      console.log(cart.quantitySelected); //retourne bien la qté présente ds le ls
      //102

      //création d'une condition afin de maîtriser la qté utilisée par le client
      //si tu trouves l'article ET que sa qté est supérieure ou égale à 1 ET inférieure ou = à 100
      if (
        foundArticle !== undefined &&
        articleInput.value >= 1 &&
        articleInput.value <= 100
      ) {
        cart.quantitySelected = articleInput.value;
        localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //je mets à jour le localStorage
       // alert("Vous venez de modifier la quantité de votre article!");
        
        sumPrice();
        sumQuantity();
        
      } else {
        alert("Vous devez sélectionner une quanté entre 1 et 100 unités!");
        
          sumPrice();
          sumQuantity();
        
      }
    }); //fin de l'écoute
}*/

/*function emptyCart(){
  const cartTitle = document.querySelector("h1"); //récupération de l'emplacement afin de mettre le msg si vide

  const cartEmpty = "Votre panier est vide!";
  cartTitle.textContent = cartEmpty;
  cartTitle.style.fontSize = "40px";

  const cartSubtitle= document.createElement ("p");
  cartTitle.appendChild(cartSubtitle);
  cartSubtitle.className = "subtitle";
  cartSubtitle.textContent = "N'hésitez pas à retourner à l'accueil pour débuter votre commande!"
  cartSubtitle.style.fontSize ="20px";

  const buttonAccueil = document.createElement("button");
  cartTitle.appendChild(buttonAccueil);
  buttonAccueil.className ="btn";
  buttonAccueil.textContent ="Accueil";
  buttonAccueil.style.fontSize =" 22px";
  buttonAccueil.style.color ="#FFFFFF";
  buttonAccueil.style.background ="#2C3E50";
  buttonAccueil.style.padding ="18px 28px";
  buttonAccueil.style.border ="none";
  buttonAccueil.style.borderRadius ="40px";
  buttonAccueil.style.cursor =" pointer";


  //écoute du btn accueil afin d'avoir un shadow sur le btn au passage de la souris
  buttonAccueil.addEventListener("mouseover", (event) => {
    event.preventDefault();
    
    buttonAccueil.style.boxShadow ="rgba(42, 18, 206, 0.9) 0 0 22px 6px";

  })

  //écoute du btn acceuil afin d'activer le lien vers la page accueil au clic sur le btn
  buttonAccueil.addEventListener("click", (event) =>{
    event.preventDefault();

    window.location.href ="index.html";
  })


  document.querySelector(".cart__order").style.display = "none"; //masque le forulaire si panier vide
  document.querySelector(".cart__price").style.display = "none"; // masque le prix total si panier vide

}*/

insertFetch();
insertDom();
//sumQuantity();
//sumPrice();
//deleteTrash();
//modifyQuantity();
//emptyCart();
