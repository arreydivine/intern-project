// ===== Helper functions used by all the forms =====

function showError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function showValid(input) {
  document.getElementById(input.id + "-error").textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");
}

function isValidEmail(value) {
  // simple check: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateText(input, label, minLength) {
  if (input.value.trim().length < minLength) {
    showError(input, label + " must have at least " + minLength + " characters");
    return false;
  }
  showValid(input);
  return true;
}

function validateSelect(input, label) {
  if (input.value === "") {
    showError(input, "Choose " + label);
    return false;
  }
  showValid(input);
  return true;
}

function validateEmailField(input) {
  if (!isValidEmail(input.value.trim())) {
    showError(input, "Enter a valid email, like you@example.com");
    return false;
  }
  showValid(input);
  return true;
}

// ===================== LOGIN FORM =====================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formMessage = document.getElementById("form-message");
  const toggleButton = document.getElementById("toggle-password");

  toggleButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide password";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show password";
    }
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "";
    let ok = true;

    if (!validateEmailField(emailInput)) { ok = false; }

    if (passwordInput.value.length < 8) {
      showError(passwordInput, "Password must have at least 8 characters");
      ok = false;
    } else {
      showValid(passwordInput);
    }

    if (ok) {
      formMessage.textContent = "Demo login successful. (No real account was checked.)";
    }
  });
}

// ===================== REGISTER FORM =====================
const registerForm = document.getElementById("register-form");

if (registerForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const roleInput = document.getElementById("role");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm");
  const termsInput = document.getElementById("terms");
  const strengthText = document.getElementById("strength");
  const formMessage = document.getElementById("form-message");
  const toggleButton = document.getElementById("toggle-password");

  // Show or hide both password boxes
  toggleButton.addEventListener("click", function () {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    confirmInput.type = hidden ? "text" : "password";
    toggleButton.textContent = hidden ? "Hide passwords" : "Show passwords";
  });

  // Password strength, updated while typing
  passwordInput.addEventListener("input", function () {
    const value = passwordInput.value;
    let score = 0;
    if (value.length >= 8) { score++; }
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) { score++; }
    if (/[0-9]/.test(value)) { score++; }
    if (/[^A-Za-z0-9]/.test(value)) { score++; }

    if (value === "") {
      strengthText.textContent = "";
      strengthText.className = "strength";
    } else if (score <= 1) {
      strengthText.textContent = "Strength: weak";
      strengthText.className = "strength strength-weak";
    } else if (score <= 3) {
      strengthText.textContent = "Strength: medium";
      strengthText.className = "strength strength-medium";
    } else {
      strengthText.textContent = "Strength: strong";
      strengthText.className = "strength strength-strong";
    }
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "";
    let ok = true;

    if (!validateText(nameInput, "Name", 2)) { ok = false; }
    if (!validateEmailField(emailInput)) { ok = false; }
    if (!validateSelect(roleInput, "what you want to do")) { ok = false; }

    const pass = passwordInput.value;
    if (pass.length < 8 || !/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass)) {
      showError(passwordInput, "Use at least 8 characters, with a letter and a number");
      ok = false;
    } else {
      showValid(passwordInput);
    }

    if (confirmInput.value !== pass || confirmInput.value === "") {
      showError(confirmInput, "The passwords do not match");
      ok = false;
    } else {
      showValid(confirmInput);
    }

    if (!termsInput.checked) {
      document.getElementById("terms-error").textContent = "Please tick the box to continue";
      ok = false;
    } else {
      document.getElementById("terms-error").textContent = "";
    }

    if (ok) {
      formMessage.textContent = "Demo account created. (Nothing was saved.)";
    }
  });
}

// ===================== POST A JOB FORM =====================
const postForm = document.getElementById("post-job-form");

if (postForm) {
  const titleInput = document.getElementById("job-title");
  const companyInput = document.getElementById("company");
  const categoryInput = document.getElementById("category");
  const typeInput = document.getElementById("job-type");
  const modeInput = document.getElementById("work-mode");
  const countryInput = document.getElementById("country");
  const payMinInput = document.getElementById("pay-min");
  const payMaxInput = document.getElementById("pay-max");
  const deadlineInput = document.getElementById("deadline");
  const skillsInput = document.getElementById("skills");
  const descInput = document.getElementById("description");
  const descCount = document.getElementById("desc-count");
  const formMessage = document.getElementById("form-message");

  // Today's date as YYYY-MM-DD, so past dates cannot be chosen
  const today = new Date().toISOString().slice(0, 10);
  deadlineInput.min = today;

  // Turn "HTML, CSS, Git" into ["HTML", "CSS", "Git"]
  function getSkills() {
    return skillsInput.value
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s !== ""; });
  }

  // Live preview: updates while the person types
  function updatePreview() {
    document.getElementById("preview-title").textContent =
      titleInput.value.trim() || "Job title";
    document.getElementById("preview-company").textContent =
      companyInput.value.trim() || "Company";

    const meta = [typeInput.value, modeInput.value, countryInput.value.trim()]
      .filter(function (x) { return x !== ""; })
      .join(" · ");
    document.getElementById("preview-meta").textContent = meta || "Type · Mode · Country";

    const list = document.getElementById("preview-skills");
    list.innerHTML = "";
    getSkills().forEach(function (skill) {
      const li = document.createElement("li");
      li.textContent = skill;
      list.appendChild(li);
    });

    if (payMinInput.value && payMaxInput.value) {
      document.getElementById("preview-pay").textContent =
        "$" + payMinInput.value + " - $" + payMaxInput.value;
    } else {
      document.getElementById("preview-pay").textContent = "Pay not set";
    }

    document.getElementById("preview-deadline").textContent =
      deadlineInput.value ? "Deadline: " + deadlineInput.value : "No deadline";

    descCount.textContent = descInput.value.trim().length;
  }

  postForm.addEventListener("input", updatePreview);
  postForm.addEventListener("change", updatePreview);

  postForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "";
    let ok = true;

    if (!validateText(titleInput, "Title", 5)) { ok = false; }
    if (!validateText(companyInput, "Name", 2)) { ok = false; }
    if (!validateSelect(categoryInput, "a category")) { ok = false; }
    if (!validateSelect(typeInput, "a job type")) { ok = false; }
    if (!validateSelect(modeInput, "a work mode")) { ok = false; }
    if (!validateText(countryInput, "Country", 2)) { ok = false; }

    const min = Number(payMinInput.value);
    const max = Number(payMaxInput.value);

    if (payMinInput.value === "" || min <= 0) {
      showError(payMinInput, "Enter the lowest pay");
      ok = false;
    } else {
      showValid(payMinInput);
    }

    if (payMaxInput.value === "" || max <= 0) {
      showError(payMaxInput, "Enter the highest pay");
      ok = false;
    } else if (max < min) {
      showError(payMaxInput, "Must be equal to or higher than the lowest pay");
      ok = false;
    } else {
      showValid(payMaxInput);
    }

    if (deadlineInput.value === "") {
      showError(deadlineInput, "Choose a deadline");
      ok = false;
    } else if (deadlineInput.value < today) {
      showError(deadlineInput, "The deadline cannot be in the past");
      ok = false;
    } else {
      showValid(deadlineInput);
    }

    if (getSkills().length === 0) {
      showError(skillsInput, "Add at least one skill, separated by commas");
      ok = false;
    } else {
      showValid(skillsInput);
    }

    if (!validateText(descInput, "Description", 30)) { ok = false; }

    if (ok) {
      formMessage.textContent = "Demo only: your job was NOT published. Real posting needs a backend.";
    }
  });
}