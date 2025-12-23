const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

const charCounter = document.getElementById("charCounter");
const successMessage = document.getElementById("successMessage");

function showError(input, errorEl, msg) {
  errorEl.textContent = msg;
  errorEl.classList.add("show");
  input.classList.add("input-error");
  input.classList.remove("input-valid");
}

function clearError(input, errorEl) {
  errorEl.textContent = "";
  errorEl.classList.remove("show");
  input.classList.remove("input-error");
  input.classList.add("input-valid");
}
function validateName(input, errorEl, label) {
  const value = input.value.trim();
  const onlyLetters = /^[A-Za-z]+$/.test(value);

  if (value === "") {
    showError(input, errorEl, `${label} is required.`);
    return false;
  }
  if (!onlyLetters) {
    showError(input, errorEl, `${label} must contain only letters.`);
    return false;
  }
  clearError(input, errorEl);
  return true;
}

firstName.addEventListener("input", function () {
  validateName(firstName, firstNameError, "First name");
});

lastName.addEventListener("input", function () {
  validateName(lastName, lastNameError, "Last name");
});
