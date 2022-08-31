/*But :  importer l'article sélectionné en page d'accueil de façon dynamique*/

//récupération des paramètres URL pour l'id
let params = window.location.href; // renvoi le href (url) de la page en cours
let url = new URL(params); //crée un nvel objet
let id = url.searchParams.get("id"); //id renseigné en paramètre
//console.log(id); //renvoi bien l'id de l'article selectionné en page d'accueil

//récupération de l'article par son id
fetch("http://localhost:3000/api/products/" + id)
  .then(function (response) {
    //retourne la réponse au format json
    return response.json();
  })

  .then(function (id) {
    //console.table(id);//retourne en réponse un tableau de l'article en détail
    localStorageId(id);
  })

  .catch(function (error) {
    //si erreur retourne message d'erreur
    alert("Erreur! Avez-vous bien lancé le serveur local (port 3000)");
  });

function localStorageId(id) {
  //Insertion des éléments ds le DOM
  const itemImg = document.createElement("img"); //création de la balise img
  document.querySelector(".item__img").appendChild(itemImg); //rajoute un enfant à l'élément (code raccourci)
  //console.log(itemImg); //renvoi bien la balise img dans la console
  itemImg.src = id.imageUrl;
  itemImg.alt = id.altTxt;

  const itemName = document.querySelector("#title");
  //console.log(itemName); // renvoi bien le title h1  du dom ds la console
  itemName.textContent = id.name;

  const itemPrice = document.querySelector("#price");
  //console.log(itemPrice); //renvoi bien le price span  du dom ds la concole
  itemPrice.textContent = id.price;

  const itemDescription = document.querySelector("#description");
  //console.log(itemDescription); // renvoi bien la description p  du dom ds la console
  itemDescription.textContent = id.description;

  //Création boucle forEach pour ajouter les couleurs en option de la balise select du html
  id.colors.forEach((color) => {
    const itemOption = document.createElement("option");
    document.querySelector("#colors").appendChild(itemOption);
    //console.log(itemOption); // renvoi bien les balises option value des couleurs du dom ds la console
    itemOption.value = color;
    itemOption.textContent = color;
  });
}
/*----------------------------------------------------------------LOCALSTORAGE-------------------------------------------------------------------------------------------------------------*/

//Récupération des informations nécessaires à l'ajout du panier : id /couleur / quantité + (ajout du nom du kanap pour création de msg) + récupération du bouton "ajouter au panier"

const idChoice = id;
const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");
const nameChoice = document.querySelector("#title");
const addToCartBtn = document.querySelector("#addToCart");

//Écoute du click du bouton html "ajouter au panier"
addToCartBtn.addEventListener("click",  (event) => {

  event.preventDefault();//annule l'évênement si il est annulable (l'action par défaut qui appartient à l'évênement ne sera pas faite)
  //Création de l'objet sélectionné (aSelected = article sélectionné )à ajouter au LocalStorage
  const aSelected = {
    idSelected: idChoice,
    nameSelected: nameChoice.textContent,
    quantitySelected: parseInt(quantityChoice.value), //Utilisation de la fonction parseInt afin que le string deviennent un entier (sinon si ajout de 10 kanap + 10 kanap = 1010 à la place de 20)
    colorSelected: colorChoice.value,
  };

  //Création du LocalStorage
  //INFOS LS : ajout-stockage = lS.setItem() / lecture-récupération = lS.getItem() / Suppression de l'élément = lS.removeItem

  //Déclaration de la variable "cartLS = panier Local Storage" ds laquelle on met "clé"/"valeur"qui sont dans le LS **création du LS**
  let cartLS = JSON.parse(localStorage.getItem("LSArticle")); //json.parse convertit les données au format JSON (qui st ds le LS) en objet Javascript + getItem=lecture/récup

  //Si la couleur séletionnée est = à rien ---> soit true alors alert
  if (aSelected.colorSelected == "") {
    alert("Merci de sélectionner une couleur à votre article");
  }

  //Et si la quantité sélectionnée et inférieure à 1 OU supérieure à 100 --->soit une des 2 condition est true
  else if (aSelected.quantitySelected < 1 || aSelected.quantitySelected > 100) {
    alert(
      "Merci de sélectionner une quantité entre 1 et 100 unités à votre article"
    );
  }


  //SINON
  else {
    //Si on ajoute un produit au panier, si celui-ci n'était pas déjà présent ds le panier, on ajoute un nvel élément dans l'array (soit ls = vide)
    /*1*/ if (cartLS == null) {
      cartLS = []; // cartLS = array vide
      cartLS.push(aSelected); //push ajout un élément
      localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //setItem=ajout/stockage + json.stringify convertit un objet JS en données json
      alert(
        `Vous avez ajouté ${aSelected.quantitySelected} ${aSelected.nameSelected} de couleur ${aSelected.colorSelected} à votre panier. 
        
        Pour consulter la page panier cliquer sur OK`
      );{window.location.href = "cart.html";}//lien vers panier
    
      
    }

    //si on ajoute un produit au panier, si celui-ci était déjà présent ds le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l'array (soit si ls est différent de vide)
    /*2*/
    else if (cartLS != null) {
      //Création d'une variable contenant les  articles trouvés ds le array LS
      let articleFound = cartLS.find(
        //(ds le ls je veux trouver les élément ayant l'id  strictement égal aux id des articles que j'ai déjà selectionné (vérifie valeur et type))
        //(---ET (vérifie que les 2 conditions st ttes les 2 true) je veux trouver les éléments ayant la couleur strictement égale aux couleurs déjà sélectionnées (vérifie valeur et type))
        (kanap) =>
          kanap.idSelected === aSelected.idSelected &&
          kanap.colorSelected === aSelected.colorSelected
      );

      //différent de null si contient déjà même id et même couleurs donc si articleFound true incrémenter la quantité de l'article UNIQUEMENT
      /*A*/ if (articleFound) {
        //création de la variable nvelle qté qui est = à qté trouvée ds l'articleFound + qté déjà selectionnée  (les élements d'1 tableau )
        let newQuantity =
          articleFound.quantitySelected + aSelected.quantitySelected;
        articleFound.quantitySelected = newQuantity;
        localStorage.setItem("LSArticle", JSON.stringify(cartLS)); //setItem=ajout/stockage + json.stringify convertit un objet JS en données json
        alert(
          ` Vous avez ajouté ${aSelected.quantitySelected} ${aSelected.nameSelected} de couleur ${aSelected.colorSelected} dans votre panier.
          
          Pour consulter la page panier cliquer sur OK`
        );{window.location.href = "cart.html";}//lien vers page panier
      }
      //sinon ajouter l'article simplement
      /*B*/
      else {
        cartLS.push(aSelected);
        localStorage.setItem("LSArticle", JSON.stringify(cartLS));
        alert(
          ` Vous avez ajouté ${aSelected.quantitySelected} ${aSelected.nameSelected} de couleur ${aSelected.colorSelected} dans votre panier.
          
          Pour consulter la page panier cliquer sur OK`
        );{window.location.href = "cart.html";}//lien vers page panier
        
      }
    }
  }
});
