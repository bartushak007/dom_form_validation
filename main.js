(function() {
  var formElem = document.querySelectorAll('.js-validation__form');
  var fullNameRegExp = /^\s*(([а-я]|[a-z]){2,15})+\s+(([а-я]|[a-z]){2,15})+\s*$/i,
    cityNameRegExp = /^\s*(([а-я]|[a-z]){2,15})+(\s+(([а-я]|[a-z]){2,15})+)?\s*$/i,
    emailRegExp = /^\s*([a-zA-Z]){2,20}[@]([a-zA-Z]){2,10}[.]([a-zA-Z]){2,5}\s*$/i,
    generalNameRegExp = /^\s*([а-я]|[a-z]){2,15}\s*$/i,    
    numRegExp = /^\s*\+\d{12}\s*$/,
    cvcRegExp = /^\s*\d{3}\s*$/,
    cardRegExp = /^\s*\d{16}\s*$/,
    endRegExp = /^\s*\d{6}\s*$/,
    zipRegExp = /^\s*\d{7}\s*$/,
    addressRegExp = /[A-Za-z0-9'\.\-\s\,]/;

  formElem.forEach = [].forEach;

  formElem.forEach(function(elem) {
    elem.addEventListener('click', function() {
      if (event.target.tagName === 'INPUT') {
        event.target.style.border = '';
      }

      if(event.target.name === 'cancel') {
        for(var i = document.querySelectorAll('.error').length - 1; i >= 0; i--) {
           document.querySelectorAll('.error')[i].remove();
        }

        for(var j = 0; j < elem.getElementsByTagName('input').length; j++) {
          elem.getElementsByTagName('input')[j].style.border = '';
        }
      }
    });

    elem.addEventListener('submit', function() {
      event.preventDefault();
      var target = event.target;

      while (target !== document.querySelector('form').parentNode) {
        if (target.tagName === 'FORM') {
          //Callfunction
          if (target.elements.fullName) {
            checkField(target.elements.fullName, fullNameRegExp, 'Error', 0);
          }

          if (target.elements.email) {
            checkField(target.elements.email, emailRegExp, 'Error', 0);
          }

          if (target.elements.num) {
            checkField(target.elements.num, numRegExp, 'Error', 0);
          }

          if (target.elements.firstName) {
            checkField(target.elements.firstName, generalNameRegExp, 'Error', 0);
          }
          
          if (target.elements.secondName) {
            checkField(target.elements.secondName, generalNameRegExp, 'Error', 0);
          }

          if (target.elements.cardNum) {
            checkField(target.elements.cardNum, cardRegExp, 'Error', 0);
          }

          if (target.elements.cvc) {
            checkField(target.elements.cvc, cvcRegExp, 'Error', 0);
          }

          if (target.elements.end) {
            checkField(target.elements.end, endRegExp, 'Error', 0);
          }

          if (target.elements.city) {
            checkField(target.elements.city, cityNameRegExp, 'Error', 0);
          }

          if (target.elements.country) {
            checkField(target.elements.country, generalNameRegExp, 'Error', 0);
          }

          if (target.elements.state) {
            checkField(target.elements.state, generalNameRegExp, 'Error', 0);
          }

          if (target.elements.zip) {
            checkField(target.elements.zip, zipRegExp, 'Error', 0);
          }

          if (target.elements.address) {
            checkField(target.elements.address, addressRegExp, 'Error', 0);
          }

          if (target.elements.confirmEmail) {
            checkField(target.elements.confirmEmail, 0, 'Error', document.getElementById('email'));
          }         
          
          return;
        }
        target = target.parentNode;
      }
    });
  });

  
  function checkField(target, regExp, error, compare) {      
    var check;

    if(regExp) {
      check = !regExp.test(target.value);
    } else if (compare!==0 && target.value !== compare.value) { 
      console.log(compare.value)       
      check = !(target.value === compare.value);
    }
    
    if (check) {        
      target.style.border = 'solid red 1px';

      if (!target.parentNode.querySelector('.error')) {
        var addError = document.createElement('div');
        addError.innerHTML = error;
        addError.style.color = 'red';
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

