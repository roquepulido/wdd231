const getLastModification = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
document.getElementById("year").innerText = new Date().getFullYear();
document.getElementById(
  "lastModified"
).innerText = `Last Modification: ${getLastModification(
  document.lastModified
)}`;

//Hamburger button
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

 document.addEventListener("DOMContentLoaded", () => {
   const membershipImages = document.querySelectorAll(".membership img");

   function addShineAnimation() {
     const randomIndex = Math.floor(Math.random() * membershipImages.length);
     const randomImage = membershipImages[randomIndex];
     randomImage.classList.add("shine-animation");

     setTimeout(() => {
       randomImage.classList.remove("shine-animation");
     }, 2000); // Remove after 2 seconds
   }

   setInterval(addShineAnimation, 5000); // Trigger every 5 seconds
 });
  document.getElementById('timestamp').value = Date.now();

// Modal functionality
document.querySelectorAll(".modal-trigger").forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        document.getElementById(modalId).classList.add("open");
    });
});

document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest(".modal").classList.remove("open");
    });
});

// Ensure <dialog> modals cannot be closed by clicking outside
document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("cancel", (event) => {
        event.preventDefault(); // Prevent closing with the escape key
    });
});

// Modal functionality using <dialog>
document.querySelectorAll(".modal-trigger").forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    });
});

document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        if (modal) modal.close();
    });
});
