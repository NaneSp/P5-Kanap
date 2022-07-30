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

//Création boucle forEach pour ajouter les couleurs en option de la balise select du html
idArticle.colors.forEach (color =>{
    const itemOption = document.createElement("option");
    document.querySelector("#colors").appendChild(itemOption);
//console.log(itemOption); // renvoi bien les balises option value des couleurs du dom ds la console     
    itemOption.value = color;
    itemOption.textContent = color;
});

    })

    .catch(function (error) {
//si erreur retourne message d'erreur
    alert("Erreur!!!");
    });

/*----------------------------------------------------------------LOCALSTORAGE-------------------------------------------------------------------------------------------------------------*/




//Récupération des informations nécessaires à l'ajout du panier : id /couleur / quantité + récupération du bouton "ajouter au panier"

const idChoice = idArticle;
const colorChoice  = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

//récupération du btn addToCart
const addToCartBtn = document.querySelector("#addToCart");


//Écoute le click du bouton html "ajouter au panier"
addToCartBtn.addEventListener('click', function(){

//Création de l'objet sélectionné à ajouter au LocalStorage
const articleSelected ={
    idSelected : idChoice,
    quantitySelected : parseInt(quantityChoice.value),//Utilisation de la fonction parseInt afin que le string deviennent un entier (si pas de parseInt si ns ajoutons 10 kanap à 10 kanap déjà présents = 1010 et non 20) 
    colorSelected : colorChoice.value, 
}   

//INFOS LocalStorage : ajout-stockage = lS.setItem() / lecture-récupération = lS.getItem() / Suppression de l'élément = lS.removeItem

//Déclaration de la variable "articleLocalStorage" ds laquelle on met "clé"/"valeur"qui sont dans le LS **création du LS**
let articleLocalStorage = JSON.parse(localStorage.getItem ("LSArticle")); //json.parse convertit les données au format JSON (qui st ds le LS) en objet Javascript + getItem=lecture/récup

    /*****************TEST*************************/



//On vérifie que les conditions avec l'opérateur logique ET && soient vraies
if(articleSelected.quantitySelected >0 && articleSelected.quantitySelected <= 100 ){//si la quantité est supérieure à 0 et si la quantité est inférieure ou égale à 100
    
}
//On vérfie que la condition avec l'égalité simple == soit vraie
else if(articleSelected.colorSelected != ""){ //si la couleur de l'article selectionné est différent de "rien" (vrai)
    
}

else{ // si faux alors crées une alerte
    alert ("Merci de sélectionner une couleur OU/ET une quantité (entre 1 et 100 unités) pour votre article!")
}

/***************************FIN TEST************************* */

//Si on ajoute un produit au panier, si celui-ci n'était pas déjà présent ds le panier, on ajoute un nvel élément dans l'array (soit ls = vide)
if(articleLocalStorage == null){

    articleLocalStorage=[]; // articleLocalStorage = array vide
    articleLocalStorage.push(articleSelected);//push ajout un élément
    localStorage.setItem("LSArticle", JSON.stringify(articleLocalStorage));//setItem=ajout/stockage + json.stringify convertit un objet JS en données json
    alert ("Article bien ajouté au panier!");

    console.log(articleLocalStorage);//Vérifie le résultat du LS ds la console
}

//si on ajoute un produit au panier, si celui-ci était déjà présent ds le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l'array (soit si ls est différent de vide)
else if (articleLocalStorage != null){

let articleFound = articleLocalStorage.find( //Création d'une variable d'article trouvé ds le array LS 
//(ds le ls je veux trouver les élément ayant l'id  strictement égal aux id des articles que j'ai déjà selectionné (vérifie valeur et type))
//(---ET (vérifie que les 2 conditions st ttes les 2 true) je veux trouver les éléments ayant la couleur strictement égale aux couleurs déjà sélectionnées (vérifie valeur et type))
    (kanap) => kanap.idSelected === articleSelected.idSelected && kanap.colorSelected === articleSelected.colorSelected);  

//différent de null si contient déjà même id et même couleurs donc si articleFound true incrémenter la quantité de l'article UNIQUEMENT 
if(articleFound){
  //création de la variable nvelle qté qui est = à qté trouvée ds l'articleFound + qté déjà selectionnée  (les élements d'1 tableau ) Utilisation de la fonction parseInt afin que le string deviennent un entier (si pas de parseInt si ns ajoutons 10 kanap à 10 kanap déjà présent = 1010 et non 20) 
    let newQuantity = articleFound.quantitySelected + articleSelected.quantitySelected;
    articleFound.quantitySelected = newQuantity; 
    localStorage.setItem("LSArticle", JSON.stringify(articleLocalStorage)); //setItem=ajout/stockage + json.stringify convertit un objet JS en données json
    alert (` Vous avez selectionnez ${articleFound.quantitySelected} unités pour cet article`)
}
//sinon ajouter l'article simplement
else{
    articleLocalStorage.push(articleSelected);
    localStorage.setItem("LSArticle", JSON.stringify(articleLocalStorage));
    alert ("Article également ajouté au panier!")
}

}

})







