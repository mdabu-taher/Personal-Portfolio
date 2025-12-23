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
function validateEmail() {
  const value = email.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (value === "") {
    showError(email, emailError, "Email is required.");
    return false;
  }
  if (!ok) {
    showError(email, emailError, "Please enter a valid email address.");
    return false;
  }
  clearError(email, emailError);
  return true;
}

email.addEventListener("input", validateEmail);
function updateCounter() {
  const len = message.value.length;
  charCounter.textContent = `${len} / 20 characters`;

  charCounter.classList.remove("red", "green");
  if (len < 20) charCounter.classList.add("red");
  else charCounter.classList.add("green");
}

function validateMessage() {
  const value = message.value.trim();
  if (value.length < 20) {
    showError(message, messageError, "Message must be at least 20 characters.");
    return false;
  }
  clearError(message, messageError);
  return true;
}

message.addEventListener("input", function () {
  updateCounter();
  validateMessage();
});

updateCounter();
