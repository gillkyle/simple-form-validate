/*
  HW4 - Attach validate module to form
*/

const validate = (function() {
  let valid = true;

  return {
    isNumeric: text => {
      valid = parseFloat(text) == text;
      // valid = typeof text === "number" ? true : false;
      return valid;
    },
    isInteger: function(text) {
      valid = validate.isNumeric(text) && text == parseInt(text, 10);
      return valid;
    },
    isPositiveInteger: function(text) {
      valid =
        validate.isNumeric(text) &&
        validate.isInteger(text) &&
        parseInt(text) > 0;

      if (valid) {
        return valid;
      } else {
        return "fields contain negative numbers";
      }
    },
    isNonNegativeInteger: function(text) {
      valid = validate.isNumeric(text) && validate.isInteger(text) && text >= 0;
      return valid;
    },
    isInRange: function(text, m, n) {
      if (!n && this.isNumeric(m)) {
        valid = validate.isNumeric(text) && text > m;
      } else {
        if (m > n) {
          [m, n] = [n, m];
        }
        valid = validate.isNumeric(text) && text > m && text < n;
      }

      return valid;
    },
    isValidEmail: function(text) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = regex.test(String(text).toLowerCase());
      return valid;
    },
    isNonEmpty: function(text) {
      const isEmpty =
        !text || text === "" || text === null || text.length === 0;
      valid = !isEmpty;
      if (valid) {
        return valid;
      } else {
        return "all fields must be filled";
      }
    },
    lengthIsInRange: function(text, m, n) {
      let textLength = text.length;

      if (!n && this.isNumeric(m)) {
        valid = textLength > m;
      } else {
        if (m > n) {
          [m, n] = [n, m];
        }
        valid = textLength > m && textLength < n;
      }

      return valid;
    },
    matchesRegex: function(text, regex) {
      valid = regex.test(String(text));
      return valid;
    },
    isValid: function() {
      return valid;
    },
    reset: function() {
      valid = true;
    }
  };
})();

function validateForm() {
  // pull each form value
  const contactForm = document.forms[0];
  const formName = contactForm.name.value;
  const formAge = contactForm.age.value;
  const formEmail = contactForm.email.value;

  // push errors into an array for display
  let errorsLog = [];

  errorsLog.push(validate.isNonEmpty(formName));
  errorsLog.push(validate.isPositiveInteger(formAge));
  errorsLog.push(validate.isValidEmail(formEmail));
  const filteredErrors = errorsLog.filter(x => typeof x === "string");

  const errorDiv = document.getElementById("errors");
  if (filteredErrors.length > 0) {
    errorDiv.innerHTML = "Errors: " + filteredErrors.join(", ");
  } else {
    errorDiv.innerHTML = "No errors";
  }

  return false;
}
