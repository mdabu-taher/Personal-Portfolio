const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

const charCounter = document.getElementById("charCounter");
const successMessage = document.getElementById("successMessage");
const clearBtn = document.getElementById("clearBtn");

let successTimer = null;

function showError(input, errorEl, msg) {
    input.classList.add("input-error");
    input.classList.remove("input-valid");
    errorEl.textContent = msg;
    errorEl.classList.add("show");
}

function clearError(input, errorEl) {
    input.classList.remove("input-error");
    input.classList.add("input-valid");
    errorEl.textContent = "";
    errorEl.classList.remove("show");
}

function validateName(input, errorEl, fieldName) {
    const value = input.value.trim();
    const onlyLetters = /^[A-Za-z]+$/;

    if (value.length < 2) {
        showError(input, errorEl, `${fieldName} must be at least 2 characters.`);
        return false;
    }

    if (!onlyLetters.test(value)) {
        showError(input, errorEl, `${fieldName} must contain only letters.`);
        return false;
    }

    clearError(input, errorEl);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {
        showError(email, emailError, "Please enter a valid email address.");
        return false;
    }

    clearError(email, emailError);
    return true;
}

function validateSubject() {
    if (subject.value.trim() === "") {
        showError(subject, subjectError, "Please select a subject.");
        return false;
    }
    clearError(subject, subjectError);
    return true;
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

function updateCounter() {
    const len = message.value.length;
    charCounter.textContent = `${len} / 20 characters`;

    charCounter.classList.remove("red", "green");
    if (len < 20) charCounter.classList.add("red");
    else charCounter.classList.add("green");
}

function clearForm() {
    form.reset();

    [firstName, lastName, email, subject, message].forEach((el) => {
        el.classList.remove("input-error", "input-valid");
    });

    [firstNameError, lastNameError, emailError, subjectError, messageError].forEach((el) => {
        el.textContent = "";
        el.classList.remove("show");
    });

    updateCounter();
}

function hideSuccess() {
    successMessage.style.display = "none";
    if (successTimer) {
        clearTimeout(successTimer);
        successTimer = null;
    }
}

function showSuccess(name) {
    successMessage.textContent = `Thank you ${name}! I will contact you soon!`;
    successMessage.style.display = "block";

    if (successTimer) clearTimeout(successTimer);
    successTimer = setTimeout(() => {
        hideSuccess();
    }, 3000);
}

firstName.addEventListener("input", () => validateName(firstName, firstNameError, "First name"));
lastName.addEventListener("input", () => validateName(lastName, lastNameError, "Last name"));
email.addEventListener("input", validateEmail);
subject.addEventListener("change", validateSubject);
message.addEventListener("input", () => {
    updateCounter();
    validateMessage();
});

clearBtn.addEventListener("click", () => {
    hideSuccess();
    clearForm();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideSuccess();

    const okFirst = validateName(firstName, firstNameError, "First name");
    const okLast = validateName(lastName, lastNameError, "Last name");
    const okEmail = validateEmail();
    const okSubject = validateSubject();
    const okMsg = validateMessage();

    if (okFirst && okLast && okEmail && okSubject && okMsg) {
        const name = firstName.value.trim();
        clearForm();
        showSuccess(name);
    }
});

updateCounter();
hideSuccess();
