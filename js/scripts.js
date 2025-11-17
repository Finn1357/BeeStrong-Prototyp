document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
    PAGE NAVIGATION (SPA-LOGIK)
  ------------------------------------------------------------- */

  function navigateToPage(pageName) {
    // Alle Seiten ausblenden
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Zielseite anzeigen
    const targetPage = document.getElementById(pageName + "-page");
    if (targetPage) {
      targetPage.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* -------------------------------------------------------------
    SMOOTH SCROLL TO ELEMENT
  ------------------------------------------------------------- */
  function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }

  /* -------------------------------------------------------------
    GLOBAL CLICK HANDLER
  ------------------------------------------------------------- */
  document.body.addEventListener("click", (e) => {
    const el = e.target.closest("a, button");
    if (!el) return;

    // SPA-Navigation
    if (el.hasAttribute("data-page")) {
      e.preventDefault();
      const pageName = el.getAttribute("data-page");
      const href = el.getAttribute("href") || "";

      // Falls es ein Anker ist (#...)
      if (href.startsWith("#")) {
        const id = href.substring(1);

        navigateToPage(pageName);
        setTimeout(() => scrollToId(id), 200);
        return;
      }

      navigateToPage(pageName);
      return;
    }

    // Normale interne Anker (#...)
    const href = el.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);

      const activePage = document.querySelector(".page.active");
      const targetElement = document.getElementById(id);

      // Wenn Element auf aktueller Seite ist:
      if (targetElement && targetElement.closest(".page") === activePage) {
        scrollToId(id);
      } else {
        // erst zur Home-Seite → dann scrollen
        navigateToPage("home");
        setTimeout(() => scrollToId(id), 200);
      }
    }
  });

  /* -------------------------------------------------------------
    LOGO → zurück zur Startseite
  ------------------------------------------------------------- */
  const logo = document.querySelector(".logo-link");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToPage("home");
    });
  }

  /* -------------------------------------------------------------
    FADE-IN ANIMATION BEI SCROLL
  ------------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  document.querySelectorAll(".card, .feature, .section").forEach((el) => {
    observer.observe(el);
  });

  /* -------------------------------------------------------------
    SCROLL-TO-TOP BUTTONS
  ------------------------------------------------------------- */
  const toTopButtons = [
    document.getElementById("toTop"),
    document.getElementById("toTopKontakt")
  ].filter(Boolean);

  toTopButtons.forEach((btn) => {
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  });

  /* -------------------------------------------------------------
    ANZEIGE DES TO-TOP BUTTONS
  ------------------------------------------------------------- */
  function updateToTopVisibility() {
    const activePage = document.querySelector(".page.active");
    if (!activePage) return;

    const btn = activePage.querySelector(".floating-cta");
    if (!btn) return;

    if (window.scrollY > 300) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }

  // Initial verstecken
  document.querySelectorAll(".floating-cta").forEach((btn) =>
    btn.classList.add("hidden")
  );

  updateToTopVisibility();
  window.addEventListener("scroll", updateToTopVisibility);

});
