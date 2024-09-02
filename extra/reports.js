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
