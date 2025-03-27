# Jenga Construction Project Management System

Objective: To develop a web-based platform that enables real-time tracking and management of ongoing construction projects, focusing on daily tasks, materials on-site, and labor workforce.

# Project Overview

Jenga Build is an intuitive, front-end construction project management system designed to streamline daily operations on construction sites. The platform provides an efficient way to log daily tasks, monitor material usage, and track labor attendance using JavaScript, HTML, CSS, and JSON.

# Key Features

1. Project Dashboard
   Displays ongoing construction projects with real-time status updates.
   Provides an overview of daily logs, including materials received, tasks completed, and labor attendance.
   Supports JSON-based data storage for seamless updates without requiring a backend.
2. Daily Task Tracker
   Lists current tasks being implemented (e.g., excavation, foundation, roofing).
   Allows project managers to update progress dynamically from JSON files.
   Tracks task completion status (Pending → In Progress → Completed).
3. Materials Inventory Management
   Logs materials received, used, and remaining for each project.
   Issues low-stock alerts when material quantities fall below a set threshold.
   Provides real-time updates for site managers to track material flow effectively.
4. Labor Workforce Tracking
   Tracks daily labor numbers, categorized by role (e.g., Masons, Carpenters, Electricians).
   Stores attendance records in JSON, ensuring transparency in workforce management.
   Offers insights into daily labor allocation and work efficiency.

## **Technologies Used**

- **HTML** - Structure of the web pages.
- **CSS** - Styling and layout.
- **JavaScript** - Dynamic interactions and data handling.
- **JSON** - Storing project-related data (tasks, materials, workforce).
- **GitHub Pages** - Hosting the static website.
- **JSON Server** - Simulating a backend for local development.

---

## 📊 Project Presentation

[👉 View Google Slides](https://docs.google.com/presentation/d/1UoelLLrfixGUU92XMtaUetYNnfxDmH55OVzUwvbiPkc/view)

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/sa-ka-wa/constructionProjectManagement.git
cd constructionProjectManagement
```

### **2. Open in a Browser**

Simply open `index.html` in a browser to run the project.

### **3. Use JSON Server (For Local API Simulation)**

Ensure you have **Node.js** installed. Then, install JSON Server globally:

```sh
npm install -g json-server
```

Start JSON Server:

```sh
json-server --watch data/db.json --port 3000
```

Now, access the API at: `http://localhost:3000`

---

## **Usage Guide**

### **1. Managing Active Projects**

- Click "Add New Project" to enter project details (Name, Location, Status).
- Click "Submit" to add the project to the **Active Projects** section.

### **2. Tracking Daily Tasks**

- View the task list under **Recent Tasks**.
- Update task status (Pending → In Progress → Completed).

### **3. Managing Materials Inventory**

- Click "Add Material" to input material details.
- Enter **Material Name, Quantity, Unit, and Status**.
- Click "Submit Material" to update the inventory.

### **4. Workforce Tracking**

- Add daily labor roles and worker count.
- Track attendance and labor cost per day.

---

## **Project Structure**

```plaintext
constructionProjectManagement/
│── index.html          # Main UI
│── css/
│   └── style.css       # Stylesheet
│── js/
│   └── script.js       # JavaScript logic
│── data/
│   └── db.json         # JSON file storing data
│── images/             # Image assets
│── README.md           # Project documentation
```

---

## **Contributing**

Want to improve this project? Follow these steps:

1. **Fork the repository**
2. **Create a new branch** (`feature-branch`)
3. **Commit changes**
4. **Push to GitHub**
5. **Create a Pull Request**

---

## **License**

This project is open-source and available under the **MIT License**.

---
