  /* ==============================
     MOBILE NAVIGATION
  ============================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const dropdowns = document.querySelectorAll('.mobile-menu .dropdown');

  // Open menu
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Close menu
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close when link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Toggle dropdowns in mobile nav
  dropdowns.forEach(drop => {
    const anchor = drop.querySelector('a');
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      drop.classList.toggle('open');
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ambassadorForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText"); // span inside button
  const loader = document.getElementById("loader");   // loader element
  const formNotice = document.getElementById("formNotice"); // message area
  const scriptURL = "https://script.google.com/macros/s/AKfycbx57Wit645v-vLXBD83dm4klH44e7Il6jHrNGGjkhmR768D3F2lsnO0X37GFe82ZtIh/exec";    // replace with your Apps Script URL

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Start loader
    submitBtn.disabled = true;
    btnText.textContent = "Submitting...";
    loader.style.display = "inline-block";
    formNotice.style.display = "none";

    try {
      // Collect form data
      const formData = Object.fromEntries(new FormData(form).entries());

      // Send request
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      // Try parse JSON (Apps Script must return JSON)
      let data;
      try {
        data = await res.json();
      } catch {
        data = { result: "success" }; // fallback if no JSON returned
      }

      // Handle response
      if (data.result === "success") {
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
      }
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
      // Reset button + loader
      submitBtn.disabled = false;
      btnText.textContent = "Submit Application";
      loader.style.display = "none";
    }
  });
});
