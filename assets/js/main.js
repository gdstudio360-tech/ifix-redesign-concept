const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

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

  });


  navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navigation.classList.remove("active");

      menuButton.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    });

  });

}


const form =
  document.querySelector("#demo-quote-form");

const success =
  document.querySelector(".form-success");


if (form && success) {

  form.addEventListener("submit", event => {

    event.preventDefault();

    success.textContent =
      "Demo received ✓ — on the real website this enquiry would now enter the iFix CRM and trigger an automatic confirmation email.";

    success.classList.add("show");

  });

}
