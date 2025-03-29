/**
 * This script is used to get the current year and the last modified date of the page.
 */
function printCurrentYear() {
  const today = new Date();

  document.getElementById("currentyear").innerHTML = today.getFullYear();
}

/**
 * This function prints the last modified date of the page.
 */
function printLastModified() {
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

  document.getElementById("lastModified").innerHTML = lastModified;
}

// Call the functions on load
printCurrentYear();
printLastModified();
