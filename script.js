const menuToggle = document.querySelector(".menu-toggle");
const globalNav = document.querySelector(".global-nav");
const navLinks = document.querySelectorAll(".global-nav a");
const contactButton = document.querySelector(".contact-button");
const contactMessage = document.querySelector(".contact-message");
const revealTargets = document.querySelectorAll(".reveal");

if (menuToggle && globalNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    globalNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (menuToggle && globalNav) {
      menuToggle.classList.remove("is-open");
      globalNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

if (contactButton && contactMessage) {
  contactButton.addEventListener("click", () => {
    contactMessage.textContent = "仮メッセージ: お問い合わせフォームへ遷移する想定です。";
  });
}
