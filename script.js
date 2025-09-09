const navLinks = document.querySelectorAll(".nav-link");
const navLinksContainer = document.querySelector(".nav-links");
const activePill = document.querySelector(".nav-active-pill");
const hoverPill = document.querySelector(".nav-hover-pill");
let activeLink = document.querySelector(".nav-link.active");
const expertiseLink = document.getElementById("expertise-link");
const megaMenu = document.querySelector(".mega-menu");

function positionPill(pill, target) {
  const linkRect = target.getBoundingClientRect();
  const containerRect = navLinksContainer.getBoundingClientRect();
  pill.style.left = `${linkRect.left - containerRect.left}px`;
  pill.style.width = `${linkRect.width}px`;
}

function setActiveLink(target) {
  if (activeLink) {
    activeLink.classList.remove("active");
  }
  activePill.style.transform = "translateX(0px)";
  target.classList.add("active");
  activeLink = target;
  positionPill(activePill, activeLink);
  hoverPill.style.opacity = 0;
  updateTextColors();
}

function updateTextColors() {
  navLinks.forEach((l) => {
    if (l === activeLink) {
      l.style.color = "var(--theme-secondary)";
    } else {
      l.style.color = "var(--theme-primary)";
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    if (link !== activeLink) {
      positionPill(hoverPill, link);
      hoverPill.style.opacity = 1;
      link.style.color = "var(--theme-primary)";
    }
  });

  link.addEventListener("mouseleave", () => {
    hoverPill.style.opacity = 0;
    updateTextColors();
    activePill.style.transform = "translateX(0px)";
  });

  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (link !== expertiseLink) {
      setActiveLink(link);
      megaMenu.classList.remove("show");
      expertiseLink.classList.remove("expertise-open");
    }
  });
});

expertiseLink.addEventListener("click", (e) => {
  e.preventDefault();
  megaMenu.classList.toggle("show");
  expertiseLink.classList.toggle("expertise-open");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!megaMenu.contains(e.target) && !navLinksContainer.contains(e.target)) {
    megaMenu.classList.remove("show");
    expertiseLink.classList.remove("expertise-open");
  }
});

// Initial position
if (activeLink) {
  positionPill(activePill, activeLink);
  updateTextColors();
}
