/*But : récupérer les articles du LocalStorage , pouvoir modifier leur quantité directement depuis cette page ainsi qu'avoir la possibilité de supprimer les articles souhaités*/

//Récupération du LocalStorage

function localStorageView() {
  return JSON.parse(localStorage.getItem("LSArticle"));
}

let cartLS = localStorageView();
//console.log(cartLS); // renvoi vien les articles du LS ou null si pas d'article

//si le panier est vide
if (cartLS === null) {
  const cartTitle = document.querySelector("h1"); //récupération de l'emplacement afin de mettre le msg si vide

  const cartEmpty = "Votre panier est vide!";
  cartTitle.textContent = cartEmpty;
  cartTitle.style.fontSize = "40px";

  document.querySelector(".cart__order").style.display = "none"; //masque le forulaire si panier vide
  document.querySelector(".cart__price").style.display = "none"; // masque le prix total si panier vide
}
//SINON si panier est non vide
else {
  /*test*/
  /*cartLS.forEach(item => console.log(item));

  cartLS.forEach(item => console.log(item.idSelected));
  cartLS.forEach(item => console.log(item.nameSelected));
  cartLS.forEach(item => console.log(item.quantitySelected));
  cartLS.forEach(item => console.log(item.colorSelected));*/

  let totalSumArray = []; //création d'un array vide qui récupérera les ss totaux pr calcul prix total (fait avant la boucle afin de n'avoir qu'un seul array)

  let totalQuantityArray =[];

  //Création d'une boucle forEach afin de pouvoir récupérer toutes les données

  cartLS.forEach(function (cart) {
    //console.log(cart.idSelected);//recherche de l'id OK

    let id = cart.idSelected;
    //console.log(id); //retourne bien les id des éléments séléctionnés se trouvant ds le LS

    const url = `http://localhost:3000/api/products/${id}`; // création d'une constante pr récupérer les données de l'api
    //console.log(url);//retourne bien l'url avec l'id des éléments du LS

    fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        //console.log(data); //retourne bien toute les données (venant de l'api) des canapés sélectionnés

        insertItems(data); //création d'une fonction afin d'inserer les élements ds le dom + tard

        sumQuantity(); //création d'une fonction afin de calculer de la qté totale
        sumPrice(data); //création d'une fonction afin de calculer de la somme totale
        changeQuantity(); //création d'un fonction afin de pouvoir modifier la qté des articles
        deleteArticle(); //création d'une fonction afin de pouvoir supprimer un/des article(s)
      }) //fin du 2nd then ligne 60

      .catch(function (error) {
        alert("Erreur! Avez-vous bien lancé le serveur local (port 3000)");
      });

    //utilisation de la fonction d'insertion
    function insertItems(data) {
      //Création de la balise article dans le dom
      const articleCart = document.createElement("article"); //Créé un élément article (en exemple ds le html)
      document.querySelector("#cart__items").appendChild(articleCart);
      articleCart.className = "cart__item"; //créé la class de l'article
      articleCart.setAttribute("data-id", cart.idSelected); //modifie l'attribut, prend en compte data id et l'article selectionné
      articleCart.setAttribute("data-color", cart.colorSelected); //modifie l'attribut, prend en compte data-color et l'article selectionné

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
      articleCartItemContentDescription.className =
        "cart__item__content__titlePrice";

      //Création de la balise titre
      const articleH2 = document.createElement("h2");
      articleCartItemContentDescription.appendChild(articleH2);
      articleH2.textContent = data.name; //récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
      //console.log(articleH2); // retourne bien les noms des articles présents ds le LS ds la console

      //Création de la balise p contenant la couleur
      const articleColor = document.createElement("p");
      articleCartItemContentDescription.appendChild(articleColor);
      articleColor.textContent = cart.colorSelected; //récupération de la couleur ds le LS

      //Création de la balise p contenant le prix unitaire des articles
      const articlePrice = document.createElement("p");
      articleH2.appendChild(articlePrice);
      articlePrice.textContent = "prix à l'unité =   " + data.price + " € ";
      articlePrice.style.fontSize = "15px";
      //console.log(articlePrice);//retourne bien les phrases contenant les prix des articles sélectionnés

      //Création de la balise p contenant un sous total par article sélectionné
      const sousTotal = document.createElement("p");
      articleCartItemContentDescription.appendChild(sousTotal);
      sousTotal.className = "sousTotal";
      sousTotal.textContent =
        " Sous Total =  " + data.price * cart.quantitySelected + " €";
      sousTotal.style.fontSize = "20px";
      sousTotal.style.borderBottom = "solid 1px";
      sousTotal.setAttribute("data-prix", data.price*cart.quantitySelected);
      //console.log(sousTotal.dataset);//retourne bien les ss ttx

      //Création de la balise div
      const articleCartItemContentSettings = document.createElement("div");
      articleCartItemContent.appendChild(articleCartItemContentSettings);
      articleCartItemContentSettings.className =
        "cart__item__content__settings";

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
      //articleQuantity.setAttribute("Qté", totalPrice);
      articleQuantity.textContent = "Qté :";

      //Création de la balise input permettant la modification de la quantité ds le panier
      const articleInput = document.createElement("input");
      articleCartItemContentSettingsQuantity.appendChild(articleInput);
      articleInput.value = cart.quantitySelected;
      articleInput.className = "itemQuantity";
      articleInput.setAttribute("name", cart.idSelected);
      articleInput.setAttribute("type", "number");
      articleInput.setAttribute("min", "1");
      articleInput.setAttribute("max", "100");

      //Création de la balise div encadrant la possibilité d'effacer l'article du panier
      const articleCartItemContentSettingsDelete =
        document.createElement("div");
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
    } //fin de function insertItems

    //utilisation de la fonction de calcul de qté totale 
    function sumQuantity() {
      
      //console.log(cart.quantitySelected);//retourne bien la quanité par articles ds le panier
      //console.log(totalQuantityArray);//retourne bien le array vide du début

      //je push les qté du LS ds mon tableau vide du début (en parseInt afin de ne pas avoir d'erreur d'affichage des chiffres si 1 et 1 = 2  pas 11)
      totalQuantityArray.push(parseInt(cart.quantitySelected));
      //console.log(totalQuantityArray);//retourne bien un tableau avec les qtés

       //utilisation du reduce() afin de réduire la liste des valeurs accumulées ds le array
      let total = 0;
      let totalQty = totalQuantityArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue, total
      )
     // console.log(totalQty);//retourne bien la qté totale


      //affichage de ma quanité totale au bon endroit
      let itemTotalQuantity = document.querySelector("#totalQuantity");
      itemTotalQuantity.textContent = totalQty;
      
      
    } //fin fonction calcul qté


    //utilisation de la fonction de calcul de somme totale du panier
    function sumPrice(data) {
    
      //console.log(data.price);//retourne bien le prix unitaire des articles
      //console.log(cart.quantitySelected);//retourne bien la qté des articles

      let ssTotal = data.price * cart.quantitySelected;
      //console.log(ssTotal);//retourne bien les sous totaux des articles

      //console.log(totalSumArray);//retourne bien le array vide du début
      totalSumArray.push(ssTotal);
      //console.log(totalSumArray);//retoure un tableau de  prix 

         //utilisation du reduce() afin de réduire la liste des valeurs accumulées ds le array
        let sum = 0;
        let sumTotal = totalSumArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue, sum
        );
       // console.log(sumTotal);// retourne bien la somme totale calculée

        //affichage de la somme totale au bon endroit
        let totalPrice = document.querySelector("#totalPrice");
        totalPrice.textContent = sumTotal;






      
      
    
    } //fin de calcul prix total

    //utilisation de la fonction de modification de qté
    function changeQuantity() {
      let inputQuantity = document.querySelectorAll(".itemQuantity");
      //console.log(inputQuantity);// retourne bien les inputs sous forme de NodeLit car utilisation du querySelectorAll (A SAVOIR peut être transformé en tableau avec array.from())
      
      inputQuantity.forEach((qtyArticle) =>{
        qtyArticle.addEventListener("change", (event) =>{

          //console.log(qtyArticle);//retourne bien l'input pr lequel on modifie la qté (en + ou-)
          //console.log(qtyArticle.value)//retourne bien la valeur de l'input dont on a modifié la qté
          let qtyArticleValue = qtyArticle.value;

           //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le input qté... ET la couleur...)
          let idChange = qtyArticle.closest(".cart__item").dataset.id;
          //console.log(idChange);//retourne bien l'id de l'article au clic sur ajouter/soutraire 
          
          let colorChange = qtyArticle.closest(".cart__item").dataset.color;
          //console.log(colorChange);//retourne bien la couleur de l'article au clic sur ajouter/soustraire

          const foundArticle = cartLS.filter(
            (kanap) =>
            kanap.idSelected === idChange &&
            kanap.colorSelected === colorChange          
            );

            console.log(foundArticle);//retourne bien le bon article au clic de l'input
            console.log(cart.quantitySelected);//retourne la quantité du ls
            console.log(qtyArticleValue);//retourne bien la nvelle qté
            
            //je créée une condition afin de maîtriser la qté utilisée par le client
            //si tu trouves l'article sélectionné ET que sa qté est supérieure ou égale à 1 ET inférieure ou = à 100 
            if( foundArticle != undefined && qtyArticleValue >= 1 && qtyArticleValue <= 100){

              cart.quantitySelected = qtyArticleValue; 
              localStorage.setItem("LSArticle", JSON.stringify(cartLS));//je mets à jour le localStorage
              alert("Vous venez de modifier la quantité de votre article!")
            }
            else{
              alert("Vous devez sélectionner une quanté entre 1 et 100 unités!")
            }




        })//fin de l'écoute
      })//fin du forEach
      
    } //fin fonction modif de qté

    //utilisation de la fonction supprimer l'article
    function deleteArticle() { // ATTENTION A REVOIR 1ere suppression envoie autant d'alerte que d'article présent 

      //création de la variable qui récupère tous les pseudos boutons "supprimer"
      let btnsDelete = document.querySelectorAll(".deleteItem");
      //console.log(btnsDelete); //retourne bien les btn supprimer ss forme de nodeList

      //création d'une boucle for en itérant 
      for(let j = 0; j < btnsDelete.length; j++){
        //j est égal à 0, est ce que j est inférieur à btnsDelete, bah oui j'ajoute 1 et je refais un tour
        //console.log(j);//retourne l'index de chaque tour
        //console.log(btnsDelete.length);

        //écoute du btn au clicl
        btnsDelete[j].addEventListener("click", (event) =>{

        
          //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le "btn" SUPPRIMER... ET la couleur...)
          let idDelete = btnsDelete[j].closest(".cart__item").dataset.id;
          console.log(idDelete);//retourne bien l'id de l'article au clic sur supprimer 
          let colorDelete = btnsDelete[j].closest(".cart__item").dataset.color;
          console.log(colorDelete);//retourne bien la couleur de l'article au clic sur supprimer

          //dans le ls je veux trouver les articles n'étant STRICTEMENT pas égal (!== opérateur d'inégalité qui vérifie valeur et type) (trouve moi les id qui ne correspondent pas à mon clic etc...) je dissocie les articles afin de supprimer le bon  
          cartLS = cartLS.filter ( kanap =>
            kanap.idSelected !== idDelete ||
            kanap.colorSelected !== colorDelete);

            //ajout/stockage des infos dans le LS
            localStorage.setItem("LSArticle", JSON.stringify(cartLS));
             //message d'alerte informant l'utilisateur que l'article est delete
            alert("Cet article a bien été supprimé de votre panier");

            //mise à jour de la fenêtre 
            window.location.href = "cart.html";
          


        })//fin de l'écoute

      }//fin de l'itération
    
    } //fin de la fonction supprimer
  }); //fin du forEAch de la ligne 43
} //fin du else



/************************************************Formulaire ******************************************/

//Expressions rationnelles ou Expressions régulières = Regex

//création d'une variable récupérant la place du formulaire
let form = document.querySelector(".cart__order__form");
//console.log(form.firstName);// retourne l'input firstName du formulaire



// 1 Ecouter la modification de l'email

//j'écoute la case email du formulaire à chaque changement fait par le client je fais un callback pour lui dire ce qu'on doit faire et j'appelle la fonction validEmail avec, en paramètre, ce que le client saisit donc le form.email (this)
form.email.addEventListener("change", function () {
  validEmail(this);
});

//validation email
const validEmail = function (inputEmail) {
  //Création de la reg Exp pour la validation email
  let emailRegExp = new RegExp( //variable en format objet
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  //^ = début donc au début on a le droit d'écrire ds l'email le a-z ou le A-Z ou 0-9 mais aussi des  .  des tirets des underscrore et on peut les écrire +sieurs fois (d'ou le +)
  //PUIS j'aurai le @ (une seule fois)et de la même manière qu'au début
  //ensuite le caractère du . (une seule fois) (pour faire le .com .fr...)
  //qui sera finalisé par . des lettres minuscules et entre 2lettres mini et 10 maxi
  //$ indique la fin de la phrase

  //paramètre de marqueur(flag)comment je dois lire la regex = g lira de manière globale

  //console.log(testEmail); // renvoi bien vrai si email ok = toto@gmail.com

  //Récupération de la balise où se situera le message d'erreur si false
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

  if (emailRegExp.test(inputEmail.value) == false) {
    emailErrorMsg.textContent = "Attention ! Email invalide";
    document.querySelector("#email").style.background = "#fbbcbc";
  } else {
  }
};



// 2 Ecouter la modification du prénom
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

//validation prénom
const validFirstName = function (inputFirstName) {
  //Création de la reg Exp pour la validation email
  let firstNameRegExp = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ--]+$", "g");

  //Récupération de la balise où se situera le message d'erreur si false
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  if (firstNameRegExp.test(inputFirstName.value) == false) {
    firstNameErrorMsg.textContent = "Attention ! Prénom Invalide";
    document.querySelector("#firstName").style.background = "#fbbcbc";
  } else {
  }
};



// 3 Ecouter la modification du nom
form.lastName.addEventListener("change", function () {
  validlastName(this);
});

//validation du nom
const validlastName = function (inputlastName) {
  //Création de la reg Exp pour la validation email
  let lastNameRegExp = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ--]+$", "g");

  //Récupération de la balise où se situera le message d'erreur si false
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (lastNameRegExp.test(inputlastName.value) == false) {
    lastNameErrorMsg.textContent = "Attention ! Nom Invalide";
    document.querySelector("#lastName").style.background = "#fbbcbc";
  } else {
  }
};

// 4 Ecouter la modification de l'adresse
form.address.addEventListener("change", function () {
  validaddress(this);
});

//validation du nom
const validaddress = function (inputaddress) {
  //Création de la reg Exp pour la validation de l'adressse
  let addressRegExp = new RegExp(
    "^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,'°]+$",
    "g" ///////attention revoir les espaces pour adresse valide
  );

  //Récupération de la balise où se situera le message d'erreur si false
  let addressErrorMsg = document.querySelector("#addressErrorMsg");

  if (addressRegExp.test(inputaddress.value) == false) {
    addressErrorMsg.textContent = "Attention ! Adresse Invalide";
    document.querySelector("#address").style.background = "#fbbcbc";
  } else {
  }
};

// 5 Ecouter la modification de la ville
form.city.addEventListener("change", function () {
  validcity(this);
});

//validation de la ville
const validcity = function (inputcity) {
  //Création de la reg Exp pour la validation de la ville
  let cityRegExp = new RegExp(
    "^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,'s*]+$",
    "g" ///////attention revoir les espaces pour adresse valide
  );

  //Récupération de la balise où se situera le message d'erreur si false
  let cityErrorMsg = document.querySelector("#cityErrorMsg");

  if (cityRegExp.test(inputcity.value) == false) {
    cityErrorMsg.textContent = "Attention ! Ville Invalide";
    document.querySelector("#city").style.background = "#fbbcbc";
  } else {
  }
};



/****************************************FIN Formualire*************************************/




/***************************Validation de la commande***************************************/



/**NON FONCTIONNEL IDEE DE DEPART**/

/*
//création de la variable récupérant le input "commander"
let order = document.querySelector("#order");

//j'écoute le bouton "commander" afin de pouvoir envoyer ma commande au localStorage
order.addEventListener("click", (event) => {
  

  //récupération des infos du client
  let inputFirstName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastName");
  let inputAdress = document.querySelector("#adress");
  let inputCity = document.querySelector("#city");
  let inputMail = document.querySelector("email");

  //création d'un array du LS
  let arrayLS =[];// création d'un array vide
  for(let m = 0; m < cartLS.length; m++){//création d'une boucle qui va récupérer les données
    arrayLS.push(cartLS[i].idSelected);//push dans le array
  }


  //création d'une constante de commande
  const order = {

    contact : {
    firstName: validFirstName.value,
    lastName: validlastName.value,
    adress: validaddress.value,
    city: validcity.value,
    email: validEmail.value,
  },

      panier : arrayLS,
  }//fin du order

  //envoi des données de la commande (panier + formulaire contact) au serveur
  const postServer = {

    method : "POST",
    body : JSON.stringify(order),
    headers : {
      "Content-Type" : "application/json"
    }
  };

  
  fetch("http://localhost:3000/api/products/order", postServer)

  .then(function (response) {
    return response.json();
  })

  .then(function(data){

    localStorage.clear();
    localStorage.setItem("orderId", data.orderId);

    document.location.href = "../html/confirmation.html";
  })
  

  

});*/


