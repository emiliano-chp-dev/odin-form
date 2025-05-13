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
}

main();
