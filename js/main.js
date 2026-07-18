/* ==========================================================================
   MONO Barberclub — main.js
   Preloader, header behaviour, mobile nav, scroll reveals, counters,
   review slider, booking form validation.
   ========================================================================== */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("is-done"), prefersReducedMotion ? 0 : 500);
  });
  // Fallback in case the load event stalls (slow fonts, etc.)
  setTimeout(() => preloader.classList.add("is-done"), 3500);

  /* ---------- Header: scrolled state + hide on scroll down ---------- */
  const header = document.getElementById("header");
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);

    // Hide header when scrolling down past the hero, show when scrolling up
    if (y > 500 && y > lastY && !nav.classList.contains("is-open")) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastY = y;

    toTop.classList.toggle("is-visible", y > 700);
  };

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const closeNav = () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav__link")];

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Scroll reveal (with per-sibling stagger) ---------- */
  const reveals = [...document.querySelectorAll(".reveal")];

  // Stagger siblings that share a parent so grids cascade in
  const byParent = new Map();
  reveals.forEach((el) => {
    const list = byParent.get(el.parentElement) || [];
    list.push(el);
    byParent.set(el.parentElement, list);
  });
  byParent.forEach((list) => {
    list.forEach((el, i) => el.style.setProperty("--reveal-delay", `${Math.min(i * 90, 450)}ms`));
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
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = [...document.querySelectorAll(".stat__num")];

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || "0", 10);
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          prefersReducedMotion
            ? (entry.target.textContent = entry.target.dataset.count)
            : animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Reviews slider ---------- */
  const track = document.getElementById("sliderTrack");
  const slides = [...track.children];
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsWrap = document.getElementById("sliderDots");

  let index = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider__dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to review ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  };

  const goTo = (i, user = false) => {
    index = (i + slides.length) % slides.length;
    render();
    if (user) restartAuto();
  };

  const restartAuto = () => {
    if (prefersReducedMotion) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(index + 1), 6000);
  };

  prevBtn.addEventListener("click", () => goTo(index - 1, true));
  nextBtn.addEventListener("click", () => goTo(index + 1, true));

  // Touch swipe
  let touchX = null;
  track.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  track.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) goTo(index + (dx < 0 ? 1 : -1), true);
      touchX = null;
    },
    { passive: true }
  );

  // Pause auto-advance while hovering
  const slider = document.getElementById("slider");
  slider.addEventListener("mouseenter", () => clearInterval(autoTimer));
  slider.addEventListener("mouseleave", restartAuto);

  render();
  restartAuto();

  /* ---------- Booking form ---------- */
  const form = document.getElementById("bookingForm");
  const success = document.getElementById("bookingSuccess");

  // Earliest bookable day is tomorrow
  const dateInput = document.getElementById("bDate");
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  dateInput.min = tomorrow.toISOString().split("T")[0];

  const validateField = (input) => {
    const field = input.closest(".field");
    const valid = input.value.trim() !== "";
    field.classList.toggle("is-invalid", !valid);
    return valid;
  };

  form.querySelectorAll("[required]").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requiredFields = [...form.querySelectorAll("[required]")];
    const allValid = requiredFields.map(validateField).every(Boolean);
    if (!allValid) {
      form.querySelector(".field.is-invalid input, .field.is-invalid select")?.focus();
      return;
    }
    // In production this would POST to a booking endpoint.
    success.hidden = false;
    success.setAttribute("tabindex", "-1");
    success.focus();
  });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  );

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
