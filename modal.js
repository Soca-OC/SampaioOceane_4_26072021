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
const inputName = document.getElementById("last");
const inputRadio = document.getElementById("location1");
const inputCondition = document.getElementById("checkbox1");

//conditions 
inputRadio.setAttribute("checked","checked");
inputCondition.setAttribute("required","");

let radioArray = [
  document.getElementById("location1").checked,
  document.getElementById("location2").checked,
  document.getElementById("location3").checked,
  document.getElementById("location4").checked,
  document.getElementById("location5").checked,
  document.getElementById("location6").checked,
];
//verification function radioArray


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



//object Input
function Input(nameInput, htmlTag, condition, errorMessage){
  this.nameInput = nameInput;
  this.htmlTag = htmlTag;
  this.condition = condition;
  this.errorMessage = errorMessage;
  this.displayError = function(){
    this.htmlTag.setAttribute("data-error", inputs.errorMessage)
    this.htmlTag.setAttribute("data-error-visible","true");
  };
};
function validateInputs(arr){
  let bols = arr.reduce((a,input) => {
    if (input.condition()){
      input.remove
      a.push(true);
      return a;
    } else {
      input.displayError();
      a.push(false);
      return a;
    }
  }, []);
  console.log(bols);
  console.log(bols.every(i => i));
  return bols.every(i => i);
}
let inputs = [
  new Input("prenom", document.getElementById("first").parentElement, () => document.getElementById("first").value.length >= 2 && document.getElementById("first").value!=="", "Veuillez écrire un prénom avec au minimum 2 carractères"),
  new Input("nom", inputName.parentElement, () => inputName.value.length >= 2 && inputName.value!=="" , "Veuillez écrire un nom avec au minimum 2 carractères"),
  new Input("email", document.getElementById("email").parentElement, () => document.getElementById("email").value.includes("@") && document.getElementById("email").value.includes(".") , "Veuillez donner une adresse mail valide"),
  new Input("concours", document.getElementById("quantity").parentElement, () => document.getElementById("quantity").value!=="", "Veuillez remplir ce champ" ),
  new Input("radio", document.getElementById("location1").parentElement, () => radioArray.some(i => i)),
  new Input("condition", inputCondition.parentElement, () => inputCondition.checked),
]
console.log(radioArray);
function validate(){
  if (validateInputs(inputs)){
  //ici afficher la modale
  return true;
  } else {
    launchModal();
    return false;
  }
}


