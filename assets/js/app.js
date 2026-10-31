document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-mobile-menu]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  menuButton?.addEventListener("click", () => {
    mobileNav?.classList.toggle("is-open");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("is-open"));
  });

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

  document.querySelectorAll("form[data-confirm]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!window.confirm(form.dataset.confirm)) event.preventDefault();
    });
  });

  document.querySelectorAll("[data-file-input]").forEach((fileInput) => {
    const fileName = fileInput.closest(".file-drop")?.querySelector("[data-file-name]");
    const defaultLabel = fileName?.textContent || "Pilih berkas untuk diunggah";

    fileInput.addEventListener("change", () => {
      if (!fileName) return;

      const selectedFiles = Array.from(fileInput.files || []);
      fileName.textContent = selectedFiles.length > 1
        ? `${selectedFiles.length} foto dipilih`
        : selectedFiles[0]?.name || defaultLabel;
    });
  });

    document.querySelectorAll("[data-innovation-gallery]").forEach((gallery) => {
    const slides = Array.from(
      gallery.querySelectorAll("[data-gallery-slide]")
    );

    const thumbnails = Array.from(
      gallery.querySelectorAll("[data-gallery-thumbnail]")
    );

    const previousButton = gallery.querySelector("[data-gallery-previous]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    const currentNumber = gallery.querySelector("[data-gallery-current]");

    if (slides.length === 0) return;

    let activeIndex = 0;

    const showImage = (newIndex) => {
      activeIndex = (newIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;

        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      thumbnails.forEach((thumbnail, index) => {
        const isActive = index === activeIndex;

        thumbnail.classList.toggle("is-active", isActive);
        thumbnail.setAttribute(
          "aria-selected",
          isActive ? "true" : "false"
        );
      });

      if (currentNumber) {
        currentNumber.textContent = String(activeIndex + 1);
      }

      thumbnails[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    };

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        showImage(index);
      });
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
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-semester-filter]');
  const cards = document.querySelectorAll('[data-semester]');
  const label = document.getElementById('semester-label');
  buttons.forEach(button => button.addEventListener('click', () => {
    const semester = button.dataset.semesterFilter;
    buttons.forEach(b => b.classList.toggle('active', b === button));
    cards.forEach(card => card.hidden = card.dataset.semester !== semester);
    if (label) label.textContent = 'Semester ' + semester;
  }));
});
