/* ==============================
   MOBILE NAVIGATION
============================== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const dropdowns = document.querySelectorAll('.mobile-menu .dropdown');

// Open menu
hamburger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.classList.add('no-scroll'); // use CSS instead of inline style
});

// Close menu
closeMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.classList.remove('no-scroll');
});

// Close when link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// Toggle dropdowns in mobile nav
dropdowns.forEach(drop => {
  const toggle = drop.querySelector('.dropdown-toggle'); // better than generic <a>
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      drop.classList.toggle('open');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ambassadorForm");
  const submitBtn = document.getElementById("submitBtn");
<<<<<<< HEAD
  const btnText = document.getElementById("btnText");
  const loader = document.getElementById("loader");
  const formNotice = document.getElementById("formNotice");
  const scriptURL = "https://script.google.com/macros/s/AKfycbxis4dOTVggn-zoC0qb5R4lmLLRrI_UaH6P0R_HAGKWCiSvCKsMkBLh98th77oOKyey/exec";
=======
  const btnText = document.getElementById("btnText"); // span inside button
  const loader = document.getElementById("loader");   // loader element
  const formNotice = document.getElementById("formNotice"); // message area
  const scriptURL = "https://script.google.com/macros/s/AKfycbx57Wit645v-vLXBD83dm4klH44e7Il6jHrNGGjkhmR768D3F2lsnO0X37GFe82ZtIh/exec";    // replace with your Apps Script URL
>>>>>>> 66cf57965fd23a96a8de9345a528d4a045ac850a

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Start loader
    submitBtn.disabled = true;
    btnText.textContent = "Submitting...";
    loader.style.display = "inline-block";
    formNotice.style.display = "none";

    try {
      const formData = Object.fromEntries(new FormData(form).entries());

      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { result: "error", message: "Invalid server response" };
      }

      if (data.result === "success") {
        formNotice.innerHTML = `
          ✅ Your application has been submitted successfully! <br><br>
          To complete your onboarding, please join our exclusive Ambassador WhatsApp group using the link below: <br>
          <a href="https://chat.whatsapp.com/L3kNw8ZOUcu7yOELV0ulrL?mode=ac_t" target="_blank" class="whatsapp-link">
            👉 Join WhatsApp Group
          </a>
        `;
        formNotice.className = "form-notice success";
        formNotice.style.display = "block";
        form.reset();
      } else {
        formNotice.textContent = "⚠️ Submission failed: " + (data.message || "Unknown error");
        formNotice.className = "form-notice error";
        formNotice.style.display = "block";
      }

    } catch (err) {
      formNotice.textContent = "❌ Error submitting form: " + err.message;
      formNotice.className = "form-notice error";
      formNotice.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = "Submit Application";
      loader.style.display = "none";
    }
  });
});