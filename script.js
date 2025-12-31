const projectsContainer = document.querySelector("#projects");
const dataUpdatedLabel = document.querySelector("#data-updated");

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
    description: "Inactive, no recent attention",
  },
};

const formatDate = (value) => {
  if (!value) {
    return "Unknown";
  }
  if (typeof value === "string") {
    if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) {
      return value;
    }
    if (value.includes("T")) {
      return value.split("T")[0];
    }
  }
  return value;
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
  const meta = createElement("div", "project-meta");
  const statusDetail = createElement(
    "p",
    "project-status-detail",
    statusMeta.description
      ? `Status: ${statusMeta.label} — ${statusMeta.description}`
      : `Status: ${statusMeta.label}`
  );
  const lastUpdated = createElement(
    "p",
    "project-last-updated",
    `Last updated: ${formatDate(project.lastUpdated)}`
  );
  meta.append(statusDetail, lastUpdated);
  card.appendChild(meta);

  card.appendChild(
    createElement("p", "project-description", project.description)
  );

  if (project.quickStart) {
    const quickStart = createElement(
      "p",
      "project-quick-start",
      `Quick start: ${project.quickStart}`
    );
    card.appendChild(quickStart);
  }

  if (project.deploy?.type) {
    const deploy = createElement("div", "project-deploy");
    const deployLabel = createElement(
      "span",
      "project-deploy-label",
      "Deployment:"
    );
    const deployType = createElement(
      "span",
      "project-deploy-type",
      project.deploy.type
    );
    deploy.append(deployLabel, deployType);
    if (project.deploy.url) {
      const deployLink = createElement(
        "a",
        "project-deploy-link",
        "Open"
      );
      deployLink.href = project.deploy.url;
      deployLink.target = "_blank";
      deployLink.rel = "noopener noreferrer";
      deploy.appendChild(deployLink);
    }
    card.appendChild(deploy);
  }

  if (project.baseFiles) {
    const baseSection = createElement("div", "project-base-files");
    baseSection.appendChild(
      createElement("p", "project-base-title", "Base files")
    );
    const baseList = createElement("ul", "project-base-list");
    const baseLabels = {
      readme: "README",
      agents: "AGENTS.md",
      make: "Makefile",
      gitignore: ".gitignore",
      license: "License",
    };
    Object.entries(baseLabels).forEach(([key, label]) => {
      if (!(key in project.baseFiles)) {
        return;
      }
      const value = project.baseFiles[key];
      const status =
        value === true ? "present" : value === false ? "missing" : "unknown";
      const item = createElement(
        "li",
        `project-base-item base-${status}`,
        `${label}: ${status === "present" ? "yes" : status === "missing" ? "no" : "unknown"}`
      );
      baseList.appendChild(item);
    });
    baseSection.appendChild(baseList);
    card.appendChild(baseSection);
  }

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

const sortProjects = (projects) => {
  return [...projects].sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (a.name || "").localeCompare(b.name || "");
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

    const data = await response.json();
    const projects = Array.isArray(data) ? data : data?.projects;
    if (!Array.isArray(projects)) {
      throw new Error("Project data is not an array.");
    }

    if (dataUpdatedLabel) {
      const updatedAt = Array.isArray(data) ? null : data?.updatedAt;
      dataUpdatedLabel.textContent = updatedAt
        ? `Index data updated: ${formatDate(updatedAt)}`
        : "";
    }

    renderProjects(sortProjects(projects));
  } catch (error) {
    const isFileProtocol = window.location.protocol === "file:";
    projectsContainer.textContent = isFileProtocol
      ? "Open this page with a local server to load projects."
      : "Unable to load projects right now.";
  }
};

start();
