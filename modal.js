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

//conditions 
inputName.setAttribute("minlength","2");
inputRadio.setAttribute("checked","checked");
inputCondition.setAttribute("required","");

//object Input
function Input (nameInput, condition){
  this.nameInput = nameInput;
  this.condition = condition;
};
let inputs = [
  new Input("prenom", ),
  new Input("nom", inputName.length >= 2),
  new Input("email", ),
  new Input("dateofbirth",() => this.value ),
  new Input("concours",() => this.value),
  new Input("radio", () => this.value ),
  new Input("condition", () => this.value),
]
function validate (){
  return inputs.every(i => i.condition());
}

console.log(inputs);



