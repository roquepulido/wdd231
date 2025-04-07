/**
 * This script is used to get the current year and the last modified date of the page.
 */
function printCurrentYear(id) {
  
  const today = new Date();

  document.getElementById(id).innerHTML = today.getFullYear();
}

/**
 * This function prints the last modified date of the page.
 */
function printLastModified(id) {

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const lastModified = new Date(document.lastModified).toLocaleDateString(
    "en-US",
    options
  );

  document.getElementById(id).innerHTML = lastModified;
}

/**
 * This function shows or hides a spinner element based on the active parameter.
 */
const spinnerShow = (active = true, spinnerId = "spinner") => {
  const spinner = document.getElementById(spinnerId);
  if (active) {
    spinner.style.display = "flex"; // Show spinner
  } else {
    spinner.style.display = "none"; // Hide spinner
  }
};
export { printCurrentYear, printLastModified, spinnerShow };