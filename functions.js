/*
  HW4 - Attach validate module to form
*/

const validate = (function() {
  let valid = true;
  let errors = [];

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
      return valid;
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
      return valid;
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
      errors = errors.splice(0, errors.length);
    },
    getErrors: function() {
      return errors;
    }
  };
})();

function validateForm() {
  // pull each form value
  const contactForm = document.forms[0];
  const formName = contactForm.name.value;
  const formAge = contactForm.age.value;
  const formEmail = contactForm.email.value;

  let errorsLog = [];

  errorsLog.push(validate.isNonEmpty(formName));
  errorsLog.push(validate.isPositiveInteger(formAge));
  errorsLog.push(validate.isValidEmail(formEmail));
  const hadAnError = errorsLog.some(x => x === false);

  console.log(hadAnError);

  console.log(formName, formAge, formEmail);

  const errorDiv = document.getElementById("errors");
  if (hadAnError) {
    errorDiv.innerHTML = validate.getErrors.join(", ");
  } else {
    errorDiv.innerHTML = "No errors";
  }
  // return false is like a preventDefault, blocking the form submission and page reload
  return false;
}

/*
// isNumeric Tests
console.log("isNumeric Tests");
console.log('validate.isNumeric("25")', validate.isNumeric("25")); //true
console.log("validate.isNumeric(25)", validate.isNumeric(25)); //true
console.log('validate.isNumeric("25.5")', validate.isNumeric("25.5")); //true
console.log('validate.isNumeric("hello")', validate.isNumeric("hello")); //false
console.log("validate.isNumeric()", validate.isNumeric()); //false
console.log("validate.isNumeric(null)", validate.isNumeric(null)); //false

// isInteger Test
console.log("isInteger Tests");
console.log('validate.isInteger("0")', validate.isInteger("0")); //true
console.log('validate.isInteger("1.1")', validate.isInteger("1.1")); //false
console.log('validate.isInteger("2")', validate.isInteger("2")); //true
console.log('validate.isInteger("hello")', validate.isInteger("hello")); //false
console.log('validate.isInteger("-1")', validate.isInteger("-1")); //true

// isPositiveInteger tests
console.log("isPositiveInteger Tests");
console.log(
  'validate.isPositiveInteger("-1")',
  validate.isPositiveInteger("-1")
); //false
console.log('validate.isPositiveInteger("0")', validate.isPositiveInteger("0")); //false
console.log('validate.isPositiveInteger("1")', validate.isPositiveInteger("1")); //true
console.log(
  'validate.isPositiveInteger("25.5")',
  validate.isPositiveInteger("25.5")
); //false
console.log(
  'validate.isPositiveInteger("hello")',
  validate.isPositiveInteger("hello")
); //false

// isNonNegativeInteger tests
console.log("isNonNegativeInteger Tests");
console.log(
  'validate.isNonNegativeInteger("0")',
  validate.isNonNegativeInteger("0")
); //true
console.log(
  'validate.isNonNegativeInteger("1")',
  validate.isNonNegativeInteger("1")
); //true
console.log(
  'validate.isNonNegativeInteger("-1")',
  validate.isNonNegativeInteger("-1")
); //false
console.log(
  'validate.isNonNegativeInteger("1.5")',
  validate.isNonNegativeInteger("1.5")
); //false
console.log(
  'validate.isNonNegativeInteger("hello")',
  validate.isNonNegativeInteger("hello")
); //false

// isInRange tests
console.log("isInRange tests");
console.log('validate.isInRange("1", 0, 5)', validate.isInRange("1", 0, 5)); // true
console.log('validate.isInRange("1", 2, 5)', validate.isInRange("1", 2, 5)); // false
console.log(
  'validate.isInRange("hello", 2, 5)',
  validate.isInRange("hello", 2, 5)
); // false
console.log('validate.isInRange("5", 2)', validate.isInRange("5", 2)); // true
console.log('validate.isInRange("5", 10)', validate.isInRange("5", 10)); // true

// isValidEmail tests
console.log("isValidEmail Tests");
console.log(
  'validate.isValidEmail("ugly@urmom")',
  validate.isValidEmail("ugly@urmom")
); //false
console.log(
  'validate.isValidEmail("nicedude.com")',
  validate.isValidEmail("nicedude.com")
); //false
console.log(
  'validate.isValidEmail("blahblah")',
  validate.isValidEmail("blahblah")
); //false
console.log(
  'validate.isValidEmail("garrow.peter@gmail.com")',
  validate.isValidEmail("garrow.peter@gmail.com")
); //true
console.log(
  'validate.isValidEmail("hammypwns@gmail.com")',
  validate.isValidEmail("hammypwns@gmail.com")
); //true
console.log(
  'validate.isValidEmail("kylegill@gmail.com")',
  validate.isValidEmail("kylegill@gmail.com")
); //false

// isNonEmpty tests
console.log("isNonEmpty Tests");
console.log('validate.isNonEmpty("i")', validate.isNonEmpty("i")); //true
console.log("validate.isNonEmpty(0)", validate.isNonEmpty(0)); //true
console.log("validate.isNonEmpty(NULL)", validate.isNonEmpty(null)); //false?
console.log("validate.isNonEmpty()", validate.isNonEmpty()); //false
console.log('validate.isNonEmpty("")', validate.isNonEmpty("")); //false

// lengthIsInRange tests
console.log("lengthIsInRange Tests");
console.log(
  'validate.lengthIsInRange("hey dude", 10, 3)',
  validate.lengthIsInRange("hey dude", 10, 3)
); //true
console.log(
  'validate.lengthIsInRange("", 0, 1)',
  validate.lengthIsInRange("", 0, 1)
); //true?
console.log(
  'validate.lengthIsInRange("what\'s up dude", 1, 5)',
  validate.lengthIsInRange("what's up dude", 1, 5)
); //false
console.log(
  'validate.lengthIsInRange("what\'s up dude", 1, 5)',
  validate.lengthIsInRange("hey", 3, 5)
); //true

// matchesRegex tests
console.log("matchesRegex Tests");
console.log("matchesRegex Tests");
console.log(
  'validate.matchesRegex("Hello World", /([A-Z])w+/g)',
  validate.matchesRegex("Hello World", /([A-Z])\w+/g)
); //true
console.log(
  'validate.matchesRegex("hello world", /([A-Z])w+/g)',
  validate.matchesRegex("hello world", /([A-Z])\w+/g)
); //false
console.log(
  'validate.matchesRegex("hello world", /([^aiu])w+/g)',
  validate.matchesRegex("hello world", /([^aiu])/g)
); //true
console.log(
  'validate.matchesRegex("aeiou", /([^aeiou])w+/g)',
  validate.matchesRegex("aeiou", /([^aeiou])/g)
); //false
console.log(
  'validate.matchesRegex("hello world", /[0-9]/g',
  validate.matchesRegex("hello world", /[0-9]/g)
); //false
console.log(
  'validate.matchesRegex("1", /[0-9]/g)',
  validate.matchesRegex("1", /[0-9]/g)
); //true
//add some crap

// isValid test
console.log("isValid Test");
validate.isInteger(5);
console.log(validate.isValid()); //true
validate.isInteger("hey");
console.log(validate.isValid()); //false

// Reset test
console.log("Reset Test");
validate.isInteger("hey");
console.log(validate.isValid()); //false
validate.reset();
console.log(validate.isValid()); //true
*/
