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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




    const colorChoice = document.querySelector("#colors");//va chercher l'id colors ds le dom
    const quantityChoice = document.querySelector ("#quantity");// va chercher l'id quantity ds le dom
    const addToCartBtn = document.querySelector("#addToCart"); // va chercher l'id addToCart ds le dom
    

addToCartBtn.addEventListener ("click", ()=>{

//création de l'objet à insérer ds le LocalStorage
    const articleSelected ={
            idSelected : idArticle,
            quantitySelected : quantityChoice.value,
            colorSelected : colorChoice.value
            }



// Déclaration de la variable "articleLocalStorage" dans laquelle on met clé/valeur qui sont ds le LS
    let articleLocalStorage = JSON.parse(localStorage.getItem("LSArticle"));// json.parse convertit les données au format JSON qui sont ds le LS en objet JS
        




// si il n'y a pas d'article enregistré ds le LS
    if (articleLocalStorage == null){
        articleLocalStorage =[]; //création d'un array vide
        articleLocalStorage.push(articleSelected); // je push la variable objet ds le tableau
        localStorage.setItem("LSArticle", JSON.stringify("articleLocalStorage"));//j'envoie les valeurs de la variable ds le ls 
        alert ("Votre article a bien été ajouté au panier")
        console.log(articleLocalStorage);//vérif que le tableau s'affiche bien ds la console
        }
        //si il y a 1 ou des articles déjà présents dans le LS
        else{


        }

    })