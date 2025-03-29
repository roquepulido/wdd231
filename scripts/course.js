const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const cards = [
  {
    title: "Course Work",
    stylesClass: "col-grid-3",
    content: `<ul><li>one</li><li>two</li><li>three</li></ul>`,
  },
  {
    title: "Mérida, Yucatán",
    stylesClass: "col-grid-2",
    content: /*html*/ `
    <div class="text-image">
        <img src="images/merida.png" alt="Mérida, Yucatán" />
        <p>Mérida, Yucatán</p>
    </div>`,
  },
];

/**
 * This function renders the main info of HTML page.
 */
function renderProfileAndFooter() {
  document.getElementById("nameProfile").textContent = "Roque A. Pulido";
  document.getElementById("nameFooter").textContent = "Roque A. Pulido";
  document.getElementById("stateFooter").textContent = "Mérida, Yucatán";
  document.getElementById("titleMain").textContent = "Home";
}

function renderCards() {
  const cardsContainer = document.getElementById("cardsContainer");
  cards.forEach((card) => {
    // Create the card element and its children
    const cardElement = document.createElement("section");
    cardElement.className = `card ${card.stylesClass}`;
    // Create the title
    const titleElement = document.createElement("h2");
    titleElement.className = "title";
    titleElement.textContent = card.title;
    cardElement.appendChild(titleElement);
    // Create the body
    const bodyElement = document.createElement("div");
    bodyElement.className = "body";
    bodyElement.innerHTML = card.content;
    cardElement.appendChild(bodyElement);
    cardsContainer.appendChild(cardElement);
  });
}

function filterCertificate(filterSubject = null) {
  // filter the courses by certificate
  const filterCourses = filterSubject
    ? courses.filter((course) => course.subject === filterSubject)
    : courses;
  const totalCredits = filterCourses
    .filter((course) => course.completed)
    .reduce((acc, course) => acc + course.credits, 0);

  // render the courses labels
  renderCourseInfo(filterCourses);

  // Render the total credits
  document.getElementById(
    "totalCredits"
  ).textContent = `Total Credits: ${totalCredits}`;
}
function renderCourseInfo(courseInfo) {
  const certificatesLabelsHTML = document.getElementById("certificatesLabels");
  // Clear previous content
  certificatesLabelsHTML.innerHTML = "";
  courseInfo.forEach((course) => {
    const courseLabel = document.createElement("div");
    courseLabel.className = "course-label";
    course.completed ? courseLabel.classList.add("completed"):"";
    courseLabel.innerHTML = `<strong>${course.subject} ${course.number}</strong><span>${course.title}</span>`;
    certificatesLabelsHTML.appendChild(courseLabel);
  });
}

function setFiltersButtons() {
  //reset active class
  const resetActiveClass = () => {
    const buttons = document.querySelectorAll(".filter-buttons button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  };

  document
    .getElementById("allCoursesFilter")
    .addEventListener("click", (event) => {
      resetActiveClass();
      event.target.classList.add("active");
      filterCertificate();
    });
  document
    .getElementById("wddCoursesFilter")
    .addEventListener("click", (event) => {
      resetActiveClass();
      event.target.classList.add("active");
      filterCertificate("WDD");
    });
  document
    .getElementById("cseCoursesFilter")
    .addEventListener("click", (event) => {
      resetActiveClass();
      event.target.classList.add("active");
      filterCertificate("CSE");
    });
}

// init Functions
function init() {
  setFiltersButtons();
  filterCertificate();
  renderCards();
  renderProfileAndFooter();
}

init();
