window.FormValidation = function(formElement, options) {

  // If the element doesn't exist or the browser isn't good enough, adios.
  if(!formElement || !('querySelector' in document && 'addEventListener' in window && 'localStorage' in window && 'classList' in document.createElement('a'))) {
    return;
  }

  this.options = options || {};

  var form = formElement;

  var displayError = function(el, liveRegion, message) {
    // Make the form field accessibly invalid
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', liveRegion.id);

    // Insert the error message
    liveRegion.textContent = message;
  };

  // Get a succeeding sibling
  var getFollowingSibling = function(el, sibling) {
    if(el.nextSibling.nodeName.toLowerCase() === sibling) {
      return el.nextSibling;
    } else {
      return getFollowingSibling(el.nextSibling, sibling);
    }
  };

  var controls = form.querySelectorAll(options.selector);

  for(var i = 0, ii = controls.length; i < ii; i++) {
    controls[i].addEventListener('blur', function(e) {

      // The blurred form control
      var blurred = e.target;

      // Get the aria-live region
      var liveRegion = getFollowingSibling(blurred, 'span');

      // Use appropriate error messages
      if(blurred.parentNode.querySelector(':invalid')) {
        if(blurred.type === 'email' && blurred.value) {
          displayError(blurred, liveRegion, options.messageInvalidEmail);
        } else if(blurred.type === 'password') {
          displayError(blurred, liveRegion, options.messageInvalidPassword);
        } else {
          var fieldName = liveRegion.id;
          var fieldName = fieldName.substring(0, fieldName.lastIndexOf('-')).split('-').join(' ');
          displayError(blurred, liveRegion, 'The ' + fieldName.split('_').join(' ') + ' field is required');
        }
      }
    });
  }

  // Dont let the form submit if there are invalid fields
  form.addEventListener('submit', function(e) {

    // Clear any existing message
    var formAlert = document.querySelector(options.submitMessage);
    formAlert.textContent = '';

    // Check for invalid form fields
    var invalids = form.querySelectorAll('input:invalid:not([type=checkbox])');

    if(invalids.length) {
      formAlert.textContent = invalids.length > 1 ? options.messageSummaryMultiple : options.messageSummarySingle;

      e.preventDefault();
    }
  });
};

