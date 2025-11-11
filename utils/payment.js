function submitPayment() {
  document.addEventListener("DOMContentLoaded", function () {
    const form =
      document.getElementById("form") || document.querySelector("form");
    const nim = document.getElementById("nim");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    if (!form) return;

    
    function showError(el, msg) {
      if (!el) return;
      let next = el.nextElementSibling;
      if (!next || !next.classList.contains("error-msg")) {
        next = document.createElement("div");
        next.className = "error-msg";
        next.style.color = "red";
        next.style.fontSize = "0.9em";
        el.parentNode.insertBefore(next, el.nextSibling);
      }
      next.textContent = msg;
      el.classList.add("invalid");
    }

    function clearError(el) {
      if (!el) return;
      let next = el.nextElementSibling;
      if (next && next.classList.contains("error-msg")) next.textContent = "";
      el.classList.remove("invalid");
    }

    
    function validateEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
    }
    function validatePhone(v) {
      return /^\d{7,15}$/.test((v || "").replace(/\s+/g, ""));
    }
    function validateNIM(v) {
      return /^\d{4,20}$/.test(v || ""); 
    }

    function validateAll() {
      let ok = true;

      if (!nim || !nim.value || !validateNIM(nim.value)) {
        showError(nim, "NIM tidak valid (4-20 digit).");
        ok = false;
      } else clearError(nim);

      if (!nameInput || !nameInput.value.trim()) {
        showError(nameInput, "Nama wajib diisi.");
        ok = false;
      } else clearError(nameInput);

      if (!emailInput || !validateEmail(emailInput.value)) {
        showError(emailInput, "Email tidak valid.");
        ok = false;
      } else clearError(emailInput);

      if (!phoneInput || !validatePhone(phoneInput.value)) {
        showError(phoneInput, "Telepon harus angka 7-15 digit.");
        ok = false;
      } else clearError(phoneInput);

      return ok;
    }

    
    [nim, nameInput, emailInput, phoneInput].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", function () {
        validateAll();
      });
    });

    
    form.addEventListener("submit", function (event) {
      if (!validateAll()) {
        event.preventDefault();
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return false;
      }
      return true;
    });
  });
}

submitPayment();
