document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully.");

  // Greeting
  function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }
  const greetingText = document.getElementById("greetingText");
  greetingText.textContent = `${getTimeGreeting()}, my name is Matt Schultz! Welcome to my portfolio!`;

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  function updateThemeButton() {
    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
      themeToggle.classList.remove("btn-outline-dark");
      themeToggle.classList.add("btn-outline-light");
    } else {
      themeToggle.textContent = "🌙";
      themeToggle.classList.remove("btn-outline-light");
      themeToggle.classList.add("btn-outline-dark");
    }
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateThemeButton();
  });

  // Resume download + counter
  const downloadBtn = document.getElementById("downloadBtn");
  const resumeHref = "Matthew_Schultz_Resume.pdf";
  downloadBtn.setAttribute("href", resumeHref);
  let downloadCount = 0;
  const counterContainer = document.getElementById("downloadCounterContainer");
  const counterP = document.createElement("p");
  counterP.className = "small text-muted mb-0";
  counterP.textContent = "Downloaded 0 times";
  counterContainer.appendChild(counterP);

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = resumeHref;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    downloadCount++;
    counterP.textContent = `Downloaded ${downloadCount} time${downloadCount !== 1 ? "s" : ""}`;
    setTimeout(() => alert("Your resume was downloaded successfully!"), 1200);
  });

  // Add skill input
  const addSkillBtn = document.getElementById("addSkillBtn");
  addSkillBtn.addEventListener("click", () => {
    const skillInput = document.getElementById("newSkillInput");
    const val = skillInput.value.trim();
    if (!val) return alert("Please enter a skill.");
    const ul = document.querySelector("#skills ul");
    const li = document.createElement("li");
    li.textContent = val;
    ul.appendChild(li);
    skillInput.value = "";
  });

  // STEP 2 + 3: Three Projects (arrays + loop + comparators)
  const projectTitles = [
    "Portfolio Website",
    "Weather Dashboard",
    "Task Tracker App"
  ];
  const projectDescriptions = [
    "A personal portfolio website showcasing my projects, built with HTML, CSS, Bootstrap, and JavaScript.",
    "A responsive weather dashboard that fetches live data from an API and displays current conditions.",
    "A task tracker web app that helps users manage and mark daily tasks using local storage."
  ];
  const projectDeadlines = ["2025-12-12", "2025-11-15", "2025-10-01"];
  const projectImages = ["project-random1.jpg", "project-random2.jpg", "project-random3.jpg"];
  const today = new Date();
  const projectList = document.getElementById("projectList");

  for (let i = 0; i < projectTitles.length; i++) {
    const title = projectTitles[i];
    const desc = projectDescriptions[i];
    const deadlineStr = projectDeadlines[i];
    const imgSrc = projectImages[i];
    const deadline = new Date(deadlineStr);

    let status = "Completed";
    if (deadline > today) status = "Ongoing";
    else if (deadline.getTime() === today.setHours(0, 0, 0, 0)) status = "Completed";

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `${title} screenshot`;
    img.className = "card-img-top";
    img.style.height = "200px";
    img.style.objectFit = "cover";

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";
    body.innerHTML = `
      <h5 class="card-title">${title}</h5>
      <p class="card-text small text-muted">${desc}</p>
      <p><strong>Deadline:</strong> ${deadlineStr}</p>
      <p><strong>Status:</strong> ${status}</p>
    `;

    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    projectList.appendChild(col);
  }

  // STEP 5: Dynamic tables
  const educationData = [
    ["Northern Arizona University", "B.S. Applied Computer Science", "2023–2027"],
    ["Florence High School", "High School Diploma", "2014–2018"]
  ];
  const experienceData = [
    ["Web Development Student", "NAU – CS212", "2025 (current)"],
    ["Frontend Practice", "Personal Projects", "Ongoing"]
  ];

  function buildTable(containerId, headers, data) {
    const container = document.getElementById(containerId);
    const table = document.createElement("table");
    table.className = "table table-striped align-middle";
    table.style.setProperty("--bs-table-bg", "var(--card)");
    table.style.setProperty("--bs-table-color", "var(--text)");
    table.style.setProperty("--bs-table-border-color", "var(--border)");

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    const tbody = document.createElement("tbody");
    data.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
  }

  buildTable("educationTableContainer", ["Institution", "Program", "Dates"], educationData);
  buildTable("experienceTableContainer", ["Role", "Organization", "Dates"], experienceData);

  // Bonus: Customization controls
  const fontSizeRange = document.getElementById("fontSizeRange");
  const bgColorPicker = document.getElementById("bgColorPicker");

  fontSizeRange.addEventListener("input", () => {
    document.body.style.fontSize = `${fontSizeRange.value}px`;
  });

  bgColorPicker.addEventListener("input", () => {
    document.body.style.backgroundColor = bgColorPicker.value;
  });

  // Fade-in for cards
  document.querySelectorAll(".card").forEach((c, i) => {
    setTimeout(() => c.classList.add("visible"), 100 * i);
  });

  // Initialize correct theme button state
  updateThemeButton();
});
