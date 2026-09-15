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

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/**
 * Submits a form to its Formspree endpoint via fetch, showing a loading
 * state on the submit button and a status message on success/failure.
 *
 * @param {HTMLFormElement} form
 * @param {Object} options
 * @param {string} options.messageId - id of the element to show status text in
 * @param {string} options.sendingText - button label while the request is in flight
 * @param {string} options.idleText - button label to restore afterwards
 * @param {(form: HTMLFormElement) => string} options.successMessage - builds the success text (called before form.reset())
 * @param {string} [options.errorMessage] - shown when the server responds with an error
 */
async function submitFormAsync(form, { messageId, sendingText, idleText, successMessage, errorMessage = "Something went wrong. Please try again." }) {
  const submitButton = form.querySelector("button[type='submit']");
  const message = document.getElementById(messageId);

  submitButton.disabled = true;
  submitButton.innerHTML = sendingText;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      message.textContent = successMessage(form);
      form.reset();
    } else {
      message.textContent = errorMessage;
    }
  } catch (error) {
    message.textContent = "Unable to send. Please check your connection and try again.";
  }

  submitButton.disabled = false;
  submitButton.innerHTML = idleText;
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitFormAsync(contactForm, {
      messageId: "formMessage",
      sendingText: "Sending...",
      idleText: 'Send Message <span>→</span>',
      successMessage: (form) => {
        const name = form.querySelector("#name").value.trim();
        const course = form.querySelector("#course").value;
        return `Thanks, ${name}! Your interest in ${course} has been received.`;
      }
    });
  });
}

const instructorForm = document.getElementById("instructorForm");
if (instructorForm) {
  instructorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitFormAsync(instructorForm, {
      messageId: "instFormMessage",
      sendingText: "Sending...",
      idleText: 'Submit Application <span>→</span>',
      successMessage: (form) => {
        const name = form.querySelector("#instName").value.trim();
        const role = form.querySelector("#instRole").value;
        const path = form.querySelector("#instPath").value;
        return `Thanks, ${name}! Your application to ${role.toLowerCase()} for ${path} has been received. We'll be in touch.`;
      }
    });
  });
}