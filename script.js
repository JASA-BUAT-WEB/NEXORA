document.addEventListener("DOMContentLoaded", () => {
  const nomorWA = "6285161983346";

  function bukaWhatsApp(pesan) {
    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(linkWA, "_blank", "noopener,noreferrer");
  }

  const defaultMessage =
    "Halo, saya tertarik dengan jasa pembuatan website NEXORA.";

  document.querySelectorAll(
    ".contact-btn, .whatsapp-btn, .btn-whatsapp"
  ).forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
      event.preventDefault();
      bukaWhatsApp(defaultMessage);
    });
  });

  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    const formError = document.querySelector("#formError");
    const namaInput = document.querySelector("#nama");
    const bisnisInput = document.querySelector("#bisnis");
    const paketInput = document.querySelector("#paket");
    const kebutuhanInput = document.querySelector("#kebutuhan");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nama = namaInput?.value.trim() || "";
      const bisnis = bisnisInput?.value.trim() || "";
      const paket = paketInput?.value.trim() || "";
      const kebutuhan = kebutuhanInput?.value.trim() || "";

      if (!nama || !bisnis || !paket || !kebutuhan) {
        if (formError) {
          formError.textContent = "Harap lengkapi semua field sebelum lanjut.";
        }
        return;
      }

      if (kebutuhan.length < 8) {
        if (formError) {
          formError.textContent = "Detail kebutuhan minimal 8 karakter.";
        }
        return;
      }

      if (formError) {
        formError.textContent = "";
      }

      const pesan =
        `Halo, saya ${nama}. Saya ingin memesan paket ${paket} untuk brand ${bisnis}. Detail kebutuhan: ${kebutuhan}`;

      bukaWhatsApp(pesan);
    });
  }

  document.querySelectorAll("[data-paket]").forEach((item) => {
    item.addEventListener("click", () => {
      const paketValue = item.dataset.paket;
      const paketSelect = document.querySelector("#paket");

      if (paketSelect && paketValue) {
        paketSelect.value = paketValue;
      }
    });
  });

  const menuToggle = document.querySelector(
    ".menu-toggle, .hamburger, #menu-toggle, #menuBtn"
  );

  const navbarMenu = document.querySelector(
    ".nav-links, .navbar-menu, #nav-links, #nav"
  );

  if (menuToggle && navbarMenu) {
    menuToggle.addEventListener("click", () => {
      const terbuka = navbarMenu.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(terbuka)
      );
    });

    navbarMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // NAVBAR SAAT SCROLL
  // =========================
  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  // =========================
  // ANIMASI SAAT SCROLL
  // =========================
  const elemenAnimasi = document.querySelectorAll(
    ".reveal, .fade-in, .service-card, .project-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elemenAnimasi.forEach((elemen) => {
      observer.observe(elemen);
    });
  } else {
    elemenAnimasi.forEach((elemen) => {
      elemen.classList.add("visible");
    });
  }

  // =========================
  // LINK NAVIGASI HALUS
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const tujuan = link.getAttribute("href");

      if (!tujuan || tujuan === "#") return;

      const target = document.querySelector(tujuan);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // =========================
  // TAHUN OTOMATIS
  // =========================
  document.querySelectorAll(
    "#year, .current-year"
  ).forEach((elemen) => {
    elemen.textContent = new Date().getFullYear();
  });

  // =========================
  // EFEK TOMBOL
  // =========================
  document.querySelectorAll(
    ".btn, .btn-primary, .btn-secondary"
  ).forEach((tombol) => {
    tombol.addEventListener("pointerdown", () => {
      tombol.classList.add("pressed");
    });

    ["pointerup", "pointerleave", "pointercancel"].forEach(
      (eventName) => {
        tombol.addEventListener(eventName, () => {
          tombol.classList.remove("pressed");
        });
      }
    );
  });

  console.log("NEXORA JavaScript berhasil dimuat.");
});