document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed(".auto-type", {
        strings: ["a Master's student", "an ML Researcher", "a Computer Scientist", "a Mathematician"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });

    // Initial setup based on screen size
    setupNavigation();

    // Add resize listener to handle window resizing
    window.addEventListener('resize', setupNavigation);
});

function setupNavigation() {
    const sideNav = document.getElementById("sideNav");
    const content = document.querySelector(".content");
    
    if (window.innerWidth <= 768) {
        // Mobile setup
        sideNav.classList.remove("closed");
        content.classList.remove("closed");
        sideNav.classList.remove("active");
    } else {
        // Desktop setup
        sideNav.classList.remove("active");
        if (!sideNav.classList.contains("closed")) {
            content.classList.remove("closed");
        }
    }
}

function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    const content = document.querySelector(".content");

    if (window.innerWidth <= 768) {
        // Mobile behavior - just toggle active state
        sideNav.classList.toggle("active");
    } else {
        // Desktop behavior
        sideNav.classList.toggle("closed");
        content.classList.toggle("closed");
    }
}