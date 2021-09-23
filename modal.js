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
const modalBody =  document.querySelector(".modal-body")
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const inputName = document.getElementById("last");
const inputRadio = document.getElementById("location1");
const inputCondition = document.getElementById("checkbox1");

// create div for congrats message
let modalBodyCongrats = document.createElement("div");
modalBodyCongrats.style.display ="none";
document.querySelector(".content").appendChild(modalBodyCongrats);


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form and delete Congrats Message
function launchModal() {
  modalbg.style.display = "block";
  modalBody.style.display = "block";
  modalBodyCongrats.style.display = "none";
}
//close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

//close modal form
function closeModal(){
  modalbg.style.display = "none";
}

//object Input with name, htmlTag, condition and errorMessage
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

// Say if conditions are true or false and add a Error message if they are false
// There informations are in the array "bols" 
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
  return bols.every(i => i);
}

// Array for validate every conditions for each input 
let inputs = [
  //for "prénom", the conditions are not null and length sup. 2 
  new Input("prenom", 
            document.getElementById("first").parentElement, 
            () => document.getElementById("first").value.length >= 2 && document.getElementById("first").value!=="",
            "Veuillez écrire un prénom avec au minimum 2 carractères"),

  //for "nom", the conditions are not null and length sup. 2 
  new Input("nom",
            inputName.parentElement, 
            () => inputName.value.length >= 2 && inputName.value!=="" , 
            "Veuillez écrire un nom avec au minimum 2 carractères"),

  //for "email", the conditions are not null and composed as an email address, test this with a regex 
  new Input("email", 
            document.getElementById("email").parentElement, 
            () => {
            return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test = document.getElementById("email").value},
            "Veuillez donner une adresse mail valide"),
  
  //for "birthday", the conditions are not null and sup to today         
  new Input("birthdate", 
            document.getElementById("birthdate").parentElement,
            () =>{
            let birthDate = new Date (document.getElementById("birthdate").value);
            let birthdateNumber = Number(birthDate);
            console.log(birthdateNumber);
            let now = new Date();
            if (now > birthdateNumber){
              return true;
            } else{
              return false;
            }
            }
            ,
            "Veuillez entrer votre date de naissance"),

  // for "concours" the condition is not null 
  new Input("concours", 
            document.getElementById("quantity").parentElement, 
            () => document.getElementById("quantity").value!=="", 
            "Veuillez remplir ce champ" ),

  // for "radio", the condition is not null
  new Input("radio", 
            document.getElementById("location1").parentElement, 
            () => {
            function radioChecked(){
            // use array for say "i'm checked"
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
            // after use "some" for check if just 1 is checked
            let radioArray = radioChecked();
            return radioArray.some(i => i)
            },
            "Veuillez choisir une ville"),

  // for "condition", the condition is first checkbox is checked
  new Input("condition", 
            document.getElementById("checkbox1").parentElement, 
            () => inputCondition.checked,
            "Veuillez accepter les conditions d'utilisation"),
]

// listen if submit the form and cancel the default event and validate the form
document.querySelector("form").addEventListener("submit", function(event){
  event.preventDefault();
  validate();
});

// "validate" check if all inputs are true (conditions are right) 
function validate(){
  if (validateInputs(inputs)){  
    // it's true, open the modal congrats and reset the form
      toogleModal();
      modalBodyCongrats.innerHTML = "Merci pour votre Reservation !";
      document.querySelector("form").reset();
      return true;
  } else {
    return false;
  }
}

// close the modal body (with form) and open congrats 
function toogleModal(){
  if(modalBody.style.display != "none"){
    modalBody.style.display = "none";
    modalBodyCongrats.style.display = "block";
  } else {
    modalBody.style.display = "block";
    modalBodyCongrats.style.display = "none";
  }
}


