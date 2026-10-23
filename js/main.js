/* ============================================================
   Krisha — Portfolio interactions
   Mobile menu, scroll-spy, reveal on scroll, contact form
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("is-open", open);
    if (nav) nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });

    // Close menu when a link is chosen
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Close on Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    // Close when resizing back to desktop
    var mq = window.matchMedia("(min-width: 821px)");
    var onViewportChange = function (e) {
      if (e.matches) setMenu(false);
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onViewportChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onViewportChange);
    }
  }

  /* ---------- Scroll-spy (active nav link) ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__link")
  );

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Contact form ----------
     No backend is configured, so the form composes an email
     in the visitor's own mail app instead of pretending to send. */
  var form = document.getElementById("contact-form");
  if (form) {
    var note = form.querySelector(".form__note");
    var defaultNote = note ? note.textContent : "";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = (form.elements.namedItem("name").value || "").trim();
      var email = (form.elements.namedItem("email").value || "").trim();
      var message = (form.elements.namedItem("message").value || "").trim();

      var valid =
        name !== "" &&
        message !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        if (note) {
          note.classList.add("is-error");
          note.textContent =
            "Please fill in your name, a valid email, and a message.";
        }
        return;
      }

      if (note) {
        note.classList.remove("is-error");
        note.textContent = defaultNote;
      }

      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      window.location.href =
        "mailto:krishashetty36@gmail.com?subject=" + subject + "&body=" + body;
    });

    form.addEventListener("input", function () {
      if (note && note.classList.contains("is-error")) {
        note.classList.remove("is-error");
        note.textContent = defaultNote;
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
