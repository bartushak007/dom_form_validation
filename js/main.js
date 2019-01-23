(function() {
  var formElem = document.querySelectorAll('.js-validation__form');
  var fullNameRegExp = /^\s*((([а-я]|[a-z]){2,15})\s+)?(([а-я]|[a-z]){2,15})\s+([а-я]|[a-z]){2,15}\s*$/i,
    cityNameRegExp = /^\s*(([а-я]|[a-z]){2,15})+(\s+(([а-я]|[a-z]){2,15})+)?\s*$/i,
    emailRegExp = /^\s*([a-zA-Z]){2,20}[@]([a-zA-Z]){2,10}[.]([a-zA-Z]){2,5}\s*$/i,
    generalNameRegExp = /^\s*([а-я]|[a-z]){2,15}\s*$/i,    
    numRegExp = /^\s*\+\d{12}\s*$/,
    cvcRegExp = /^\s*\d{3}\s*$/,
    cardRegExp = /^\s*\d{16}\s*$/,
    endRegExp = /^\s*\d{6}\s*$/,
    zipRegExp = /^\s*[a-z0-9]{5}\s*$/i,
    addressRegExp = /[A-Za-z0-9'\.\-\s\,]/,
    res = false;

  formElem.forEach = [].forEach;

  formElem.forEach(function(elem) {
    elem.addEventListener('click', function() {
      var eventClick = event.target;
      elem.noValidate = 'true';
      
      if (eventClick.tagName === 'INPUT') {
        eventClick.style.outline = '';
      }

      if (eventClick.name === 'cancel') {
        for (var i = elem.querySelectorAll('.error').length - 1; i >= 0; i--) {
           elem.querySelectorAll('.error')[i].remove();
        }

        for (var j = 0; j < elem.getElementsByTagName('input').length; j++) {
          elem.getElementsByTagName('input')[j].style.outline = '';
        }
      }
    });

    elem.addEventListener('submit', function() {
      event.preventDefault();
      var target = event.target;
      res = true;
      var ev;

      while (target !== document.querySelector('form').parentNode) {
        if (target.tagName === 'FORM') {
          //Callfunction
          if (target.elements.fullName) {
            checkField(target.elements.fullName, fullNameRegExp, 'Enter your full name', 0);
          }

          if (target.elements.email) {
            checkField(target.elements.email, emailRegExp, 'Must be example@example.com', 0);
          }

          if (target.elements.num) {
            checkField(target.elements.num, numRegExp, 'Type correct phone number', 0);
          }

          if (target.elements.firstName) {
            checkField(target.elements.firstName, generalNameRegExp, 'Enter your first name', 0);
          }
          
          if (target.elements.secondName) {
            checkField(target.elements.secondName, generalNameRegExp, 'Enter your second name', 0);
          }

          if (target.elements.cardNum) {
            checkField(target.elements.cardNum, cardRegExp, 'Type your card number 14 symbols', 0);
          }

          if (target.elements.cvc) {
            checkField(target.elements.cvc, cvcRegExp, 'Type your CVC number 3 symbols', 0);
          }

          if (target.elements.end) {
            checkField(target.elements.end, endRegExp, 'Type your card end date', 0);
          }

          if (target.elements.city) {
            checkField(target.elements.city, cityNameRegExp, 'A city must contain at least 3 letters', 0);
          }

          if (target.elements.country) {
            checkField(target.elements.country, generalNameRegExp, 'A country must contain at least 3 letters', 0);
          }

          if (target.elements.state) {
            checkField(target.elements.state, generalNameRegExp, 'A state must contain at least 3 letters', 0);
          }

          if (target.elements.zip) {
            checkField(target.elements.zip, zipRegExp, 'Type your ZIP code. 5 symbols', 0);
          }

          if (target.elements.address) {
            checkField(target.elements.address, addressRegExp, 'Type your current address', 0);
          }

          if (target.elements.confirmEmail) {
            checkField(target.elements.confirmEmail, 0, 'The email address must be the same as the e-mail above', document.getElementById('email'));
          }  

          if (res) {            
            ev = new CustomEvent("formIsValid");            
            elem.dispatchEvent(ev);            
          } else {
            ev = new CustomEvent("formIsNotValid");            
            elem.dispatchEvent(ev);    
          }       
          
          return;
        }
        target = target.parentNode;        
      }
    });
  });

  
  function checkField(target, regExp, error, compare) {      
    var check;

    if (regExp) {
      check = !regExp.test(target.value);
    } else if (compare !== 0 && target.value !== compare.value) {          
      check = !(target.value === compare.value);
    }
    
    if (check) {        
      target.style.outline = "1px solid #e26b6b";
      res = false;

      if (!target.parentNode.querySelector('.error')) {
        var addError = document.createElement('div');
        addError.innerHTML = error;        
        addError.classList.add('error');
        target.parentNode.appendChild(addError);
      } 
    } else {
      if (target.parentNode.querySelector('.error')) {
        for (var i = 0; i < target.parentNode.querySelectorAll('.error').length; i++) {
          target.parentNode.querySelector('.error').remove();
        }
      }
    }
  }  
})();

