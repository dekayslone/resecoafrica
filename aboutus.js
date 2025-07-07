
  function playVideo() {
    const video = document.getElementById("resecovideo");
    const thumbnail = document.querySelector(".video-thumbnail");

    thumbnail.style.display = "none"; // Hide thumbnail
    video.style.display = "block";    // Show video
    video.muted = false;              // Unmute
    video.play();                     // Play
  }
