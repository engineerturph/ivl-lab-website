const introDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 1000;
let introTimerStarted = false;

function finishIntro() {
  document.body.classList.remove("intro-pending");
  document.body.classList.add("intro-complete");
}

function startIntroTimer() {
  if (introTimerStarted) return;
  introTimerStarted = true;
  window.setTimeout(finishIntro, introDuration);
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

const introImage = new Image();
introImage.onload = startIntroTimer;
introImage.onerror = startIntroTimer;
introImage.src = "image.png";

if (introImage.complete) {
  startIntroTimer();
}
