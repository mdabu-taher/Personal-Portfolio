// Grab the form so we can validate and control submission
const form = document.getElementById("contactForm");

// Grab all input fields we want to validate
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Grab the matching <span>/<p> elements where errors will be shown
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

// Extra UI elements: live character counter + success banner + clear button
const charCounter = document.getElementById("charCounter");
const successMessage = document.getElementById("successMessage");
const clearBtn = document.getElementById("clearBtn");

// We keep the timeout id here so we can cancel/replace it safely
let successTimer = null;

/* Helper UI functions */

// Shows an error: red border + message text + visible error line
function showError(input, errorEl, msg) {
    input.classList.add("input-error");
    input.classList.remove("input-valid");
    errorEl.textContent = msg;
    errorEl.classList.add("show");
}

// Clears an error: removes red border, adds green border, hides message
function clearError(input, errorEl) {
    input.classList.remove("input-error");
    input.classList.add("input-valid");
    errorEl.textContent = "";
    errorEl.classList.remove("show");
}

/* Validation functions */

// Validates names (first/last):
// - minimum 2 characters
// - letters only
function validateName(input, errorEl, fieldName) {
    const value = input.value.trim();         // trim spaces so "  Ab " works
    const onlyLetters = /^[A-Za-z]+$/;        // simple rule: A-Z only

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

// Validates email using a basic email pattern
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

// Validates subject dropdown: user must pick something (not empty)
function validateSubject() {
    if (subject.value.trim() === "") {
        showError(subject, subjectError, "Please select a subject.");
        return false;
    }
    clearError(subject, subjectError);
    return true;
}

// Validates message length (minimum 20 characters)
function validateMessage() {
    const value = message.value.trim();
    if (value.length < 20) {
        showError(message, messageError, "Message must be at least 20 characters.");
        return false;
    }
    clearError(message, messageError);
    return true;
}

/* Character counter */

// Updates the message counter and changes color based on requirement
function updateCounter() {
    const len = message.value.length;
    charCounter.textContent = `${len} / 20 characters`;

    // reset first, then apply the correct state
    charCounter.classList.remove("red", "green");
    if (len < 20) charCounter.classList.add("red");
    else charCounter.classList.add("green");
}

/* Form reset + success UI */

// Clears the entire form + removes all validation styles/messages
function clearForm() {
    form.reset();

    // remove red/green borders from inputs
    [firstName, lastName, email, subject, message].forEach((el) => {
        el.classList.remove("input-error", "input-valid");
    });

    // clear error texts and hide the error lines
    [firstNameError, lastNameError, emailError, subjectError, messageError].forEach((el) => {
        el.textContent = "";
        el.classList.remove("show");
    });

    // reset counter to 0 and correct color
    updateCounter();
}

// Hides the success message and cancels any running timer
function hideSuccess() {
    successMessage.style.display = "none";
    if (successTimer) {
        clearTimeout(successTimer);
        successTimer = null;
    }
}

// Shows success message for 3 seconds (then hides automatically)
function showSuccess(name) {
    successMessage.textContent = `Thank you ${name}! I will contact you soon!`;
    successMessage.style.display = "block";

    // if user submits again quickly, replace the old timer
    if (successTimer) clearTimeout(successTimer);
    successTimer = setTimeout(() => {
        hideSuccess();
    }, 5000);
}

/* Live validation listeners */

// Validate first/last name as the user types
firstName.addEventListener("input", () => validateName(firstName, firstNameError, "First name"));
lastName.addEventListener("input", () => validateName(lastName, lastNameError, "Last name"));

// Validate email while typing
email.addEventListener("input", validateEmail);

// Validate subject when user changes the dropdown
subject.addEventListener("change", validateSubject);

// Update counter + validate message while typing
message.addEventListener("input", () => {
    updateCounter();
    validateMessage();
});

// Clear button: hide success + reset everything
clearBtn.addEventListener("click", () => {
    hideSuccess();
    clearForm();
});

/* Submit handler */

form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload
    hideSuccess();      // if success is showing from earlier, remove it first

    // Run all validations in one place
    const okFirst = validateName(firstName, firstNameError, "First name");
    const okLast = validateName(lastName, lastNameError, "Last name");
    const okEmail = validateEmail();
    const okSubject = validateSubject();
    const okMsg = validateMessage();

    // If everything is valid, reset form and show a friendly success message
    if (okFirst && okLast && okEmail && okSubject && okMsg) {
        const name = firstName.value.trim();
        clearForm();
        showSuccess(name);
    }
});

// On page load: set counter correctly and make sure success is hidden
updateCounter();
hideSuccess();