import "./style.css";

const signal = document.querySelector("#signal");
const signalDot = document.querySelector("#signal-dot");
const issuedLinks = document.querySelectorAll(".issued-links a");

function setSignal(unstable) {
  signal.textContent = unstable ? "UNSTABLE" : "STABLE";
  signalDot.classList.toggle("off", unstable);
  issuedLinks.forEach((link) => {
    link.classList.toggle("is-disabled", unstable);
    link.setAttribute("aria-disabled", String(unstable));
    link.tabIndex = unstable ? -1 : 0;
  });
}

window.setInterval(() => {
  setSignal(Math.random() > 0.78);
}, 1700);

issuedLinks.forEach((link) => link.addEventListener("click", (event) => {
  if (link.classList.contains("is-disabled")) event.preventDefault();
}));
