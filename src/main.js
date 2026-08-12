import "./style.css";

const signal = document.querySelector("#signal");
const signalDot = document.querySelector("#signal-dot");

window.setInterval(() => {
  const unstable = Math.random() > 0.78;
  signal.textContent = unstable ? "UNSTABLE" : "STABLE";
  signalDot.classList.toggle("off", unstable);
}, 1700);
