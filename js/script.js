async function fetchActiveProjects() {
  const project = await fetch("http://localhost:3000/activeProject");
  const activeProject = await project.json();
  console.log("Active Projects Data:", activeProject);

  const skyline = activeProject.skylineTowers;
  document.getElementById("skyline-projects").innerHTML = `
  <div class="project-list" onclick="showProjectDetails(${skyline.id})">
    <h2>${skyline.name}</h2>
    <p><strong>Status:</strong> ${skyline.status}</p>
    <p><strong>Completion:</strong> ${skyline.completionPercentage}%</p>
`;
  const harbor = activeProject.harborViewComplex;
  document.getElementById("harbor-projects").innerHTML = `
    <h2>${harbor.name}</h2>
    <p><strong>Status:</strong> ${harbor.status}</p>
    <p><strong>Completion:</strong> ${harbor.completionPercentage}%</p>
`;
  window.projectData = {
    [activeProject.skylineTowers.id]: activeProject.skylineTowers,
    [activeProject.harborViewComplex.id]: activeProject.harborViewComplex,
  };
}
fetchActiveProjects();

function showProjectDetails(projectId) {
  const project = window.projectData[projectId];

  if (project) {
    document.getElementById("inventory").innerHTML = `
      <h1>${project.name} - Details</h1>
      <h2>Recent Tasks</h2>
      <ul>
        ${project.recentTasks
          .map(
            (task) => `
          <li><strong>${task.taskName}</strong> (Assigned to: ${task.assignedTo}) - ${task.status}</li>
        `
          )
          .join("")}
      </ul>`;
  }
}

function projectDetails(projectId) {
  const projectDetail = window.projectData[projectId];
  return Object.entries(projectDetail.materialsInventory)
    .map(
      ([key, material]) => `
        <tr>
            <td>${key}</td>
            <td>${material.quantity}</td>
            <td>${material.unit}</td>
            <td>${material.status}</td>
        </tr>`
    )
    .join("");
}
