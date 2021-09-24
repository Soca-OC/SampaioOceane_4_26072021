// ----- CREATION INPUT ----- //

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
  