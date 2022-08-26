/*But :  récupérer l'url de la page confirmation puis passer l'id à cet url afin d'afficher le numéro de la commande*/ 



//récupération des paramètres de l'url( même méthode que page produit)
let url = new URL(window.location.href);//récupère le lien ds la barre d'adresse
let orderId = url.searchParams.get("orderId");//récupère l'orderID dans l'url avec le paramètre

    
//affichage du numéro de commande au bon endroit
const confirmation = document.querySelector("#orderId");
confirmation.textContent = orderId;

//suppression du LS
localStorage.clear();