const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");

  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});


/* ================= SCROLL REVEAL ================= */

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  easing: "ease-out",
  reset: false
};


/* HEADER */

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption
});

ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 200
});

ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 400
});

ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 600
});


/* ABOUT */

ScrollReveal().reveal(".about__image", {
  ...scrollRevealOption,
  origin: "left"
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 300
});

ScrollReveal().reveal(".about__content .about__btn", {
  ...scrollRevealOption,
  delay: 500
});


/* SERVICES */

ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 200
});


/* SKILLS */

ScrollReveal().reveal(".skills__card", {
  ...scrollRevealOption,
  interval: 150
});


/* INTERNSHIPS */

ScrollReveal().reveal(".internship__card", {
  ...scrollRevealOption,
  interval: 250
});


/* PROJECTS */

ScrollReveal().reveal(".project__card", {
  ...scrollRevealOption,
  interval: 200
});


/* EDUCATION */

ScrollReveal().reveal(".education__card", {
  ...scrollRevealOption
});


/* CONTACT */

ScrollReveal().reveal(".contact__card", {
  ...scrollRevealOption,
  interval: 200
});


/* ================= EMAILJS CONTACT FORM ================= */

emailjs.init({
    publicKey: "QX5_P08Ae-SMzdThS"
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const button = contactForm.querySelector("button[type='submit']");

        button.disabled = true;
        button.innerHTML = "Sending...";

        emailjs.sendForm(
            "service_uq4pc2q",
            "template_wa40tmu",
            contactForm
        )
        .then(function () {

            alert("✅ Message sent successfully!");

            contactForm.reset();

            button.disabled = false;
            button.innerHTML = `
                Send Message
                <i class="ri-send-plane-fill"></i>
            `;

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            alert("❌ Failed to send message. Please try again.");

            button.disabled = false;
            button.innerHTML = `
                Send Message
                <i class="ri-send-plane-fill"></i>
            `;

        });

    });

}