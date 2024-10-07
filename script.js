document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed(".auto-type", {
        strings: ["a Master's student", "an ML Researcher", "a Computer Scientist", "a Mathematician"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });
});

function toggleNav() {
    var sideNav = document.getElementById("sideNav");
    var content = document.querySelector(".content");

    if (sideNav.classList.contains("open")) {
        sideNav.classList.remove("open");
        content.classList.remove("open");
    }
    else {
        sideNav.classList.add("open");
        content.classList.add("open");        
    }
}