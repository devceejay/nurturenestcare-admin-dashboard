"use strict";

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".dashboard-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Mock data for search
  const searchData = [
    { type: "child", name: "Emma Johnson" },
    { type: "child", name: "Liam Brown" },
    { type: "staff", name: "Mrs Jane" },
    { type: "message", name: "Enrollment Inquiry" },
    { type: "message", name: "Schedule Change" },
  ];

  const searchInput = document.getElementById("dashboard-search");
  const searchBtn = document.getElementById("dashboard-search-btn");
  const resultsList = document.getElementById("dashboard-search-results");

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    resultsList.innerHTML = "";

    if (!query) {
      resultsList.innerHTML =
        '<li class="no-results">Please enter a search term.</li>';
      return;
    }

    const results = searchData.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      results.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.type})`;
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = '<li class="no-results">No results found.</li>';
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }
});

// Profile menu toggle
function toggleProfileMenu() {
  const menu = document.getElementById("profileDropdown");
  menu.classList.toggle("hidden");
}

// Auto-close profile menu when clicking outside
document.addEventListener("click", function (event) {
  const profileMenu = document.getElementById("profileDropdown");
  const trigger = document.querySelector(".profile-trigger");

  if (!trigger.contains(event.target)) {
    profileMenu.classList.add("hidden");
  }
});

// Dashboard overview cards stats from mock data
const dashboardStats = {
  totalEnrollments: 30,
  newInquiries: 5,
  pendingMessages: 3,
  totalAttendance: 18,
};

// Update the overview cards dynamically
function updateOverviewStats(stats) {
  document
    .getElementById("total-enrollments")
    .querySelector(".card-stat-value").textContent = stats.totalEnrollments;
  document
    .getElementById("new-inquiries")
    .querySelector(".card-stat-value").textContent = stats.newInquiries;
  document
    .getElementById("pending-messages")
    .querySelector(".card-stat-value").textContent = stats.pendingMessages;
  document
    .getElementById("total-attendance")
    .querySelector(".card-stat-value").textContent = stats.totalAttendance;
}

document.addEventListener("DOMContentLoaded", () => {
  updateOverviewStats(dashboardStats);
  feather.replace();
});

// Enrollment chart
document.addEventListener("DOMContentLoaded", () => {
  // Weekly enrollment mock data
  const weeklyLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const enrollmentData = [5, 8, 12, 9, 15];

  const ctx = document.getElementById("weeklyEnrollmentChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: weeklyLabels,
      datasets: [
        {
          label: "Enrollments",
          data: enrollmentData,
          borderColor: "#ffb347",
          backgroundColor: "rgba(255, 179, 71, 0.2)",
          borderWidth: 2,
          tension: 0.4, // smooth curves
          pointRadius: 4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
          },
        },
      },
    },
  });
});

// Dummy attendance logs
const logs = [
  {
    date: "2025-07-12",
    child: "Emma Johnson",
    timeIn: "07:35",
    timeOut: "17:30",
  },
  {
    date: "2025-07-12",
    child: "Liam Brown",
    timeIn: "07:40",
    timeOut: "17:15",
  },
  {
    date: "2025-07-12",
    child: "Olivia Smith",
    timeIn: "07:55",
    timeOut: "17:25",
  },
  {
    date: "2025-07-11",
    child: "Noah Davis",
    timeIn: "07:45",
    timeOut: "18:00",
  },
];

// Populate Daily Logs table on load
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("logs-body");
  logs.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${log.date}</td>
      <td>${log.child}</td>
      <td>${log.timeIn}</td>
      <td>${log.timeOut}</td>
      <td>
        <i data-feather="edit" class="edit-icon"></i>
        <i data-feather="trash-2" class="delete-icon"></i>
      </td>
    `;
    tbody.appendChild(row);
  });

  feather.replace();
});

function logout() {
  window.location.href = "admin-login.html";
}

// Events calendar
document.addEventListener("DOMContentLoaded", () => {
  const eventsList = document.getElementById("events-list");

  fetch("data/events.json")
    .then((response) => response.json())
    .then((events) => {
      eventsList.innerHTML = ""; // Clear any existing content

      events.forEach((event) => {
        const li = document.createElement("li");
        li.classList.add("event-item");
        li.innerHTML = `
          <strong>${event.title}</strong> - <em>${event.date}</em>
          <p>${event.description}</p>
        `;
        eventsList.appendChild(li);
      });
    })
    .catch((error) => {
      eventsList.innerHTML = "<li>Failed to load events.</li>";
      console.error("Error loading events:", error);
    });
});

// Content management for FAQs, announcements, and highlights
document.addEventListener("DOMContentLoaded", () => {
  const faqField = document.getElementById("faq");
  const announcementField = document.getElementById("announcement");
  const highlightField = document.getElementById("highlight");
  const contentSuccess = document.getElementById("content-success");
  const contentForm = document.querySelector(".content-management-form");

  // Mock content for FAQs, announcements, and highlights
  faqField.value = `Q: What is your child-to-staff ratio?\nA: We maintain a 1:5 ratio to ensure personalized attention.`;
  announcementField.value = "Summer break starts July 28";
  highlightField.value = "Now enrolling toddlers (2-4 years)";

  // Content management form submission
  contentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show unified success message
    contentSuccess.classList.remove("hidden");
    setTimeout(() => contentSuccess.classList.add("hidden"), 3000);
  });
});
