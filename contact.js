  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbwdo7r0xJUAbKFobn2CeAXAUjF0a_rrlhqQKNbXAq_giSuUt_AygsVxegq9Nk3QDv06/exec", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      if (data.toLowerCase().includes("success")) {
        document.getElementById("success-popup").classList.remove("hidden");
        form.reset();
      } else {
        alert("Submission failed. Please try again.");
      }
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
  });

  function closePopup() {
    document.getElementById("success-popup").classList.add("hidden");
  }