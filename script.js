'use strict';

function main() {
  // DOM elements
  const formElement = document.querySelector('#signup-form');
  const formSubmitButton = document.querySelector('.submit_form');
  const passwordInput = document.querySelector('#user_password');
  const confirmPasswordInput = document.querySelector('#confirm_user_password');
  const emailInput = document.querySelector('#email_address');

  // Validation patterns
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?])(?=.{6,20}$).*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Set form element to invalidated state
  formElement.noValidate = true;

  // Event listeners for reali-time validatin
  passwordInput.addEventListener('input', validatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  emailInput.addEventListener('input', validateEmail);
  formSubmitButton.addEventListener('click', validateForm);

  // Functions
  function validatePassword() {
    const isValid = passwordRegex.test(passwordInput.value);
    setValidationStatus(passwordInput, isValid);
    return isValid;
  }

  function validateConfirmPassword() {
    const isValid =
      passwordInput.value === confirmPasswordInput.value &&
      passwordRegex.test(confirmPasswordInput.value);
    setValidationStatus(confirmPasswordInput, isValid);
    return isValid;
  }

  function validateEmail() {
    const isValid = emailRegex.test(emailInput.value);
    setValidationStatus(emailInput, isValid);
    return isValid;
  }

  function setValidationStatus(inputElement, isValid) {
    if (isValid) {
      inputElement.setCustomValidity('');
    } else {
      if (
        inputElement === confirmPasswordInput &&
        passwordInput.value !== confirmPasswordInput.value
      ) {
        inputElement.setCustomValidity('Passwords do not match');
      } else if (
        inputElement === passwordInput ||
        inputElement === confirmPasswordInput
      ) {
        inputElement.setCustomValidity(
          'Password must be 6-20 characters with at least one uppercase lettern and one special character'
        );
      } else if ((inputElement = emailInput)) {
        inputElement.setCustomValidity('Please enter a valid email address');
      } else {
        inputElement.setCustomValidity('Invalid input');
      }
    }
  }

  function validateForm(e) {
    e.preventDefault();

    // Run validations
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();
    const emailValid = validateEmail();

    // Check built-in validation for other fields
    const otherFieldsValid = Array.from(formElement.elements)
      .filter(
        el =>
          el !== passwordInput &&
          el !== confirmPasswordInput &&
          el !== emailInput
      )
      .every(el => el.checkValidity());

    if (
      passwordValid &&
      confirmPasswordValid &&
      emailValid &&
      otherFieldsValid
    ) {
      formElement.submit();
    } else {
      formElement.reportValidity();
    }
  }
}

main();
