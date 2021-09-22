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
const modalBody =  document.querySelectorAll(".modal-body")
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



//object Input
function Input(nameInput, htmlTag, condition, errorMessage){
  this.nameInput = nameInput;
  this.htmlTag = htmlTag;
  this.condition = condition;
  this.errorMessage = errorMessage;
  this.displayError = function(){
    this.htmlTag.setAttribute("data-error", this.errorMessage)
    this.htmlTag.setAttribute("data-error-visible","true");
  };
  this.removeError = function(){
    this.htmlTag.removeAttribute("data-error")
    this.htmlTag.removeAttribute("data-error-visible");
  };
};
function validateInputs(arr){
  let bols = arr.reduce((a,input) => {
    if (input.condition()){
      input.removeError();
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
  new Input("prenom", 
            document.getElementById("first").parentElement, 
            () => document.getElementById("first").value.length >= 2 && document.getElementById("first").value!=="",
            "Veuillez écrire un prénom avec au minimum 2 carractères"),
  new Input("nom", inputName.parentElement, () => inputName.value.length >= 2 && inputName.value!=="" , "Veuillez écrire un nom avec au minimum 2 carractères"),
  new Input("email", document.getElementById("email").parentElement, () => 
            function validateEmail(email){
             /* let Regex1 = /^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i;
              var valid = emailExpression.test(email);

              if(!valid){
                return false;
              } else {}*/
                return true;
              
            },
            "Veuillez donner une adresse mail valide"),
  new Input("birthdate", document.getElementById("birthdate").parentElement, () => document.getElementById("birthdate").value!=="", "Veuillez entrer votre date de naissance"),
  new Input("concours", document.getElementById("quantity").parentElement, () => document.getElementById("quantity").value!=="", "Veuillez remplir ce champ" ),
  new Input("radio", document.getElementById("location1").parentElement, () => {
            function radioChecked(){
              let radioArray = [
                  document.getElementById("location1").checked,
                  document.getElementById("location2").checked,
                  document.getElementById("location3").checked,
                  document.getElementById("location4").checked,
                  document.getElementById("location5").checked,
                  document.getElementById("location6").checked,
                ];
                return radioArray;
            }
            let radioArray = radioChecked();
            return radioArray.some(i => i)
            },
            "Veuillez choisir une ville"),
  new Input("condition", document.getElementById("checkbox1").parentElement, () => inputCondition.checked,"Veuillez accepter les conditions d'utilisation"),
]

document.querySelector("form").addEventListener("click", function(event){
  event.preventDefault();
  validate();
});

function validate(){
  if (validateInputs(inputs)){

    
    modalBody.style.display = "none";
    function validateMessage(){
      var newElementValidate = document.createElement("div");
      var newTextValidate = document.createTextNode("Merci pour votre Reservation, celle ci à bien été pris en compte !")
      newElementValidate.appendChild(newTextValidate);
      document.body.insertBefore(newElementValidate,modalBody);
    }
  return true;
  } else {
    launchModal();
    return false;
  }
}


