document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) return; // Prevent error if form is not found

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("https://script.google.com/macros/s/AKfycbwdo7r0xJUAbKFobn2CeAXAUjF0a_rrlhqQKNbXAq_giSuUt_AygsVxegq9Nk3QDv06/exec", {
        method: "POST",
        body: formData
      })
        .then(response => response.text())
        .then(data => {
          const popup = document.getElementById("success-popup");

          if (data.toLowerCase().includes("success") && popup) {
            popup.classList.remove("hidden");
            form.reset();
          } else {
            alert("Submission failed. Please try again.");
          }
        })
        .catch(error => {
          alert("Error: " + error.message);
        });
    });

    window.closePopup = function () {
      const popup = document.getElementById("success-popup");
      if (popup) {
        popup.classList.add("hidden");
      }
    };
  });