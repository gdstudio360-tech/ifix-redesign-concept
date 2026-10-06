
/* ========================================================
   iFix Property — GD Studio 360 redesign concept
   ======================================================== */


/* ---------------------------
   MOBILE MENU
   --------------------------- */

const menuButton =
  document.querySelector(".menu-toggle");

const navigation =
  document.querySelector(".site-nav");


if (menuButton && navigation) {

  menuButton.addEventListener(
    "click",
    () => {

      const open =
        navigation.classList.toggle("active");


      menuButton.classList.toggle(
        "active",
        open
      );


      menuButton.setAttribute(
        "aria-expanded",
        String(open)
      );


      document.body.classList.toggle(
        "menu-open",
        open
      );

    }
  );


  navigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navigation
            .classList
            .remove("active");


          menuButton
            .classList
            .remove("active");


          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );


          document.body
            .classList
            .remove("menu-open");

        }
      );

    });

}



/* ---------------------------
   LIGHT / DARK THEME
   --------------------------- */

const themeButton =
  document.querySelector("#theme-toggle");

const themeIcon =
  document.querySelector(".theme-icon");

const themeLabel =
  document.querySelector(".theme-label");


function getTheme() {

  return (
    document.documentElement.dataset.theme
    ||
    "dark"
  );

}


function updateThemeButton() {

  const theme = getTheme();


  if (!themeButton) return;


  if (theme === "dark") {

    if (themeIcon) {
      themeIcon.textContent = "☀";
    }

    if (themeLabel) {
      themeLabel.textContent = "Light";
    }

    themeButton.setAttribute(
      "aria-label",
      "Switch to light theme"
    );

    themeButton.setAttribute(
      "title",
      "Light theme"
    );

  } else {

    if (themeIcon) {
      themeIcon.textContent = "☾";
    }

    if (themeLabel) {
      themeLabel.textContent = "Dark";
    }

    themeButton.setAttribute(
      "aria-label",
      "Switch to dark theme"
    );

    themeButton.setAttribute(
      "title",
      "Dark theme"
    );

  }

}


if (themeButton) {

  updateThemeButton();


  themeButton.addEventListener(
    "click",
    () => {

      const current =
        getTheme();


      const next =
        current === "dark"
        ? "light"
        : "dark";


      document.documentElement
        .dataset
        .theme = next;


      try {

        localStorage.setItem(
          "ifix-theme",
          next
        );

      } catch (e) {

        // Theme still works without storage.

      }


      updateThemeButton();

    }
  );

}



/* ---------------------------
   DEMO QUOTE FORM
   --------------------------- */

const form =
  document.querySelector(
    "#demo-quote-form"
  );


const success =
  document.querySelector(
    ".form-success"
  );


if (form && success) {

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      success.textContent =
        "Demo received ✓ — on the real website this enquiry would enter the iFix CRM and trigger an automatic confirmation email.";


      success
        .classList
        .add("show");


      success.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }
  );

}



/* IFIX POLISH V40 */

const polishHeader =
  document.querySelector(".site-header");

function polishHeaderState() {
  if (!polishHeader) return;

  polishHeader.classList.toggle(
    "is-scrolled",
    window.scrollY > 20
  );
}

polishHeaderState();

window.addEventListener(
  "scroll",
  polishHeaderState,
  { passive: true }
);


const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

if (!reducedMotion && "IntersectionObserver" in window) {

  const revealElements =
    document.querySelectorAll(
      ".service-card, .project-card, .review-card, .why-item, .quote-form"
    );

  revealElements.forEach(el => {
    el.classList.add("reveal-v40");
  });

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        });

      },
      {
        threshold: .12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/* IFIX V43 — START FROM HERO AFTER RELOAD */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function ifixWasReloaded() {
  const nav = performance.getEntriesByType?.("navigation");

  if (nav && nav.length) {
    return nav[0].type === "reload";
  }

  return performance.navigation &&
         performance.navigation.type === 1;
}

if (ifixWasReloaded()) {

  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  window.addEventListener(
    "pageshow",
    () => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto"
        });
      });
    },
    { once: true }
  );
}


/* V44 - BACK TO TOP */

const backToTop =
  document.querySelector("#back-to-top");

if (backToTop) {

  const updateBackToTop = () => {
    backToTop.classList.toggle(
      "show",
      window.scrollY > 500
    );
  };

  updateBackToTop();

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });

    }
  );

}
