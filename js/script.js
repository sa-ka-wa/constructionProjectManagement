document.getElementById("new-data").addEventListener("click", function () {
  document.getElementById("project-form").style.display = "block";
  document.getElementById("task-inputs").style.display = "block";
  document.getElementById("workforce-inputs").style.display = "block";
});
document
  .getElementById("show-material-form")
  .addEventListener("click", function () {
    document.getElementById("material-inputs").style.display = "block";
  });
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
  const projectName = document.getElementById("projectName").value.trim();
  const projectStatus = document.getElementById("projectStatus").value.trim();
  const completionPercentage = parseInt(
    document.getElementById("completionPercentage").value.trim(),
    10
  );
  const newProject = {
    name: projectName,
    status: projectStatus,
    completionPercentage,
    materialsInventory: {},
    recentTasks: [],
    workforce: {},
  };

  try {
    const response = await fetch("http://localhost:3000/activeProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error("Failed to save project data!");
    }

    const savedProject = await response.json();
    console.log("Project saved:", savedProject);

    // Clear fields and hide form
    document.getElementById("projectName").value = "";
    document.getElementById("projectStatus").value = "";
    document.getElementById("completionPercentage").value = "";
    document.getElementById("project-form").style.display = "none";

    // Refresh project list
    fetchActiveProjects();
  } catch (error) {
    console.error("Error adding project:", error);
  }
}
fetchActiveProjects();

let currentProjectId = null;

function showProjectDetails(projectId) {
  currentProjectId = projectId;
  const project = window.projectData[projectId];
  const renderMaterial = (project) => {
    const materialList = document.getElementById("material-list");

    materialList.innerHTML = "";

    Object.values(project.materialsInventory).forEach((material) => {
      const isLowStock = material.quantity < 20;
      materialList.innerHTML += `<tr class="${isLowStock ? "low-stock" : ""}">
          <td>${material.materialName}</td>
          <td>${material.quantity}</td>
          <td>${material.unit}</td>
          <td>${material.status}</td>
                  <td>
          <button class="button" onclick="editMaterial('${
            material.materialName
          }')">Edit</button>
          <button class="button" onclick="deleteMaterial('${
            material.materialName
          }')">Delete</button>
        </td>
  </tr>`;
      document
        .getElementById("material-list")
        .addEventListener("click", function (event) {
          if (event.target.classList.contains("edit-btn")) {
            const materialName = event.target.getAttribute("data-material");
            editMaterial(materialName);
          }

          if (event.target.classList.contains("delete-btn")) {
            const materialName = event.target.getAttribute("data-material");
            deleteMaterial(materialName);
          }
        });

      console.log("Rendering materials for project:", project);
    });
    projectDetails(projectId);
    workforce(projectId);
  };
  renderMaterial(project);
}

document.getElementById("submit-material").onclick = function () {
  const materialName = document.getElementById("materialName").value.trim();
  const materialQuantity = parseInt(
    document.getElementById("materialQuantity").value.trim(),
    10
  );
  const materialUnit = document.getElementById("materialUnit").value.trim();
  const materialStatus = document.getElementById("materialStatus").value.trim();

  const newMaterial = {
    materialName,
    quantity: materialQuantity,
    unit: materialUnit,
    status: materialStatus,
  };
  if (!window.projectData[currentProjectId].materialsInventory) {
    window.projectData[currentProjectId].materialsInventory = {};
  }
  window.projectData[currentProjectId].materialsInventory[materialName] =
    newMaterial;
  showProjectDetails(currentProjectId);
  document.getElementById("materialName").value = "";
  document.getElementById("materialQuantity").value = "";
  document.getElementById("materialUnit").value = "";
  document.getElementById("materialStatus").value = "";
  document.getElementById("material-inputs").style.display = "none";
};
let editingMaterial = null;
function editMaterial(materialName) {
  const project = window.projectData[currentProjectId];
  const material = project.materialsInventory[materialName];
  document.getElementById("materialName").value = material.materialName;
  document.getElementById("materialQuantity").value = material.quantity;
  document.getElementById("materialUnit").value = material.unit;
  document.getElementById("materialStatus").value = material.status;
  document.getElementById("material-inputs").style.display = "block";
  document.getElementById("submit-material").innerText = "Update Material";
}
function deleteMaterial(materialName) {
  const project = window.projectData[currentProjectId];
  delete project.materialsInventory[materialName];
  showProjectDetails(currentProjectId);
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
