//récupération des paramètres URL pour l'id
let params = window.location.href; // renvoi le href (url) de la page en cours
let url = new URL(params); //crée un nvel objet
let idArticle = url.searchParams.get("id"); //id renseigné en paramètre
//console.log(idArticle); //renvoi bien l'id de l'article selectionné en page d'accueil

//récupération de l'article par son id
fetch("http://localhost:3000/api/products/" + idArticle)
    .then(function (response) {
    //retourne la réponse au format json
    return response.json();
    })

    .then(function (idArticle) {
   // console.table(idArticle);
//retourne en réponse un tableau de l'article en détail


    const itemImg = document.createElement("img"); //création de la balise img
    document.querySelector(".item__img").appendChild(itemImg); //rajoute un enfant à l'élément (code raccourci)
    //console.log(itemImg); //renvoi bien la balise img dans la console
    itemImg.src = idArticle.imageUrl;
    itemImg.alt = idArticle.altTxt;

    const itemName = document.querySelector("#title");
    //console.log(itemName); // renvoi bien le title h1  du dom ds la console
    itemName.textContent = idArticle.name;

    const itemPrice = document.querySelector("#price");
    //console.log(itemPrice); //renvoi bien le price span  du dom ds la concole
    itemPrice.textContent = idArticle.price;

    const itemDescription = document.querySelector("#description");
    //console.log(itemDescription); // renvoi bien la description p  du dom ds la console
    itemDescription.textContent = idArticle.description;

//création d'une boucle for...of pour répeter les tâches de choix de couleurs

    for (let colors of idArticle.colors) {
      //console.log(colors); // renvoi bien les couleurs dispo ds la console
    const itemColor = document.createElement("option"); //création d'une nvelle balise option pr choix des couleurs
    document.querySelector("#colors").appendChild(itemColor);
    itemColor.value = colors;
    itemColor.textContent = colors;
    }
    })

    .catch(function (error) {
//si erreur retourne message d'erreur
    alert("Erreur!!!");
    });

/*----------------------------------------------------------------LOCALSTORAGE-------------------------------------------------------------------------------------------------------------*/


//doit récupérer un objet contenant id, coleur, quantité

const idChoice = idArticle;
const colorChoice  = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

//récupération du btn addToCart
const addToCartBtn = document.querySelector("#addToCart");


//Écoute le click du bouton html "ajouter au panier"
addToCartBtn.addEventListener("click", () =>{

//Création de l'objet sélectionné à ajouter au LocalStorage
const articleSelected ={
    idSelected : idChoice,
    quantitySelected : quantityChoice.value,
    colorSelected : colorChoice.value, 
}   

//Déclaration de la variable "articleLocalStorage" ds laquelle on met "clé"/"valeur"qui sont dans le LS **création du LS**
let articleLocalStorage = JSON.parse(localStorage.getItem ("LSArticle")); //json.parse convertit les données au format JSON (qui st ds le LS) en objet LS

/*******************************************TEST**********************************************************************/
if(articleSelected.colorSelected !=""){
    alert ("Vous venez de sélectionner la couleur de votre article!");
}else if(articleSelected.colorSelected ===""){
    alert ("Merci de choisir la couleur de votre article");
}



/*******************************************TEST**********************************************************************/

//si le LS est égal à null (soit ls vide) donc charge l'objet ds le ls
if(articleLocalStorage == null){

    articleLocalStorage=[];
    articleLocalStorage.push(articleSelected);
    localStorage.setItem("LSArticle", JSON.stringify(articleLocalStorage));
    alert ("Votre article a bien été ajouté au panier!");

    console.log(articleLocalStorage);
}


//sinon si le LS est différent de null (soit LS contenant déjà un objet) ajoute cet objet 
else if(articleLocalStorage != null){
    articleLocalStorage.push(articleSelected);
    localStorage.setItem("LSArticle", JSON.stringify(articleLocalStorage));
    alert ("Votre article a également été ajouté au panier!");
}


})