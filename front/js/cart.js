/*But : récupérer les élements du LocalStorage afin de pouvoir déclarer la quantité totale + le somme totale ET ajouter une quantité ou delete des articles depuis cette page panier*/

//Récupération du LocalStorage
const cartLS = JSON.parse(localStorage.getItem("LSArticle"));
//console.log(cartLS);//renvoi bien le contenu du Local Storage (affiche null si panier vide)

//si le panier est vide
if (cartLS === null) {
  const cartTitle = document.querySelector("h1"); //récupération de l'emplacement afin de mettre le msg si vide

  const cartEmpty = "Votre panier est vide!";
  cartTitle.textContent = cartEmpty;
  cartTitle.style.fontSize = "30px";

  document.querySelector(".cart__order").style.display = "none"; //masque le forulaire si panier vide
  document.querySelector(".cart__price").style.display = "none"; // masque le prix total si panier vide
}
//sinon si panier non vide
else {
  /*test*/
  /*cartLS.forEach(item => console.log(item));

  cartLS.forEach(item => console.log(item.idSelected));
  cartLS.forEach(item => console.log(item.nameSelected));
  cartLS.forEach(item => console.log(item.quantitySelected));
  cartLS.forEach(item => console.log(item.colorSelected));*/

  let totauxArray = []; //création d'un array vide qui récupérera les ss totaux pr calcul prix total (fait avant la boucle afin de n'avoir qu'un seul array)

  cartLS.forEach(function (cart) {
    //cartLS.forEach((cart) => console.log(cart.idSelected));

    let id = cart.idSelected;
    //console.log(id);//récupère bien l'id des éléments du LS

    const url = `http://localhost:3000/api/products/${id}`;
    //console.log(url);//retourne bien l'url avec l'id des éléments du LS

    fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        //console.log(data);
        insertItems(data);
      })

      .catch(function (error) {
        //si erreur retourne message d'erreur
        alert("Erreur! ");
      });

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
      sousTotal.textContent =
        " Sous Total =  " + data.price * cart.quantitySelected + " €";
      sousTotal.style.fontSize = "20px";
      sousTotal.style.borderBottom = "solid 1px";
      //console.log(sousTotal);//retourne bien les ss ttx

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

      /**************************calcul quantité totale********************************/

      let total = 0;
      cartLS.forEach((cart) => {
        total += cart.quantitySelected;
      });
      //console.log(total);//retourne bien la quantité totale

      //affichage de la quantité au bon endroit
      let totalQuantity = document.querySelector("#totalQuantity");
      totalQuantity.textContent = total;

      /**************************FIN calcul quantité totale****************************/

      /**************************calcul somme totale***********************************/

      //console.log(data.price); //retourne bien les prix
      //console.log(cart.quantitySelected); //retourne bien les qté

      let ssTotal = data.price * cart.quantitySelected; //même démarche que pour afficher les sous totaux
      //console.log(ssTotal); //retourne bien les ssTotaux

      //console.log(totauxArray); //retourne bien array vide du début
      totauxArray.push(ssTotal);
      //console.log(totauxArray); //retoure les prix à chaque fois qu'une boucle se fait (donc  1ere ligne console = calcul du prix du premier article,  seconde ligne = calcul du prix du premier article et calcul du prix du second article, troisième ligne = calcul prix 1er art.et calcul prix 2nd art. et calcul prix 3ème art. .....etc si plus d'articles )

      //utilisation du reduce() afin de réduire la liste des valeurs accumulées ds le array

      let sum = 0;
      let sumTotal = totauxArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        sum
      );
      //console.log(sumTotal); //retourne bien la somme totale

      //affichage de la somme totale au bon endroit

      let totalPrice = document.querySelector("#totalPrice");
      totalPrice.textContent = sumTotal;

      /**************************FIN calcul somme totale********************************/


      //Création de la balise input permettant la modification de la quantité ds le panier
      const articleInput = document.createElement("input");
      articleCartItemContentSettingsQuantity.appendChild(articleInput);
      articleInput.value = cart.quantitySelected;
      articleInput.className = "itemQuantity";
      articleInput.setAttribute("name", "itemQuantity");
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
      articleDelete.innerHTML = "Supprimer";
      //console.log(articleDelete);
      
      /*****************************delete**************************************/
        
    
      



        

      
      
    
    }
    
  
    
  });

  

  
  



}


/************************************************Formulaire ******************************************/

//Expressions rationnelles ou Expressions régulières = Regex

//création d'une variable récupérant la place du formulaire
let form = document.querySelector(".cart__order__form");
//console.log(form.firstName);// retourne l'input firstName du formulaire

// 1 Ecouter la modification de l'email
form.email.addEventListener("change", function () {
  validEmail(this);
});

//validation email
const validEmail = function (inputEmail) {
  //Création de la reg Exp pour la validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  //^ = début donc au début on a le droit d'écrire ds l'email le a-z ou le A-Z ou 0-9 mais aussi des  .  des tirets des underscrore et on peut les écrire +sieurs fois (d'ou le +)
  //PUIS j'aurai le @ (une seule fois)et de la même manière qu'au début
  //ensuite le caractère du . (une seule fois) (pour faire le .com .fr...)
  //qui sera finalisé par . des lettres minuscules et entre 2lettres mini et 10 maxi
  //$ indique la fin de la phrase

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
    "^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,'°s*]+$",
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

let order = document.querySelector("#order");

order.addEventListener("click", (event) => {
  event.preventDefault();

  //constitution objet contact

  const contact = {
    firstName: validFirstName.value,
    lastName: validlastName.value,
    adress: validaddress.value,
    city: validcity.value,
    email: validEmail.value,
  };
});

