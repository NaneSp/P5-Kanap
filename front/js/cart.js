/*But : récupérer les articles du LocalStorage , pouvoir modifier leur quantité directement depuis cette page ainsi qu'avoir la possibilité de supprimer les articles souhaités*/

//Récupération du LocalStorage
cartLS = JSON.parse(localStorage.getItem("LSArticle"));

//création d'une fonction de LS
function getLS() {
  return JSON.parse(localStorage.getItem("LSArticle"));
}
//console.log(getLS()); // renvoi vien les articles du LS ou null si pas d'article



//création d'une fonction asynchrone afin d'utiliser fetch facilement /***OK***/
async function insertFetch() {
  //création d'un array vide pour récupérer les données
  let showCart = []; 

  //si le panier est strictement différent de null
  if (cartLS !== null) {
    
    for (let i = 0; i < cartLS.length; i++) {
      let id = cartLS[i].idSelected;
      //console.log(id);//retourne bien les id contenus ds le ls

      let url = `http://localhost:3000/api/products/${id}`;
      //console.log(url);//retourne bien l'url avec les id des articles du ls

      //attends la résolution de la promesse
      await fetch(url)
        .then(function (response) {
          return response.json();
        }) //fin du 1er then

        .then(function (articleCart) {
          //création d'un objet qui récupère toutes les infos utiles pour la suite
          const object = {
            id: cartLS[i].idSelected,
            name: cartLS[i].nameSelected,
            price: articleCart.price,
            color: cartLS[i].colorSelected,
            quantity: cartLS[i].quantitySelected,
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
    } //fin de la boucle
  } //fin du if
  return showCart;
} //fin f° insertFetch

//création d'une fonction asynchrone afin de pouvoir récupérer le dom /***OK***/
async function insertDom() {
  let useFetch = await insertFetch();
  //console.log(useFetch);

  //si le panier est strictement différent de null
  if (cartLS !== null && cartLS.length !== 0) {
    useFetch.forEach((carts) => {
      //Création balise article
      const article = document.createElement("article"); //Créé un élément article (en exemple ds le html)
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item"; //créé la class de l'article
      article.setAttribute("data-id", carts.id); //modifie l'attribut, prend en compte data id et l'article selectionné
      article.setAttribute("data-color", carts.color); //modifie l'attribut, prend en compte data-color et l'article selectionné

      //Création balise div pour l'image
      const articleImg = document.createElement("div");
      article.appendChild(articleImg);
      articleImg.className = "cart__item__img";

      //Création de la balise img
      const articleImgSrc = document.createElement("img");
      articleImg.appendChild(articleImgSrc);
      articleImgSrc.src = carts.img; //récupération de l'imageUrl ds l'api
      articleImgSrc.alt = carts.alt; //récupération du altText ds l'api

      //Création de la balise div pour la description
      const articleCartItemContent = document.createElement("div");
      article.appendChild(articleCartItemContent);
      articleCartItemContent.className = "cart__item__content";

      //Création de la balise div apparaissant ds le css pour le prix
      const articleCartItemContentDescription = document.createElement("div");
      articleCartItemContent.appendChild(articleCartItemContentDescription);
      articleCartItemContentDescription.className = "cart__item__content__titlePrice";

      //Création de la balise titre
      const articleH2 = document.createElement("h2");
      articleCartItemContentDescription.appendChild(articleH2);
      articleH2.textContent = carts.nameSelected; //récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
      //console.log(articleH2); // retourne bien les noms des articles présents ds le LS ds la console

      //Création de la balise p contenant la couleur
      const articleColor = document.createElement("p");
      articleCartItemContentDescription.appendChild(articleColor);
      articleColor.textContent = carts.color; //récupération de la couleur ds le LS

      //Création de la balise p contenant le prix unitaire des articles
      const articlePrice = document.createElement("p");
      articleH2.appendChild(articlePrice);
      articlePrice.textContent = "prix à l'unité =   " + carts.price + " € ";
      articlePrice.style.fontSize = "15px";
      //console.log(articlePrice);//retourne bien les phrases contenant les prix des articles sélectionnés

     /* //Création de la balise p contenant un sous total par article sélectionné
      const sousTotal = document.createElement("p");
      articleCartItemContentDescription.appendChild(sousTotal);
      sousTotal.className = "sousTotal";
      sousTotal.textContent = " Sous Total =  " + carts.price * carts.quantity + " €";
      sousTotal.style.fontSize = "20px";
      sousTotal.style.borderBottom = "solid 1px";
      sousTotal.setAttribute("data-prix", carts.price * carts.quantity);*/

      //Création de la balise div
      const articleCartItemContentSettings = document.createElement("div");
      articleCartItemContent.appendChild(articleCartItemContentSettings);
      articleCartItemContentSettings.className = "cart__item__content__settings";

      //Création de la balise div encadrant la quantité
      const articleCartItemContentSettingsQuantity = document.createElement("div");
      articleCartItemContentSettings.appendChild(articleCartItemContentSettingsQuantity);
      articleCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      //Création de la balise p contenant la quantité du LS
      const articleQuantity = document.createElement("p");
      articleCartItemContentSettingsQuantity.appendChild(articleQuantity);
      articleQuantity.setAttribute("Qté", totalPrice);
      articleQuantity.textContent = "Qté :";

      //Création de la balise input permettant la modification de la quantité ds le panier
      const articleInput = document.createElement("input");
      articleCartItemContentSettingsQuantity.appendChild(articleInput);
      articleInput.value = carts.quantity;
      articleInput.className = "itemQuantity";
      articleInput.setAttribute("name", carts.id);
      articleInput.setAttribute("type", "number");
      articleInput.setAttribute("min", "1");
      articleInput.setAttribute("max", "100");

      //Création de la balise div encadrant la possibilité d'effacer l'article du panier
      const articleCartItemContentSettingsDelete = document.createElement("div");
      articleCartItemContentSettings.appendChild(articleCartItemContentSettingsDelete);
      articleCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

      //Création de la balise p permettant la suppression des articles selectionnés
      const articleDelete = document.createElement("p");
      articleCartItemContentSettingsDelete.appendChild(articleDelete);
      articleDelete.className = "deleteItem";
      articleDelete.textContent = "Supprimer";
      //console.log(articleDelete);
    });
    
  } //SINON le panier est vide alors:
  else {
    
    return emptyCart();
  }
}

//création d'une fonction asynchrone afin de pouvoir supprimer des articles /***OK***/
async function deleteTrash() {
  await insertFetch();

  //recupération de tous les pseudos btn "supprimer"
  const btnDelete = document.querySelectorAll(".deleteItem");

  btnDelete.forEach((kanap) => {
    //j'écoute le "btn" afin de prendre en compte les modifications du client (suppression de l'article)
    kanap.addEventListener("click", (event) => {
      //console.log(articleDelete);//retourne la balise deleteItem


      //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le "btn" ... ET la couleur...)
      let idDelete = event.target.closest("article").dataset.id;
      //console.log(idDelete);//retourne bien le bon id lors du click sur "supprimer"
      let colorDelete = event.target.closest("article").dataset.color;
      //console.log(colorDelete);//retourne bien la bonne couleur lors du click sur "supprimer"


      //création d'un constante qui va trouver l'article au click du "supprimer"
      const trashArticle = cartLS.find(
        (trash) =>
          trash.idSelected === idDelete && trash.colorSelected === colorDelete
      );
      //console.log("article selectionné lors du delete=", trashArticle); //retourne bien un tableau du bon article au click sur "supprimer"

      //puis filtrage du ls si le résultat est différent de mon article trouvé au dessus...
      cartLS = cartLS.filter((trash) => trash != trashArticle);
      //console.log(cartLS);


      //mise à jour le localStorage
      localStorage.setItem("LSArticle", JSON.stringify(cartLS)); 

      //création d'un constante afin de supprimer du dom l'élément sélectionné
      const zoneDelete = document.querySelector("#cart__items");
      zoneDelete.removeChild(event.target.closest("article"));
      //console.log(zoneDelete);retourne bien la zone

      alert("Vous allez supprimer cet article!");

      //rappel de mes fonctions pour màj
      sumQuantity();
      sumPrice();

      //faire en sorte de clear le ls une fois vidé si tous les articles sont otés
      if (cartLS !== null && cartLS.length === 0) {
        localStorage.clear();

        return emptyCart();

      }
    }); //fin de l'écoute
  }); //fin boucle
} //fin f°

deleteTrash();

//création d'une fonction asynchrone afin de pouvoir modifier la quantité des articles dans le panier                                                                  /***OK***/
async function modifyQuantity() {
  await insertFetch();

  //récupération de tous les inputs de modif de qté
  const inputQty = document.querySelectorAll(".itemQuantity");
  //console.log(inputQty);//retourne les inputs

  for (let inputs of inputQty) {
    //j'écoute le input afin de prendre en compte les modifications du client (ajout ou retrait de qté)
    inputs.addEventListener("change", () => {
      //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le input qté... ET la couleur...)

      let valueLS = getLS();
      //console.log(valueLS);//retourne bien le ls

      let idChange = inputs.closest(".cart__item").dataset.id;
      //console.log(idChange);//retourne bien l'id de l'article sélectionné par le chgt ds le input

      let colorChange = inputs.closest(".cart__item").dataset.color;
      //console.log(colorChange);//retourne bien la couleur de l'article sélectionné par le chgt ds le input

      //filtrage du bon id
      const foundId = cartLS.filter((kanap) => kanap.idSelected === idChange);
      //console.log(foundId);
      //puis dans ce bon id on trouve la bonne couleur
      const foundColor = foundId.find((e) => e.colorSelected === colorChange);
      //console.log("mon article trouvé est égale à------> ",foundColor);

      //console.log("YOUHOU retourne la valeur du input au clic", inputs.value);
      
      //console.log(foundColor.quantitySelected);//retourne bien la qté du ls pr cet article

      //création d'une condition afin de maîtriser la qté utilisée par le client
      //si tu trouves l'article ET que sa qté est supérieure ou égale à 1 ET inférieure ou = à 100
      if (
        foundColor !== undefined &&
        inputs.value >= 1 &&
        inputs.value <= 100
      ) {
        foundColor.quantitySelected = inputs.value;
        console.log(inputs.value);
        //mise à jour le localStorage
        localStorage.setItem("LSArticle", JSON.stringify(valueLS)); 
        alert("Vous venez de modifier la quantité de votre article!");

        //appel des fonctions pour màj
        sumQuantity();
        sumPrice();

      } else {

        alert("Vous devez sélectionner une quanté entre 1 et 100 unités!");

        //appel des fonctions pour màj
        sumQuantity();
        sumPrice();
      }

      localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //je mets à jour le localStorage
    }); //fin de l'écoute
  } //fin boucle
}

getLS();
insertFetch();
insertDom();
deleteTrash();
modifyQuantity();
sumQuantity();
sumPrice();


//création de la fonction de calcul de qté totale                    /***OK***/
function sumQuantity() {
  let totalQuantityArray = []; //création d'un array vide qui récupérera la somme totale à afficher (fait avant la boucle afin de n'avoir qu'un seul array)
  //console.log(totalQuantityArray);//retourne bien le array vide du début
  

  for (let articleLS of cartLS) {
    //console.log(articleLS.quantitySelected);//retourne bien la qté du ls

    //je push les qté du LS ds mon tableau vide du début (en parseInt afin de ne pas avoir d'erreur d'affichage des chiffres si 1 et 1 = 2  pas 11)
    totalQuantityArray.push(parseInt(articleLS.quantitySelected));
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
  } //fin boucle
} //fin fonction calcul qté

//création de la fonction de calcul de somme totale                  /***OK***/
async function sumPrice() {
  const fetchArray = await insertFetch();
  // console.log(fetchArray);

  let totalSumArray = []; //création d'un array vide qui récupérera les ss totaux pr calcul prix total (fait avant la boucle afin de n'avoir qu'un seul array)
  //console.log(totalSumArray);//retourne bien array vide

  for (j = 0; j < fetchArray.length; j++) {
    let ssTotal =
      parseInt(fetchArray[j].price) * parseInt(fetchArray[j].quantity);
    //console.log(ssTotal);//retourne bien les ss totaux

    totalSumArray.push(ssTotal);
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
  }
}

function emptyCart(){
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
  buttonAccueil.textContent ="Retour vers l'accueil";
  buttonAccueil.style.fontSize =" 22px";
  buttonAccueil.style.color ="#FFFFFF";
  buttonAccueil.style.background ="#2C3E50";
  buttonAccueil.style.padding ="18px 28px";
  buttonAccueil.style.marginTop = "20px";
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

}


//push dans le ls
localStorage.setItem("LSArticle", JSON.stringify(cartLS));

/*********************************Formulaire et commande ******************************/
/*But : une fois le formulaire rempli et sans erreur, on envoie (via le bouton "commander") au serveur les données de celui ainsi que le contenu du panier, le client, liu, sera renvoyé vers la page de confirmation et le serveur lui renverra son numéro de commande... si tout ce passe bien*/


//Expressions rationnelles ou Expressions régulières = Regex

let firstNameRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ-'\s-]+$/;
let lastNameRegExp = firstNameRegExp;
let addressRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,'°\s]+$/;
let cityRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,' ]+$/;
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
  //^ = début donc au début on a le droit d'écrire ds l'email le a-z ou le A-Z ou 0-9 mais aussi des  .  des tirets des underscrore et on peut les écrire +sieurs fois (d'ou le +)
  //PUIS j'aurai le @ (une seule fois)et de la même manière qu'au début
  //ensuite le caractère du . (une seule fois) (pour faire le .com .fr...)
  //qui sera finalisé par . des lettres minuscules et entre 2lettres mini et 10 maxi
  //$ indique la fin de la phrase


//récupération des emplacements des messages d'erreur
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");

//création de la variable récupérant le input "commander"
let order = document.querySelector("#order");

//j'écoute le bouton "commander" afin de pouvoir envoyer ma commande au serveur
order.addEventListener("click", (event) => {
  event.preventDefault(); 
  //récupération des infos du client
  let inputFirstName = document.querySelector("#firstName");

  let inputLastName = document.querySelector("#lastName");

  let inputAddress = document.querySelector("#address");

  let inputCity = document.querySelector("#city");

  let inputMail = document.querySelector("#email");
  //console.log(inputMail.value);

  //création d'un array du LS = tableau de produits (cf doc spécifications fonctionnelle dernière page)

  let products = [];
  cartLS.forEach((order) => {
    products.push(order.idSelected);

    // console.log(order.idSelected);
  });
  //console.log(products);//retourne bien les produits du ls

  //création d'une constante de commande (je crée un objet qui récupérera les infos des clients + un tableau de produits ls afin de les envoyer au server) (cf partie back dossier controllers fichier product.js)
  const order = {
    contact: {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputMail.value,
    },

    products: products,
  }; //fin du contactOrder

  //ajout d'une condition si champs de formulaire vide ou faux
  //si la valeur de cet input est égale à faux OU si elle est strictement égale à vide 
  if (firstNameRegExp.test(inputFirstName.value) == false || inputFirstName.value === null ){
  firstNameErrorMsg.textContent = "Merci de renseigner un prénom valide";
  document.querySelector("#firstName").style.background = "#fbbcbc";
  return false;
  
  }
  
  else if(lastNameRegExp.test(inputLastName.value) == false || inputLastName.value === null){
  lastNameErrorMsg.textContent = "Merci de renseigner un nom valide";
  document.querySelector("#lastName").style.background = "#fbbcbc";
  return false;

  }else if(addressRegExp.test(inputAddress.value) == false || inputAddress.value === null){
  addressErrorMsg.textContent = "Merci de renseigner une adresse valide";
  document.querySelector("#address").style.background = "#fbbcbc";
  return false;

  }else if(cityRegExp.test(inputCity.value) == false || inputCity.value === null){
  cityErrorMsg.textContent = "Merci de renseigner une ville valide";
  document.querySelector("#city").style.background = "#fbbcbc";
  return false;
  }
  else if (emailRegExp.test(inputMail.value) == false || inputMail.value === null) {
  emailErrorMsg.textContent = "Merci de renseigner un email valide";
  document.querySelector("#email").style.background = "#fbbcbc";
  return false;
  
    }
  //sinon
  else {
    //envoi des données (récupérées ci dessus )de la commande (panier + formulaire contact) au serveur
    const postServer = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }; //fin du postServer

    fetch("http://localhost:3000/api/products/order", postServer)
      .then(function (response) {
        return response.json();
      }) //fin du then

      .then((data) => {
        // console.log(order);//retourne bien l'objet contact et le array ls
        window.location.href = `confirmation.html?orderId=${data.orderId}`;
      }) //fin du 2nd then

      .catch((error) => {
        alert("erreur");
      }); //fin du catch
  } //fin du else
}); //fin de l'écoute

