const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');
const openCardBtn = document.getElementById("openCardBtn");
const card = document.getElementById("card");
const backdrop = document.getElementById("backdrop");
const closeCardBtn = document.getElementById("closeCardBtn");


heart.addEventListener('click', (e) => {
  e.stopPropagation(); // prevents bubbling (good practice)
  envelope.classList.toggle('flap');
});



// // Envelope open -> reveals letter
// const envelope = document.getElementById("envelope")
// const hint = document.getElementById("hint");
// const openCardBtn = document.getElementById("openCardBtn");
// const card = document.getElementById("card");


envelope?.addEventListener("click", (e) => {
//   // prevent double triggers when clicking the button inside
  if (e.target?.id === "openCardBtn") return;

  envelope.classList.toggle("open");
  hint.textContent = envelope.classList.contains("open")
    ? "Aww 💘"
    : "Click to open your Valentine’s Day card 💌";
});

// // Open card button
// openCardBtn?.addEventListener("click", (e) => {
//   e.stopPropagation();
//   card.classList.remove("hidden");
//   hint.textContent = "💞";
//   // optional: scroll to card
//   card.scrollIntoView({ behavior: "smooth", block: "start" });
  
  
// });

function openCard(){
  card.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function closeCard(){
  card.classList.add("hidden");
  backdrop.classList.add("hidden");
}

openCardBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  openCard();
});

closeCardBtn?.addEventListener("click", closeCard);
backdrop?.addEventListener("click", closeCard);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCard();
});

// // Funny No button responses
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");
let noCount = 0;

noBtn?.addEventListener("click", () => {
  const messages = [
    "Are you sure? 🥺",
    "Okay but… think again 😭",
    "This button is emotionally unavailable 🙃",
    "I’m pretending I didn’t see that 😌",
  ];
  noText.textContent = messages[Math.min(noCount, messages.length - 1)];
  noCount++;
});

// YES confetti-ish vibe (tiny)
const yesBtn = document.getElementById("yesBtn");
yesBtn?.addEventListener("click", () => {
  noText.textContent = "YAY 💖 (okay now you have to answer the survey 😄)";
});

// Formspree “sent” message (no JS needed, but we can show a nicer message)
const surveyForm = document.getElementById("surveyForm");
const sentMsg = document.getElementById("sentMsg");

surveyForm?.addEventListener("submit", () => {
  // Form will submit and redirect or show Formspree default.
  // If you want to stay on-page, we can do AJAX later.
  sentMsg.textContent = "Sending… 💌";
});

// /* OPTIONAL FLOATING HEARTS (keep if you want) */
(() => {
  const canvas = document.getElementById("hearts");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  let w = 0, h = 0;
  function resize() {
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  const hearts = [];
  const HEART_COUNT = 26;

  const colors = [
    "rgba(255,107,129,",
    "rgba(255,154,158,",
    "rgba(250,208,196,",
    "rgba(255,255,255,"
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function makeHeart() {
    return {
      x: rand(0, w),
      y: rand(h + 20, h + 200),
      size: rand(10, 22),
      speed: rand(0.4, 1.2),
      drift: rand(-0.6, 0.6),
      wobble: rand(0, Math.PI * 2),
      wobbleSpeed: rand(0.008, 0.02),
      alpha: rand(0.2, 0.55),
      color: colors[Math.floor(rand(0, colors.length))]
    };
  }
  for (let i = 0; i < HEART_COUNT; i++) hearts.push(makeHeart());

  function drawHeart(x, y, size, alpha, colorPrefix) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 18, size / 18);

    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, 0, -10, 0, -10, 6);
    ctx.bezierCurveTo(-10, 12, 0, 16, 0, 20);
    ctx.bezierCurveTo(0, 16, 10, 12, 10, 6);
    ctx.bezierCurveTo(10, 0, 0, 0, 0, 6);
    ctx.closePath();

    ctx.fillStyle = `${colorPrefix}${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    for (const p of hearts) {
      p.wobble += p.wobbleSpeed;
      p.y -= p.speed;
      p.x += p.drift + Math.sin(p.wobble) * 0.4;

      drawHeart(p.x, p.y, p.size, p.alpha, p.color);

      if (p.y < -30 || p.x < -50 || p.x > w + 50) {
        Object.assign(p, makeHeart());
        p.y = rand(h + 40, h + 200);
      }
    }

    requestAnimationFrame(tick);
  }
  tick();
})();

// baby pic toggle

const babyBtn = document.getElementById("babyBtn");
const babyReveal = document.getElementById("babyReveal");

babyBtn?.addEventListener("click", () => {
  babyReveal.classList.toggle("show");
  babyBtn.textContent = babyReveal.classList.contains("show")
    ? "Hide proof 🙈"
    : "Click for proof I’ve always been cute";
});

// Pill buttons -> sets a hidden input value (Formspree-friendly)
document.querySelectorAll(".pill-group").forEach(group => {
  const name = group.dataset.name; // e.g. "energy"
  const input = document.getElementById(`${name}Input`);
  const pills = group.querySelectorAll(".pill");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");

      const value = pill.dataset.value;
      if (input) input.value = value;
    });
  });
});

