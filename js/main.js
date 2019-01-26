(function() {
  var formElem = document.querySelectorAll('.js-validation__form');
  var fullNameRegExp = /^\s*((([а-я]|[a-z]){2,15})\s+)?(([а-я]|[a-z]){2,15})\s+([а-я]|[a-z]){2,15}\s*$/i,
   cityNameRegExp = /^\s*(([а-я]|[a-z]){3,15})+(\s+(([а-я]|[a-z]){2,15})+)?\s*$/i,
   emailRegExp = /^\s*([a-zA-Z]){2,20}[@]([a-zA-Z]){2,10}[.]([a-zA-Z]){2,5}\s*$/i,
   generalNameRegExp = /^\s*([а-я]|[a-z]){2,15}\s*$/i,    
   numRegExp = /^\s*\+\d{12}\s*$/,
   cvcRegExp = /^\s*\d{3}\s*$/,
   cardRegExp = /^\s*\d{16}\s*$/,
   endRegExp = /^\s*\d{6}\s*$/,
   zipRegExp = /^\s*[a-z0-9]{5}\s*$/i,
   addressRegExp = /[A-Za-z0-9'\.\-\s\,]/,
   res = false;  

  formElem.forEach(function(elem) {
    elem.addEventListener('focus', function(ev) {
      var evFocus = ev.target;

      if (evFocus.tagName === 'INPUT') {
        evFocus.classList.remove('errorField');        
      }
    }, true);

    elem.addEventListener('click', function(event) {
      var eventClick = event.target;
      elem.noValidate = 'true';
      
      if (eventClick.tagName === 'INPUT') {        
        eventClick.classList.remove('errorField');
      }

      if (eventClick.name === 'cancel') {
        var classErrorAll = elem.querySelectorAll('.error'),
         elementsInput = elem.getElementsByTagName('input');

        for (var i = classErrorAll.length - 1; i >= 0; i--) {
           classErrorAll[i].remove();
        }

        for (var j = 0; j < elementsInput.length; j++) {
          elementsInput[j].classList.remove('errorField');
        }
      }
    });

    elem.addEventListener('submit', function(event) {
      event.preventDefault();
      var target = event.target;
      res = true;
      var ev;
      var counter = 0;

      while (target !== document.querySelector('form').parentNode) {
        if (target.tagName === 'FORM') {
          for (var i = 0; i < target.elements.length; i++) {
            var targetElem = target.elements[i];

            if (targetElem.classList.contains('js-required')) {              
              checkField(targetElem, 0, 'xxxxxxxxx', 0);            
            }
          
            if (targetElem.classList.contains('js-fullName')) {              
              checkField(targetElem, fullNameRegExp, 'Enter your full name', 0);            
            } 

            if (targetElem.classList.contains('js-email')) {
              checkField(targetElem, emailRegExp, 'Must be example@example.com', 0);
            } 

            if (targetElem.classList.contains('js-number')) {
              checkField(targetElem, numRegExp, 'Type correct phone number', 0);
            } 

            if (targetElem.classList.contains('js-firstName')) {
              checkField(targetElem, generalNameRegExp, 'Enter your first name', 0);
            } 

            if (targetElem.classList.contains('js-secondName')) {
              checkField(targetElem, generalNameRegExp, 'Enter your second name', 0);
            } 

            if (targetElem.classList.contains('js-cardNum')) {
              checkField(targetElem, cardRegExp, 'Type your card number 14 symbols', 0);
            } 

            if (targetElem.classList.contains('js-cvc')) {
              checkField(targetElem, cvcRegExp, 'Type your CVC number 3 symbols', 0);
            } 

            if (targetElem.classList.contains('js-end')) {
              checkField(targetElem, endRegExp, 'Type your card end date', 0);
            } 

            if (targetElem.classList.contains('js-city')) {
              checkField(targetElem, cityNameRegExp, 'The city field must contain at least 3 letters', 0);
            } 

            if (targetElem.classList.contains('js-country')) {
              checkField(targetElem, generalNameRegExp, 'The country field must contain at least 3 letters', 0);
            } 

            if (targetElem.classList.contains('js-state')) {
              checkField(targetElem, generalNameRegExp, 'The state field must contain at least 3 letters', 0);
            } 

            if (targetElem.classList.contains('js-zip')) {
              checkField(targetElem, zipRegExp, 'Type your ZIP code. 5 symbols', 0);
            } 

            if (targetElem.classList.contains('js-address')) {
              checkField(targetElem, addressRegExp, 'Type your current address', 0);
            } 

            if (targetElem.classList.contains('js-confirmEmail')) {              
              var compareElementId = targetElem.getAttribute('data-confirmId');
              checkField(targetElem, 0, 'The email address must be the same as the e-mail above', document.getElementById(compareElementId));
            }   
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
    
    if (compare.value === '') { 
      check = !target.value;
    } else  if (target.classList.contains('js-required') || target.value) {
      if (regExp) {
        check = !regExp.test(target.value);
      } else if (compare !== 0 && target.value !== compare.value) {          
        check = !(target.value === compare.value);
      } else if (!regExp && !compare) {
        check = !target.value;
      }      
      
      if (check) {        
        target.classList.add('errorField');
        res = false;
        
        if (!target.parentNode.querySelector('.error')) {
          var addError = document.createElement('div');                  
          addError.classList.add('error');
          target.parentNode.appendChild(addError);
        }

        if (target.parentNode.querySelector('.error')) {
          var targetError = target.parentNode.querySelector('.error');

          if (target.value !== '') {            
            targetError.innerHTML = error;
          } else {            
            targetError.innerHTML = 'The field shouldn\'t be empty';
          }  
        }
      } else {
        if (target.parentNode.querySelector('.error')) {
          target.parentNode.querySelector('.error').remove();         
        }
      }
    }
  }  
})();

