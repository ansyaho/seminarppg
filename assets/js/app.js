document.addEventListener("DOMContentLoaded", () => {
  // MENU MOBILE
  const menuButton = document.querySelector("[data-mobile-menu]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  menuButton?.addEventListener("click", () => {
    mobileNav?.classList.toggle("is-open");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
    });
  });

  // MODAL UMUM
  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.modalOpen);
      if (modal) modal.hidden = false;
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.modalClose);
      if (modal) modal.hidden = true;
    });
  });

  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) modal.hidden = true;
    });
  });

  // KONFIRMASI FORM
  document.querySelectorAll("form[data-confirm]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!window.confirm(form.dataset.confirm)) {
        event.preventDefault();
      }
    });
  });

  // INPUT BERKAS
  document.querySelectorAll("[data-file-input]").forEach((fileInput) => {
    const fileName = fileInput
      .closest(".file-drop")
      ?.querySelector("[data-file-name]");

    const defaultLabel = fileName?.textContent || "Pilih berkas untuk diunggah";

    fileInput.addEventListener("change", () => {
      if (!fileName) return;

      const selectedFiles = Array.from(fileInput.files || []);

      fileName.textContent =
        selectedFiles.length > 1
          ? `${selectedFiles.length} foto dipilih`
          : selectedFiles[0]?.name || defaultLabel;
    });
  });

  // GALERI INOVASI
  document.querySelectorAll("[data-innovation-gallery]").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));

    const thumbnails = Array.from(
      gallery.querySelectorAll("[data-gallery-thumbnail]"),
    );

    const previousButton = gallery.querySelector("[data-gallery-previous]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    const currentNumber = gallery.querySelector("[data-gallery-current]");

    if (slides.length === 0) return;

    let activeIndex = 0;

    const showImage = (newIndex) => {
      activeIndex = (newIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        const active = index === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });

      thumbnails.forEach((thumbnail, index) => {
        const active = index === activeIndex;
        thumbnail.classList.toggle("is-active", active);
        thumbnail.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (currentNumber) {
        currentNumber.textContent = String(activeIndex + 1);
      }

      thumbnails[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    };

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => showImage(index));
    });

    previousButton?.addEventListener("click", () => {
      showImage(activeIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      showImage(activeIndex + 1);
    });

    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(activeIndex + 1);
      }
    });

    showImage(0);
  });

  // FILTER SEMESTER
  const semesterButtons = document.querySelectorAll("[data-semester-filter]");
  const semesterCards = document.querySelectorAll("[data-semester]");
  const semesterLabel = document.getElementById("semester-label");

  semesterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const semester = button.dataset.semesterFilter;

      semesterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      semesterCards.forEach((card) => {
        card.hidden = card.dataset.semester !== semester;
      });

      if (semesterLabel) {
        semesterLabel.textContent = "Semester " + semester;
      }
    });
  });

  // POPUP PDF: PINDAHKAN MODAL KE BODY
  document.querySelectorAll(".pdf-modal").forEach((modal) => {
    document.body.appendChild(modal);
  });

  // EVENT DELEGATION POPUP PDF
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-pdf-open]");

    if (openButton) {
      const modalId = openButton.getAttribute("data-pdf-open");
      const modal = document.getElementById(modalId);

      console.log("Tombol PDF:", modalId);
      console.log("Popup ditemukan:", Boolean(modal));

      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
      return;
    }

    const closeButton = event.target.closest("[data-pdf-close]");

    if (closeButton) {
      const modal = closeButton.closest(".pdf-modal");

      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
      return;
    }

    if (event.target.classList.contains("pdf-modal")) {
      event.target.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // TUTUP DENGAN ESCAPE
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".pdf-modal.active").forEach((modal) => {
        modal.classList.remove("active");
      });

      document.body.style.overflow = "";
    }
  });
});
