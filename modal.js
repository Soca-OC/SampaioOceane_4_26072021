function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ----- DOM Elements ----- //
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


// ----- OPEN AND CLOSE MODAL ----- //
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


// ----- VALIDE FORM ----- //
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


