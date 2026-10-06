
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

