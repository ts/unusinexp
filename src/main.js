import "./style.css";

const signal = document.querySelector("#signal");
const signalDot = document.querySelector("#signal-dot");
const issuedLinks = document.querySelectorAll(".issued-links a");
const root = document.documentElement;
const hotPalette = [
  { name: "green", hue: 76 },
  { name: "blue", hue: 206 },
  { name: "purple", hue: 278 },
  { name: "pink", hue: 324 },
];

function randomHotColor() {
  const { hue } = hotPalette[Math.floor(Math.random() * hotPalette.length)];
  const adjustedHue = hue + Math.floor(Math.random() * 31) - 15;
  const lightness = 58 + Math.floor(Math.random() * 13);
  return {
    hue: `${adjustedHue}deg`,
    color: `hsl(${adjustedHue} 100% ${lightness}%)`,
    glow: `hsl(${adjustedHue} 100% ${lightness}% / .38)`,
  };
}

function scramblePalette() {
  const channels = [randomHotColor(), randomHotColor(), randomHotColor()];
  root.style.setProperty("--glitch-one", channels[0].hue);
  root.style.setProperty("--glitch-two", channels[1].hue);
  root.style.setProperty("--glitch-three", channels[2].hue);
  root.style.setProperty("--signal-color", channels[0].color);
  issuedLinks.forEach((link, index) => {
    const channel = channels[index];
    link.style.setProperty("--link-color", channel.color);
    link.style.setProperty("--link-glow", channel.glow);
  });
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
