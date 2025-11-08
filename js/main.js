// =====================================
// main.js – NTech (versão aprimorada)
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Helpers ---------- */
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function safeQuery(id) {
    return document.getElementById(id) || null;
  }

  /* ---------- Theme Toggle ---------- */
  const themeToggle = safeQuery("theme-toggle");
  const root = document.documentElement;
  if (themeToggle) {
    const setTheme = (theme) => {
      const valid = theme === "dark" ? "dark" : "light";
      root.setAttribute("data-theme", valid);
      try {
        const sun = themeToggle.querySelector(".sun");
        const moon = themeToggle.querySelector(".moon");
        if (sun && moon) {
          if (valid === "dark") {
            sun.style.opacity = "0";
            moon.style.opacity = "1";
          } else {
            sun.style.opacity = "1";
            moon.style.opacity = "0";
          }
        }
      } catch (e) {}
      localStorage.setItem("ntech-theme", valid);
    };
    const toggleTheme = () =>
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    themeToggle.addEventListener("click", toggleTheme);
    const userPref =
      localStorage.getItem("ntech-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(userPref);
  }

  /* ---------- Mobile Menu ---------- */
  const mobileBtn = safeQuery("mobile-menu-btn");
  // nav é um seletor CSS, safeQuery usa getElementById — usar querySelector aqui
  const nav = document.querySelector(".main-nav");

  if (mobileBtn && nav) {
    // acessibilidade inicial
    mobileBtn.setAttribute("aria-expanded", "false");
    // aria-pressed pertence ao botão de toggle
    mobileBtn.setAttribute("aria-pressed", "false");
    // garante que o nav tenha id para aria-controls
    if (!nav.id) nav.id = "main-nav";
    mobileBtn.setAttribute("aria-controls", nav.id);

    //toggle ao clicar
    mobileBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileBtn.setAttribute("aria-pressed", isOpen ? "true" : "false");
    });

    // fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
          nav.setAttribute("aria-pressed", "false");
        }
      })
    );

    // fecha ao clicar fora
    document.addEventListener("click", (evt) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(evt.target) &&
        !mobileBtn.contains(evt.target)
      ) {
        nav.classList.remove("open");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-pressed", "false");
      }
    });
  }
  /* ---------- Mobile Menu end ---------- */
  /* ---------- Rolagem automática dos depoimentos ---------- */
  const carousel = document.querySelector(".testimonials-carousel");
if (carousel) {
  let scrollAmount = 0;
  const scrollStep = 1;
  const delay = 20;
  let isDragging = false;
  let startX, scrollStart;

  // Rolagem automática suave
  function autoScroll() {
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft += scrollStep;
    }
  }

  let autoScrollInterval = setInterval(autoScroll, delay);

  // Pausa ao passar o mouse (desktop)
  carousel.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  carousel.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(autoScroll, delay);
  });

  // Suporte a arrastar (mouse e toque)
  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
    clearInterval(autoScrollInterval);
    carousel.classList.add("dragging");
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    autoScrollInterval = setInterval(autoScroll, delay);
  });

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    autoScrollInterval = setInterval(autoScroll, delay);
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollStart - walk;
  });

  // Suporte a toque (mobile)
  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
    clearInterval(autoScrollInterval);
  });

  carousel.addEventListener("touchend", () => {
    isDragging = false;
    autoScrollInterval = setInterval(autoScroll, delay);
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollStart - walk;
  });
}

  /* ---------- Modal Depoimentos ---------- */
  const openFormBtn = document.getElementById("openForm");
  const closeFormBtn = document.getElementById("closeForm");
  const modal = document.getElementById("testimonialModal");

  if (openFormBtn && closeFormBtn && modal) {
    openFormBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
    closeFormBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  /* ---------- Máscara telefone ---------- */
  try {
    const phoneInput = safeQuery("telephone");
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length <= 10) {
          v = v.replace(/^(\d{2})(\d)/, "($1) $2");
          v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        } else {
          v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        e.target.value = v;
      });
    }
  } catch (err) {
    console.warn("Phone mask error:", err);
  }

  /* ---------- FORMULÁRIOS GERAIS (Contato + Depoimentos) ---------- */
  const forms = document.querySelectorAll("form[data-formsubmit]");
  const invisibleFrame = document.querySelector(
    'iframe[name="invisible_iframe"]'
  );

  forms.forEach((formEl) => {
    const modal = formEl.closest(".modal");
    const submitBtn = formEl.querySelector('button[type="submit"]');

    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const originalText = submitBtn ? submitBtn.textContent : "Enviar";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <span class="spinner"></span> Enviando...
    `;
      }

      try {
        const formData = new FormData(formEl);
        const response = await fetch(formEl.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          showToast("✅ Enviado com sucesso!", "success");
          formEl.reset();
          if (modal) modal.style.display = "none";
        } else {
          showToast("⚠️ Erro ao enviar.", "error");
        }
      } catch (err) {
        console.warn("Erro no envio via fetch, tentando fallback iframe:", err);
        if (invisibleFrame) {
          formEl.target = "invisible_iframe";
          formEl.submit();
          showToast("✅ Enviado com sucesso! (via fallback)", "success");
          formEl.reset();
          if (modal) modal.style.display = "none";
        } else {
          showToast("⚠️ Falha ao enviar.", "error");
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });
});
