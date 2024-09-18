// Sample Data
const reports = [
    {
        username: "John Doe",
        date: "2024-08-24",
        time: "14:30",
        severity: "Critical",
        status: "Pending",
        city: "City A",
        image: "images\\rdd1.jpg",
        mapIcon: "images\\loc.png"
    },
    {
        username: "Jane Smith",
        date: "2024-08-23",
        time: "10:00",
        severity: "Low",
        status: "In Progress",
        city: "City B",
        image: "images\\rdd2.jpg",
        mapIcon: "images\\loc.png"
    },
    {
        username: "Jane Smith",
        date: "2024-08-23",
        time: "10:00",
        severity: "Medium",
        status: "In Progress",
        city: "City B",
        image: "images\\rdd2.jpg",
        mapIcon: "images\\loc.png"
    },
    {
        username: "Jane Smith",
        date: "2024-08-23",
        time: "10:00",
        severity: "Informational",
        status: "In Progress",
        city: "City B",
        image: "images\\rdd2.jpg",
        mapIcon: "images\\loc.png"
    }
    // Add more report objects as needed
];

// Function to render the reports based on filters
function renderReports(filteredReports) {
    const reportContainer = document.querySelector('.report-row');
    reportContainer.innerHTML = ''; // Clear the container

    filteredReports.forEach(report => {
        const reportHTML = `
            <div class="report-container">
                <img src="${report.image}" alt="Report Image">
                <div class="report-details">
                    <div class="severity" style="background-color: ${getSeverityColor(report.severity)};">
                        ${report.severity}
                    </div>
                    <div class="info">
                        <p>User: ${report.username}</p>
                        <p>Date: ${report.date}</p>
                        <p>Time: ${report.time}</p>
                        <p>Status: ${report.status}</p>
                    </div>
                    <div class="actions">
                    <a href="view.html">
                        <button>View</button></a>
                        <div class="location">
                            <p>${report.city}</p>
                            <img src="${report.mapIcon}" alt="Map Icon" class="map-icon">
                        </div>
                    </div>
                </div>
            </div>
        `;
        reportContainer.insertAdjacentHTML('beforeend', reportHTML);
    });

    // // Update the counts
    // const total = filteredReports.length;
    // const pending = filteredReports.filter(report => report.status === 'Pending').length;
    // const completed = filteredReports.filter(report => report.status === 'Completed').length;

    // updateCircle('totalCount', total, total);
    // updateCircle('pendingCount', pending, total);
    // updateCircle('completedCount', completed, total);
}

// Function to get color based on severity level
function getSeverityColor(severity) {
    switch (severity) {
        case "Critical":
            return "red";
        case "Medium":
            return "#FF681F";
        case "Low":
            return "#deb954";
        case "Informational":
            return "green";
        default:
            return "gray";
    }
}

// Function to update circle counts
function updateCircle(circleId, count, total) {
    const circleElement = document.getElementById(circleId);
    const percentage = (total === 0) ? 0 : Math.round((count / total) * 100);

    circleElement.textContent = count;
    circleElement.style.backgroundColor = getSeverityColor(circleElement.textContent);
    circleElement.style.backgroundImage = `conic-gradient(${circleElement.style.backgroundColor} ${percentage}%, lightgray ${percentage}% 100%)`;
}

// Function to apply filters and render the reports
function applyFilters() {
    const severity = document.getElementById('severity').value;
    const location = document.getElementById('location').value;
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    const status = document.getElementById('status').value;

    const filteredReports = reports.filter(report => {
        const reportDate = new Date(report.date);
        const isSeverityMatch = !severity || report.severity === severity;
        const isLocationMatch = !location || report.city === location;
        const isDateMatch = (!dateFrom || reportDate >= new Date(dateFrom)) && (!dateTo || reportDate <= new Date(dateTo));
        const isStatusMatch = !status || report.status === status;

        return isSeverityMatch && isLocationMatch && isDateMatch && isStatusMatch;
    });

    renderReports(filteredReports);
}

// Attach event listeners to filter elements
document.getElementById('severity').addEventListener('change', applyFilters);
document.getElementById('location').addEventListener('change', applyFilters);
document.getElementById('date-from').addEventListener('change', applyFilters);
document.getElementById('date-to').addEventListener('change', applyFilters);
document.getElementById('status').addEventListener('change', applyFilters);

// Initial render with all reports
renderReports(reports);

// Animate progress for circles

// Function to clear filters
// Function to clear filters
function clearFilters() {
    // Reset filter inputs to default values
    document.getElementById('severity').value = '';
    document.getElementById('location').value = '';
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    document.getElementById('status').value = '';

    // Render all reports (no filters applied)
    renderReports(reports);
}

// Attach event listener to the "Clear Filters" button
document.getElementById('clear-filters').addEventListener('click', clearFilters);


// For Progress Bar
document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        const percentage = parseInt(circle.getAttribute('data-percentage'));
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100 * circumference);

        const foregroundCircle = circle.querySelector('.foreground');
        foregroundCircle.style.strokeDashoffset = offset;
    });
});


