const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const message = document.getElementById("formMessage");

    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value;

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        message.textContent =
          `Thanks, ${name}! Your interest in ${course} has been received.`;

        contactForm.reset();
      } else {
        message.textContent =
          "Something went wrong. Please try again.";
      }
    } catch (error) {
      message.textContent =
        "Unable to send your message. Please check your connection and try again.";
    }

    submitButton.disabled = false;
    submitButton.innerHTML = "Send Message <span>→</span>";
  });
}
