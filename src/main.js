import "./style.css";

const signal = document.querySelector("#signal");
const signalDot = document.querySelector("#signal-dot");
const issuedLinks = document.querySelectorAll(".issued-links a");
const root = document.documentElement;

function randomHue() {
  return `${Math.floor(Math.random() * 360)}deg`;
}

function scramblePalette() {
  root.style.setProperty("--glitch-one", randomHue());
  root.style.setProperty("--glitch-two", randomHue());
  root.style.setProperty("--glitch-three", randomHue());
  window.setTimeout(scramblePalette, 700 + Math.random() * 2400);
}

function setSignal(unstable) {
  signal.textContent = unstable ? "UNSTABLE" : "STABLE";
  signalDot.classList.toggle("off", unstable);
  issuedLinks.forEach((link) => {
    link.classList.toggle("is-disabled", unstable);
    link.setAttribute("aria-disabled", String(unstable));
    link.tabIndex = unstable ? -1 : 0;
  });
}

function scrambleSignal() {
  const unstable = Math.random() > 0.56;
  setSignal(unstable);
  const duration = unstable
    ? 180 + Math.random() * 720
    : 380 + Math.random() * 1500;
  window.setTimeout(scrambleSignal, duration);
}

scrambleSignal();
scramblePalette();

issuedLinks.forEach((link) => link.addEventListener("click", (event) => {
  if (link.classList.contains("is-disabled")) event.preventDefault();
}));
