const BG_VARIANT_KEY = "ivl-bg-variant";
const bgImages = {
  hand: "image.png",
  "no-hand": "image-text-only.png",
};

function applyBgVariant(variant) {
  document.body.classList.toggle("bg-no-hand", variant === "no-hand");
  document.querySelectorAll(".bg-toggle-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.variant === variant));
  });
}

function getStoredBgVariant() {
  const stored = window.localStorage.getItem(BG_VARIANT_KEY);
  return stored === "no-hand" ? "no-hand" : "hand";
}

const initialBgVariant = getStoredBgVariant();
applyBgVariant(initialBgVariant);

document.querySelectorAll(".bg-toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const variant = button.dataset.variant === "no-hand" ? "no-hand" : "hand";
    window.localStorage.setItem(BG_VARIANT_KEY, variant);
    applyBgVariant(variant);
  });
});

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
introImage.src = bgImages[initialBgVariant];

if (introImage.complete) {
  startIntroTimer();
}
