const inputs = document.querySelectorAll('input');
inputs.forEach((input) => { input.addEventListener('input', handleInput)});

// check the inputs since the page is loaded.
// It is not efficient to call an event handler before any actual input event
// It also goes against Event-Driven Programming, but i prefer to do it this way 
// because in this case we try to prove to signal to the user the invalid status
// of each input as they are empty.
inputs.forEach((input) =>{
    let obj = {
        target: input,
    }
    handleInput(obj)
});

/* Functions */
function activateSubmitBtn(form=document){
    let submitBtn = document.querySelector("#submit-data-btn");
    let invalidInputs = form.querySelectorAll(':invalid');
    console.log(invalidInputs, '<----')

    if(invalidInputs.length == 0){
        submitBtn.classList.add("form-btn-allow");
    } else {
        submitBtn.classList.remove("form-btn-allow");
    }
}

/* Event Handlers */
function handleInput(e){
    let input = e.target;
    let form = input.parentElement.parentElement;
    console.log(form, 'titeres')
    // handle individually
    if(e.target.getAttribute('id') === 'email-input'){
        // - must look like an email
        // -- alphanumerical
        // - minimum 7 length

        let emailPattern = new RegExp("[\w|\d]+@[\w|\d]+.\w+", "g");

        if(input.value.length == 0){
            input.setCustomValidity('Put your email here bro');
            input.reportValidity();
        }
        // does not look like an email
        else if(!input.value.match(/^[a-zA-Z0-9_+.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            input.setCustomValidity('It doesnt look like an email bro');
            input.reportValidity();
        }
        // has a length of 7 or less?
        else if(input.value.length < 7){
            input.setCustomValidity('This email is too short bro');
            input.reportValidity();
        }

        // everything is good, remove customValidity message
        else {
            input.setCustomValidity("");
        }
    }

    else if(e.target.getAttribute('id') === 'country-input'){
        // - min 4 length
        // - max 20 length
        // - no numbers
        if(input.value.length == 0){
            input.setCustomValidity('Put your email here bro');
            input.reportValidity();
        }

        else if(input.value.length <= 4){
            input.setCustomValidity('There is no country with such a short name'); 
            input.reportValidity();
        }

        else if(input.value.length > 20){
            input.setCustomValidity('This country seems to be too large');
            input.reportValidity();
        }

        else {
            input.setCustomValidity("");
            input.reportValidity();
        }
    }

    else if(e.target.getAttribute('id') === 'zipcode-input'){
        // - alphanumerical
        // - symbols
        // -- no validation as the range of inputs is really wide

        if(input.value.length == 0){
            input.setCustomValidity("Enter your zipcode");
            input.reportValidity();
        } 

        else {
            input.setCustomValidity("");
            input.reportValidity();
        }
    }
    
    else if(e.target.getAttribute('id') === 'psswd-input'){
        // - alphanumerical
        // - symbols
        // - mininum 7 length
        let psswdPattern = new RegExp("[\w|\d|\W]+", "g");
        let psswdConfirm = form.querySelector('#psswd-confirm-input');
        console.log(psswdConfirm)

        if(input.value.length == 0){
            input.setCustomValidity('Put your password here bro');
            input.reportValidity();
        }

        else if(input.value.length < 7){
            input.setCustomValidity("This password is too short");
            input.reportValidity();
        }

        else if(!input.value.match(psswdPattern)){
            input.setCustomValidity("This does not look like a valid password");
            input.reportValidity();
        }

        else if( !(psswdConfirm.value == input.value) ){
            handleInput( {target: psswdConfirm});
            input.focus();
        }

        else {
            input.setCustomValidity("");
            input.reportValidity();
        }
    }

    else if(e.target.getAttribute('id') === 'psswd-confirm-input'){
        let psswdInput = document.querySelector('#psswd-input');
        console.log(input.value == psswdInput.value, '<?222')

        // - must be the same as psswd-input
        if(input.value.length == 0){
            input.setCustomValidity('Empty password');
            input.reportValidity();
        }

        else if(!(input.value == psswdInput.value)){
            input.setCustomValidity("It doesn't coincide with the password");
            input.reportValidity();
        }

        else{
            input.setCustomValidity("");
            input.reportValidity();
        }
    }

    activateSubmitBtn();
}

function handleCleanForm(e){}

