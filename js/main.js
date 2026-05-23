(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");
  const revealEls = document.querySelectorAll(".reveal");
  const skillFills = document.querySelectorAll(".skill-fill");

  const sections = ["sobre", "projetos", "contato"].map((id) =>
    document.getElementById(id)
  );

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function closeMobileNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    siteNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMobileNav());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  function updateActiveNav() {
    const scrollPos = window.scrollY + header?.offsetHeight + 48;

    let current = "";
    sections.forEach((section) => {
      if (!section) return;
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", href === current);
    });
  }

  const backToTop = document.querySelector(".footer-top");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  revealEls.forEach((el) => revealObserver.observe(el));

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach((bar) => skillObserver.observe(bar));

  window.addEventListener("scroll", () => {
    setHeaderState();
    updateActiveNav();
  }, { passive: true });

  setHeaderState();
  updateActiveNav();
})();
