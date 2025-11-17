document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
    PAGE NAVIGATION (SPA)
  ------------------------------------------------------------- */
  function navigateToPage(pageName) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    const targetPage = document.getElementById(pageName + "-page");
    if (targetPage) {
      targetPage.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* -------------------------------------------------------------
    SMOOTH SCROLL TO ANCHOR
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

    const href = el.getAttribute("href") || "";
    const hasPage = el.hasAttribute("data-page");

    // SPA navigation
    if (hasPage) {
      e.preventDefault();  // stop browser navigation
      const pageName = el.getAttribute("data-page");

      if (href.startsWith("#")) {
        const id = href.substring(1);
        navigateToPage(pageName);
        setTimeout(() => scrollToId(id), 200);
      } else {
        navigateToPage(pageName);
      }
      return;
    }

    // Internal anchor
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const id = href.substring(1);

      const activePage = document.querySelector(".page.active");
      const targetElement = document.getElementById(id);

      if (targetElement && targetElement.closest(".page") === activePage) {
        scrollToId(id);
      } else {
        navigateToPage("home");
        setTimeout(() => scrollToId(id), 200);
      }
    }
  });

  /* -------------------------------------------------------------
    LOGO
  ------------------------------------------------------------- */
  const logo = document.querySelector(".logo-link");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToPage("home");
    });
  }

  /* -------------------------------------------------------------
    FADE-IN ANIMATION
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
    SCROLL TO TOP
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
    SHOW/HIDE TO-TOP BUTTON
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

  document.querySelectorAll(".floating-cta").forEach((btn) =>
    btn.classList.add("hidden")
  );

  updateToTopVisibility();
  window.addEventListener("scroll", updateToTopVisibility);

});
