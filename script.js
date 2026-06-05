const introDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 1000;

function finishIntro() {
  document.body.classList.remove("intro-pending");
  document.body.classList.add("intro-complete");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
window.setTimeout(finishIntro, introDuration);
