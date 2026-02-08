// Typed headline + nav behavior + publications rendering

document.addEventListener("DOMContentLoaded", () => {
  // Typed.js
  if (window.Typed) {
    new Typed(".auto-type", {
      strings: [
        "a Master's student",
        "an ML Researcher",
        "a computer scientist",
        "a mathematician",
      ],
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 900,
      loop: true,
    });
  }

  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initial nav setup + on resize
  setupNavigation();
  window.addEventListener("resize", setupNavigation);

  // Publications render
  renderPublications(PUBLICATIONS);
  populateYears(PUBLICATIONS);
});

/* ======== NAV ======== */
function setupNavigation() {
  const sideNav = document.getElementById("sideNav");
  if (window.innerWidth <= 860) {
    sideNav.classList.add("closed");
  } else {
    sideNav.classList.remove("active");
    sideNav.classList.remove("closed");
  }
}
function toggleNav() {
  const sideNav = document.getElementById("sideNav");
  if (window.innerWidth <= 860) {
    sideNav.classList.toggle("active");
  } else {
    sideNav.classList.toggle("closed");
  }
}

/* ======== PUBLICATIONS DATA ======== */
const PUBLICATIONS = [
  {
    title: "Predicting Fairness of ML Software Configurations",
    authors: "<strong>Salvador Robles</strong>, Verya Monjezi, Vladik Kreinovich, Ashutosh Trivedi, Saeid Tizpaz-Niari",
    venue: "Proceedings of the 20th Intl Conference on Predictive Models and Data Analytics in Software Engineering (PROMISE 2024)",
    year: 2024,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2404.19100" },
      { label: "Presentation", href: "https://youtu.be/IfKBoBR7RTE" },
    ],
    note: "",
  },
  {
    title: "When is Deep Learning Better and When Is Shallow Learning Better: Qualitative Analysis",
    authors: "<strong>Salvador Robles</strong>, Martine Ceberio, Vladik Kreinovich",
    venue: "International Journal of Parallel, Emergent and Distributed Systems (IJPEDS 2022)",
    year: 2022,
    links: [
      { label: "PDF", href: "papers/When Is Deep Learning Better and When Is Shallow Learning Better.pdf" }
    ],
  },
  {
    title: "How to Get the Most Accurate Measurement-Based Estimates",
    authors: "<strong>Salvador Robles</strong>, Martine Ceberio, Vladik Kreinovich",
    venue: "Uncertainty, Constraints, and Decision Making, Springer, 2023 (pp. 165-175)",
    year: 2023,
    links: [
      { label: "PDF", href: "papers/How to Get the Most Accurate Measurement-Based Estimates.pdf" }
    ],
  },
  {
    title: "Computing the Range of a Function-of-Few-Linear-Combinations Under Linear Constraints: A Feasible Algorithm",
    authors: "<strong>Salvador Robles</strong>, Martine Ceberio, Vladik Kreinovich",
    venue: "Proceedings of the 15th International Workshop on Constraint Programming and Decision Making (CoProD 2022)",
    year: 2022,
    links: [
      { label: "PDF", href: "papers/Computing the Range of a Function-of-Few-Linear-Combinations.pdf" }
    ],
  },
  {
    title: "Why Model Order Reduction",
    authors: "<strong>Salvador Robles</strong>, Martine Ceberio, Vladik Kreinovich",
    venue: "Decision Making under Uncertainty and Constraints: A Why Book, Springer, 2023 (pp. 233-237)",
    year: 2021,
    links: [
      { label: "PDF", href: "papers/Why Model Order Reduction.pdf" }
    ],
  },
  {
    title: "Foundations of Neural Networks explain the Success of the 'Surrogate' Approach to Ordinal Regression - and Recommend What's Next",
    authors: "<strong>Salvador Robles</strong>, Martine Ceberio, Vladik Kreinovich",
    venue: "Submitted (book chapter)",
    year: 2023,
    links: [
      { label: "PDF", href: "papers/Foundations of Neural Networks Explain the Empirical Success.pdf" }
    ],
  },
];

/* ======== PUBLICATIONS RENDERING ======== */
function renderPublications(items) {
  const grid = document.getElementById("pub-grid");
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<p class="muted">No results.</p>`;
    return;
  }

  items
    .sort((a,b) => b.year - a.year || a.title.localeCompare(b.title))
    .forEach(pub => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3>${sanitize(pub.title)}</h3>
        <div class="meta">
          <span class="badge">${sanitize(pub.venue || "—")}</span>
          <span class="badge">${sanitize(String(pub.year))}</span>
        </div>
        <p class="authors">${pub.authors}</p>
        ${pub.note ? `<p class="muted">${sanitize(pub.note)}</p>` : ""}
        <div class="link-row">
          ${(pub.links || [])
            .map(l => `<a class="link" href="${l.href}" target="_blank" rel="noopener">${sanitize(l.label)} →</a>`)
            .join("")}
        </div>
      `;
      grid.appendChild(card);
    });
}

/* ======== FILTERS ======== */
function populateYears(items){
  const select = document.getElementById("pub-year");
  const years = [...new Set(items.map(p => p.year))].sort((a,b)=>b-a);
  years.forEach(y => {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    select.appendChild(opt);
  });
}

function filterPublications(){
  const q = (document.getElementById("pub-search").value || "").toLowerCase();
  const y = document.getElementById("pub-year").value;

  const filtered = PUBLICATIONS.filter(p => {
    const hay = `${p.title} ${p.venue} ${p.year} ${stripTags(p.authors)}`.toLowerCase();
    const passQ = !q || hay.includes(q);
    const passY = !y || String(p.year) === y;
    return passQ && passY;
  });

  renderPublications(filtered);
}

/* ======== UTILS ======== */
function sanitize(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function stripTags(str){
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.textContent || "";
}
