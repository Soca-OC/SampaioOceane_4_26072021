function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
console.log (formData.length);
const inputPrenom = document.getElementById("first");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
//close modal form
function closeModal(){
  modalbg.style.display = "none";
}
// 

// validation du formulaire
function valider(){
  //si prénom comporte plus de 2 carractère
   if (inputPrenom.length >= 2){
     return true;
   }
   // si non afficher message + ne pas valider l'envoie
   else {
     alert("Veuillez saisir votre prénom");
     return false;
   }
}

