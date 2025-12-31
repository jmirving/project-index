const projectsContainer = document.querySelector("#projects");

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

const STATUS_CONFIG = {
  WIP: {
    label: "WIP",
    className: "status-wip",
    description: "Active build-in-progress",
  },
  Stable: {
    label: "Stable",
    className: "status-stable",
    description: "Maintained, minimal changes",
  },
  Idea: {
    label: "Idea",
    className: "status-idea",
    description: "Concept or early planning",
  },
  Demo: {
    label: "Demo",
    className: "status-demo",
    description: "One-off showcase, no future work",
  },
  Archived: {
    label: "Archived",
    className: "status-archived",
    description: "Read-only, inactive repository",
  },
  Dormant: {
    label: "Dormant",
    className: "status-dormant",
    description: "Paused or inactive",
  },
};

const renderProject = (project) => {
  const card = createElement("article", "project-card");
  const header = createElement("div", "project-header");
  const title = createElement("h2", "project-title", project.name);
  const statusMeta = STATUS_CONFIG[project.status] || {
    label: project.status || "Unknown",
    className: "status-unknown",
    description: "",
  };
  const statusWrap = createElement("div", "project-status");
  const statusLabel = createElement(
    "span",
    `project-status-label ${statusMeta.className}`,
    statusMeta.label
  );
  statusWrap.appendChild(statusLabel);

  header.append(title, statusWrap);
  card.appendChild(header);

  card.appendChild(
    createElement("p", "project-description", project.description)
  );

  if (Array.isArray(project.tech) && project.tech.length > 0) {
    const techList = createElement("ul", "project-tech");
    project.tech.forEach((tech) => {
      techList.appendChild(createElement("li", "project-tech-item", tech));
    });
    card.appendChild(techList);
  }

  const links = createElement("div", "project-links");
  const repoLink = createElement("a", "project-link", "Repository");
  repoLink.href = project.repo;
  repoLink.target = "_blank";
  repoLink.rel = "noopener noreferrer";
  links.appendChild(repoLink);

  if (project.demo) {
    const demoLink = createElement("a", "project-link", "Live Demo");
    demoLink.href = project.demo;
    demoLink.target = "_blank";
    demoLink.rel = "noopener noreferrer";
    links.appendChild(demoLink);
  }

  card.appendChild(links);

  if (project.future) {
    const future = createElement(
      "p",
      "project-future",
      `Future ideas: ${project.future}`
    );
    card.appendChild(future);
  }

  return card;
};

const renderProjects = (projects) => {
  projectsContainer.innerHTML = "";
  projects.forEach((project) => {
    projectsContainer.appendChild(renderProject(project));
  });
};

const start = async () => {
  if (!projectsContainer) {
    return;
  }

  projectsContainer.textContent = "Loading projects...";

  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error("Failed to load project data.");
    }

    const projects = await response.json();
    if (!Array.isArray(projects)) {
      throw new Error("Project data is not an array.");
    }

    renderProjects(projects);
  } catch (error) {
    const isFileProtocol = window.location.protocol === "file:";
    projectsContainer.textContent = isFileProtocol
      ? "Open this page with a local server to load projects."
      : "Unable to load projects right now.";
  }
};

start();
