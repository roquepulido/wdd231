const modal = document.getElementById("modal");
var closeBtn = document.getElementById("close");

window.onload = function () {
    
  const day = new Date().getDay();
  if (day > 0 && day < 4) {
    modal.style.display = "block";
  }
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};
