document.addEventListener("DOMContentLoaded", function () {
  
    // Check if localStorage has the last visit date
    if (localStorage.getItem("lastVisit")) {
      const lastVisit = Number(localStorage.getItem("lastVisit"));
      const currentDate = Date.now();
      const timeDiff = currentDate - lastVisit;
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Calculate difference in days
  
      if (daysDiff < 1) {
        document.getElementById("visits").innerText = "Back so soon! Awesome!";
      } else if (daysDiff === 1) {
        document.getElementById("visits").innerText =
          "You last visited 1 day ago.";
      } else {
        document.getElementById("visits").innerText =
          "You last visited " + daysDiff + " days ago.";
      }
    } else {
      document.getElementById("visits").innerText =
        "Welcome! Let us know if you have any questions.";
    }
  
    // Save current date as last visit date
    localStorage.setItem("lastVisit", Date.now());
  });
  