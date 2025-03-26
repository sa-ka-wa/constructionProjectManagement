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
  </div>
`;
  const harbor = activeProject.harborViewComplex;
  document.getElementById("harbor-projects").innerHTML = `
  <div class="project-list" onclick="showProjectDetails(${harbor.id})">
    <h2>${harbor.name}</h2>
    <p><strong>Status:</strong> ${harbor.status}</p>
    <p><strong>Completion:</strong> ${harbor.completionPercentage}%</p>
  </div>
`;
  window.projectData = {
    [activeProject.skylineTowers.id]: activeProject.skylineTowers,
    [activeProject.harborViewComplex.id]: activeProject.harborViewComplex,
  };
}
fetchActiveProjects();

function showProjectDetails(projectId) {
  const project = window.projectData[projectId];
  const renderMaterial = (project) => {
    const materialList = document.getElementById("material-list");
    materialList.innerHTML = "";
    Object.values(project.materialsInventory).forEach((material) => {
      materialList.innerHTML += `<tr>
          <td>${material.materialName}</td>
          <td>${material.quantity}</td>
          <td>${material.unit}</td>
          <td>${material.status}</td>
  </tr>`;
      console.log("Rendering materials for project:", project);
    });
    projectDetails(projectId);
    workforce(projectId);
  };
  renderMaterial(project);
}
function projectDetails(projectId) {
  const projectDetail = window.projectData[projectId];
  if (projectDetail) {
    document.getElementById("recent-task").innerHTML = `
       <div>
      <h1>${projectDetail.name} - Details</h1>
      <h2>Recent Tasks</h2>
      <ul>
        ${projectDetail.recentTasks
          .map(
            (task) => `
          <li><strong>${task.taskName}</strong> (Assigned to: ${task.assignedTo}) - ${task.status}</li>
        `
          )
          .join("")}
      </ul></div>
 `;
  }
}
function workforce(projectId) {
  const projectWorkforce = window.projectData[projectId];
  if (projectWorkforce) {
    const workforceList = document.getElementById("work-force");
    workforceList.innerHTML = `<h2>Workforce Details</h2>
      <table>
        <tr>
          <th>Role</th>
          <th>Count</th>
          <th>Daily Rate (Ksh)</th>
        </tr>
        ${Object.entries(projectWorkforce.workforce)
          .map(
            ([role, details]) => `
          <tr>
            <td>${role.charAt(0).toUpperCase() + role.slice(1)}</td>
            <td>${details.count}</td>
            <td>${details.rate}</td>
          </tr>`
          )
          .join("")}
      </table>`;
  }
}
