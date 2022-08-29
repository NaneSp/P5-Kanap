/*But : récupérer les articles du LocalStorage , pouvoir modifier leur quantité directement depuis cette page ainsi qu'avoir la possibilité de supprimer les articles souhaités*/

//récupération du LocalStorage
let cartLS = JSON.parse(localStorage.getItem("LSArticle"));
//console.log(cartLS); //retourne bien le LS (si vide renvoi null)

//SI le panier est VIDE
if (cartLS === null) {
  const cartTitle = document.querySelector("h1"); //récupération de l'emplacement afin de mettre le msg si vide

  const cartEmpty = "Votre panier est vide!";
  cartTitle.textContent = cartEmpty;
  cartTitle.style.fontSize = "40px";

  document.querySelector(".cart__order").style.display = "none"; //masque le forulaire si panier vide
  document.querySelector(".cart__price").style.display = "none"; // masque le prix total si panier vide
}
//SINON le panier n'est PAS vide
else {
  let totalSumArray = []; //création d'un array vide qui récupérera les ss totaux pr calcul prix total (fait avant la boucle afin de n'avoir qu'un seul array)
  //console.log(totalSumArray);//retourne bien array vide

  let totalQuantityArray = []; //création d'un array vide qui récupérera la somme totale à afficher (fait avant la boucle afin de n'avoir qu'un seul array)
  //console.log(totalQuantityArray);//retourne bien array vide

  let showCart = []; //création d'un array vide pour récupérer les données

  //création d'une boucle afin de récupérer les données
  cartLS.forEach(function (cart) {
    let id = cart.idSelected;
    //console.log(id);//retourne bien les id du ls

    /******************INSERTION d'une partie des éléments DS LE DOM****************************************/

    //Création balise article
    const article = document.createElement("article"); //Créé un élément article (en exemple ds le html)
    document.querySelector("#cart__items").appendChild(article);
    article.className = "cart__item"; //créé la class de l'article
    article.setAttribute("data-id", cart.idSelected); //modifie l'attribut, prend en compte data id et l'article selectionné
    article.setAttribute("data-color", cart.colorSelected); //modifie l'attribut, prend en compte data-color et l'article selectionné

    //Création balise div pour l'image
    const articleImg = document.createElement("div");
    article.appendChild(articleImg);
    articleImg.className = "cart__item__img";

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
    articleH2.textContent = cart.nameSelected; //récupération du nom ds le LS (puisque ns en avions besoin pour les alertes)
    //console.log(articleH2); // retourne bien les noms des articles présents ds le LS ds la console

    //Création de la balise p contenant la couleur
    const articleColor = document.createElement("p");
    articleCartItemContentDescription.appendChild(articleColor);
    articleColor.textContent = cart.colorSelected; //récupération de la couleur ds le LS

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
    articleInput.value = cart.quantitySelected;
    articleInput.className = "itemQuantity";
    articleInput.setAttribute("name", cart.idSelected);
    articleInput.setAttribute("type", "number");
    articleInput.setAttribute("min", "1");
    articleInput.setAttribute("max", "100");

  //j'écoute le input afin de prendre en compte les modifications du client (ajout ou retrait de qté)
  articleInput.addEventListener("change", (event) =>{
    event.preventDefault();

    console.log(articleInput.value);//retourne bien la valeur du input à chaque changement

    //création des variables avec méthode closest qui va rechercher dans le dom les élements qui correspondent au sélecteurs spécifiés (trouve moi l'id (lecture de l'id avec propriété dataset) ds la partie article du dom quand je clique sur le input qté... ET la couleur...)

    let idChange = articleInput.closest(".cart__item").dataset.id;
    //console.log(idChange);//retourne bien l'id de l'article sélectionné par le chgt ds le input
    
    let colorChange = articleInput.closest(".cart__item").dataset.color;
    //console.log(colorChange);//retourne bien la couleur de l'article sélectionné par le chgt ds le input

    //console.log(cartLS);//retourne bien le LS
    
    const foundArticle = cartLS.filter(
      (kanap) =>
      kanap.idSelected === idChange &&
      kanap.colorSelected === colorChange
    );

    console.log(foundArticle);//retourne bien le bon article au clic de l'input
    console.log(cart.quantitySelected);//retourne bien la qté présente ds le ls
//102

      //création d'une condition afin de maîtriser la qté utilisée par le client
      //si tu trouves l'article ET que sa qté est supérieure ou égale à 1 ET inférieure ou = à 100
      if (foundArticle !== undefined && articleInput.value >= 1 && articleInput.value <= 100){

        cart.quantitySelected = articleInput.value;
        localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //je mets à jour le localStorage
        alert("Vous venez de modifier la quantité de votre article!");
        {
          window.location.href = "cart.html";
        } //lien vers panier

      }
      else {
        alert("Vous devez sélectionner une quanté entre 1 et 100 unités!");
        {
          window.location.href = "cart.html";
        } //lien retour panier
      }

  })//fin de l'écoute



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

    //j'écoute le "btn" afin de prendre en compte les modifications du client (suppression de l'article)
    articleDelete.addEventListener("click", (event) =>{

      event.preventDefault();

      console.log(articleDelete);

      let idDelete = articleDelete.closest(".cart__item").dataset.id;
      console.log(idDelete);//retourne bien le bon id lors du click sur "supprimer"
      let colorDelete = articleDelete.closest(".cart__item").dataset.color;
      console.log(colorDelete);//retourne bien la bonne couleur lors du click sur "supprimer"

      const trashArticle = cartLS.filter(
        (trash) =>
        trash.idSelected === idDelete &&
        trash.colorSelected === colorDelete
      );
      console.log(trashArticle);//retourne bien le bon article au click sur "supprimer"

      localStorage.setItem("LSArticle", JSON.stringify(cartLS));
      alert ("Cet article a bien été supprimé de votre panier!")






    })

    /******************APPEL FETCH POUR RECUPERATION DES DONNEES MANQUANTES***********************************/

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


        //Création de la balise img
        const articleImgSrc = document.createElement("img");
        articleImg.appendChild(articleImgSrc);
        articleImgSrc.src = articleCart.imageUrl; //récupération de l'imageUrl ds l'api
        articleImgSrc.alt = articleCart.altText; //récupération du altText ds l'api

        //création de la fonction de calcul de somme totale
    function sumPrice(){
        //Création de la balise p contenant le prix unitaire des articles
        const articlePrice = document.createElement("p");
        articleH2.appendChild(articlePrice);
        articlePrice.textContent =
          "prix à l'unité =   " + articleCart.price + " € ";
        articlePrice.style.fontSize = "15px";
        //console.log(articlePrice);//retourne bien les phrases contenant les prix des articles sélectionnés
        
        //Création de la balise p contenant un sous total par article sélectionné
        const sousTotal = document.createElement("p");
        articleCartItemContentDescription.appendChild(sousTotal);
        sousTotal.className = "sousTotal";
        sousTotal.textContent =
          " Sous Total =  " + articleCart.price * cart.quantitySelected + " €";
        sousTotal.style.fontSize = "20px";
        sousTotal.style.borderBottom = "solid 1px";
        sousTotal.setAttribute(
          "data-prix",
          articleCart.price * cart.quantitySelected
        );
        
      //console.log (totalSumArray);//retourne bien le array vide du début
      //console.log(articleCart.price);//retourne bien les prix

      let ssTotal = articleCart.price * cart.quantitySelected;
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

        sumQuantity(); //appel d'une fonction afin de calculer de la qté totale
        sumPrice();

      }) //fin du 2nd then
      .catch(function (error) {
        alert("Erreur! Avez-vous bien lancé le serveur local (port 3000)");
      }); //fin du catch



      //création de la fonction de calcul de qté totale
    function sumQuantity() {
      //console.log(cart.quantitySelected);//retourne bien la quanité par articles ds le panier
      //console.log(totalQuantityArray);//retourne bien le array vide du début

      //je push les qté du LS ds mon tableau vide du début (en parseInt afin de ne pas avoir d'erreur d'affichage des chiffres si 1 et 1 = 2  pas 11)
      totalQuantityArray.push(parseInt(cart.quantitySelected));
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
    } //fin fonction calcul qté

    

    
  




    
  }); //fin du foreach de fetch
} //fin du else


/*********************************Formulaire ******************************/


//REVOIR LES ESPACES DANS LES REGEXXXXXX!!!!!!!!!!!!!!!!!!!!!!!!!







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
    //sinon c'est ok laisse le client taper
  }
};

// 2 Ecouter la modification du prénom
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

//validation prénom
const validFirstName = function (inputFirstName) {
  //Création de la reg Exp pour la validation email
  let firstNameRegExp = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ-- ]+$", "g");

  //Récupération de la balise où se situera le message d'erreur si false
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  if (firstNameRegExp.test(inputFirstName.value) == false) {
    firstNameErrorMsg.textContent = "Attention ! Prénom Invalide";
    document.querySelector("#firstName").style.background = "#fbbcbc";
  } else {
    //sinon c'est ok laisse le client taper
  }
};

// 3 Ecouter la modification du nom
form.lastName.addEventListener("change", function () {
  validLastName(this);
});

//validation du nom
const validLastName = function (inputLastName) {
  //Création de la reg Exp pour la validation email
  let lastNameRegExp = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ-- ]+$", "g");

  //Récupération de la balise où se situera le message d'erreur si false
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (lastNameRegExp.test(inputLastName.value) == false) {
    lastNameErrorMsg.textContent = "Attention ! Nom Invalide";
    document.querySelector("#lastName").style.background = "#fbbcbc";
  } else {
    //sinon c'est ok laisse le client taper
  }
};

// 4 Ecouter la modification de l'adresse
form.address.addEventListener("change", function () {
  validAddress(this);
});

//validation du nom
const validAddress = function (inputAddress) {
  //Création de la reg Exp pour la validation de l'adressse
  let addressRegExp = new RegExp(
    "^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,'° ]+$",
    "g" ///////attention revoir les espaces pour adresse valide
  );

  //Récupération de la balise où se situera le message d'erreur si false
  let addressErrorMsg = document.querySelector("#addressErrorMsg");

  if (addressRegExp.test(inputAddress.value) == false) {
    addressErrorMsg.textContent = "Attention ! Adresse Invalide";
    document.querySelector("#address").style.background = "#fbbcbc";
  } else {
    //sinon c'est ok laisse le client taper
  }
};

// 5 Ecouter la modification de la ville
form.city.addEventListener("change", function () {
  validCity(this);
});

//validation de la ville
const validCity = function (inputCity) {
  //Création de la reg Exp pour la validation de la ville
  let cityRegExp = new RegExp(
    "^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-,' ]+$",
    "g" ///////attention revoir les espaces pour adresse valide
  );

  //Récupération de la balise où se situera le message d'erreur si false
  let cityErrorMsg = document.querySelector("#cityErrorMsg");

  if (cityRegExp.test(inputCity.value) == false) {
    cityErrorMsg.textContent = "Attention ! Ville Invalide";
    document.querySelector("#city").style.background = "#fbbcbc";
  } else {
    //sinon c'est ok laisse le client taper
  }
};

/**************************FIN Formualire*******************************/

/********************Validation de la commande**************************/

/*But : une fois le formulaire rempli, on envoie (via le bouton "commander") au serveur les données de celui ainsi que le contenu du panier, le client, liu, sera renvoyé vers la page de confirmation et le serveur lui renverra son numéro de commande... si tout ce passe bien*/

/**NON FONCTIONNEL IDEE DE DEPART**/

/*FAIRE UNE VERIF DU FORMULAIRE AVANT ENVOI*/

//création de la variable récupérant le input "commander"
let order = document.querySelector("#order");

//j'écoute le bouton "commander" afin de pouvoir envoyer ma commande au serveur
order.addEventListener("click", (event) => {
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

  //ajout d'une condition si champs de formulaire vide
  //si la valeur de cet input est strictement égal à vide OU....
  if (
    inputFirstName.value === "" ||
    inputLastName.value === "" ||
    inputAddress.value === "" ||
    inputCity.value === "" ||
    inputMail.value === ""
  ) {
    alert("Attention champs du formulaire manquant!");
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

