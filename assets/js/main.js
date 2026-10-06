
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

/* =====================================================
   V45 - DEMO AI ASSISTANT
   ===================================================== */

const ifixAI =
  document.querySelector("#ifix-ai");

const ifixAILauncher =
  document.querySelector("#ifix-ai-launcher");

const ifixAIClose =
  document.querySelector("#ifix-ai-close");

const ifixAIMessages =
  document.querySelector("#ifix-ai-messages");

const ifixAIForm =
  document.querySelector("#ifix-ai-form");

const ifixAIInput =
  document.querySelector("#ifix-ai-input");


function addAIMessage(type, text) {

  if (!ifixAIMessages) return;

  const message =
    document.createElement("div");

  message.className =
    `ifix-ai-message ${type}`;

  const label =
    type === "user"
    ? "You"
    : "iFix AI";

  message.innerHTML =
    `<span class="ifix-ai-message-label">${label}</span>
     <p></p>`;

  message
    .querySelector("p")
    .textContent = text;

  ifixAIMessages.appendChild(message);

  ifixAIMessages.scrollTop =
    ifixAIMessages.scrollHeight;

}


function openAI() {

  if (!ifixAI) return;

  ifixAI.classList.add("open");

  ifixAILauncher?.setAttribute(
    "aria-expanded",
    "true"
  );

}


function closeAI() {

  if (!ifixAI) return;

  ifixAI.classList.remove("open");

  ifixAILauncher?.setAttribute(
    "aria-expanded",
    "false"
  );

}


ifixAILauncher?.addEventListener(
  "click",
  () => {

    if (ifixAI?.classList.contains("open")) {
      closeAI();
    } else {
      openAI();
    }

  }
);


ifixAIClose?.addEventListener(
  "click",
  closeAI
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
      &&
      ifixAI?.classList.contains("open")
    ) {
      closeAI();
    }

  }
);


const demoAnswers = {

  services:
    "iFix provides property maintenance, renovations, extensions and building work, fire doors and cladding, electrical and gas services, plus water and drainage work.",

  areas:
    "This concept positions iFix across Ipswich, Suffolk and Essex.",

  quote:
    "You can use the Request a Free Quote form below. Add the service you need, postcode, preferred timescale and optional project photos.",

  reviews:
    "The concept highlights iFix's independent customer reputation, including Checkatrade and TrustATrader reviews."

};


document
  .querySelectorAll("[data-ai-question]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const key =
          button.dataset.aiQuestion;

        addAIMessage(
          "user",
          button.textContent.trim()
        );

        setTimeout(
          () => {

            addAIMessage(
              "assistant",
              demoAnswers[key]
              ||
              "This is a demo assistant."
            );

          },
          280
        );

      }
    );

  });


ifixAIForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const question =
      ifixAIInput?.value.trim();

    if (!question) return;


    addAIMessage(
      "user",
      question
    );


    ifixAIInput.value = "";


    setTimeout(
      () => {

        addAIMessage(
          "assistant",
          "This is a website demo. Full AI assistance would be available on the live version, where the assistant could answer detailed questions, recommend services and help qualify enquiries."
        );

      },
      350
    );

  }
);

/* =====================================================
   V54 - SERVICE CARD 3D TILT
   ===================================================== */

(function () {
  const canTilt =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canTilt) return;

  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    let rafId = null;

    const resetCard = () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--tx", "0px");
      card.style.setProperty("--ty", "0px");
    };

    const updateCard = (event) => {
      const rect = card.getBoundingClientRect();

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 10;   // left/right
      const rotateX = (0.5 - py) * 8;    // up/down

      const moveX = (px - 0.5) * 4;
      const moveY = (py - 0.5) * -4;

      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--tx", `${moveX.toFixed(2)}px`);
      card.style.setProperty("--ty", `${moveY.toFixed(2)}px`);
    };

    card.addEventListener("pointerenter", () => {
      card.classList.add("is-tilting");
    });

    card.addEventListener("pointermove", (event) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        updateCard(event);
      });
    });

    card.addEventListener("pointerleave", resetCard);
  });
})();
